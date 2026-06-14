import re

def extract_features(code):

    # Conditions
    conditions = len(
        re.findall(
            r"\b(if|else\s+if|switch)\b",
            code,
            re.IGNORECASE
        )
    )

    # Loops
    loops = len(
        re.findall(
            r"\b(for|while|do)\b",
            code,
            re.IGNORECASE
        )
    )

    # Function Definitions Only
    function_matches = re.findall(
        r"\b(?:int|float|double|char|void|long|short|bool|string)\s+([a-zA-Z_]\w*)\s*\([^)]*\)\s*\{",
        code
    )

    # Ignore main()
    functions = len(
        [
            fn for fn in function_matches
            if fn.lower() != "main"
        ]
    )

    # Operators
    operators = len(
        re.findall(
            r"(\+|\-|\*|\/|==|!=|<=|>=|<|>|&&|\|\|)",
            code
        )
    )

    # Code Length
    length = len(code)

    # Complexity Score
    complexity = (
        conditions +
        loops +
        functions
    )

    return [
        conditions,
        loops,
        functions,
        operators,
        length,
        complexity
    ]