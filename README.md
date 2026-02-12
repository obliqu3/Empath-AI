# 🧠 Empath AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_%7C_Vite-61DAFB)
![Python](https://img.shields.io/badge/backend-Python_%7C_FastAPI-3776AB)
![Tailwind](https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC)

> **"An advanced neural interface designed to perceive, process, and respond to human emotion with deep contextual awareness."**

---

## 🎥 Video Demo

🎬 **[Click here to watch the Empath AI Video Demo](https://drive.google.com/file/d/1uWhTM_LodBTlmYSLoO0W843VLHUOMf2N/view?usp=drive_link)**

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

You must manually download the AI model file before starting the backend.

Download:

```
model.safetensors
```

Move it to:

```
Empath-AI/server/feeler/model.safetensors
```

Make sure the path is correct.

---

## 3️⃣ Install & Run

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
python main.py
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

---

## 📄 License

MIT License
