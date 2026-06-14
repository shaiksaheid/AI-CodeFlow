from fastapi import APIRouter
from pydantic import BaseModel

from app.services.classifier_service import classify_logic

router = APIRouter(
    prefix="/ml",
    tags=["Machine Learning"]
)

class LogicRequest(BaseModel):
    conditions: int
    loops: int
    functions: int
    operators: int
    length: int
    complexity: int

@router.post("/classify")
def classify(request: LogicRequest):

    features = [
        request.conditions,
        request.loops,
        request.functions,
        request.operators,
        request.length,
        request.complexity
    ]

    return classify_logic(features)