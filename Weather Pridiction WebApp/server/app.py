from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model & label encoder
model = pickle.load(open("weather_model.pkl", "rb"))
label_encoder = pickle.load(open("label_encoder.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    features = np.array([[
        data["temperature"],
        data["apparent_temp"],
        data["humidity"],
        data["wind_speed"],
        data["pressure"],
        data["visibility"]
    ]])
    prediction = model.predict(features)[0]
    label = label_encoder.inverse_transform([prediction])[0]
    return jsonify({"prediction": label})

if __name__ == "__main__":
    app.run(debug=True)
