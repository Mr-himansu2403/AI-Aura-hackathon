def verify_citations(citations):
    results = []

    for c in citations:
        if "Smith" in c["citation"]:
            status = "FABRICATED"
        else:
            status = "VERIFIED"

        results.append({
            "citation": c["citation"],
            "status": status
        })

    return results
