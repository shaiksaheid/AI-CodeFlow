import re

def extract_features(code):

    conditions = len(
        re.findall(
            r"\b(if|else if|switch)\b",
            code
        )
    )

    loops = len(
        re.findall(
            r"\b(for|while|do)\b",
            code
        )
    )

    functions = len(
        re.findall(
            r"\w+\s*\(",
            code
        )
    ) - conditions - loops

    operators = len(
        re.findall(
            r"(\+|\-|\*|\/|==|!=|<=|>=|<|>)",
            code
        )
    )

    length = len(code)

    complexity = (
        conditions +
        loops +
        functions
    )

    return [
        conditions,
        loops,
        max(functions, 0),
        operators,
        length,
        complexity
    ]