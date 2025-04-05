import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import logging

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Get the absolute path to the model file (outside the nyaari folder)
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), 'vgg16_pcos_detection_final.h5')
logger.info(f"Loading model from: {MODEL_PATH}")

try:
    # Load the model
    model = tf.keras.models.load_model(MODEL_PATH)
    logger.info("Model loaded successfully")
except Exception as e:
    logger.error(f"Error loading model: {str(e)}")
    raise

# Configure upload folder
UPLOAD_FOLDER = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'uploads')
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
    logger.info(f"Created upload directory at: {UPLOAD_FOLDER}")

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
logger.info(f"Upload folder configured: {UPLOAD_FOLDER}")

def preprocess_image(img_path):
    try:
        logger.info(f"Preprocessing image: {img_path}")
        img = image.load_img(img_path, target_size=(224, 224))
        img_array = image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        return img_array
    except Exception as e:
        logger.error(f"Error preprocessing image: {str(e)}")
        raise

@app.route('/predict', methods=['POST'])
def predict():
    logger.info("Received prediction request")
    if 'file' not in request.files:
        logger.error("No file uploaded")
        return jsonify({'error': 'No file uploaded'}), 400
    
    file = request.files['file']
    if file.filename == '':
        logger.error("No file selected")
        return jsonify({'error': 'No file selected'}), 400
    
    logger.info(f"Received file: {file.filename}")
    if file:
        try:
            filename = secure_filename(file.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            logger.info(f"Saving file to: {filepath}")
            file.save(filepath)
            
            # Preprocess the image
            processed_image = preprocess_image(filepath)
            
            # Make prediction
            logger.info("Making prediction...")
            prediction = model.predict(processed_image)
            probability = float(prediction[0][0])
            
            # Determine result
            result = 'PCOS' if probability > 0.5 else 'No PCOS'
            
            # Clean up
            logger.info(f"Removing temporary file: {filepath}")
            os.remove(filepath)
            
            logger.info(f"Prediction successful: {result}")
            return jsonify({
                'result': result
            })
            
        except Exception as e:
            logger.error(f"Error during prediction: {str(e)}")
            if os.path.exists(filepath):
                os.remove(filepath)
            return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    logger.info("Starting Flask server...")
    app.run(debug=True, port=5000) 