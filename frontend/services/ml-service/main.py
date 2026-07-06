"""
ML demo service — milestone 1 for the Machine Learning spoke.

Suggested flow:
1. Train a model (start with scikit-learn on a dataset you care about,
   graduate to PyTorch once comfortable).
2. Save the model artifact (joblib / torch.save).
3. Serve predictions through this FastAPI app.
4. Deploy to Hugging Face Spaces or Railway; embed the demo via iframe
   in app/spokes/ml/page.tsx on the Next.js hub.

Run locally:
    pip install fastapi uvicorn scikit-learn joblib
    uvicorn main:app --reload
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="ML Demo Service")


class PredictRequest(BaseModel):
    features: list[float]


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/predict")
def predict(req: PredictRequest):
    # TODO: replace with real model.predict(req.features)
    return {"prediction": None, "note": "Wire up a trained model here."}
