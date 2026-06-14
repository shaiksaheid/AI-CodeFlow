
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from requests import Session
from app.database.models import Flowchart
from app.services.flowchart_service import generate_flowchart
from app.database.db import SessionLocal
from app.database.schemas import SaveFlowchartSchema
from app.database.schemas import FlowchartToCodeRequest


router = APIRouter(
    prefix="/flowchart",
    tags=["Flowchart"]
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class FlowchartRequest(BaseModel):
    language: str
    code: str

@router.post("/generate")
def generate(request: FlowchartRequest):

    result = generate_flowchart(
        request.code,
        request.language
    )

    return result



@router.post("/save")
def save_flowchart(
    data: SaveFlowchartSchema
):

    db: Session = SessionLocal()

    flowchart = Flowchart(
        user_id=data.user_id,
        title=data.title,
        code=data.code,
        flowchart_json=data.flowchart_json
    )

    db.add(flowchart)

    db.commit()

    db.refresh(flowchart)

    return {
        "message":
        "Flowchart saved successfully",
        "id":
        flowchart.id
    }


@router.get("/user/{user_id}")
def get_user_flowcharts(
    user_id: int
):

    db: Session = SessionLocal()

    flowcharts = (
        db.query(Flowchart)
        .filter(
            Flowchart.user_id ==
            user_id
        )
        .all()
    )

    return flowcharts


@router.delete("/{flowchart_id}")
def delete_flowchart(
    flowchart_id: int
):

    db: Session = SessionLocal()

    flowchart = (
        db.query(Flowchart)
        .filter(
            Flowchart.id ==
            flowchart_id
        )
        .first()
    )

    if not flowchart:
        return {
            "message":
            "Flowchart not found"
        }

    db.delete(flowchart)

    db.commit()

    return {
        "message":
        "Flowchart deleted"
    }


@router.delete("/{flowchart_id}")
def delete_flowchart(
    flowchart_id: int,
    db: Session = Depends(get_db)
):

    flowchart = (
        db.query(Flowchart)
        .filter(
            Flowchart.id ==
            flowchart_id
        )
        .first()
    )

    if not flowchart:
        raise HTTPException(
            status_code=404,
            detail="Flowchart not found"
        )

    db.delete(flowchart)
    db.commit()

    return {
        "message":
        "Flowchart deleted successfully"
    }