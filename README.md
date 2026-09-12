# Face Identification System for Indian Cricketers

This project implements a complete Face Identification Pipeline using Deep Learning (FaceNet) to recognize 8 prominent Indian cricketers.

## Directory Structure
- `docs/`: Contains SRS, Architecture Diagrams, Project Report, and PPT Content.
- `src/`: Python source code for the pipeline.
- `dataset/`: Contains `raw` (downloaded) and `processed` (cropped faces) images.
- `models/`: Saves the trained Keras model and LabelEncoder.

## Requirements
Please install the dependencies before running the code. Note that Python 3.8+ is recommended.
```bash
pip install -r requirements.txt
```

## How to Run

1. **Data Collection:**
   Run the data collection script to download images using DuckDuckGo search.
   ```bash
   cd src
   python collect_data.py
   ```
   *Note: Review `dataset/raw` manually and remove incorrect images for better accuracy.*

2. **Data Preprocessing:**
   Detects and crops faces using MTCNN, saving them to `dataset/processed`.
   ```bash
   python preprocess.py
   ```

3. **Training the Model:**
   Extracts embeddings using FaceNet and trains a dense neural network classifier.
   ```bash
   python train.py
   ```

4. **Evaluation:**
   Evaluates the model and generates a confusion matrix.
   ```bash
   python evaluate.py
   ```

5. **Inference (Single Image Prediction):**
   Predict the player in a single image.
   ```bash
   python predict.py path/to/your/test_image.jpg
   ```
