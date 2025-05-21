import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import matplotlib.pyplot as plt

# Load the MNIST dataset, a collection of handwritten digits
mnist = keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# Normalize pixel values to be in the range [0, 1]
x_train, x_test = x_train / 255.0, x_test / 255.0

# Build the neural network model
model = keras.models.Sequential([
    layers.Flatten(input_shape=(28, 28)),
    layers.Dense(128, activation='relu'),
    layers.Dropout(0.2),
    layers.Dense(10, activation='softmax')
])

# Compile the model
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

# Train the model
model.fit(x_train, y_train, epochs=5)

# Evaluate the model on the test data
test_loss, test_acc = model.evaluate(x_test, y_test, verbose=2)
print("\nTest accuracy:", test_acc)

# Save the model
model.save("handwritten_digit_recognition_model.h5")

# Load the saved model
model = tf.keras.models.load_model("handwritten_digit_recognition_model.h5")

# Load an example image (you can replace this with your own image)
image_path = "example_digit.png"

image = tf.keras.preprocessing.image.load_img(image_path, color_mode="grayscale",
                                               target_size=(28, 28))
input_data = tf.keras.preprocessing.image.img_to_array(image)
input_data = input_data / 255.0  # Normalize the pixel values

# Make a prediction on the input data
prediction = model.predict(np.array([input_data]))

# Get the predicted digit (the class with the highest probability)
predicted_digit = np.argmax(prediction)

# Display the image and the predicted digit
plt.imshow(input_data.reshape(28, 28), cmap="binary")
plt.title(f"Predicted digit: {predicted_digit}")
plt.show()