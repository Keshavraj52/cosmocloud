# app.py
from flask import Flask, render_template, render_template_string, request
import cv2
import numpy as np
from keras.applications.imagenet_utils import preprocess_input
from keras.models import load_model

app = Flask(__name__)

# Load the model
loaded_model_imagenet = load_model("model_resnet50.h5")

# List of all labels
ALL_labels = [
    'Acne and Rosacea',
    'Actinic Keratosis Basal Cell Carcinoma or other Malignant Lesions',
    'Atopic Dermatitis',
    'Bullous Disease',
    'Cellulitis Impetigo or other Bacterial Infections',
    'Eczema',
    'Exanthems aor Drug Eruptions',
    'Hair Loss Alopecia',
    'Herpes HPV or another STD',
    'Light Disease and Disorders of Pigmentation',
    'Lupus or other Connective Tissue diseases',
    'Melanoma Skin Cancer Nevi and Moles',
    'Nail Fungus and other Nail Disease',
    'Poison Ivy Photos and other Contact Dermatitis',
    'Psoriasis pictures Lichen Planus or related diseases',
    'Scabies Lyme Disease or other Infestations and Bites',
    'Seborrheic Keratoses or other Benign Tumors',
    'Systemic Disease',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Urticaria Hives',
    'Vascular Tumors',
    'Vasculitis',
    'Warts Molluscum and other Viral Infections'
]

@app.route('/')
def index():
    context = {
        'title': 'Flask Example',
        'message': 'This is a simple example demonstrating Flask integration with HTML and CSS.'
    }
    # Render a template with context data and return it as a response
    return render_template_string("""
    <!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skin Disease Prediction</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
 <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        h1 {
            text-align: center;
            color: #333;
        }

        form {
            margin-top: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        input[type="file"] {
            padding: 10px;
            margin-bottom: 20px;
            border: 2px solid #ccc;
            border-radius: 5px;
            width: 80%;
            max-width: 300px;
            box-sizing: border-box;
        }

        button {
            padding: 10px 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }

        button:hover {
            background-color: #45a049;
        }

        @media only screen and (max-width: 768px) {
            .container {
                max-width: 90%;
            }

            input[type="file"] {
                width: 100%;
                max-width: 100%;
            }
        }
    </style>
<body>
    <div class="container">
        <h1>Skin Disease Prediction</h1>
        <form action="/predict" method="post" enctype="multipart/form-data">
            <input type="file" name="file" id="file" accept="image/*" required>
            <button type="submit">Predict</button>
        </form>
    </div>
</body>
</html>


    """, **context)


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        # Get the uploaded image file
        file = request.files['file']
        image_path = "uploaded_image.jpg"
        file.save(image_path)

        # Read the image
        img = cv2.imread(image_path)
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img_filtered = cv2.medianBlur(img_rgb, 5)
        img_resized = cv2.resize(img_filtered, (224, 224))
        x = np.expand_dims(img_resized, axis=0)
        x = preprocess_input(x)

        # Make prediction
        result = loaded_model_imagenet.predict(x)
        index = np.argmax(result)
        predicted_label = ALL_labels[index]

        context = {
        'title': 'Flask Example',
        'message': 'This is a simple example demonstrating Flask integration with HTML and CSS.'
    }
    # Render a template with context data and return it as a response
    return render_template_string("""
   <!-- result.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prediction Result</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='style.css') }}">
</head>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f2f2f2;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        h2 {
            text-align: center;
            color: #333;
        }

        p {
            text-align: center;
            font-size: 18px;
            color: #666;
        }

        @media only screen and (max-width: 768px) {
            .container {
                max-width: 90%;
            }
        }
    </style>
<body>
    <div class="container">
        <h2>Prediction Result</h2>
        <p>The predicted label is: {{ predicted_label }}</p>
    </div>
</body>
</html>



    """, **context, predicted_label=predicted_label)

if __name__ == '__main__':
    app.run(debug=True)
