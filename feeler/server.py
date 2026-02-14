from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import sqlite3
import json
from datetime import datetime
import models

DB_NAME = "chatbot.db"

def init_db():
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS chat_history
                      (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, sender TEXT, message TEXT, timestamp DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    cursor.execute('''CREATE TABLE IF NOT EXISTS session_summaries
                      (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id TEXT, date_str TEXT, time_str TEXT, emotion_json TEXT, topic_summary TEXT)''')
    conn.commit()
    conn.close()

def save_message(user_id, sender, message):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("INSERT INTO chat_history (user_id, sender, message) VALUES (?, ?, ?)", (user_id, sender, message))
    conn.commit()
    conn.close()

def get_recent_history(user_id, limit=20):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT sender, message FROM chat_history WHERE user_id = ? ORDER BY id DESC LIMIT ?", (user_id, limit))
    rows = cursor.fetchall()[::-1]
    conn.close()
    return rows

def get_daily_summary(user_id):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    cursor.execute("SELECT topic_summary FROM session_summaries WHERE user_id = ? ORDER BY id DESC LIMIT 5", (user_id,))
    rows = cursor.fetchall()
    conn.close()
    
    stories = [row[0] for row in rows if row[0]]
    if stories:
        combined = "; ".join(stories)
        print(f"✅ FOUND MEMORY for {user_id}: {combined}")
        return combined 
    return ""

def save_session_summary(user_id, emotions, summary_text):
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    now = datetime.now()
    cursor.execute("INSERT INTO session_summaries (user_id, date_str, time_str, emotion_json, topic_summary) VALUES (?, ?, ?, ?, ?)",
                   (user_id, now.strftime("%Y-%m-%d"), now.strftime("%H:%M:%S"), json.dumps(emotions), summary_text))
    conn.commit()
    conn.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("🚀 STARTING UP: Loading Database and Brain...")
    init_db()
    models.load_models()
    yield

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    user_id: str
    user_name: str
    message: str

class SessionEndRequest(BaseModel):
    user_id: str
    emotions: dict

@app.post("/chat")
async def chat(request: ChatRequest):
    user_id = request.user_id.lower()
    user_name = request.user_name # We now grab your actual name!
    
    history = get_recent_history(user_id)
    daily_summary = get_daily_summary(user_id)
    label = models.detect_emotion(request.message)
    
    # --- DYNAMIC PERSONA INJECTION ---
    # We build the prompt specifically for the logged-in user to prevent hallucinated names.
    # We also added Rule #4 to explicitly force the bot to use its memory without apologizing.
    dynamic_persona = (
        f"You are a close, empathetic friend. Your name is Empath. The person you are talking to is named {user_name}.\n"
        "Rules for speaking:\n"
        "1. Speak casually and briefly (1 to 3 sentences max).\n"
        "2. lowercase is okay. conversational slang is okay.\n"
        "3. NEVER act like an AI, an assistant, or a robot. Never say 'As an AI'.\n"
        f"4. You have perfect memory of everything {user_name} has told you in this chat. If they ask if you remember something, confidently recall the specific details they told you. Never say you forgot.\n"
        "5. Don't give numbered lists or lecture them.\n"
        f"6. Occasionally use {user_name}'s name naturally in conversation.\n"
        "7. CRITICAL: NEVER end your messages with repetitive questions like 'okay?', 'right?', or 'Let's [do something]'. Do not ask rhetorical questions at the end of every reply. Force yourself to use different sentence structures."
    )
    
    prompt_message = request.message
    trigger_words = ["remember", "who", "what", "when", "did i"]
    
    if daily_summary and any(w in request.message.lower() for w in trigger_words):
         print(f"⚡ INJECTING LONG-TERM MEMORY: {daily_summary}")
         prompt_message = (
             f"User is asking about the past: {request.message}\n"
             f"Here is your memory of previous sessions with {user_name}: {daily_summary}.\n"
             f"Instruction: Confidently answer the user's question using this memory. Do not say 'According to my memory', just state the facts naturally."
         )

    messages = [{"role": "system", "content": dynamic_persona}]
    
    for row in history:
        role = "user" if row[0] == "user" else "assistant"
        messages.append({"role": role, "content": row[1]})
    
    messages.append({"role": "user", "content": prompt_message})
    
    bot_reply = models.generate_text(messages, emotion=label, temperature=0.65)
    
    save_message(user_id, "user", request.message)
    save_message(user_id, "bot", bot_reply)
    
    return {"reply": bot_reply, "emotion": label}

@app.post("/end_session")
async def end_session(request: SessionEndRequest):
    user_id = request.user_id.lower()
    recent_chat = get_recent_history(user_id, limit=15)
    if not recent_chat: return {"status": "no data"}
    
    chat_text = "\n".join([f"{r[0]}: {r[1]}" for r in recent_chat])
    
    summary_messages = [
        {"role": "user", "content": f"Summarize the events of this chat in 1 sentence:\n\n{chat_text}"}
    ]
    summary = models.generate_text(summary_messages, max_tokens=60, temperature=0.1)
    
    save_session_summary(user_id, request.emotions, summary)
    print(f"📝 Summary Saved for {user_id}: {summary}") 
    
    return {"status": "saved"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("server:app", host="0.0.0.0", port=8000, reload=True)
