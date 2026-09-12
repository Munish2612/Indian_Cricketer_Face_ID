# Project Report: Indian Cricketer Face Identification System

## 1. Problem Statement
The sports industry, particularly cricket in India, generates massive amounts of media content. Automatically tagging and identifying players in images and videos is a time-consuming manual task. The problem is to develop an automated computer vision system capable of accurately recognizing the faces of key Indian cricketers in various lighting conditions and poses.

## 2. Objectives
- To build a custom dataset of 8 prominent Indian cricketers.
- To design a robust image preprocessing pipeline for face detection and normalization.
- To leverage Transfer Learning (FaceNet) to extract high-quality facial embeddings.
- To train a classification model that outputs the predicted player's name and a confidence score.
- To evaluate the system using standard metrics (Accuracy, Confusion Matrix).

## 3. Dataset Collection Method
Images for the following players were collected: Virat Kohli, Rohit Sharma, Jasprit Bumrah, Hardik Pandya, KL Rahul, Shubman Gill, Ravindra Jadeja, Mohammed Shami.
The collection method involves a Python script utilizing web scraping techniques (e.g., using Bing Image Search API or DuckDuckGo Search) to download approximately 100-200 images per player. Manual curation is recommended to remove false positives and highly obscured faces.

## 4. Data Preprocessing Pipeline
1. **Face Detection:** Using OpenCV's Haar Cascades or MTCNN to locate bounding boxes around faces.
2. **Face Cropping:** Extracting the facial region from the bounding box with a small margin.
3. **Resizing:** Standardizing the cropped faces to 160x160 pixels, the required input size for FaceNet.
4. **Normalization:** Scaling pixel values to the [0, 1] or [-1, 1] range.
5. **Data Augmentation:** Applying random rotations, horizontal flips, and slight brightness shifts using `keras.preprocessing.image.ImageDataGenerator` to improve model generalization.

## 5. Model Architecture
The system employs a Transfer Learning approach:
- **Base Model:** Pre-trained FaceNet model (Inception ResNet v1 architecture), which maps face images to a 128-D or 512-D Euclidean space (embeddings).
- **Classification Head:** A customized fully connected (Dense) Neural Network trained on top of the embeddings. It typically consists of a Dense layer with ReLU activation, Dropout for regularization, and a final Softmax layer outputting probabilities for the 8 classes.

## 6. Training Procedure
1. Load preprocessed images and labels.
2. Pass images through the FaceNet model to generate embeddings.
3. Split the embeddings into Training (80%) and Validation (20%) sets.
4. Train the Classification Head using Categorical Crossentropy loss and the Adam optimizer.
5. Monitor Validation Accuracy and use Early Stopping to prevent overfitting.
6. Save the trained classifier and a LabelEncoder mapping.

## 7. Testing Procedure
The testing procedure involves running the full pipeline on unseen data:
1. Load a single image.
2. Detect and crop the face.
3. Preprocess and extract embeddings via FaceNet.
4. Pass the embedding to the trained classifier.
5. Output the predicted class (Player Name) and the maximum probability (Confidence Score).

## 8. Accuracy Evaluation
Overall system accuracy is evaluated on a hold-out test set. We aim for a high baseline (e.g., >90%) given the power of FaceNet embeddings. 

## 9. Confusion Matrix
A confusion matrix is plotted to visualize the true positives vs. false positives across all 8 classes. This helps identify if the model struggles to differentiate between specific players with similar facial structures or grooming styles.

## 10. Future Scope
- **Real-time Video Processing:** Extending the system to process live video feeds using optimized detection models like YOLO-Face.
- **Dynamic Dataset Updates:** Creating an active learning loop where low-confidence predictions are manually verified and added to the dataset.
- **Handling Occlusions:** Improving accuracy when faces are partially covered by helmets or sunglasses.
