from flask import Flask, request, render_template, render_template_string
import pandas as pd
import pickle
import numpy as np

# datasets

sym_des=pd.read_csv('dataset/symtoms_df.csv')
precautions=pd.read_csv('dataset/precautions_df.csv')
workout=pd.read_csv('dataset/workout_df.csv')
description=pd.read_csv('dataset/description.csv')
diets=pd.read_csv('dataset/diets.csv')
medications=pd.read_csv('dataset/medications.csv')

# model
svc = pickle.load(open("models/svc.pkl",'rb'))

app = Flask(__name__)
# helping function
def helper(dis):
    desc = description[description['Disease'] == dis]['Description']
    desc = " ".join([w for w in desc])

    pre = precautions[precautions['Disease'] == dis][['Precaution_1', 'Precaution_2', 'Precaution_3', 'Precaution_4']]
    pre = [col for col in pre.values]

    med = medications[medications['Disease'] == dis]['Medication']
    med = [m.strip() for m in med]
    die = diets[diets['Disease'] == dis]['Diet']
    die = [die for die in die.values]

    wrkout = workout[workout['disease'] == dis] ['workout']


    return desc,pre,med,die,wrkout

symptoms_dict = {'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6, 'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12, 'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18, 'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24, 'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30, 'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36, 'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42, 'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47, 'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52, 'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58, 'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63, 'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69, 'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74, 'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79, 'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84, 'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89, 'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93, 'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98, 'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102, 'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107, 'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111, 'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115, 'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119, 'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124, 'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129, 'red_sore_around_nose': 130, 'yellow_crust_ooze': 131}
diseases_list = {15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 14: 'Drug Reaction', 33: 'Peptic ulcer diseae', 1: 'AIDS', 12: 'Diabetes ', 17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension ', 30: 'Migraine', 7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 13: 'Dimorphic hemmorhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthristis', 5: 'Arthritis', 0: '(vertigo) Paroymsal  Positional Vertigo', 2: 'Acne', 38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'}

# Model Prediction function
def get_predicted_value(patient_symptoms):
    input_vector = np.zeros(len(symptoms_dict))
    for item in patient_symptoms:
        input_vector[symptoms_dict[item]] = 1
    return diseases_list[svc.predict([input_vector])[0]]

@app.route('/')
def index():
    context = {
        'title': 'vaidya',
        'message': 'ai for medicine'
    }
    # Render a template with context data and return it as a response
    return render_template_string("""
            <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Disease Predictor</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 50px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .heading {
            text-align: center;
            color: #333;
        }

        .input-field {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        .input-field::placeholder {
            color: #999;
        }

        .submit-btn {
            width: 100%;
            padding: 10px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
        }

        .submit-btn:hover {
            background-color: #0056b3;
        }

        .result-container {
            margin-top: 20px;
            border-top: 1px solid #ccc;
            padding-top: 20px;
            display: none;
        }

        .result-heading {
            color: #007bff;
            text-align: center;
        }

        .result-section {
            margin-bottom: 20px;
        }

        .result-section h3 {
            color: #333;
        }

        .result-section ul {
            list-style-type: none;
            padding: 0;
        }

        .result-section ul li {
            margin-bottom: 5px;
            padding-left: 20px;
            position: relative;
        }

        .result-section ul li:before {
            content: "\2022";
            color: #007bff;
            font-weight: bold;
            position: absolute;
            left: 0;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="heading">Disease Predictor</h1>
        <form action="/predict" method="post" onsubmit="return validateForm()">
            <label for="symptoms">Enter Symptoms (comma-separated):</label><br>
            <input type="text" id="symptoms" name="symptoms" class="input-field" placeholder="e.g., fever, cough, headache"><br>
            <input type="submit" value="Predict" class="submit-btn">
        </form>
        <div class="result-container" id="result-container" style="display: none;">
            <h2 class="result-heading">Prediction Results</h2>
            <div class="result-section">
                <h3>Possible Diseases:</h3>
                <ul id="disease-list"></ul>
            </div>
            <div class="result-section">
                <h3>Recommendations:</h3>
                <ul id="recommendations-list"></ul>
            </div>
        </div>
    </div>

    <script>
        function validateForm() {
            // Add validation logic here if needed
            return true;
        }
    </script>
</body>
</html>

            """, **context)

@app.route('/predict',methods=['POST','GET'])
def predict():
    if request.method=='POST':
        symptoms = request.form.get('symptoms')
        user_symptoms = [s.strip() for s in symptoms.split(',')]
        # Remove any extra characters, if any
        user_symptoms = [symptom.strip("[]' ") for symptom in user_symptoms]
        predicted_disease = get_predicted_value(user_symptoms)

        desc, pre, med, die, wrkout = helper(predicted_disease)

        my_pre=[]
        for i in pre[0]:
            my_pre.append(i)
        context = {
            'title': 'vaidya',
            'message': 'ai for medicine'
        }
        return render_template_string("""
                    <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <style>
                body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }

            .container {
                max-width: 600px;
                margin: 50px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }

            .heading {
                text-align: center;
                color: #333;
            }

            .input-field {
                width: 100%;
                padding: 10px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 3px;
            }

            .submit-btn {
                width: 100%;
                padding: 10px;
                background-color: #007bff;
                color: #fff;
                border: none;
                border-radius: 3px;
                cursor: pointer;
            }

            .submit-btn:hover {
                background-color: #0056b3;
            }

            .result-container {
                margin-top: 20px;
                border-top: 1px solid #ccc;
                padding-top: 20px;
            }

            .result-heading {
                color: #007bff;
            }

            .result-section {
                margin-bottom: 20px;
            }

            .result-section h3 {
                color: #333;
            }

            .result-section ul {
                list-style-type: none;
                padding: 0;
            }

            .result-section ul li {
                margin-bottom: 5px;
            }

            </style>
            <body>
                     <div class="container">
                    <h1 class="heading">Disease Predictor</h1>
                    <form action="/predict" method="post" onsubmit="return validateForm()">
                        <label for="symptoms">Enter Symptoms (comma-separated): </label><br>
                        <input type="text" id="symptoms" name="symptoms" class="input-field"><br><br>
                        <input type="submit" value="Predict" class="submit-btn">
                    </form>

                    {% if predicted_disease %}
                    <div class="result-container">
                        <h2 class="result-heading">Predicted Disease: {{ predicted_disease }}</h2>
                        <div class="result-section">
                            <h3>Description:</h3>
                            <p>{{ dis_des }}</p>
                        </div>

                        <div class="result-section">
                            <h3>Precautions:</h3>
                            <ul>
                                {% for precaution in dis_pre %}
                                <li>{{ precaution }}</li>
                                {% endfor %}
                            </ul>
                        </div>
                        <p><strong>Medications:</strong></p>
                            <ul>
                                 {% for medication in dis_med %}
                                      <li>{{ medication  }}</li>
                                 {% endfor %}
                            </ul>
                             <p><strong>diet:</strong></p>
                            <ul>
                                 {% for medication in dis_med %}
                                      <li>{{ dis_die  }}</li>
                                 {% endfor %}
                            </ul>

                        <div class="result-section">
                            <h3>Workout Recommendation:</h3>
                            <p>{{ dis_wrkout }}<br></p>
                        </div>
                    </div>
                    {% endif %}
                </div>
          
              
            </body>
                <script>
                    function validateForm() {
                        var symptomsInput = document.getElementById("symptoms").value.trim();
                        if (symptomsInput === "") {
                            alert("Please enter symptoms.");
                            return false;
                        }
                        return true;
                    }
                </script>
            </html>

                    """, **context,predicted_disease=predicted_disease,dis_des=desc,dis_pre=my_pre,dis_med=med,dis_wrkout=wrkout,dis_die=die)



if __name__ == "__main__":
    app.run(debug=True, port=5000)
