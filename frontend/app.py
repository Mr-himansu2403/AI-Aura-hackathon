import streamlit as st
import requests

st.set_page_config(page_title="AI Hallucination Verifier", layout="wide")

st.title("🧠 AI Hallucination & Citation Verification System")

text = st.text_area("Paste AI-generated content here", height=250)

if st.button("Verify Content"):
    with st.spinner("Verifying..."):
        response = requests.post(
            "http://localhost:8000/verify",
            json={"text": text}
        ).json()

    st.subheader("📊 Trust Score")
    st.metric("Reliability Score", response["trust_score"])

    st.subheader("📌 Claim Verification")
    for c in response["claims_analysis"]:
        st.write(f"**Claim:** {c['claim']}")
        st.write(f"**Status:** {c['status']}")
        st.write(f"**Evidence:** {c['evidence']}")
        st.markdown("---")

    st.subheader("📚 Citation Verification")
    for c in response["citations_analysis"]:
        st.write(f"{c['citation']} → {c['status']}")

    st.subheader("🧾 Summary")
    st.success(response["summary"])
