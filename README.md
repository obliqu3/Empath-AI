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

**Empath AI** goes beyond standard chatbots. It is an emotionally intelligent conversational agent that detects the user's sentiment in real-time and dynamically adapts its interface to match.

If you are happy, the environment glows gold.  
If you are anxious, it shifts to deep purple.  
If you are sad, it becomes a calming blue.  

The system uses a **Retrieval-Augmented Generation (RAG)** approach with persistent memory to ensure it remembers who you are and what you've been through, acting as a supportive and empathetic companion.

---

## ✨ Key Features

### 🎭 Dynamic Emotion Engine

- **Real-time Sentiment Mapping:**  
  Classifies user emotions into 6 categories:
  `Joy`, `Sadness`, `Anger`, `Fear`, `Surprise`, and `Neutral`.

- **Reactive Environment:**  
  Backgrounds, color palette, and avatar animations shift instantly to reflect the emotional state.

---

### 🎨 Immersive UI/UX

- **Parallax Scrolling Backgrounds** for depth and emotional immersion.
- **Micro-Interactions**
  - Breathing input fields
  - Spring-based message animations
  - Smart "Pop-out" initialization button
- **Wavy Robot Typing Indicator** to reduce perceived latency.

---

### 💾 Intelligent Memory

- **Sticky Sessions:**  
  Uses local storage + backend persistence.

- **Context Retention:**  
  Remembers previous interactions for coherent long-term conversation.

---

## 🚀 Installation & Setup

Follow these steps to run Empath AI locally.

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/Empath-AI.git
cd Empath-AI

2️⃣ Download the Model (Important)

You must manually download the AI model file before starting the backend.

Download model.safetensors

Move it to:

Empath-AI/server/feeler/model.safetensors


Make sure the path is correct.

3️⃣ Install & Run

You need two terminals.

🔹 Frontend (React + Vite)
npm install
npm run dev


Access at:

http://localhost:5173

🔹 Backend (Python + FastAPI)
cd server
pip install -r requirements.txt
python main.py


Backend runs at:

http://localhost:8000

🛠️ Tech Stack
🎨 Frontend

React (Vite)

Tailwind CSS

Framer Motion

Lucide React

🧠 Backend

Python (FastAPI)

SQLite (Session History)

Sentiment Analysis Model

LLM Integration (RAG Architecture)

📁 Project Structure
Empath-AI/
│
├── client/          # React frontend
├── server/          # FastAPI backend
│   ├── feeler/      # Sentiment model folder
│   ├── main.py
│   └── requirements.txt
│
└── README.md

👥 Team

Designed & Developed by Team Componendo Dividendo

📄 License

This project is licensed under the MIT License.

⭐ If you found this project interesting, consider giving it a star!
