import spacy

nlp = spacy.load("en_core_web_sm")

def extract_claims(text):
    doc = nlp(text)
    claims = []

    for sent in doc.sents:
        if any(ent.label_ in ["DATE", "ORG", "PERSON", "GPE"] for ent in sent.ents):
            claims.append({
                "claim": sent.text,
                "entities": [ent.text for ent in sent.ents]
            })

    return claims
