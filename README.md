# INFO-AI 

INFO-AI is an AI-powered college assistant built with **React, FastAPI, and Google Gemini**.  
It allows students to ask questions, receive AI-generated answers, and upload files/images for AI assistance.

## 🚀 Live Project

- **Frontend:** Deployed on Vercel
- **Backend:** Deployed on Render
- **AI:** Google Gemini

## ✨ Features

- 🤖 AI-powered question answering
- 💬 ChatGPT-style chat interface
- 📄 File upload
- 🖼️ Image upload
- 📝 Markdown-formatted AI responses
- 🔐 Login and Sign Up
- 🚪 Logout
- 🆕 New Chat
- 🎨 Netflix-inspired red and black UI
- 📱 Responsive design
- ⚡ FastAPI REST API

## 🛠️ Technologies Used

### Frontend
- React
- Vite
- JavaScript
- CSS
- React Markdown

### Backend
- Python
- FastAPI
- Uvicorn
- Python Multipart
- Google GenAI SDK

### AI
- Google Gemini

### Deployment
- Vercel — Frontend
- Render — Backend
- GitHub — Source Code

## 📂 Project Structure

```text
college-ai-assistant/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   └── chat.py
│   │   ├── services/
│   │   │   └── llm.py
│   │   ├── config.py
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatBox.jsx
│   │   │   ├── ChatBox.css
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── .env
│
└── README.md
