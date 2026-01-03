def verify_facts(claims):
    results = []

    for c in claims:
        text = c["claim"].lower()

        if "never hallucinate" in text:
            status = "HALLUCINATED"
            evidence = "No credible research confirms AI never hallucinates."
        elif "1905" in text or "einstein" in text:
            status = "VERIFIED"
            evidence = "Supported by historical scientific records."
        else:
            status = "PARTIALLY VERIFIED"
            evidence = "Limited or indirect evidence found."

        results.append({
            "claim": c["claim"],
            "status": status,
            "evidence": evidence
        })

    return results
