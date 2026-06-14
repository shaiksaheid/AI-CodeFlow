from fastapi import APIRouter
from pydantic import BaseModel

from app.services.feature_extractor import extract_features
from app.services.classifier_service import classify_logic

router = APIRouter(
    prefix="/code",
    tags=["Code Classification"]
)

class CodeRequest(BaseModel):
    language: str
    code: str

@router.post("/classify")
def classify_code(request: CodeRequest):

    features = extract_features(
        request.code
    )

    print("FEATURES:", features)

    result = classify_logic(
        features
    )

    print("RESULT:", result)

    return {
        **result,
        "features": {
            "conditions": features[0],
            "loops": features[1],
            "functions": features[2],
            "operators": features[3],
            "length": features[4],
            "complexity": features[5]
        }
    }