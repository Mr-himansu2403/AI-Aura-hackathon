import re

def detect_citations(text):
    pattern = r"\(([^)]+?,\s?\d{4})\)"
    matches = re.findall(pattern, text)

    return [{"citation": m} for m in matches]
