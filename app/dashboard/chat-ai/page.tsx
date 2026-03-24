import { useState, useRef, useEffect, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// BACKEND CONFIG  — change BASE_URL to your FastAPI server
// Expected endpoint: POST /api/chat
// Body:   { messages: [{ role: "user"|"assistant", content: string }] }
// Return: { reply: string }
// ═══════════════════════════════════════════════════════════════
const BASE_URL = "http://localhost:8000";

// ─── API LAYER ───────────────────────────────────────────────
async function callBackend(messages, signal) {
  try {
    const res = await fetch(`${BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.reply ?? data.content ?? data.message ?? "No response received.";
  } catch (err) {
    if (err.name === "AbortError") return null;
    return mockReply(messages[messages.length - 1]?.content ?? "");
  }
}

function mockReply(input) {
  const q = input.toLowerCase();
  if (q.includes("gpa") || q.includes("university") || q.includes("college") || q.includes("apply"))
    return "Based on your profile, I suggest looking at universities with 60–75% acceptance rates first. Here are your top matches:\n\n**University of Arizona** — 94% match · 78% acceptance rate\n**Colorado State University** — 88% match · 71% acceptance rate\n**Arizona State University** — 82% match · 65% acceptance rate\n**University of Utah** — 76% match · 68% acceptance rate\n\nWould you like a personalized list with application deadlines and required documents?";
  if (q.includes("sop") || q.includes("statement") || q.includes("essay"))
    return "Here's a strong **Statement of Purpose** opening tailored for you:\n\n*\"My journey into Computer Science began at 16 when I built my first machine learning model to predict agricultural yields in my hometown. That spark of possibility — that code could solve real human problems — has driven every academic decision since. The University of Arizona's world-class AI research environment is where I intend to fully realize that potential.\"*\n\nWant me to write the complete **800-word SOP** with your full academic and professional background?";
  if (q.includes("visa") || q.includes("f-1") || q.includes("f1") || q.includes("interview"))
    return "For your **F-1 visa interview**, here's exactly what you need:\n\n**Required Documents:**\n- Valid passport + DS-160 confirmation page\n- I-20 from your university (signed)\n- SEVIS fee payment receipt (I-901)\n- Financial proof — bank statements (3 months)\n- University admission offer letter\n- Academic transcripts\n\n**Key Interview Tips:**\n- Be confident and concise\n- Explain your study plan clearly\n- Show strong ties to your home country\n\nWould you like to start a **mock interview** practice session right now?";
  if (q.includes("ielts") || q.includes("toefl") || q.includes("english") || q.includes("score"))
    return "For US universities, here are typical **English proficiency requirements**:\n\n**IELTS:**\n- 6.0 — Conditional admission, most universities\n- 6.5 — Standard requirement, most state universities\n- 7.0+ — Competitive CS/STEM programs ✓ *Your score qualifies!*\n\n**TOEFL iBT:**\n- 70+ — General admission\n- 80+ — Universally accepted alternative\n- 100+ — Top research universities\n\nYour IELTS 7.0 qualifies you for **all recommended universities**. 🎉";
  if (q.includes("scholarship") || q.includes("fund") || q.includes("financial") || q.includes("aid"))
    return "Great news! Here are **scholarships available** for international CS students:\n\n**Merit-Based:**\n- New American University Scholarship (ASU) — up to $14,000/year\n- Provost Achievement Award (U of Arizona) — up to $12,000/year\n- Global Excellence Award (Colorado State) — up to $8,000/year\n\n**Need-Based:**\n- Global Wildcat Award (U of Arizona) — partial tuition\n- International Student Emergency Fund — one-time grants\n\nWould you like help writing your **scholarship application essays**?";
  return "I'm your **USAL AI** study abroad counselor — here to guide you every step of the way! 🎓\n\nI can help you with:\n- **University selection** based on your GPA, scores & budget\n- **SOP & personal statement** writing\n- **Visa interview** preparation & mock sessions\n- **Scholarship** discovery & application help\n- **F-1 documentation** checklist & guidance\n\nWhat would you like to start with today?";
}

// ─── HELPERS ─────────────────────────────────────────────────
function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function parseMarkdown(text) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    let html = line
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');

    if (line.startsWith("- ") || line.startsWith("• ")) {
      return (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 4 }}>
          <span style={{ color: "#a78bfa", flexShrink: 0, marginTop: 2 }}>•</span>
          <span dangerouslySetInnerHTML={{ __html: html.replace(/^[-•]\s/, "") }} />
        </div>
      );
    }
    if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
    return <div key={i} style={{ marginBottom: 2 }} dangerouslySetInnerHTML={{ __html: html }} />;
  });
}

// ─── SVG ICONS ───────────────────────────────────────────────
const ShareIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
  </svg>
);
const SettingsIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const SendIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const PlusIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
);
const WaveformIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="2" y1="10" x2="2" y2="14"/>
    <line x1="6" y1="6" x2="6" y2="18"/>
    <line x1="10" y1="3" x2="10" y2="21"/>
    <line x1="14" y1="6" x2="14" y2="18"/>
    <line x1="18" y1="9" x2="18" y2="15"/>
    <line x1="22" y1="11" x2="22" y2="13"/>
  </svg>
);
const CopyIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <rect x="9" y="9" width="13" height="13" rx="2"/>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);
const ThumbUpIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z"/>
  </svg>
);
const RetryIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <polyline points="1 4 1 10 7 10"/>
    <path d="M3.51 15a9 9 0 1 0 .49-3.5"/>
  </svg>
);

// ─── TYPING INDICATOR ────────────────────────────────────────
function TypingIndicator() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: "#7c6af7" }}>USAL AI</span>
      <div style={{
        background: "#0d1117",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "4px 16px 16px 16px",
        padding: "14px 20px",
        display: "flex", alignItems: "center", gap: 5,
        width: "fit-content",
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 7, height: 7, borderRadius: "50%",
            background: "linear-gradient(135deg,#818cf8,#c084fc)",
            animation: `usal-dot 0.7s ease-in-out ${i * 0.15}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────
export default function USALChat() {
  const [messages, setMessages] = useState([
    {
      id: 1, role: "assistant", time: getTime(),
      content: "Hello! I'm **USAL AI** — your personal study abroad counselor.\n\nI can help you with:\n- **University selection** based on your GPA & test scores\n- **SOP & personal statement** writing\n- **Visa interview** preparation\n- **Scholarship** finder\n- **F-1 documentation** guidance\n\nWhat would you like to work on today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [files, setFiles] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [backendConnected, setBackendConnected] = useState(null); // null=checking, true=ok, false=demo

  const msgsEndRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const abortCtrlRef = useRef(null);

  // Check backend on mount
  useEffect(() => {
    fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(3000) })
      .then(() => setBackendConnected(true))
      .catch(() => setBackendConnected(false));
  }, []);

  // Scroll to bottom
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 160) + "px";
  }, [input]);

  const hasContent = input.trim().length > 0 || files.length > 0;
  const canSend = hasContent && !isTyping;

  const handleSend = useCallback(async () => {
    if (!canSend) return;

    const userMsg = {
      id: Date.now(),
      role: "user",
      time: getTime(),
      content: input.trim() || "(Attached file)",
      attachedFiles: files.map(f => f.name),
    };

    const updatedMsgs = [...messages, userMsg];
    setMessages(updatedMsgs);
    setInput("");
    setFiles([]);
    setIsTyping(true);

    if (abortCtrlRef.current) abortCtrlRef.current.abort();
    abortCtrlRef.current = new AbortController();

    const reply = await callBackend(updatedMsgs, abortCtrlRef.current.signal);
    setIsTyping(false);

    if (reply !== null) {
      setMessages(prev => [
        ...prev,
        { id: Date.now() + 1, role: "assistant", time: getTime(), content: reply },
      ]);
    }
  }, [canSend, input, files, messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e) => {
    setFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
    e.target.value = "";
  };

  const handleCopy = (content) => {
    const plain = content
      .replace(/\*\*(.+?)\*\*/g, "$1")
      .replace(/\*(.+?)\*/g, "$1");
    navigator.clipboard?.writeText(plain);
  };

  const handleRetry = useCallback(() => {
    const lastUser = [...messages].reverse().find(m => m.role === "user");
    if (!lastUser || isTyping) return;
    const idx = messages.findIndex(m => m.id === lastUser.id);
    const trimmed = messages.slice(0, idx + 1);
    setMessages(trimmed);
    setIsTyping(true);
    callBackend(trimmed).then(reply => {
      setIsTyping(false);
      if (reply) setMessages(p => [...p, { id: Date.now(), role: "assistant", time: getTime(), content: reply }]);
    });
  }, [messages, isTyping]);

  const handleNewChat = () => {
    if (abortCtrlRef.current) abortCtrlRef.current.abort();
    setMessages([]);
    setInput("");
    setFiles([]);
    setIsTyping(false);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
  };

  // ─── RENDER ──────────────────────────────────────────────
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { height: 100%; }
        body {
          font-family: 'Inter', system-ui, sans-serif;
          background: #060b14;
          overflow: hidden;
        }

        @keyframes usal-dot {
          0%, 100% { opacity: 0.25; transform: scale(0.78); }
          50%       { opacity: 1;    transform: scale(1);    }
        }
        @keyframes usal-in {
          from { opacity: 0; transform: translateY(7px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .usal-msg { animation: usal-in 0.25s ease forwards; }

        ::-webkit-scrollbar        { width: 4px; }
        ::-webkit-scrollbar-track  { background: transparent; }
        ::-webkit-scrollbar-thumb  { background: rgba(255,255,255,0.09); border-radius: 99px; }

        textarea { resize: none; outline: none; border: none; background: transparent; font-family: inherit; }
        textarea::placeholder { color: rgba(255,255,255,0.28); }
        button   { font-family: inherit; cursor: pointer; border: none; background: none; }

        .usal-ai-content strong { color: #c4b5fd; font-weight: 600; }
        .usal-ai-content em     { font-style: italic; color: rgba(200,210,255,0.82); }

        .usal-topbtn:hover { background: rgba(255,255,255,0.08) !important; }
        .usal-actbtn:hover { background: rgba(255,255,255,0.07) !important; color: rgba(255,255,255,0.7) !important; }
        .usal-send-active:hover { opacity: 0.86; transform: scale(1.05); }
      `}</style>

      <div style={{
        display: "flex", flexDirection: "column",
        height: "100vh", background: "#060b14", color: "#fff",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}>

        {/* ══════════ TOP BAR ══════════ */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          background: "#060b14",
          flexShrink: 0,
        }}>
          {/* LEFT: AI Chat button */}
          <button
            onClick={handleNewChat}
            style={{
              padding: "7px 20px",
              borderRadius: 999,
              background: "linear-gradient(135deg,#6d4aff,#9b5df6)",
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              boxShadow: "0 2px 14px rgba(109,74,255,0.38)",
              transition: "opacity .15s, transform .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            AI Chat
          </button>

          {/* RIGHT: status + version + share + settings */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {/* Backend status badge */}
            {backendConnected !== null && (
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "4px 10px", borderRadius: 6,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                fontSize: 11,
                color: backendConnected ? "#4ade80" : "rgba(255,255,255,0.38)",
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: backendConnected ? "#4ade80" : "rgba(255,255,255,0.25)",
                }} />
                {backendConnected ? "Backend connected" : "Demo mode"}
              </div>
            )}

            {/* Version label */}
            <div style={{
              padding: "5px 14px", borderRadius: 7,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: 12, fontWeight: 600,
              color: "rgba(255,255,255,0.7)",
            }}>
              USAL AI v1.0
            </div>

            {/* Share */}
            <button
              onClick={handleShare}
              className="usal-topbtn"
              style={{
                width: 34, height: 34, borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "background .15s",
              }}
            >
              <ShareIcon />
            </button>

            {/* Settings */}
            <button
              className="usal-topbtn"
              style={{
                width: 34, height: 34, borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.09)",
                transition: "background .15s",
              }}
            >
              <SettingsIcon />
            </button>
          </div>
        </div>

        {/* ══════════ MESSAGES ══════════ */}
        <div style={{ flex: 1, overflowY: "auto", padding: "30px 0 10px" }}>
          {messages.length === 0 ? (
            // Empty state
            <div style={{
              height: "100%", display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              gap: 16, padding: 32, textAlign: "center",
            }}>
              <div style={{ fontSize: 44, lineHeight: 1 }}>✦</div>
              <div style={{
                fontSize: 24, fontWeight: 700,
                background: "linear-gradient(135deg,#818cf8,#c084fc,#f472b6)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                How can USAL AI help you?
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.32)", maxWidth: 420, lineHeight: 1.75 }}>
                Ask about universities, write your SOP, prep for visa interviews, or discover scholarships — all in one place.
              </div>
            </div>
          ) : (
            <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px", display: "flex", flexDirection: "column" }}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className="usal-msg"
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                    marginBottom: 22,
                  }}
                >
                  {msg.role === "user" ? (
                    // USER BUBBLE — purple gradient, right side
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, maxWidth: "58%" }}>
                      <div style={{
                        background: "linear-gradient(135deg,#7c3aed,#9b5cf6,#a855f7)",
                        borderRadius: "16px 16px 3px 16px",
                        padding: "13px 18px",
                        fontSize: 14, color: "#fff", lineHeight: 1.65,
                        boxShadow: "0 4px 22px rgba(124,58,237,0.28)",
                      }}>
                        {msg.content}
                        {msg.attachedFiles?.length > 0 && (
                          <div style={{ marginTop: 8, display: "flex", flexWrap: "wrap", gap: 5 }}>
                            {msg.attachedFiles.map((f, i) => (
                              <span key={i} style={{
                                fontSize: 11, padding: "2px 8px", borderRadius: 4,
                                background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)",
                              }}>📎 {f}</span>
                            ))}
                          </div>
                        )}
                      </div>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.22)" }}>{msg.time}</span>
                    </div>
                  ) : (
                    // AI BUBBLE — dark card, left side, "USAL AI" label
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, maxWidth: "64%" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#7c6af7", marginLeft: 1 }}>USAL AI</span>
                      <div style={{
                        background: "#0d1117",
                        border: "1px solid rgba(255,255,255,0.09)",
                        borderRadius: "4px 16px 16px 16px",
                        padding: "13px 18px",
                        fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.72,
                      }}>
                        <div className="usal-ai-content">{parseMarkdown(msg.content)}</div>
                      </div>

                      {/* Action row: Copy, Good, Retry + timestamp */}
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginLeft: 1, marginTop: 1 }}>
                        <ActionBtn icon={<CopyIcon />} label="Copy"  onClick={() => handleCopy(msg.content)} />
                        <ActionBtn icon={<ThumbUpIcon />} label="Good" onClick={() => {}} />
                        <ActionBtn icon={<RetryIcon />} label="Retry" onClick={handleRetry} />
                        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", marginLeft: 6 }}>{msg.time}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Typing */}
              {isTyping && (
                <div className="usal-msg" style={{ marginBottom: 22 }}>
                  <TypingIndicator />
                </div>
              )}
              <div ref={msgsEndRef} />
            </div>
          )}
        </div>

        {/* ══════════ DIVIDER ══════════ */}
        <div style={{ height: 1, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

        {/* ══════════ INPUT BOX ══════════ */}
        <div style={{ flexShrink: 0, padding: "14px 28px 0", background: "#060b14" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>

            {/* Main input card */}
            <div style={{
              background: "#0d1117",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 16,
              padding: "14px 16px 11px",
              transition: "border-color .2s",
            }}>
              {/* File attachment previews */}
              {files.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
                  {files.map((f, i) => (
                    <div key={i} style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "4px 10px", borderRadius: 8,
                      background: "rgba(109,74,255,0.12)",
                      border: "1px solid rgba(109,74,255,0.25)",
                      fontSize: 12, color: "rgba(255,255,255,0.75)",
                    }}>
                      <span>📎</span>
                      <span style={{ maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {f.name}
                      </span>
                      <button
                        onClick={() => setFiles(prev => prev.filter((_, idx) => idx !== i))}
                        style={{ color: "rgba(255,255,255,0.4)", fontSize: 15, lineHeight: 1 }}
                      >×</button>
                    </div>
                  ))}
                </div>
              )}

              {/* Textarea — "Reply..." placeholder */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Reply..."
                rows={1}
                style={{
                  width: "100%", display: "block",
                  fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.6,
                  minHeight: 24, maxHeight: 160,
                }}
              />

              {/* Bottom row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>

                {/* LEFT: + (file upload) */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    width: 30, height: 30, borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all .15s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(109,74,255,0.18)"; e.currentTarget.style.borderColor = "rgba(109,74,255,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                >
                  <PlusIcon />
                </button>
                <input ref={fileInputRef} type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />

                {/* RIGHT: model selector + waveform + send */}
                <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  {/* "USAL AI ▾" model selector */}
                  <button
                    style={{
                      display: "flex", alignItems: "center", gap: 5,
                      padding: "5px 11px", borderRadius: 999,
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      fontSize: 12, color: "rgba(255,255,255,0.52)", fontWeight: 500,
                      transition: "background .15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                    onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                  >
                    USAL AI
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>

                  {/* Waveform (mic) icon */}
                  <button
                    style={{
                      width: 30, height: 30, borderRadius: "50%",
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.09)",
                      color: "rgba(255,255,255,0.45)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .15s",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(109,74,255,0.15)"; e.currentTarget.style.borderColor = "rgba(109,74,255,0.3)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)"; }}
                  >
                    <WaveformIcon />
                  </button>

                  {/* Send button — purple when active, grey when empty */}
                  <button
                    onClick={handleSend}
                    disabled={!canSend}
                    className={canSend ? "usal-send-active" : ""}
                    style={{
                      width: 36, height: 36, borderRadius: "50%",
                      background: canSend
                        ? "linear-gradient(135deg,#6d4aff,#9b5df6)"
                        : "rgba(255,255,255,0.07)",
                      border: "none",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all .2s",
                      flexShrink: 0,
                      boxShadow: canSend ? "0 2px 14px rgba(109,74,255,0.4)" : "none",
                    }}
                  >
                    <SendIcon />
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ textAlign: "center", padding: "10px 0 13px", fontSize: 12, color: "rgba(255,255,255,0.24)" }}>
              ✦ USAL AI is in beta —{" "}
              <span style={{ textDecoration: "underline", cursor: "pointer", color: "rgba(255,255,255,0.36)" }}>
                more powerful features coming soon
              </span>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

// ─── ACTION BUTTON ───────────────────────────────────────────
function ActionBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="usal-actbtn"
      style={{
        display: "flex", alignItems: "center", gap: 4,
        padding: "3px 9px", borderRadius: 999,
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        fontSize: 11, color: "rgba(255,255,255,0.36)",
        transition: "all .15s",
      }}
    >
      {icon} {label}
    </button>
  );
}
