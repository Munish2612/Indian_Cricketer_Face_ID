import os
import argparse
import numpy as np
from tensorflow.keras.models import load_model
import pickle
from preprocess import extract_face # Reusing from preprocess.py
from train import get_embedding     # Reusing from train.py

MODELS_DIR = "../models"

def predict_image(image_path):
    if not os.path.exists(image_path):
        print(f"Error: File {image_path} not found.")
        return
        
    print(f"Analyzing image: {image_path}")
    
    # 1. Preprocess: Detect and crop face
    face_pixels = extract_face(image_path)
    
    if face_pixels is None:
        print("No face detected in the image.")
        return
        
    print("Face detected and cropped.")
    
    # 2. Extract Embedding
    embedding = get_embedding(face_pixels)
    
    # 3. Load Model and Label Encoder
    model_path = os.path.join(MODELS_DIR, 'face_classifier.h5')
    le_path = os.path.join(MODELS_DIR, 'label_encoder.pkl')
    
    if not os.path.exists(model_path) or not os.path.exists(le_path):
        print("Error: Model files not found. Please train the model first.")
        return
        
    model = load_model(model_path)
    with open(le_path, 'rb') as f:
        le = pickle.load(f)
        
    # 4. Predict
    # embedding shape is (128,) or (512,), model expects (1, input_dim)
    samples = np.expand_dims(embedding, axis=0)
    y_pred_probs = model.predict(samples)
    
    class_index = np.argmax(y_pred_probs, axis=1)[0]
    confidence = y_pred_probs[0][class_index]
    
    predicted_name = le.inverse_transform([class_index])[0]
    predicted_name = predicted_name.replace("_", " ")
    
    print("\n" + "="*30)
    print("      PREDICTION RESULT      ")
    print("="*30)
    print(f"Predicted Player : {predicted_name}")
    print(f"Confidence Score : {confidence*100:.2f}%")
    print("="*30)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Predict Indian Cricketer from Image")
    parser.add_argument("image_path", type=str, help="Path to the input image")
    args = parser.parse_args()
    
    predict_image(args.image_path)
