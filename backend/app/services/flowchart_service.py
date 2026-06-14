import json
import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)

model = genai.GenerativeModel(
    "gemini-2.5-flash"
)


def generate_flowchart(code, language):

    prompt = f"""
You are an expert software engineer.

Convert the following {language} code into a professional flowchart.

Return ONLY valid JSON.

JSON Format:

{{
  "nodes": [
    {{
      "id": "1",
      "type": "start",
      "data": {{
        "label": "Start"
      }},
      "position": {{
        "x": 0,
        "y": 0
      }}
    }}
  ],
  "edges": [
    {{
      "id": "e1-2",
      "source": "1",
      "target": "2"
    }}
  ]
}}

IMPORTANT RULES:

1. Do NOT calculate coordinates.
2. Every node position MUST be:

{{
  "x": 0,
  "y": 0
}}

3. Start node:
   - type = "start"
   - label = "Start"

4. End node:
   - type = "start"
   - label = "End"

5. Process nodes:
   - type = "process"
   - Used for:
     variable declarations
     assignments
     calculations
     increment/decrement
     function calls
     return statements

6. Decision nodes:
   - type = "decision"
   - Used for:
     if
     else if
     switch
     loop conditions
     ternary conditions

7. Input / Output nodes:
   - type = "io"
   - Used for:
     scanf
     printf
     cin
     cout
     input
     print

8. Create complete flowchart logic.

9. Decision nodes MUST have Yes/No branches.

Example:

{{
  "id": "e3-4",
  "source": "3",
  "target": "4",
  "label": "Yes"
}}

{{
  "id": "e3-5",
  "source": "3",
  "target": "5",
  "label": "No"
}}



10. Keep labels short.

GOOD LABELS:
- Start
- Read n
- i = 0
- i < 5?
- Print i
- Return 0
- End

BAD LABELS:
- Long sentences
- Paragraphs

11. Connect ALL nodes.

12. Return JSON only.

13. For decision nodes:
    - Add edge label "Yes" for true branch
    - Add edge label "No" for false branch

14. For loops:
    - Connect loop body back to decision node
    - Use edge label "Repeat"

15. Arrange nodes vertically:
    Start
    ↓
    Process
    ↓
    Decision
   ↙      ↘
 Yes      No
 ↓         ↓
 Body    Exit
 ↓
 Back to Decision

16. For loops:
    Arrange nodes exactly as:

           Condition
          /        \
       Yes          No
        |
      Body
        |
     Update
        |
     back to Condition

17. Do NOT place nested loop nodes on the far left.
    Keep loop body centered under the condition.

18. Decision nodes must have:
    - Yes branch on left
    - No branch on right

19. Loop update statements (i++, j++, etc.)
    must appear directly below the loop body.

Code:

{code}
"""

    try:

        print("Sending request to Gemini...")

        response = model.generate_content(prompt)

        print("Gemini response received")

        text = response.text.strip()

        text = text.replace("```json", "")
        text = text.replace("```", "")
        text = text.strip()

        flowchart = json.loads(text)

        return flowchart

    except Exception as e:

        print("FLOWCHART ERROR:", str(e))

        return {
            "nodes": [
                {
                    "id": "1",
                    "type": "start",
                    "data": {
                        "label": "Error"
                    },
                    "position": {
                        "x": 0,
                        "y": 0
                    }
                },
                {
                    "id": "2",
                    "type": "process",
                    "data": {
                        "label": str(e)
                    },
                    "position": {
                        "x": 0,
                        "y": 0
                    }
                }
            ],
            "edges": [
                {
                    "id": "e1-2",
                    "source": "1",
                    "target": "2"
                }
            ]
        }