from flask import Flask, request, jsonify
import cv2
import numpy as np
from keras.applications.imagenet_utils import preprocess_input
from keras.models import load_model

app = Flask(__name__)

loaded_model_imagenet = load_model("model_resnet50.h5")

ALL_labels = ['Acne and Rosacea',
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
              'Psoriasis pictures Lichen Planus or related diseases'
              'Scabies Lyme Disease or other Infestations and Bites'
              'Seborrheic Keratoses or other Benign Tumors',
              'Systemic Disease',
              'Tinea Ringworm Candidiasis and other Fungal Infections',
              'Urticaria Hives',
              'Vascular Tumors',
              'Vasculitis',
              'Warts Molluscum and other Viral Infections']


@app.route('/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found'})

    image_file = request.files['image']
    image_path = "temp_image.jpg"  # Saving the image temporarily
    image_file.save(image_path)

    img = cv2.imread(image_path)
    img = cv2.resize(img, (100, 100))

    x = np.expand_dims(img, axis=0)
    x = preprocess_input(x)
    result = loaded_model_imagenet.predict(x)

    pp = list((result * 100)[0].astype('int'))
    index = pp.index(max(pp))
    predicted_label = ALL_labels[index]

    return jsonify({'predicted_label': predicted_label})


if __name__ == '__main__':
    app.run(debug=True)
