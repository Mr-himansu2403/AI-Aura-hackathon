def calculate_score(facts, citations):
    score = 100

    for f in facts:
        if f["status"] == "HALLUCINATED":
            score -= 15
        elif f["status"] == "PARTIALLY VERIFIED":
            score -= 5

    for c in citations:
        if c["status"] == "FABRICATED":
            score -= 10

    return max(score, 0)
