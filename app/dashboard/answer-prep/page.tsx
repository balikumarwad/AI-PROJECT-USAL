import { useState, useRef, useEffect } from "react";
 
const SESSIONS = [
  { id: 1, title: "System Design", role: "Senior SWE", count: 4, score: 78, date: "Today" },
  { id: 2, title: "Behavioral Round", role: "PM Role", count: 3, score: 84, date: "Yesterday" },
  { id: 3, title: "DSA Practice", role: "Google L5", count: 6, score: 71, date: "Mar 12" },
];
 
const INIT_MESSAGES = [
  { id: 1, role: "ai", text: "Namaste! I'm your AI interview coach. Tell me the role you're targeting and I'll fire real interview questions at you — then give you detailed feedback on every answer.", time: "9:00 AM" },
  { id: 2, role: "user", text: "I want to prep for a Senior Software Engineer role focusing on system design.", time: "9:01 AM" },
  { id: 3, role: "ai", text: "Perfect. Let's start with a classic.\n\nQ: Design a URL shortening service like bit.ly. Walk me through components, database choices, and how you'd handle 100M requests/day.", time: "9:01 AM", question: true },
  { id: 4, role: "user", text: "I'd use a REST API layer, a hash function to generate short codes, store in a SQL DB with an index on short_code. For scale I'd add Redis caching and a CDN for redirects.", time: "9:03 AM" },
  {
    id: 5, role: "ai", text: "Good structure — you've nailed the basics. Here's your breakdown:", time: "9:03 AM", hasFeedback: true,
    tags: [
      { type: "strength", text: "Core components clear" },
      { type: "strength", text: "Redis caching ✓" },
      { type: "improve", text: "DB sharding missing" },
      { type: "improve", text: "No capacity estimate" },
      { type: "tip", text: "Add rate limiting" },
    ],
  },
];
 
const INIT_FEEDBACK = {
  score: 72,
  breakdown: [
    { label: "Clarity", val: 85, color: "#4ADE80" },
    { label: "Depth", val: 60, color: "#FBBF24" },
    { label: "Scalability", val: 70, color: "#4ADE80" },
    { label: "Completeness", val: 55, color: "#F87171" },
  ],
  strengths: ["Named all core components clearly", "Redis caching shows scaling awareness", "CDN mention is spot on"],
  improve: ["No mention of DB sharding for write scale", "Skipped capacity estimation (QPS/storage)", "Rate limiting & abuse prevention absent"],
  tips: ["Always open with capacity estimation", "Mention consistent hashing for LBs", "Discuss failure modes & fallbacks"],
};
 
const AI_RESPONSES = [
  "Strong follow-up! You're building depth now. Check your updated score in the feedback panel.",
  "That's the right instinct. One thing to add: discuss how you'd monitor this system in production — observability is often overlooked.",
  "Excellent detail on sharding. Now tell me — how would you handle a hot key problem in your cache?",
  "Nice improvement! Your clarity score just went up. Want to try the next question?",
];
 
export default function InterviewPrep() {
  const [sessions, setSessions] = useState(SESSIONS);
  const [activeSession, setActiveSession] = useState(1);
  const [messages, setMessages] = useState(INIT_MESSAGES);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [mode, setMode] = useState("Chat");
  const [feedback, setFeedback] = useState(INIT_FEEDBACK);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [animScore, setAnimScore] = useState(0);
  const [speakingMsgId, setSpeakingMsgId] = useState(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [ttsVoice, setTtsVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);
  const recTimerRef = useRef(null);
  const utteranceRef = useRef(null);
 
  // Load voices
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis?.getVoices() || [];
      setVoices(v);
      // Prefer a natural English voice
      const preferred = v.find(x => /en.*(US|GB|AU)/i.test(x.lang) && /(Google|Natural|Premium|Samantha|Daniel|Karen)/i.test(x.name))
        || v.find(x => /en/i.test(x.lang) && !x.name.includes("eSpeak"))
        || v[0];
      if (preferred) setTtsVoice(preferred);
    };
    loadVoices();
    window.speechSynthesis?.addEventListener("voiceschanged", loadVoices);
    return () => window.speechSynthesis?.removeEventListener("voiceschanged", loadVoices);
  }, []);
 
  const speakText = (text, msgId) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    if (speakingMsgId === msgId) { setSpeakingMsgId(null); return; }
    const clean = text.replace(/[*_~`#]/g, "").replace(/\n+/g, " ").trim();
    const utter = new SpeechSynthesisUtterance(clean);
    utter.rate = 0.92;
    utter.pitch = 1.05;
    utter.volume = 1;
    if (ttsVoice) utter.voice = ttsVoice;
    utter.onstart = () => setSpeakingMsgId(msgId);
    utter.onend = () => setSpeakingMsgId(null);
    utter.onerror = () => setSpeakingMsgId(null);
    utteranceRef.current = utter;
    window.speechSynthesis.speak(utter);
  };
 
  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setSpeakingMsgId(null);
  };
 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);
 
  useEffect(() => {
    let start = 0;
    const end = feedback.score;
    const step = Math.max(1, end / 40);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setAnimScore(end); clearInterval(timer); }
      else setAnimScore(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [feedback.score]);
 
  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages(m => [...m, { id: Date.now(), role: "user", text, time: now }]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const resp = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages(m => [...m, { id: Date.now() + 1, role: "ai", text: resp, time: t }]);
      setFeedback(f => ({
        ...f,
        score: Math.min(100, f.score + Math.floor(Math.random() * 8) + 2),
        breakdown: f.breakdown.map(b => ({ ...b, val: Math.min(100, b.val + Math.floor(Math.random() * 7) + 1) })),
      }));
      // Auto-speak AI response if TTS enabled
      if (ttsEnabled) {
        setTimeout(() => speakText(resp, Date.now() + 1), 200);
      }
    }, 1400 + Math.random() * 700);
  };
 
  const newChat = () => {
    stopSpeaking();
    const id = Date.now();
    setSessions(s => [{ id, title: "New Session", role: "Untitled", count: 0, score: 0, date: "Now" }, ...s]);
    setActiveSession(id);
    const t = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setMessages([{ id: 1, role: "ai", text: "Fresh start! What role are you preparing for today?", time: t }]);
    setFeedback({ ...INIT_FEEDBACK, score: 0, breakdown: INIT_FEEDBACK.breakdown.map(b => ({ ...b, val: 0 })) });
  };
 
  const toggleRecording = () => {
    if (isRecording) {
      clearTimeout(recTimerRef.current);
      setIsRecording(false);
      setInput("My approach would be to design this with a microservices architecture, starting with an API gateway...");
      setTimeout(() => textareaRef.current?.focus(), 100);
    } else {
      setIsRecording(true);
      recTimerRef.current = setTimeout(() => {
        setIsRecording(false);
        setInput("I would handle scaling by introducing horizontal partitioning and async message queues for write operations.");
      }, 4000);
    }
  };
 
  const scoreColor = animScore >= 80 ? "#4ADE80" : animScore >= 60 ? "#FBBF24" : "#F87171";
  const circumference = 2 * Math.PI * 22;
  const dashOffset = circumference - (animScore / 100) * circumference;
 
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:'DM Sans',sans-serif;background:#08080F;color:#E2E0EE;}
    ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-track{background:transparent;}::-webkit-scrollbar-thumb{background:#1F1F2E;border-radius:4px;}
    @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes typingBounce{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-5px)}}
    @keyframes waveBar{0%,100%{transform:scaleY(.25)}50%{transform:scaleY(1)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}
    @keyframes glowRed{0%,100%{box-shadow:0 0 8px rgba(239,68,68,.3)}50%{box-shadow:0 0 18px rgba(239,68,68,.6)}}
    .fadeUp{animation:fadeUp .3s ease forwards;}
    .session-row{transition:all .15s;cursor:pointer;border-radius:10px;padding:9px 11px;display:flex;align-items:center;gap:10px;margin-bottom:2px;border:1px solid transparent;}
    .session-row:hover{background:rgba(255,255,255,.035);}
    .session-row.active{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.22);}
    .mode-pill{cursor:pointer;padding:5px 13px;border-radius:20px;font-size:12px;font-weight:500;transition:all .15s;border:1px solid transparent;white-space:nowrap;font-family:'DM Sans',sans-serif;}
    .mode-pill:hover:not(.active){background:rgba(255,255,255,.04);}
    .mode-pill.active{background:rgba(139,92,246,.18);border-color:rgba(139,92,246,.45);color:#C4B5FD;}
    .send-btn{width:40px;height:40px;border-radius:10px;background:linear-gradient(135deg,#8B5CF6,#6D28D9);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;}
    .send-btn:hover{transform:scale(1.06);box-shadow:0 4px 18px rgba(139,92,246,.45);}
    .send-btn:active{transform:scale(.97);}
    .mic-btn{width:40px;height:40px;border-radius:10px;border:1px solid rgba(255,255,255,.09);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0;color:#9CA3AF;}
    .mic-btn:hover{border-color:rgba(139,92,246,.45);color:#C4B5FD;}
    .mic-btn.recording{background:rgba(239,68,68,.12);border-color:rgba(239,68,68,.45);color:#F87171;animation:glowRed 1.5s infinite;}
    .chat-textarea{width:100%;background:transparent;border:none;outline:none;resize:none;font-size:14px;color:#E2E0EE;font-family:'DM Sans',sans-serif;line-height:1.65;}
    .chat-textarea::placeholder{color:#3D3D52;}
    .fb-track{height:4px;background:rgba(255,255,255,.05);border-radius:4px;overflow:hidden;margin-top:4px;}
    .fb-fill{height:100%;border-radius:4px;transition:width 1.2s cubic-bezier(.4,0,.2,1);}
    .new-chat-btn{width:100%;padding:9px 13px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:10px;color:#9CA3AF;font-size:13px;cursor:pointer;display:flex;align-items:center;gap:8px;transition:all .15s;font-family:'DM Sans',sans-serif;}
    .new-chat-btn:hover{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.3);color:#C4B5FD;}
    .topbar-btn{padding:5px 12px;border-radius:8px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);color:#9CA3AF;font-size:12px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .15s;}
    .topbar-btn:hover{border-color:rgba(139,92,246,.4);color:#C4B5FD;}
    .tag{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:20px;font-size:11px;font-weight:500;margin:2px 2px 2px 0;}
    .tag-strength{background:rgba(74,222,128,.1);color:#4ADE80;border:1px solid rgba(74,222,128,.18);}
    .tag-improve{background:rgba(248,113,113,.1);color:#F87171;border:1px solid rgba(248,113,113,.18);}
    .tag-tip{background:rgba(96,165,250,.1);color:#60A5FA;border:1px solid rgba(96,165,250,.18);}
  `;
 
  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: "#08080F", minHeight: "100vh", display: "flex", color: "#E2E0EE", overflow: "hidden" }}>
      <style>{css}</style>
 
      {/* SIDEBAR */}
      <div style={{ width: sidebarOpen ? 238 : 0, minWidth: sidebarOpen ? 238 : 0, overflow: "hidden", transition: "all .22s ease", borderRight: "1px solid rgba(255,255,255,.055)", background: "#0B0B13", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ padding: "18px 14px 12px", borderBottom: "1px solid rgba(255,255,255,.055)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#5B21B6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(139,92,246,.3)" }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l2 4 4.5.65-3.25 3.17.77 4.48L8 11.75l-4.02 2.05.77-4.48L1.5 6.15 6 5.5 8 1.5z" fill="white"/></svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#F0EEFF", letterSpacing: "-.01em" }}>PrepAI</div>
              <div style={{ fontSize: 11, color: "#4B5563" }}>Interview Coach</div>
            </div>
          </div>
          <button className="new-chat-btn" onClick={newChat}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1v11M1 6.5h11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            New session
          </button>
        </div>
 
        {/* Sessions */}
        <div style={{ flex: 1, overflowY: "auto", padding: "12px 10px 8px" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#3D3D52", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8, paddingLeft: 3 }}>Sessions</div>
          {sessions.map(s => (
            <div key={s.id} className={`session-row ${activeSession === s.id ? "active" : ""}`} onClick={() => setActiveSession(s.id)}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: activeSession === s.id ? "rgba(139,92,246,.18)" : "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background .15s" }}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="2" width="11" height="10" rx="2" stroke={activeSession === s.id ? "#A78BFA" : "#4B5563"} strokeWidth="1.2"/><path d="M4 5.5h6M4 8h4" stroke={activeSession === s.id ? "#A78BFA" : "#4B5563"} strokeWidth="1.1" strokeLinecap="round"/></svg>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: activeSession === s.id ? "#E0D9FF" : "#C9C7D8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.title}</div>
                <div style={{ fontSize: 11, color: "#4B5563", marginTop: 1 }}>{s.date} · {s.count} answers</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: s.score >= 80 ? "#4ADE80" : s.score >= 60 ? "#FBBF24" : s.score > 0 ? "#F87171" : "#3D3D52", flexShrink: 0 }}>{s.score > 0 ? s.score : "—"}</div>
            </div>
          ))}
        </div>
 
        {/* User */}
        <div style={{ padding: "10px 14px 14px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#8B5CF6,#EC4899)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "#fff", boxShadow: "0 2px 10px rgba(139,92,246,.3)" }}>R</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "#D1D5DB" }}>Romeo</div>
              <div style={{ fontSize: 11, color: "#4B5563" }}>Free plan</div>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="3" r="1" fill="#4B5563"/><circle cx="7" cy="7" r="1" fill="#4B5563"/><circle cx="7" cy="11" r="1" fill="#4B5563"/></svg>
            </div>
          </div>
        </div>
      </div>
 
      {/* MAIN */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, minHeight: "100vh" }}>
        {/* Topbar */}
        <div style={{ padding: "13px 20px", borderBottom: "1px solid rgba(255,255,255,.055)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(8,8,15,.85)", backdropFilter: "blur(16px)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(v => !v)} style={{ background: "none", border: "none", color: "#6B7280", cursor: "pointer", padding: "4px 4px", display: "flex", borderRadius: 6, transition: "color .15s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#C4B5FD"}
              onMouseLeave={e => e.currentTarget.style.color = "#6B7280"}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none"><path d="M2 4h13M2 8.5h13M2 13h13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            </button>
            <div style={{ width: 1, height: 16, background: "rgba(255,255,255,.08)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
              <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,.7)" }} />
              <span style={{ fontSize: 14, fontWeight: 500, color: "#F0EEFF" }}>System Design Interview</span>
              <div style={{ padding: "2px 8px", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.2)", borderRadius: 20, fontSize: 11, color: "#A78BFA", fontWeight: 500 }}>Senior SWE</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {["Practice Mode", "Review", "Hints"].map(label => (
              <button key={label} className="topbar-btn">{label}</button>
            ))}
            <button
              className="topbar-btn"
              onClick={() => { setTtsEnabled(v => !v); if (ttsEnabled) stopSpeaking(); }}
              style={{ borderColor: ttsEnabled ? "rgba(139,92,246,.4)" : "rgba(255,255,255,.07)", color: ttsEnabled ? "#C4B5FD" : "#9CA3AF", display: "flex", alignItems: "center", gap: 5 }}
              title={ttsEnabled ? "AI voice ON — click to mute" : "AI voice OFF — click to enable"}>
              {ttsEnabled ? (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 4.5h2l3-3v10l-3-3H2v-4z" fill="currentColor"/>
                  <path d="M9 3.5c1 .8 1.5 2 1.5 3s-.5 2.2-1.5 3M10.5 2c1.5 1.2 2.5 3 2.5 4.5S12 9.8 10.5 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2 4.5h2l3-3v10l-3-3H2v-4z" fill="currentColor" opacity=".4"/>
                  <path d="M9 4l3.5 5M12.5 4L9 9" stroke="#F87171" strokeWidth="1.3" strokeLinecap="round"/>
                </svg>
              )}
              {ttsEnabled ? "Voice ON" : "Voice OFF"}
            </button>
          </div>
        </div>
 
        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px 14px", display: "flex", flexDirection: "column", gap: 20 }}>
          {messages.map((msg, i) => (
            <div key={msg.id} className="fadeUp" style={{ display: "flex", gap: 11, animationDelay: `${i * 0.03}s`, flexDirection: msg.role === "user" ? "row-reverse" : "row", alignItems: "flex-start" }}>
              {msg.role === "ai" ? (
                <div style={{ width: 33, height: 33, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#6D28D9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: "0 2px 14px rgba(139,92,246,.35)", marginTop: 1 }}>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l2 4 4.5.65-3.25 3.17.77 4.48L8 11.75l-4.02 2.05.77-4.48L1.5 6.15 6 5.5 8 1.5z" fill="white"/></svg>
                </div>
              ) : (
                <div style={{ width: 33, height: 33, borderRadius: 10, background: "linear-gradient(135deg,#EC4899,#8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, fontWeight: 600, color: "#fff", marginTop: 1 }}>R</div>
              )}
              <div style={{ maxWidth: "74%", display: "flex", flexDirection: "column", gap: 4, alignItems: msg.role === "user" ? "flex-end" : "flex-start" }}>
                {msg.question && (
                  <div style={{ fontSize: 11, color: "#A78BFA", fontWeight: 500, marginBottom: 2, display: "flex", alignItems: "center", gap: 5, padding: "2px 8px", background: "rgba(139,92,246,.1)", borderRadius: 20, border: "1px solid rgba(139,92,246,.2)", width: "fit-content" }}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#A78BFA" strokeWidth="1.2"/><path d="M5 3v2.5" stroke="#A78BFA" strokeWidth="1.2" strokeLinecap="round"/><circle cx="5" cy="7.5" r=".5" fill="#A78BFA"/></svg>
                    Interview Question
                  </div>
                )}
                <div style={{
                  padding: "11px 15px",
                  borderRadius: msg.role === "user" ? "14px 4px 14px 14px" : "4px 14px 14px 14px",
                  background: msg.role === "user"
                    ? "linear-gradient(135deg,#8B5CF6,#7C3AED)"
                    : msg.question ? "rgba(139,92,246,.08)" : "rgba(255,255,255,.04)",
                  border: msg.question ? "1px solid rgba(139,92,246,.22)"
                    : msg.role === "user" ? "none" : "1px solid rgba(255,255,255,.06)",
                  fontSize: 14, lineHeight: 1.7,
                  color: msg.role === "user" ? "#F0EEFF" : "#C9C7D8",
                  boxShadow: msg.role === "user" ? "0 4px 20px rgba(139,92,246,.28)" : "none",
                }}>
                  {msg.text.split("\n").map((line, li) => (
                    <span key={li}>{line}{li < msg.text.split("\n").length - 1 && <br />}</span>
                  ))}
                  {msg.hasFeedback && msg.tags && (
                    <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap" }}>
                      {msg.tags.map((tag, ti) => (
                        <span key={ti} className={`tag tag-${tag.type}`}>{tag.text}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div style={{ fontSize: 11, color: "#3D3D52" }}>{msg.time}</div>
                {msg.role === "ai" && (
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
                    <button
                      onClick={() => speakText(msg.text, msg.id)}
                      title={speakingMsgId === msg.id ? "Stop speaking" : "Play message"}
                      style={{ display: "flex", alignItems: "center", gap: 5, padding: "3px 9px", borderRadius: 20, background: speakingMsgId === msg.id ? "rgba(139,92,246,.18)" : "rgba(255,255,255,.04)", border: `1px solid ${speakingMsgId === msg.id ? "rgba(139,92,246,.4)" : "rgba(255,255,255,.08)"}`, cursor: "pointer", transition: "all .15s" }}>
                      {speakingMsgId === msg.id ? (
                        <>
                          <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                            {[0, 0.1, 0.2, 0.15, 0.05].map((d, i) => (
                              <div key={i} style={{ width: 2, height: 10, borderRadius: 1, background: "#A78BFA", transformOrigin: "bottom", animation: `waveBar .7s ${d}s ease-in-out infinite` }} />
                            ))}
                          </div>
                          <span style={{ fontSize: 11, color: "#A78BFA", fontWeight: 500 }}>Speaking...</span>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><rect x="2" y="2" width="2.5" height="6" rx=".5" fill="#A78BFA"/><rect x="5.5" y="2" width="2.5" height="6" rx=".5" fill="#A78BFA"/></svg>
                        </>
                      ) : (
                        <>
                          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1.5 3.5h2l2.5-2.5v8l-2.5-2.5h-2v-3z" fill="#6B7280"/>
                            <path d="M8 3c.8.6 1.2 1.6 1.2 2.5S8.8 7.4 8 8" stroke="#6B7280" strokeWidth="1.1" strokeLinecap="round"/>
                          </svg>
                          <span style={{ fontSize: 11, color: "#6B7280" }}>Listen</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
 
          {isTyping && (
            <div className="fadeUp" style={{ display: "flex", gap: 11 }}>
              <div style={{ width: 33, height: 33, borderRadius: 10, background: "linear-gradient(135deg,#8B5CF6,#6D28D9)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1.5l2 4 4.5.65-3.25 3.17.77 4.48L8 11.75l-4.02 2.05.77-4.48L1.5 6.15 6 5.5 8 1.5z" fill="white"/></svg>
              </div>
              <div style={{ padding: "12px 16px", borderRadius: "4px 14px 14px 14px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.06)", display: "flex", alignItems: "center", gap: 5 }}>
                {[0, 0.18, 0.36].map((d, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#4B5563", animation: `typingBounce 1.2s ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
 
        {/* Input */}
        <div style={{ padding: "12px 20px 18px", borderTop: "1px solid rgba(255,255,255,.055)", background: "rgba(8,8,15,.9)", flexShrink: 0 }}>
 
          {speakingMsgId && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 13px", marginBottom: 8, background: "rgba(139,92,246,.07)", border: "1px solid rgba(139,92,246,.2)", borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                {[0, 0.08, 0.16, 0.24, 0.12].map((d, i) => (
                  <div key={i} style={{ width: 3, height: 16, borderRadius: 2, background: "#A78BFA", transformOrigin: "center", animation: `waveBar .75s ${d}s ease-in-out infinite` }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: "#A78BFA", fontWeight: 500 }}>AI is speaking...</span>
              <button onClick={stopSpeaking} style={{ marginLeft: "auto", fontSize: 11, color: "#A78BFA", background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif" }}>
                Stop
              </button>
            </div>
          )}
          <div style={{ display: "flex", gap: 5, marginBottom: 10 }}>
            {["Chat", "Answer question", "Review answer"].map(m => (
              <button key={m} className={`mode-pill ${mode === m ? "active" : ""}`}
                style={{ color: mode === m ? undefined : "#6B7280" }}
                onClick={() => setMode(m)}>{m}</button>
            ))}
          </div>
 
          {isRecording && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 13px", marginBottom: 8, background: "rgba(239,68,68,.07)", border: "1px solid rgba(239,68,68,.18)", borderRadius: 10 }}>
              <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
                {[0, 0.1, 0.2, 0.3, 0.15].map((d, i) => (
                  <div key={i} style={{ width: 3, height: 16, borderRadius: 2, background: "#F87171", transformOrigin: "bottom", animation: `waveBar .8s ${d}s ease-in-out infinite` }} />
                ))}
              </div>
              <span style={{ fontSize: 12, color: "#F87171", fontWeight: 500 }}>Recording... tap mic to stop</span>
              <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#F87171", animation: "pulse 1s infinite" }} />
            </div>
          )}
 
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: "11px 13px", background: "rgba(255,255,255,.035)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 14, transition: "border-color .2s" }}
            onFocusCapture={e => e.currentTarget.style.borderColor = "rgba(139,92,246,.35)"}
            onBlurCapture={e => e.currentTarget.style.borderColor = "rgba(255,255,255,.08)"}>
            <textarea ref={textareaRef} className="chat-textarea"
              value={input}
              onChange={e => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
              }}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
              placeholder={
                mode === "Answer question" ? "Answer the question as you would in a real interview..." :
                mode === "Review answer" ? "Paste your answer here for AI review..." :
                "Type a message, answer, or ask a follow-up..."
              }
              rows={1}
              style={{ minHeight: 24, maxHeight: 120 }}
            />
            <button className="mic-btn" onClick={toggleRecording} title="Voice answer">
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="4.5" y="1" width="6" height="9" rx="3" fill="currentColor" opacity=".9"/>
                <path d="M1.5 7.5a6 6 0 0 0 12 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <line x1="7.5" y1="13.5" x2="7.5" y2="15" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="send-btn" onClick={sendMessage}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M13 7L1 1.5l2 5.5-2 5.5L13 7z" fill="white"/>
              </svg>
            </button>
          </div>
          <div style={{ fontSize: 11, color: "#2D2D3D", textAlign: "center", marginTop: 7 }}>Enter to send · Shift+Enter new line · 🎙 for voice</div>
        </div>
      </div>
 
      {/* FEEDBACK PANEL */}
      <div style={{ width: 256, minWidth: 256, borderLeft: "1px solid rgba(255,255,255,.055)", background: "#0B0B13", display: "flex", flexDirection: "column", overflowY: "auto", flexShrink: 0 }}>
        {/* Score header */}
        <div style={{ padding: "18px 16px 16px", borderBottom: "1px solid rgba(255,255,255,.055)" }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: "#3D3D52", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14 }}>Live Feedback</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
            <svg width="58" height="58" viewBox="0 0 58 58" style={{ flexShrink: 0 }}>
              <circle cx="29" cy="29" r="22" fill="none" stroke="rgba(255,255,255,.05)" strokeWidth="4.5"/>
              <circle cx="29" cy="29" r="22" fill="none" stroke={scoreColor} strokeWidth="4.5"
                strokeDasharray={circumference} strokeDashoffset={dashOffset} strokeLinecap="round"
                style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%", transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1), stroke .3s", filter: `drop-shadow(0 0 6px ${scoreColor}55)` }}/>
              <text x="29" y="34" textAnchor="middle" fontSize="16" fontWeight="600" fill={scoreColor} fontFamily="'DM Sans',sans-serif">{animScore}</text>
            </svg>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#E0D9FF" }}>Answer Score</div>
              <div style={{ fontSize: 11, color: "#4B5563", marginTop: 3 }}>System Design</div>
              <div style={{ fontSize: 12, color: scoreColor, marginTop: 5, fontWeight: 500 }}>
                {animScore >= 80 ? "🏆 Excellent" : animScore >= 65 ? "📈 Good progress" : "🔧 Keep going"}
              </div>
            </div>
          </div>
          {feedback.breakdown.map(b => (
            <div key={b.label} style={{ marginBottom: 9 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                <span style={{ color: "#9CA3AF" }}>{b.label}</span>
                <span style={{ color: b.color, fontWeight: 600, fontFamily: "'DM Mono',monospace", fontSize: 11 }}>{b.val}%</span>
              </div>
              <div className="fb-track"><div className="fb-fill" style={{ width: `${b.val}%`, background: b.color }} /></div>
            </div>
          ))}
        </div>
 
        {/* Sections */}
        <div style={{ padding: "14px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { key: "strengths", title: "Strengths", items: feedback.strengths, color: "#4ADE80", glow: "rgba(74,222,128,.08)", border: "rgba(74,222,128,.14)", icon: "✓" },
            { key: "improve", title: "Improve", items: feedback.improve, color: "#F87171", glow: "rgba(248,113,113,.08)", border: "rgba(248,113,113,.14)", icon: "△" },
            { key: "tips", title: "Pro tips", items: feedback.tips, color: "#60A5FA", glow: "rgba(96,165,250,.08)", border: "rgba(96,165,250,.14)", icon: "→" },
          ].map(section => (
            <div key={section.key} style={{ background: section.glow, border: `1px solid ${section.border}`, borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: section.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>{section.title}</div>
              {section.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 7, fontSize: 12, color: "#9CA3AF", lineHeight: 1.55, padding: "4px 0", borderBottom: i < section.items.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none" }}>
                  <span style={{ color: section.color, fontWeight: 700, flexShrink: 0, fontSize: 10, marginTop: 2 }}>{section.icon}</span>
                  {item}
                </div>
              ))}
            </div>
          ))}
 
          {/* Voice selector */}
          {voices.length > 1 && (
            <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: "10px 12px" }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: "#4B5563", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>AI Voice</div>
              <select
                value={ttsVoice?.name || ""}
                onChange={e => {
                  const v = voices.find(x => x.name === e.target.value);
                  if (v) setTtsVoice(v);
                }}
                style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 7, padding: "5px 8px", fontSize: 12, color: "#C9C7D8", fontFamily: "'DM Sans',sans-serif", cursor: "pointer", outline: "none" }}>
                {voices.filter(v => /en/i.test(v.lang)).map(v => (
                  <option key={v.name} value={v.name} style={{ background: "#0B0B13" }}>{v.name.replace("Google ", "").replace(" English", "")} ({v.lang})</option>
                ))}
              </select>
              <div style={{ fontSize: 11, color: "#4B5563", marginTop: 5 }}>Select the AI coach voice</div>
            </div>
          )}
 
          {/* CTA */}
          <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.18)", borderRadius: 10, padding: "10px 12px" }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: "#A78BFA", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 7 }}>Coach's tip</div>
            <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.6 }}>Always open with capacity estimation — it immediately signals senior-level thinking to interviewers.</div>
            <button
              onClick={() => { setInput("Give me a template for capacity estimation in system design interviews"); textareaRef.current?.focus(); }}
              style={{ marginTop: 9, fontSize: 11, color: "#A78BFA", background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.25)", borderRadius: 7, padding: "5px 11px", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all .15s", fontWeight: 500 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(139,92,246,.22)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(139,92,246,.12)"}>
              Ask coach ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}