import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import StoriesPage from "./pages/StoriesPage";
import TimelinePage from "./pages/TimelinePage";
import MapPage from "./pages/MapPage";
import ArchivePage from "./pages/ArchivePage";
import ReferencePage from "./pages/ReferencePage";
import MissionPage from "./pages/MissionPage";
import "./styles/editorial.css";

function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    setMessages([{
      role: "assistant",
      content: "Hey, I'm Archive Bot. Ask me about Coppell or how this archive works."
    }]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (!open) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const send = async () => {
    const trimmed = userInput.trim();
    if (!trimmed || loading) return;

    setMessages(prev => [...prev, { role: "user", content: trimmed }]);
    setUserInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userPrompt: trimmed })
      });

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("API not available");
        }
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP ${res.status}`);
      }
      
      const data = await res.json();
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: data.reply || "No response received"
      }]);
    } catch (err) {
      console.error("Chat error:", err);
      
      const errorMessage = err.message.includes("API not available") || err.message.includes("Failed to fetch")
        ? "⚠️ Chatbot requires backend deployment. Works on Vercel. For GitHub Pages, the API needs to be deployed separately."
        : `⚠️ Connection error: ${err.message}`;
      
      setMessages(prev => [...prev, {
        role: "assistant",
        content: errorMessage
      }]);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        className="chat-toggle"
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close archive chat" : "Open archive chat"}
        aria-expanded={open}
        aria-controls="archive-chat"
      >
        <MessageCircle size={25} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div 
            id="archive-chat"
            className="chatbot-container"
            role="dialog"
            aria-label="Archive Bot"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="chatbot-header">
              <span>Archive Bot</span>
              <button 
                className="close-btn"
                onClick={() => setOpen(false)}
                aria-label="Close archive chat"
              >
                ✕
              </button>
            </div>
            <div className="chatbot-messages" aria-live="polite">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`message ${m.role === "user" ? "user" : "bot"}`}
                >
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="message bot">
                  <div className="loading">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chatbot-input">
              <input 
                value={userInput} 
                onChange={e => setUserInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && send()} 
                placeholder="Ask about Coppell..."
                aria-label="Message Archive Bot"
                autoFocus
              />
              <button onClick={send} disabled={loading || !userInput.trim()}>Send</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    document.documentElement.dataset.theme = "light";
    localStorage.setItem("theme", "light");
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    }, { threshold: 0.1 });

    const timeoutId = setTimeout(() => {
      document.querySelectorAll(".reveal, .fade-in, .fade-in-up").forEach(el => {
        observer.observe(el);
      });
    }, 150);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "stories": return <StoriesPage />;
      case "timeline": return <TimelinePage />;
      case "map": return <MapPage />;
      case "archive": return <ArchivePage />;
      case "reference": return <ReferencePage />;
      case "mission": return <MissionPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <Navigation 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
      />
      <main className="page-content">{renderPage()}</main>
      <Chatbot />
    </div>
  );
}
