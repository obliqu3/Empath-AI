import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";


const LOGIN_IMAGES = ["/img1.png", "/img2.png", "/img3.png"];

const EMOTION_ASSETS = {
  sadness: { src: "/sad.png", color: "#172554" },
  grief: { src: "/sad.png", color: "#172554" },
  disappointment: { src: "/sad.png", color: "#172554" },
  anger: { src: "/angry.png", color: "#450a0a" },
  annoyance: { src: "/angry.png", color: "#450a0a" },
  disgust: { src: "/angry.png", color: "#14532d" },
  fear: { src: "/scared.png", color: "#3b0764" },
  nervousness: { src: "/scared.png", color: "#3b0764" },
  confusion: { src: "/scared.png", color: "#431407" },
  joy: { src: "/joy.png", color: "#422006" },
  excitement: { src: "/joy.png", color: "#422006" },
  optimism: { src: "/joy.png", color: "#422006" },
  love: { src: "/love.png", color: "#831843" },
  surprise: { src: "/shock.png", color: "#581c87" },
  curiosity: { src: "/shock.png", color: "#581c87" },
  neutral: { src: null, color: "#0f172a" }
};

const BACKEND_URL = "http://localhost:8000/chat";


const ScrollingBackground = ({ imageSrc }) => {
  const columns = Array.from({ length: 6 });
  return (
    <div className="absolute inset-0 flex justify-between gap-4 px-4 overflow-hidden pointer-events-none opacity-20 select-none">
      {columns.map((_, colIndex) => {
        const direction = colIndex % 2 === 0 ? -1 : 1;
        const duration = 20 + Math.random() * 15;
        return (
          <div key={colIndex} className="flex-1 h-full relative overflow-hidden min-w-[100px]">
            <motion.div
              className="flex flex-col gap-8"
              animate={{ y: direction === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
              transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
            >
              {Array.from({ length: 12 }).map((_, imgIndex) => (
                <img key={`${colIndex}-${imgIndex}`} src={imageSrc} alt="" className="w-full rounded-2xl object-contain opacity-80" />
              ))}
            </motion.div>
          </div>
        );
      })}
    </div>
  );
};


const BackgroundManager = ({ emotion }) => {
  const asset = EMOTION_ASSETS[emotion] || EMOTION_ASSETS["neutral"];
  return (
    <motion.div
      className="fixed inset-0 z-0 transition-colors duration-1000 ease-in-out"
      style={{ backgroundColor: asset.color }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      {asset.src && (
        <motion.div
          key={asset.src}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <ScrollingBackground imageSrc={asset.src} />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[1px]" />
    </motion.div>
  );
};


const TypingIndicator = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.5, y: 10 }}
      className="flex gap-3 items-end"
    >
      <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center text-lg shadow-lg">
        🤖
      </div>


      <div className="bg-slate-800/80 border border-slate-700 px-4 py-3 rounded-2xl rounded-bl-none shadow-md flex items-center gap-1">
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            className="w-2 h-2 bg-slate-400 rounded-full"
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot * 0.15
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};


const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onComplete, 500); return 100; }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-50 bg-[#020617] flex flex-col items-center justify-center font-mono text-blue-500" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="relative mb-8 w-32 h-32">
        <div className="absolute inset-0 border-t-2 border-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-t-2 border-purple-500 rounded-full animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center font-bold text-white text-xl">{progress}%</div>
      </div>
      <h2 className="text-2xl font-bold tracking-[0.2em] text-white mb-2">EMPATH AI</h2>
      <p className="text-sm text-slate-400">INITIALIZING NEURAL PATHWAYS...</p>
      <div className="w-64 h-1 bg-slate-800 mt-6 rounded-full overflow-hidden"><motion.div className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]" style={{ width: `${progress}%` }} /></div>
    </motion.div>
  );
};


const getCurrentTimestamp = () => new Date().toLocaleString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" });

function useTypewriter(text, speed = 40) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0; setDisplayedText("");
    const interval = setInterval(() => { i++; setDisplayedText(text.slice(0, i)); if (i >= text.length) clearInterval(interval); }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayedText;
}


export default function App() {
  const [view, setView] = useState("login");
  const [name, setName] = useState(() => localStorage.getItem("chat_user") || "");
  const [inputName, setInputName] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState(() => localStorage.getItem("chat_user") ? [{ type: "divider", text: getCurrentTimestamp() }] : []);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState("neutral");
  const [imageIndex, setImageIndex] = useState(0);

  const [isUserTypingName, setIsUserTypingName] = useState(false);
  const typingTimeoutRef = useRef(null);

  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);

  const userId = useRef(localStorage.getItem("chat_user_id"));
  if (!userId.current) {
    userId.current = "user_" + Math.random().toString(36).substr(2, 9);
    localStorage.setItem("chat_user_id", userId.current);
  }

  const title = useTypewriter("Empath AI", 50);
  const subtitle = useTypewriter("An advanced neural interface designed to perceive, process, and respond to human emotion with deep contextual awareness.", 20);

  useEffect(() => { if (localStorage.getItem("chat_user")) setView("chat"); }, []);
  useEffect(() => { const interval = setInterval(() => setImageIndex((i) => (i + 1) % LOGIN_IMAGES.length), 4000); return () => clearInterval(interval); }, []);
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, botTyping]);
  useEffect(() => { const handler = (e) => { if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false); }; window.addEventListener("click", handler); return () => window.removeEventListener("click", handler); }, []);

  const handleNameChange = (e) => {
    setInputName(e.target.value); setError(""); setIsUserTypingName(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => { setIsUserTypingName(false); }, 800);
  };

  const handleLogin = () => {
    if (!inputName.trim()) { setError("Please enter your name"); return; }
    const clean = inputName.trim();
    setName(clean);
    localStorage.setItem("chat_user", clean);
    setMessages([{ type: "divider", text: getCurrentTimestamp() }]);
    setView("loading");
  };

  const handleLogout = () => { localStorage.removeItem("chat_user"); window.location.reload(); };

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { sender: name, text: input, type: "user" };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setBotTyping(true);
    try {
      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId.current, user_name: name, message: userMsg.text }),
      });
      const data = await res.json();
      if (data.emotion) { setCurrentEmotion(data.emotion); }
      setMessages((m) => [...m, { sender: "Bot", text: data.reply, type: "bot" }]);
    } catch { setMessages((m) => [...m, { sender: "Bot", text: "Connection error.", type: "bot" }]); } finally { setBotTyping(false); }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 overflow-hidden relative">
      <AnimatePresence mode="wait">


        {view === "login" && (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-screen flex overflow-hidden z-20 relative bg-slate-900">
            <div className="hidden md:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img key={imageIndex} src={LOGIN_IMAGES[imageIndex]} className="absolute w-full h-full object-contain opacity-50" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 0.5, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 1.2 }} />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/10 to-slate-900" />
            </div>
            <div className="flex w-full md:w-1/2 flex-col items-center justify-center gap-8 px-10">
              <h1 className="text-6xl font-extrabold text-white tracking-tight">{title}</h1>
              <p className="text-slate-300 text-center text-lg max-w-lg font-light leading-relaxed">{subtitle}</p>
              <div className="bg-slate-800/90 backdrop-blur-sm p-10 rounded-3xl w-full max-w-md border-2 border-slate-700 shadow-2xl relative">
                <motion.div layout whileFocus={{ scale: 1.02 }} className="relative">
                  <input className="w-full p-4 text-xl rounded-xl bg-slate-900 border border-slate-600 text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all outline-none" placeholder="Enter your name" value={inputName} onChange={handleNameChange} onKeyDown={(e) => e.key === "Enter" && handleLogin()} />
                </motion.div>
                {error && <p className="text-red-400 text-base mt-3">{error}</p>}
                <AnimatePresence>
                  {inputName.trim() && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5, y: 20 }}
                      animate={{ opacity: 1, y: 0, scale: isUserTypingName ? 1 : 1.05 }}
                      exit={{ opacity: 0, scale: 0.5, y: 20 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      onClick={handleLogin}
                      className="mt-6 w-full bg-blue-600 hover:bg-blue-500 p-4 rounded-xl text-white text-lg font-semibold shadow-lg shadow-blue-500/30"
                    >
                      Initialize Session &rarr;
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}


        {view === "loading" && <LoadingScreen key="loading" onComplete={() => setView("chat")} />}


        {view === "chat" && (
          <motion.div key="chat" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center py-6 relative">
            <BackgroundManager emotion={currentEmotion} />
            <div className="w-full max-w-6xl z-10 flex flex-col h-full relative">
              <div className="flex justify-between items-center px-6 mb-6">
                <h1 className="text-3xl text-white font-bold tracking-tight drop-shadow-md">Empath AI</h1>
                <div className="relative z-50" ref={menuRef}>
                  <button className="w-12 h-12 bg-blue-600 rounded-full text-white text-xl font-bold shadow-lg border border-white/10 hover:scale-105 transition-transform" onClick={(e) => { e.stopPropagation(); setShowMenu((v) => !v); }}>{name[0].toUpperCase()}</button>
                  {showMenu && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="absolute right-0 mt-3 bg-slate-800 border border-slate-700 rounded-xl min-w-[160px] shadow-2xl overflow-hidden">
                      <div className="px-5 py-4 text-slate-200 text-sm border-b border-slate-700/50">Logged in as <b className="text-blue-400">{name}</b></div>
                      <button className="w-full px-5 py-3 text-left text-red-400 hover:bg-slate-700/50 transition-colors" onClick={handleLogout}>Terminate Session</button>
                    </motion.div>
                  )}
                </div>
              </div>


              <div className="bg-slate-900/70 backdrop-blur-md border border-slate-700/50 rounded-3xl flex flex-col h-[80vh] shadow-2xl overflow-hidden mx-4 relative z-10">
                <div className="flex-1 p-8 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  <AnimatePresence initial={false}>
                    {messages.map((m, i) => m.type === "divider" ? (
                      <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center my-6 opacity-60">
                        <span className="text-xs text-slate-400 bg-slate-950/50 px-3 py-1 rounded-full border border-slate-800">{m.text}</span>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 25 }}
                        className={`flex gap-4 items-end ${m.type === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {m.type === "bot" && (
                          <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-600 bg-slate-800 flex items-center justify-center">
                            {EMOTION_ASSETS[currentEmotion]?.src ? (
                              <img src={EMOTION_ASSETS[currentEmotion].src} className="w-full h-full object-cover" alt="Bot" />
                            ) : (
                              <span className="text-sm">🤖</span>
                            )}
                          </div>
                        )}
                        <div className={`px-5 py-3 rounded-2xl max-w-xl text-base shadow-md ${m.type === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700"}`}>{m.text}</div>
                      </motion.div>
                    ))}
                  </AnimatePresence>


                  {botTyping && <TypingIndicator />}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-6 border-t border-slate-700/50 bg-slate-900/80 flex gap-4 items-end">
                  <textarea rows={1} className="flex-1 p-4 rounded-xl bg-slate-950/50 border border-slate-700 text-white resize-none focus:border-blue-500 focus:outline-none transition-colors" placeholder="Type your message..." value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }} />
                  <button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500 px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all">Send</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}