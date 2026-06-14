
from fastapi import APIRouter
from pydantic import BaseModel
from app.services.gemini_service import (
    explain_code,
    explain_generated_code,
    flowchart_to_code
)

from app.database.schemas import FlowchartToCodeRequest

router = APIRouter(
    prefix="/ai",
    tags=["Generative AI"]
)

class ExplainRequest(BaseModel):
    language: str
    code: str

@router.post("/explain-code")
def explain(request: ExplainRequest):

    result = explain_code(
        request.code,
        request.language
    )

    return {
        "explanation": result
    }

# @router.post("/to-code")
# async def flowchart_to_code(
#     data: FlowchartToCodeRequest
# ):

#     prompt = f"""
#     Convert the following flowchart into
#     valid {data.language} code.

#     Flowchart:

#     {data.flowchart}

#     Rules:

#     1. Return only code.
#     2. No markdown.
#     3. No explanation.
#     4. Generate complete executable code.
#     """

#     response = model.generate_content(
#         prompt
#     )

#     return {
#         "code": response.text
#     }


@router.post("/to-code")
def convert_flowchart_to_code(
    data: FlowchartToCodeRequest
):

    code = flowchart_to_code(
        data.flowchart,
        data.language
    )

    ai_data = explain_generated_code(
        code,
        data.language
    )

    return {
        "code": code,
        "summary": ai_data["summary"],
        "explanation": ai_data["explanation"],
        "best_practices": ai_data["best_practices"]
    }