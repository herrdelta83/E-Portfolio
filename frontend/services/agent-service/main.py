"""
AI Engineering flagship service — milestone 1 for the AI Engineering spoke.

Suggested build order:
1. Start with a simple RAG pipeline: chunk + embed a small doc set,
   store in a vector store (start local with e.g. chromadb), retrieve
   + answer via the Claude API.
2. Add tool use / function calling (e.g. let the agent query the CP
   stats API from this same portfolio, or search the web).
3. Expose as a chat endpoint; embed a chat widget on the Next.js hub
   so the portfolio literally demonstrates the skill it's describing.

Run locally:
    pip install fastapi uvicorn anthropic chromadb
    uvicorn main:app --reload

Env:
    ANTHROPIC_API_KEY must be set.
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="AI Agent Service")


class ChatRequest(BaseModel):
    message: str


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    # TODO: wire up retrieval + Claude API call + tool use here.
    return {"reply": "Agent not wired up yet.", "received": req.message}
