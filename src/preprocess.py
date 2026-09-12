import os
import cv2
import numpy as np
from mtcnn import MTCNN

# Configuration
RAW_DIR = "../dataset/raw"
PROCESSED_DIR = "../dataset/processed"
TARGET_SIZE = (160, 160) # Size required for FaceNet

detector = MTCNN()

def create_processed_dirs():
    if not os.path.exists(PROCESSED_DIR):
        os.makedirs(PROCESSED_DIR)
    
    if os.path.exists(RAW_DIR):
        for player_name in os.listdir(RAW_DIR):
            player_dir = os.path.join(PROCESSED_DIR, player_name)
            if not os.path.exists(player_dir):
                os.makedirs(player_dir)

def extract_face(filename, required_size=TARGET_SIZE):
    # Load image from file
    image = cv2.imread(filename)
    if image is None:
        return None
        
    # Convert to RGB (OpenCV uses BGR)
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Detect faces
    results = detector.detect_faces(image_rgb)
    
    # If no face is found, return None
    if len(results) == 0:
        return None
        
    # Get bounding box of the first (largest) face
    x1, y1, width, height = results[0]['box']
    x1, y1 = abs(x1), abs(y1)
    x2, y2 = x1 + width, y1 + height
    
    # Extract the face
    face = image_rgb[y1:y2, x1:x2]
    
    # Resize pixels to the model size
    face_image = cv2.resize(face, required_size)
    
    # Convert back to BGR for saving with OpenCV
    face_image_bgr = cv2.cvtColor(face_image, cv2.COLOR_RGB2BGR)
    return face_image_bgr

def preprocess_dataset():
    create_processed_dirs()
    
    if not os.path.exists(RAW_DIR):
        print(f"Error: {RAW_DIR} does not exist. Run collect_data.py first.")
        return
        
    for player_name in os.listdir(RAW_DIR):
        raw_player_dir = os.path.join(RAW_DIR, player_name)
        processed_player_dir = os.path.join(PROCESSED_DIR, player_name)
        
        if not os.path.isdir(raw_player_dir):
            continue
            
        print(f"Processing faces for {player_name}...")
        for filename in os.listdir(raw_player_dir):
            file_path = os.path.join(raw_player_dir, filename)
            
            try:
                face = extract_face(file_path)
                if face is not None:
                    save_path = os.path.join(processed_player_dir, filename)
                    cv2.imwrite(save_path, face)
            except Exception as e:
                print(f"Error processing {filename}: {e}")

if __name__ == "__main__":
    print("Starting Preprocessing...")
    preprocess_dataset()
    print("Preprocessing Complete! Cropped faces saved to dataset/processed.")
