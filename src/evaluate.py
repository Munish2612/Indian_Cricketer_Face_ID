import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import accuracy_score, confusion_matrix
from tensorflow.keras.models import load_model
import pickle
from train import load_dataset # Reusing load_dataset from train.py

MODELS_DIR = "../models"

def evaluate_model():
    # In a real scenario, you'd load a separate test dataset.
    # For demonstration, we'll evaluate on the processed dataset.
    print("Loading test data...")
    X_test, y_true_labels = load_dataset()
    
    if len(X_test) == 0:
        print("No test data found.")
        return
        
    print("Loading Model and Label Encoder...")
    model_path = os.path.join(MODELS_DIR, 'face_classifier.h5')
    le_path = os.path.join(MODELS_DIR, 'label_encoder.pkl')
    
    if not os.path.exists(model_path) or not os.path.exists(le_path):
        print("Model or Label Encoder not found. Please run train.py first.")
        return
        
    model = load_model(model_path)
    with open(le_path, 'rb') as f:
        le = pickle.load(f)
        
    y_true = le.transform(y_true_labels)
    
    print("Predicting...")
    y_pred_probs = model.predict(X_test)
    y_pred = np.argmax(y_pred_probs, axis=1)
    
    # Calculate Accuracy
    acc = accuracy_score(y_true, y_pred)
    print(f"\nModel Accuracy: {acc * 100:.2f}%")
    
    # Confusion Matrix
    cm = confusion_matrix(y_true, y_pred)
    
    # Plotting
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=le.classes_, yticklabels=le.classes_)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.xticks(rotation=45)
    plt.tight_layout()
    plt.savefig('confusion_matrix.png')
    print("Confusion matrix saved as confusion_matrix.png")
    
if __name__ == "__main__":
    evaluate_model()
