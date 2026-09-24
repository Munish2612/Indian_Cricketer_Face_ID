from sqlalchemy import Column, Integer, String, Float, DateTime, Text, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base

class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    role = Column(String, nullable=False) # e.g. Right-hand Batsman, All-rounder, Fast Bowler
    jersey_number = Column(Integer, nullable=True)
    batting_style = Column(String, nullable=True)
    bowling_style = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    recognition_count = Column(Integer, default=0)
    avg_confidence = Column(Float, default=0.0)

    predictions = relationship("Prediction", back_populates="player")

class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    image_url = Column(String, nullable=False)
    predicted_player_name = Column(String, nullable=False)
    player_id = Column(Integer, ForeignKey("players.id"), nullable=True)
    confidence = Column(Float, nullable=False)
    execution_time_ms = Column(Float, default=0.0)
    face_bbox = Column(String, nullable=True) # JSON or string formatted box "[x, y, w, h]"
    timestamp = Column(DateTime, default=datetime.utcnow)

    player = relationship("Player", back_populates="predictions")
