import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

genai.configure(
    api_key=GEMINI_API_KEY
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

def explain_code(code, language):

    try:

        prompt = f"""
Analyze the following {language} code.

Return ONLY valid JSON.

Format:

{{
  "summary": "Short explanation of what the code does.",
  "steps": [
    "Step 1",
    "Step 2",
    "Step 3"
  ],
  "time_complexity": "O(n)",
  "space_complexity": "O(1)",
  "logic_type": "Looping Logic"
}}

Rules:
- summary should be 2-3 lines maximum.
- steps should contain 3-8 concise steps.
- time_complexity should contain ONLY complexity notation.
- space_complexity should contain ONLY complexity notation.
- logic_type should be one of:
  Sequential Logic,
  Conditional Logic,
  Looping Logic,
  Nested Logic,
  Function-Based Logic
- Return JSON only.
- No markdown.
- No headings.
- No explanations outside JSON.

Code:

{code}
"""

        response = model.generate_content(prompt)

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        return json.loads(text)

    except Exception as e:
        return {
            "summary": f"Gemini Error: {str(e)}",
            "steps": [],
            "time_complexity": "-",
            "space_complexity": "-",
            "logic_type": "-"
        }
    


def flowchart_to_code(flowchart, language):

    try:

        prompt = f"""
Convert the following flowchart into valid {language} code.

Flowchart:

{flowchart}

Rules:
- Return only code.
- No markdown.
- No explanations.
- Generate complete executable code.
"""

        response = model.generate_content(
            prompt
        )

        return response.text

    except Exception as e:

        return f"Gemini Error: {str(e)}"
    



def explain_generated_code(code, language):

    prompt = f"""
    Analyze this {language} code and return JSON:

    {{
      "summary": "",
      "explanation": "",
      "best_practices": ""
    }}

    Code:
    {code}

    Rules:
    - summary: maximum 2 lines
    - explanation: maximum 4 bullet points
    - best_practices: maximum 3 bullet points
    - Keep everything concise
    - No markdown
    - Return JSON only
    """

    

    response = model.generate_content(prompt)

    text = response.text
    text = text.replace("```json", "")
    text = text.replace("```", "")

    return json.loads(text)