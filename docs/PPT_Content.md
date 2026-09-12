# PPT Content: Indian Cricketer Face Identification System

## Slide 1: Title Slide
- **Title:** Face Identification System for Indian Cricketers
- **Subtitle:** A Deep Learning approach using FaceNet and Transfer Learning
- **Presented by:** [Your Name]

## Slide 2: Problem Statement
- **Context:** Massive volume of cricket media requires manual tagging of players.
- **Problem:** Manual identification is time-consuming and prone to errors.
- **Solution:** Develop an automated Computer Vision system to accurately detect and recognize faces of Indian cricket players in various conditions.

## Slide 3: Objectives
- Build a robust dataset of 8 prominent Indian cricketers.
- Implement a preprocessing pipeline (Detection, Cropping, Normalization).
- Utilize Transfer Learning (FaceNet) for high-accuracy feature extraction.
- Train a custom classifier to output Name and Confidence Score.

## Slide 4: Target Players
- Virat Kohli
- Rohit Sharma
- Jasprit Bumrah
- Hardik Pandya
- KL Rahul
- Shubman Gill
- Ravindra Jadeja
- Mohammed Shami

## Slide 5: System Architecture
*(Insert System Architecture Diagram from Architecture_and_Workflow.md here)*
- **Key Modules:** 
  1. Data Preprocessing (MTCNN/Haar Cascades)
  2. Feature Extraction (FaceNet)
  3. Classification (Dense NN / SVM)

## Slide 6: Data Preprocessing Pipeline
- **Face Detection:** Locating the bounding box of the face.
- **Cropping & Resizing:** Standardizing to 160x160 pixels.
- **Normalization:** Scaling pixel values for neural network input.
- **Augmentation:** Flips and rotations to prevent overfitting.

## Slide 7: Model Architecture (FaceNet)
- **Concept:** FaceNet maps images directly to a compact Euclidean space where distances correspond to face similarity.
- **Advantage:** Pre-trained on massive datasets (e.g., VGGFace2), providing highly robust embeddings.
- **Our Setup:** Freeze FaceNet layers; train a small Classification Head on top.

## Slide 8: Training and Evaluation
- **Input:** 128-D or 512-D embeddings from FaceNet.
- **Metrics Evaluated:** Accuracy and Confusion Matrix.
- *(Placeholder: Insert Confusion Matrix visual here after training)*
- Shows strong differentiation between players.

## Slide 9: Demo / Workflow
*(Insert Workflow Diagram from Architecture_and_Workflow.md here)*
- Input single image -> Detect Face -> Extract Embedding -> Predict -> Display Name & Score.

## Slide 10: Future Scope
- Integration with Real-time Video Feeds (YOLO-Face).
- Handling extreme occlusions (Helmets, Sunglasses).
- Expanding the dataset to include the entire squad and international players.

## Slide 11: Q&A
- Thank You!
- Open for Questions.
