# 🧠 Empath AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Frontend](https://img.shields.io/badge/frontend-React_%7C_Vite-61DAFB)
![Backend](https://img.shields.io/badge/backend-Python_%7C_FastAPI-3776AB)
![Styling](https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC)

Empath AI is an advanced emotionally-intelligent conversational system designed to perceive, interpret, and respond to human emotion with deep contextual awareness.

Unlike traditional chatbots, Empath AI dynamically adapts its interface, tone, and conversational depth in real time based on detected emotional signals. It blends sentiment analysis, persistent memory, and Retrieval-Augmented Generation (RAG) to create interactions that feel personal, supportive, and context-aware.

Whether a user expresses joy, anxiety, frustration, or sadness, the system adjusts its environment, response style, and visual atmosphere to align with the emotional state — creating a more immersive and human-centered AI experience.

---

## 🎥 Video Demo

🎬 **[Click here to watch the Empath AI Video Demo](https://drive.google.com/file/d/1muicJi1w5X7sOAhlEFwzTIkJQI6rKFsp/view?usp=drive_link)**

---

## 📖 Overview

Empath AI is an emotionally intelligent conversational agent that detects user sentiment in real-time and dynamically adapts its interface.

- Happy → Gold environment  
- Anxious → Deep purple  
- Sad → Calming blue  

Uses **RAG (Retrieval-Augmented Generation)** with persistent memory.

---

# 🚀 Installation & Setup

Follow these steps to run Empath AI locally.

---

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Empath-AI.git
cd Empath-AI
```

---

## 2️⃣ Download the Model (Important)

You must manually download the AI model files before starting the backend.

Download the feeler:

[Feeler Model](https://huggingface.co/senko3485/feeler/tree/main)

Move all the files to:

```
Empath-AI/server/feeler/
```

Make sure the path is correct.

---

---

## 3️⃣ Add Your Huggging Face Token (Required)

This project uses Hugging Face models that require authentication.

### 🔹 Step 1: Get Your Token

1. Go to: https://huggingface.co/settings/tokens  
2. Click **New token**  
3. Select **Read access**  
4. Copy the generated token  

---

### 🔹 Step 2: Add Token to Project Files

Open the following files:

```
server/auth.py
server/models.py
```

Add your token:

```python
HF_TOKEN = "your_huggingface_token_here"
```

If the variable already exists, replace the empty string with your token.

---

### 🔹 Step 3: Save Files

Restart the backend after adding the token.

---

## 4️⃣ Install & Run

You need **two terminals**.

---

### 🔹 Frontend (React + Vite)

```bash
npm install
npm run dev
```

Access at:

```
http://localhost:5173
```

---

### 🔹 Backend (Python + FastAPI)

```bash
cd server
pip install -r requirements.txt
python server.py
```

Backend runs at:

```
http://localhost:5173
```

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Framer Motion
- Lucide React

### Backend
- Python (FastAPI)
- SQLite
- Sentiment Model
- LLM + RAG

---

## 👥 Team

Designed & Developed by **Team Componendo Dividendo**
## Omkar Pawar - https://github.com/senko-6
## Tanisha Nevrekar - https://github.com/Nutella006
## Shlok Mirji - https://github.com/obliqu3

---

## 📄 License

MIT License
