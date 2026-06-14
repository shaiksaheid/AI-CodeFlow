from pydantic import BaseModel, EmailStr
from pydantic import BaseModel
from pydantic import BaseModel
from typing import List

class FlowchartNode(BaseModel):
    id: int
    type: str
    label: str

class FlowchartToCodeRequest(BaseModel):
    language: str
    flowchart: str

class RegisterSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class LoginSchema(BaseModel):
    email: EmailStr
    password: str



class SaveFlowchartSchema(BaseModel):
    user_id: int
    title: str
    code: str
    flowchart_json: str