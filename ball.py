from flask import Flask, request, jsonify
import cv2
import numpy as np

app = Flask(__name__)

# Function to detect the ball
def detect_ball(image):
    # Convert the image to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # Apply Gaussian blur to reduce noise
    blurred = cv2.GaussianBlur(gray, (11, 11), 0)

    # Threshold the image to detect the ball
    _, thresh = cv2.threshold(blurred, 100, 255, cv2.THRESH_BINARY)

    # Find contours in the thresholded image
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    # If contours are found
    if contours:
        # Find the contour with maximum area (the ball)
        max_contour = max(contours, key=cv2.contourArea)

        # Get the center and radius of the circle enclosing the contour
        ((x, y), radius) = cv2.minEnclosingCircle(max_contour)

        # Draw the circle and centroid on the image
        cv2.circle(image, (int(x), int(y)), int(radius), (0, 255, 255), 2)
        cv2.circle(image, (int(x), int(y)), 5, (0, 255, 255), -1)

        # Calculate the distance from the center of the screen
        height, width = image.shape[:2]
        center_x, center_y = width // 2, height // 2
        distance = np.sqrt((x - center_x) ** 2 + (y - center_y) ** 2)

        return image, distance
    else:
        return image, None

@app.route('/detect_ball', methods=['POST'])
def detect_ball_api():
    if 'image' not in request.files:
        return jsonify({'error': 'No image found'})

    image_file = request.files['image']
    nparr = np.fromstring(image_file.read(), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    result_frame, distance = detect_ball(image)

    if distance is not None:
        return jsonify({'result_image': result_frame.tolist(), 'distance': distance})
    else:
        return jsonify({'result_image': result_frame.tolist(), 'distance': 'Ball not detected'})

if __name__ == '__main__':
    app.run(debug=True)
