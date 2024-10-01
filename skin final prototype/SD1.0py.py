import cv2
import numpy as np
from keras.applications.imagenet_utils import preprocess_input
from keras.models import load_model
import matplotlib.pyplot as plt

# Load the model
loaded_model_imagenet = load_model("model_resnet50.h5")

# Input image path
image_path = r"C:\Users\Keshavraj\Downloads\skin.jpg"

# Read the image
img = cv2.imread(image_path)

# Color Space Conversion (Convert BGR to RGB)
img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# Median Filter
img_filtered = cv2.medianBlur(img_rgb, 5)  # Adjust the kernel size as needed

# Resize the image to match model input shape
img_resized = cv2.resize(img_filtered, (224, 224))

# Preprocess the input image
x = np.expand_dims(img_resized, axis=0)
x = preprocess_input(x)

# Make prediction
result = loaded_model_imagenet.predict(x)

# Print the result
print(result * 100)

# Visualize the original image
plt.figure(figsize=(10, 5))
plt.subplot(1, 2, 1)
plt.title("Original Image")
plt.imshow(img_rgb)

# Visualize the processed image
plt.subplot(1, 2, 2)
plt.title("Processed Image")
plt.imshow(img_filtered)

plt.show()

# Get the index of the predicted class
index = np.argmax(result)

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
    'Psoriasis pictures Lichen Planus or related diseases'
    'Scabies Lyme Disease or other Infestations and Bites'
    'Seborrheic Keratoses or other Benign Tumors',
    'Systemic Disease',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Urticaria Hives',
    'Vascular Tumors',
    'Vasculitis',
    'Warts Molluscum and other Viral Infections'
]

# Print the predicted label
predicted_label = ALL_labels[index]
print("Predicted label:", predicted_label)
