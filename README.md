# AI Assistant

An LLM + RAG college assistant.

## Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Frontend
```bash
cd frontend
npm install
npm run dev
```

The LLM, PDF processing, embeddings, RAG, PostgreSQL, authentication, and deployment will be added step by step.
