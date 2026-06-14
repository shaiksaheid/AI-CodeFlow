import joblib
from pathlib import Path

MODEL_PATH = Path(__file__).resolve().parents[3] / "ml" / "logic_classifier.pkl"

model = joblib.load(MODEL_PATH)

def classify_logic(features):

    prediction = model.predict([features])[0]

    probabilities = model.predict_proba([features])[0]

    class_names = model.classes_

    probability_map = {}

    for cls, prob in zip(class_names, probabilities):
        probability_map[cls] = round(prob * 100, 2)

    confidence = round(
        max(probabilities) * 100,
        2
    )

    return {
        "logic_type": prediction,
        "confidence": confidence,
        "probabilities": probability_map
    }