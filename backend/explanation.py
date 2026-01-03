def generate_summary(facts, citations, score):
    hallucinated = sum(1 for f in facts if f["status"] == "HALLUCINATED")
    fake_citations = sum(1 for c in citations if c["status"] == "FABRICATED")

    return (
        f"The analysis found {hallucinated} hallucinated claims and "
        f"{fake_citations} fake citations. "
        f"The overall trust score is {score} out of 100."
    )
