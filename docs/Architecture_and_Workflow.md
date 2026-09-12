# System Architecture and Workflow

## 1. System Architecture Diagram

This diagram illustrates the high-level architecture of the Face Identification System.

```mermaid
graph TD
    A[Raw Image Dataset] --> B(Image Preprocessing Module)
    B --> C{Face Detection MTCNN/Haar}
    C -- Face Found --> D[Face Cropping & Resizing 160x160]
    C -- No Face --> E[Discard Image]
    D --> F(Feature Extraction)
    F --> G[Pre-trained FaceNet Model]
    G --> H[128-D / 512-D Face Embeddings]
    H --> I(Classification Module)
    I --> J[Dense Neural Network / SVM]
    J --> K((Trained Classifier Model))
```

## 2. Workflow Diagram (Inference / Prediction)

This diagram shows the step-by-step workflow when a new image is fed into the system for prediction.

```mermaid
sequenceDiagram
    participant User
    participant Preprocessor
    participant FaceNet
    participant Classifier
    
    User->>Preprocessor: Input Image (e.g., test.jpg)
    Preprocessor->>Preprocessor: Detect Face
    Preprocessor->>Preprocessor: Crop & Resize (160x160)
    Preprocessor->>Preprocessor: Normalize Pixels
    Preprocessor->>FaceNet: Preprocessed Face Array
    FaceNet->>FaceNet: Extract Features
    FaceNet->>Classifier: Output Face Embedding
    Classifier->>Classifier: Predict Class Probabilities
    Classifier->>User: Output Predicted Name & Confidence Score
```
