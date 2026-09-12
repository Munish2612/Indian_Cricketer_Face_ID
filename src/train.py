import os
import cv2
import numpy as np
from keras_facenet import FaceNet
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.utils import to_categorical
import pickle

PROCESSED_DIR = "../dataset/processed"
MODELS_DIR = "../models"
TARGET_SIZE = (160, 160)

embedder = FaceNet()

def get_embedding(face_pixels):
    # Scale pixel values
    face_pixels = face_pixels.astype('float32')
    # Standardize pixel values across channels (global)
    mean, std = face_pixels.mean(), face_pixels.std()
    face_pixels = (face_pixels - mean) / std
    # Transform face into one sample
    samples = np.expand_dims(face_pixels, axis=0)
    # Make prediction to get embedding
    yhat = embedder.embeddings(samples)
    return yhat[0]

def load_dataset():
    X, y = list(), list()
    if not os.path.exists(PROCESSED_DIR):
        print(f"Error: {PROCESSED_DIR} does not exist.")
        return np.array(X), np.array(y)
        
    for player_name in os.listdir(PROCESSED_DIR):
        player_dir = os.path.join(PROCESSED_DIR, player_name)
        if not os.path.isdir(player_dir):
            continue
            
        print(f"Extracting features for {player_name}...")
        for filename in os.listdir(player_dir):
            file_path = os.path.join(player_dir, filename)
            image = cv2.imread(file_path)
            if image is None:
                continue
                
            image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            embedding = get_embedding(image)
            
            X.append(embedding)
            y.append(player_name)
            
    return np.asarray(X), np.asarray(y)

def build_classifier(input_dim, num_classes):
    model = Sequential([
        Dense(128, activation='relu', input_shape=(input_dim,)),
        Dropout(0.5),
        Dense(64, activation='relu'),
        Dropout(0.3),
        Dense(num_classes, activation='softmax')
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

def train_model():
    if not os.path.exists(MODELS_DIR):
        os.makedirs(MODELS_DIR)
        
    print("Loading dataset and extracting FaceNet embeddings...")
    X, y = load_dataset()
    
    if len(X) == 0:
        print("No training data found. Exiting.")
        return
        
    print(f"Total images loaded: {len(X)}")
    
    # Label encoding
    le = LabelEncoder()
    y_encoded = le.fit_transform(y)
    y_categorical = to_categorical(y_encoded)
    
    # Save Label Encoder
    with open(os.path.join(MODELS_DIR, 'label_encoder.pkl'), 'wb') as f:
        pickle.dump(le, f)
        
    # Train-test split (we use this just for validation during training)
    X_train, X_val, y_train, y_val = train_test_split(X, y_categorical, test_size=0.2, random_state=42)
    
    print("Building Classifier...")
    model = build_classifier(input_dim=X_train.shape[1], num_classes=len(le.classes_))
    
    print("Training Classifier...")
    model.fit(X_train, y_train, epochs=50, batch_size=16, validation_data=(X_val, y_val))
    
    print("Saving Model...")
    model.save(os.path.join(MODELS_DIR, 'face_classifier.h5'))
    print("Training Complete!")

if __name__ == "__main__":
    train_model()
