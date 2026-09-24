import os
import shutil
import uuid
import json
from fastapi import FastAPI, Depends, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from datetime import datetime

from database import engine, get_db, Base
from models import Player, Prediction
from seed import seed_db
from predictor import detect_face_and_predict

# Initialize DB & Seed data
Base.metadata.create_all(bind=engine)
seed_db()

app = FastAPI(
    title="Indian Cricketer Face Identification API",
    description="AI-powered face recognition REST API with SQLite analytics database",
    version="1.0.0"
)

# Enable CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Uploads directory setup
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")


@app.get("/")
def read_root():
    return {
        "status": "online",
        "system": "Indian Cricketer Face Identification AI Platform",
        "version": "1.0.0",
        "endpoints": ["/api/predict", "/api/players", "/api/history", "/api/stats"]
    }


@app.get("/api/players")
def get_players(db: Session = Depends(get_db)):
    players = db.query(Player).order_by(Player.name).all()
    return players


@app.get("/api/players/{player_id}")
def get_player(player_id: int, db: Session = Depends(get_db)):
    player = db.query(Player).filter(Player.id == player_id).first()
    if not player:
        raise HTTPException(status_code=404, detail="Player not found")
    return player


@app.post("/api/predict")
async def predict(file: UploadFile = File(...), db: Session = Depends(get_db)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Uploaded file must be an image.")

    # Save uploaded file with unique filename
    ext = file.filename.split(".")[-1] if "." in file.filename else "jpg"
    unique_filename = f"{uuid.uuid4().hex}_{file.filename}"
    saved_path = os.path.join(UPLOADS_DIR, unique_filename)

    with open(saved_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Perform AI prediction
    prediction_result = detect_face_and_predict(saved_path)

    predicted_name = prediction_result["predicted_player_name"]
    confidence = prediction_result["confidence"]
    execution_time = prediction_result["execution_time_ms"]
    face_bbox = prediction_result["face_bbox"]

    # Match player in database
    player = db.query(Player).filter(Player.name.ilike(f"%{predicted_name}%")).first()
    player_id = player.id if player else None

    # Update player stats in database
    if player:
        player.recognition_count += 1
        # Recalculate average confidence
        current_total = (player.avg_confidence * (player.recognition_count - 1)) + confidence
        player.avg_confidence = round(current_total / player.recognition_count, 2)
        db.commit()

    # Image URL accessible by frontend
    image_url = f"/uploads/{unique_filename}"

    # Log prediction entry into database
    new_prediction = Prediction(
        filename=file.filename,
        image_url=image_url,
        predicted_player_name=predicted_name,
        player_id=player_id,
        confidence=confidence,
        execution_time_ms=execution_time,
        face_bbox=face_bbox,
        timestamp=datetime.utcnow()
    )
    db.add(new_prediction)
    db.commit()
    db.refresh(new_prediction)

    return {
        "id": new_prediction.id,
        "filename": file.filename,
        "image_url": image_url,
        "predicted_player": {
            "id": player.id if player else None,
            "name": predicted_name,
            "role": player.role if player else "Player",
            "jersey_number": player.jersey_number if player else None,
            "avatar_url": player.avatar_url if player else None,
            "bio": player.bio if player else None
        },
        "confidence": confidence,
        "execution_time_ms": execution_time,
        "face_bbox": json.loads(face_bbox) if face_bbox else [25.0, 20.0, 50.0, 60.0],
        "timestamp": new_prediction.timestamp.isoformat()
    }


@app.get("/api/history")
def get_history(limit: int = 20, db: Session = Depends(get_db)):
    predictions = db.query(Prediction).order_by(Prediction.timestamp.desc()).limit(limit).all()
    result = []
    for p in predictions:
        bbox = json.loads(p.face_bbox) if p.face_bbox else [25.0, 20.0, 50.0, 60.0]
        result.append({
            "id": p.id,
            "filename": p.filename,
            "image_url": p.image_url,
            "predicted_player_name": p.predicted_player_name,
            "player_id": p.player_id,
            "confidence": p.confidence,
            "execution_time_ms": p.execution_time_ms,
            "face_bbox": bbox,
            "timestamp": p.timestamp.isoformat()
        })
    return result


@app.delete("/api/history/{prediction_id}")
def delete_prediction(prediction_id: int, db: Session = Depends(get_db)):
    prediction = db.query(Prediction).filter(Prediction.id == prediction_id).first()
    if not prediction:
        raise HTTPException(status_code=404, detail="Prediction log not found")
    
    db.delete(prediction)
    db.commit()
    return {"status": "success", "message": f"Log #{prediction_id} deleted"}


@app.get("/api/stats")
def get_stats(db: Session = Depends(get_db)):
    total_predictions = db.query(Prediction).count()
    total_players = db.query(Player).count()
    
    # Top recognized player
    top_player = db.query(Player).order_by(Player.recognition_count.desc()).first()
    
    # Average platform confidence
    all_preds = db.query(Prediction.confidence).all()
    avg_conf = round(sum(p[0] for p in all_preds) / len(all_preds), 2) if all_preds else 96.5

    return {
        "total_predictions": total_predictions,
        "total_players": total_players,
        "top_recognized_player": top_player.name if top_player else "N/A",
        "top_recognized_count": top_player.recognition_count if top_player else 0,
        "average_confidence": avg_conf
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
