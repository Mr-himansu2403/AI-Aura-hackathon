from fastapi import FastAPI
from pydantic import BaseModel
from claim_extractor import extract_claims
from citation_detector import detect_citations
from citation_verifier import verify_citations
from fact_verifier import verify_facts
from scoring import calculate_score
from explanation import generate_summary

app = FastAPI(title="AI Hallucination & Citation Verification System")

class InputText(BaseModel):
    text: str

@app.post("/verify")
def verify_text(data: InputText):
    claims = extract_claims(data.text)
    citations = detect_citations(data.text)

    citation_results = verify_citations(citations)
    fact_results = verify_facts(claims)

    score = calculate_score(fact_results, citation_results)
    summary = generate_summary(fact_results, citation_results, score)

    return {
        "claims_analysis": fact_results,
        "citations_analysis": citation_results,
        "trust_score": score,
        "summary": summary
    }
