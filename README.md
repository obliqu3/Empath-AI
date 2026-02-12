# 🧠 Empath AI

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/frontend-React_%7C_Vite-61DAFB)
![Python](https://img.shields.io/badge/backend-Python_%7C_FastAPI-3776AB)
![Tailwind](https://img.shields.io/badge/styling-Tailwind_CSS-38B2AC)

> **"An advanced neural interface designed to perceive, process, and respond to human emotion with deep contextual awareness."**

---

## 🎥 Video Demo

Watch Empath AI in action:  
[**Click here to view the Video Demo**](https://drive.google.com/file/d/1uWhTM_LodBTlmYSLoO0W843VLHUOMf2N/view?usp=drive_link)

---

## 📖 Overview

**Empath AI** goes beyond standard chatbots. It is an emotionally intelligent conversational agent that detects the user's sentiment in real-time and adapts its entire interface to match.

If you are happy, the environment glows gold. If you are anxious, it shifts to deep purple. If you are sad, it becomes a calming blue. The system uses a **Retrieval-Augmented Generation (RAG)** approach with persistent memory to ensure it remembers who you are and what you've been through, acting as a supportive, empathetic companion.

---

## ✨ Key Features

### 🎭 Dynamic Emotion Engine
* **Real-time Sentiment Mapping:** The backend analyzes every message to classify emotions into 6 categories: *Joy, Sadness, Anger, Fear, Surprise, and Neutral*.
* **Reactive Environment:** The UI background, color palette, and avatar animations shift instantly to reflect the current emotional state of the conversation.

### 🎨 Immersive UI/UX
* **Parallax Scrolling Backgrounds:** Optimized 2D parallax assets provide depth and movement corresponding to the active emotion.
* **Micro-Interactions:** Features "breathing" input fields, physics-based message bubbles (Spring animations), and a smart "Pop-out" initialization button.
* **Visual Feedback:** Custom "Wavy Robot" typing indicators reduce perceived latency.

### 💾 Intelligent Memory
* **Sticky Sessions:** Utilizes local storage and backend database persistence to remember users across page reloads.
* **Context Retention:** The AI remembers details from previous turns in the conversation to provide coherent, long-term support.

---

## 🚀 Installation & Setup

Follow these steps to get Empath AI running on your local machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/Empath-AI.git](https://github.com/your-username/Empath-AI.git)
cd Empath-AI

2. Download the Model (Critical Step)
You must manually download the AI model file before running the backend.

Download model.safetensors from this link:

https://drive.google.com/file/d/1Y4jeY3LKOts4zcyb8G5UtMZRZtNqG9EN/view

Move the downloaded file into the feeler/ folder in your project directory.

Path should look like: Empath-AI/server/feeler/model.safetensors

3. Install Dependencies & Run
Open a terminal in the project root and run the following commands to start both the Frontend and Backend:

Frontend (React/Vite):

Bash
# In a new terminal
npm install
npm run dev
Access the UI at: http://localhost:5173

Backend (Python/FastAPI):

Bash
# In a separate terminal
cd server
pip install -r requirements.txt
python main.py
The server will start at: http://localhost:8000

🛠️ Tech Stack
Frontend
Framework: React (Vite)

Styling: Tailwind CSS

Animations: Framer Motion

Icons: Lucide React

Backend
Server: Python (FastAPI/Flask)

Database: SQLite (for session history)

AI Models: Sentiment Analysis NLP & LLM Integration

👥 Team
Designed & Developed by Team Componendo Dividendo

📄 License
This project is licensed under the MIT License.
