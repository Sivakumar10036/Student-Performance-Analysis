from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle

app = Flask(__name__)
CORS(app)

with open("model.pkl", "rb") as file:
    model = pickle.load(file)

with open("scaler.pkl", "rb") as file:
    scaler = pickle.load(file)


@app.route("/")
def home():
    return jsonify({
        "message": "Student Performance Analysis API Running Successfully"
    })


@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    values = np.array([
        float(data["attendance"]),
        float(data["internal1"]),
        float(data["internal2"]),
        float(data["assignment"]),
        float(data["studyhours"])
    ]).reshape(1, -1)

    values = scaler.transform(values)

    prediction = model.predict(values)[0]

    result = "PASS" if prediction == 1 else "FAIL"

    return jsonify({
        "prediction": result
    })


if __name__ == "__main__":
    app.run(debug=True)