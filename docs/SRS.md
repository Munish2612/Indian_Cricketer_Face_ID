# Software Requirements Specification (SRS)
## Face Identification System for Indian Cricketers

### 1. Introduction
#### 1.1 Purpose
The purpose of this document is to specify the software requirements for a Face Identification System capable of identifying members of the Indian Cricket Team from images.

#### 1.2 Scope
The system will detect faces in input images and classify them into one of the known players (e.g., Virat Kohli, Rohit Sharma, Jasprit Bumrah). It will provide a predicted name and a confidence score. The system is designed as a deep learning pipeline utilizing OpenCV for preprocessing and FaceNet for feature extraction.

### 2. Overall Description
#### 2.1 Product Perspective
This is a standalone Python application that runs locally or on a cloud server. It uses pre-trained deep learning models (FaceNet/VGGFace) to extract robust facial embeddings and a classification layer to identify the players.

#### 2.2 User Classes and Characteristics
- **Data Scientist/Researcher:** Users who will collect data, train the model, and evaluate performance.
- **End User:** Users providing an image to the system to get an identification result.

### 3. System Features
#### 3.1 Data Collection & Preprocessing
- Automated or semi-automated collection of player images.
- Face detection using Haar Cascades or MTCNN.
- Image cropping, resizing (160x160), and normalization.
- Data augmentation (rotation, flipping, brightness adjustments).

#### 3.2 Model Training
- Extraction of facial embeddings using FaceNet.
- Training a Dense neural network or SVM classifier on the embeddings.

#### 3.3 Prediction & Evaluation
- Single-image inference returning Name and Confidence Score.
- Evaluation metrics generation including Accuracy and Confusion Matrix.

### 4. Non-Functional Requirements
#### 4.1 Performance Requirements
- Face detection and inference should complete within 2 seconds on a standard modern CPU.
- The system should aim for an accuracy of >= 90% on clear, frontal face images.

#### 4.2 Software Quality Attributes
- **Maintainability:** Modular code structure (collect, preprocess, train, predict).
- **Portability:** Containerizable via Docker or manageable via Python virtual environments.
