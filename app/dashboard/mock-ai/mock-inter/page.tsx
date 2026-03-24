"use client";

import { useState, useRef, useEffect, useCallback } from "react";
 
// ════════════════════════════════════════════════════════════
// BACKEND CONFIG — change to your FastAPI URL
// POST /api/interview  body: { messages }  return: { reply }
// ════════════════════════════════════════════════════════════
const BASE_URL = "http://localhost:8000";
 
// ─── FALLBACK QUESTIONS ──────────────────────────────────────
const VISA_QUESTIONS = [
  "Good morning! Please state your full name and which university you have been admitted to.",
  "Why did you choose the University of Arizona, and not a university in your home country?",
  "How will you fund your studies? Can you tell me about your financial support?",
  "Do you plan to return to your home country after completing your degree?",
  "What are your career plans after graduation?",
  "Have you traveled to the United States before? If yes, when and for what purpose?",
  "Can you tell me about your academic background and GPA?",
  "Who will be your primary financial sponsor and what is their occupation?",
  "Do you have any family members currently living in the United States?",
  "What strong ties do you have to your home country that ensure your return after studies?",
];
 
// ─── SPEECH STATES ──────────────────────────────────────────
// idle      → waiting, mic listening for speech start
// listening → user is speaking (green glow)
// processing → silence detected, sending to AI
// responding → officer typing / speaking
 
// ─── API ────────────────────────────────────────────────────
async function callBackend(messages, signal) {
  try {
    const res = await fetch(`${BASE_URL}/api/interview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
      signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data.reply ?? data.content ?? data.message ?? null;
  } catch (err) {
    if (err.name === "AbortError") return null;
    return null;
  }
}
 
function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
function formatDuration(s) {
  return [Math.floor(s / 3600), Math.floor((s % 3600) / 60), s % 60]
    .map(n => String(n).padStart(2, "0")).join(":");
}
 
// ─── ICONS ──────────────────────────────────────────────────
const MicIcon = ({ off }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={off ? "#f87171" : "rgba(255,255,255,0.75)"} strokeWidth="2" strokeLinecap="round">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" />
    {off && <line x1="1" y1="1" x2="23" y2="23" stroke="#f87171" strokeWidth="2" />}
  </svg>
);
const VideoIcon = ({ off }) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke={off ? "#f87171" : "rgba(255,255,255,0.75)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" />
    {off && <line x1="1" y1="1" x2="23" y2="23" stroke="#f87171" strokeWidth="2" />}
  </svg>
);
const PhoneOffIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
    <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07C9.44 17.29 7.76 15.49 6.32 13.47A19.79 19.79 0 0 1 3.25 4.84 2 2 0 0 1 5.23 2.68h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11z" />
    <line x1="23" y1="1" x2="1" y2="23" />
  </svg>
);
const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.65)" stroke="none">
    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
  </svg>
);
const GemIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C12 2 15.5 8 20 10C15.5 12 12 18 12 18C12 18 8.5 12 4 10C8.5 8 12 2 12 2Z" fill="white" opacity=".9" />
  </svg>
);
 
// ─── TYPING DOTS ─────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{ display:"flex", gap:4, padding:"8px 12px", background:"rgba(13,17,23,0.55)", border:"0.5px solid rgba(255,255,255,0.09)", borderRadius:"3px 10px 10px 10px", backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)", width:"fit-content" }}>
      {[0,1,2].map(i => (
        <div key={i} style={{ width:4, height:4, borderRadius:"50%", background:"rgba(109,74,255,0.8)", animation:`mi-dot .7s ease-in-out ${i*.15}s infinite` }} />
      ))}
    </div>
  );
}
 
// ─── SPEAKING BARS ────────────────────────────────────────────
function SpeakingBars({ color = "#6d4aff" }) {
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:14 }}>
      {[0,1,2,3].map(i => (
        <div key={i} style={{ width:3, borderRadius:2, background:`linear-gradient(to top,${color},${color}88)`, animation:`mi-bar .6s ease-in-out ${i*.12}s infinite` }} />
      ))}
    </div>
  );
}
 
// ─── CTRL BUTTON ─────────────────────────────────────────────
function CtrlBtn({ icon, label, onClick, variant="default", labelColor }) {
  const cfg = {
    default: { bg:"rgba(255,255,255,0.08)", border:"0.5px solid rgba(255,255,255,0.1)", sz:34, shadow:"none" },
    muted:   { bg:"rgba(239,68,68,0.18)",   border:"0.5px solid rgba(239,68,68,0.35)",  sz:34, shadow:"none" },
    active:  { bg:"rgba(109,74,255,0.22)",  border:"0.5px solid rgba(109,74,255,0.35)", sz:34, shadow:"none" },
    end:     { bg:"linear-gradient(135deg,#dc2626,#ef4444)", border:"none", sz:40, shadow:"0 2px 12px rgba(220,38,38,0.45)" },
  }[variant];
  return (
    <button onClick={onClick} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, border:"none", background:"none", cursor:"pointer", fontFamily:"inherit" }}>
      <div style={{ width:cfg.sz, height:cfg.sz, borderRadius:"50%", background:cfg.bg, border:cfg.border, boxShadow:cfg.shadow, display:"flex", alignItems:"center", justifyContent:"center", transition:"all .15s" }}>
        {icon}
      </div>
      <span style={{ fontSize:8.5, color:labelColor??"rgba(255,255,255,0.28)", fontWeight:500, whiteSpace:"nowrap", fontFamily:"Inter,system-ui,sans-serif" }}>{label}</span>
    </button>
  );
}
 
// ─── MIC STATUS BADGE ─────────────────────────────────────────
function MicBadge({ speechState, micBlocked }) {
  if (micBlocked) return (
    <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:999, fontSize:10, background:"rgba(239,68,68,0.1)", border:"0.5px solid rgba(239,68,68,0.25)", color:"#f87171" }}>
      <div style={{ width:5, height:5, borderRadius:"50%", background:"#f87171" }} />
      Mic blocked
    </div>
  );
  const label = { idle:"Listening…", listening:"Speaking", processing:"Processing…", responding:"Wait…" }[speechState] ?? "Listening…";
  const active = speechState === "listening";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:999, fontSize:10, fontWeight:500, background: active ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.04)", border: active ? "0.5px solid rgba(16,185,129,0.25)" : "0.5px solid rgba(255,255,255,0.08)", color: active ? "rgba(180,255,210,0.8)" : "rgba(255,255,255,0.32)", transition:"all .3s" }}>
      <div style={{ width:5, height:5, borderRadius:"50%", background: active ? "#4ade80" : "rgba(255,255,255,0.18)", animation: active ? "mi-green .8s ease-in-out infinite" : "none", transition:"all .3s" }} />
      {label}
      {active && <SpeakingBars color="#4ade80" />}
    </div>
  );
}
 
// ════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ════════════════════════════════════════════════════════════
export default function MockInterview() {
  const [messages,     setMessages]     = useState([{ id:1, role:"officer", time:getTime(), content:VISA_QUESTIONS[0] }]);
  const [isTyping,     setIsTyping]     = useState(false);
  const [muted,        setMuted]        = useState(false);
  const [videoOn,      setVideoOn]      = useState(false);
  const [speaker,      setSpeaker]      = useState("officer"); // "officer"|"user"|"none"
  const [speechState,  setSpeechState]  = useState("idle");   // idle|listening|processing|responding
  const [transcript,   setTranscript]   = useState("");       // live transcript shown to user
  const [ended,        setEnded]        = useState(false);
  const [elapsed,      setElapsed]      = useState(0);
  const [qIdx,         setQIdx]         = useState(1);
  const [videoDenied,  setVideoDenied]  = useState(false);
  const [micBlocked,   setMicBlocked]   = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
 
  const feedRef       = useRef(null);
  const videoRef      = useRef(null);
  const streamRef     = useRef(null);
  const abortRef      = useRef(null);
  const timerRef      = useRef(null);
  const recognitionRef = useRef(null);
  const silenceTimer  = useRef(null);
  const finalTranscript = useRef("");
  const messagesRef   = useRef(messages); // always-fresh ref for async callbacks
  const qIdxRef       = useRef(qIdx);
 
  // Keep refs in sync
  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { qIdxRef.current = qIdx; }, [qIdx]);
 
  // ── Timer ──────────────────────────────────────────────
  useEffect(() => {
    timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, []);
 
  // ── Scroll feed ────────────────────────────────────────
  useEffect(() => {
    feedRef.current?.scrollTo({ top: feedRef.current.scrollHeight, behavior:"smooth" });
  }, [messages, isTyping, transcript]);
 
  // ── Video stream ───────────────────────────────────────
  useEffect(() => {
    if (videoOn) {
      navigator.mediaDevices?.getUserMedia({ video:true, audio:false })
        .then(stream => {
          streamRef.current = stream;
          if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(()=>{}); }
          setVideoDenied(false);
        })
        .catch(() => { setVideoOn(false); setVideoDenied(true); });
    } else {
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    return () => { streamRef.current?.getTracks().forEach(t => t.stop()); };
  }, [videoOn]);
 
  // ── Send user answer to AI, get reply ──────────────────
  const sendAnswer = useCallback((text) => {
    if (!text.trim()) {
      // Nothing recognised — restart listening
      setSpeechState("idle");
      setSpeaker("none");
      return;
    }
 
    // Add user message
    const userMsg = { id:Date.now(), role:"user", time:getTime(), content:text.trim() };
    setMessages(prev => {
      const updated = [...prev, userMsg];
      messagesRef.current = updated;
      return updated;
    });
    setTranscript("");
    setSpeechState("responding");
    setSpeaker("officer");
    setIsTyping(true);
 
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
 
    callBackend(
      messagesRef.current.map(m => ({ role: m.role === "officer" ? "assistant" : "user", content: m.content })),
      abortRef.current.signal
    ).then(reply => {
      const next = reply ?? VISA_QUESTIONS[qIdxRef.current % VISA_QUESTIONS.length];
      setIsTyping(false);
      setMessages(prev => {
        const updated = [...prev, { id:Date.now()+1, role:"officer", time:getTime(), content:next }];
        messagesRef.current = updated;
        return updated;
      });
      setQIdx(q => q + 1);
      setSpeaker("officer");
      // Officer "speaks" for 3s then go back to idle listening
      setTimeout(() => {
        setSpeaker("none");
        setSpeechState("idle");
      }, 3200);
    });
  }, []);
 
  // ── Speech Recognition setup ───────────────────────────
  const startListening = useCallback(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }
 
    // Cleanup previous instance
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(_) {}
    }
    clearTimeout(silenceTimer.current);
 
    const recognition = new SpeechRecognition();
    recognition.continuous      = true;
    recognition.interimResults  = true;
    recognition.lang            = "en-US";
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;
    finalTranscript.current = "";
 
    recognition.onstart = () => {
      setMicBlocked(false);
    };
 
    recognition.onresult = (event) => {
      // Don't process while AI is responding
      if (speechState === "responding") return;
 
      let interim = "";
      let final   = "";
 
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const t = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          final += t + " ";
        } else {
          interim += t;
        }
      }
 
      if (final) {
        finalTranscript.current += final;
      }
 
      const fullText = finalTranscript.current + interim;
      if (fullText.trim()) {
        setTranscript(fullText.trim());
        setSpeechState("listening");
        setSpeaker("user");
 
        // Reset silence timer — send after 1.8s silence
        clearTimeout(silenceTimer.current);
        silenceTimer.current = setTimeout(() => {
          const toSend = finalTranscript.current.trim() || fullText.trim();
          setSpeechState("processing");
          setSpeaker("none");
          setTranscript("");
          recognition.stop();
          sendAnswer(toSend);
          finalTranscript.current = "";
        }, 1800);
      }
    };
 
    recognition.onerror = (event) => {
      if (event.error === "not-allowed" || event.error === "permission-denied") {
        setMicBlocked(true);
        setSpeechSupported(false);
      } else if (event.error === "no-speech") {
        // No speech detected — just restart
        recognition.stop();
      }
    };
 
    recognition.onend = () => {
      // Auto-restart unless we're processing/responding or ended
      setSpeechState(prev => {
        if (prev === "processing" || prev === "responding") return prev;
        // Restart recognition
        setTimeout(() => {
          if (!ended) startListening();
        }, 300);
        return "idle";
      });
    };
 
    try {
      recognition.start();
      setSpeechState("idle");
    } catch (err) {
      setMicBlocked(true);
    }
  }, [ended, sendAnswer, speechState]);
 
  // ── Start listening when component mounts ──────────────
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      return;
    }
    // Small delay to let page settle
    const t = setTimeout(() => startListening(), 800);
    return () => {
      clearTimeout(t);
      clearTimeout(silenceTimer.current);
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(_) {}
      }
    };
  }, []); // eslint-disable-line
 
  // ── Mute: stop/start recognition ──────────────────────
  const handleToggleMute = () => {
    setMuted(m => {
      const next = !m;
      if (next) {
        // Muting — stop recognition
        clearTimeout(silenceTimer.current);
        try { recognitionRef.current?.stop(); } catch(_) {}
        setSpeechState("idle");
        setSpeaker("none");
      } else {
        // Unmuting — restart recognition
        setTimeout(() => startListening(), 200);
      }
      return next;
    });
  };
 
  // ── End call ───────────────────────────────────────────
  const handleEndCall = () => {
    clearInterval(timerRef.current);
    clearTimeout(silenceTimer.current);
    abortRef.current?.abort();
    try { recognitionRef.current?.stop(); } catch(_) {}
    streamRef.current?.getTracks().forEach(t => t.stop());
    setEnded(true);
  };
 
  // ── End screen ─────────────────────────────────────────
  if (ended) return (
    <>
      <GlobalStyles />
      <div style={S.root}>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", gap:14 }}>
          <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(220,38,38,0.1)", border:"0.5px solid rgba(220,38,38,0.22)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <PhoneOffIcon />
          </div>
          <div style={{ fontSize:20, fontWeight:600, color:"rgba(255,255,255,0.85)" }}>Session Ended</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.32)" }}>Duration: {formatDuration(elapsed)}</div>
          <div style={{ fontSize:13, color:"rgba(255,255,255,0.3)" }}>
            {messages.filter(m => m.role === "officer").length} questions asked ·{" "}
            {messages.filter(m => m.role === "user").length} answers given
          </div>
          <div style={{ display:"flex", gap:10, marginTop:10 }}>
            <button onClick={() => window.location.reload()} style={S.actionBtn("purple")}>New Session</button>
            <button style={S.actionBtn("gray")}>View Feedback</button>
          </div>
        </div>
      </div>
    </>
  );
 
  const officerSpeaking = speaker === "officer";
  const userSpeaking    = speaker === "user";
 
  // ── RENDER ─────────────────────────────────────────────
  return (
    <>
      <GlobalStyles />
      <div style={S.root}>
 
        {/* TOP BAR */}
        <div style={S.topbar}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={S.recDot} />
            <span style={{ fontSize:12, fontWeight:500, color:"rgba(255,255,255,0.4)" }}>AI Mock Interview</span>
          </div>
          <div style={S.badge}>Visa Interview Session</div>
          <span style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.65)", fontVariantNumeric:"tabular-nums" }}>
            {formatDuration(elapsed)}
          </span>
        </div>
 
        {/* MAIN */}
        <div style={S.main}>
 
          {/* LEFT — Visa Officer */}
          <div style={{ ...S.panel, ...(officerSpeaking ? S.panelPurple : {}) }}>
            <div style={{ position:"relative", width:72, height:72, flexShrink:0 }}>
              {officerSpeaking && <div style={S.ringPurple} />}
              <div style={{ ...S.avatar, ...S.avOfficer }}>VO</div>
            </div>
            <div style={S.pname}>Sarah Mitchell</div>
            <div style={S.prole}>US Visa Officer · AI</div>
            <div style={{ flex:1 }} />
            <div style={{ ...S.micRow, marginBottom:58, ...(officerSpeaking ? S.micRowPurple : {}) }}>
              <div style={{ ...S.dot, ...(officerSpeaking ? S.dotPurple : {}) }} />
              {officerSpeaking
                ? <><span>Speaking</span><SpeakingBars color="#a78bfa" /></>
                : "Listening"}
            </div>
          </div>
 
          {/* DIVIDER L */}
          <div style={S.centerCol}>
            <div style={S.divLine} />
            <div style={S.aiDot}><GemIcon /></div>
            <div style={S.divLine} />
          </div>
 
          {/* CHAT FEED */}
          <div ref={feedRef} style={S.feed}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display:"flex", flexDirection:"column", gap:2, alignItems:msg.role==="user"?"flex-end":"flex-start", animation:"mi-in .22s ease forwards" }}>
                <span style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.2)", padding:"0 4px" }}>
                  {msg.role === "officer" ? "Visa Officer" : "You"}
                </span>
                <div style={msg.role === "officer" ? S.bubbleAI : S.bubbleUser}>
                  {msg.content}
                </div>
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.14)", padding:"0 4px" }}>{msg.time}</span>
              </div>
            ))}
 
            {/* Live transcript bubble — shows what user is saying in real time */}
            {transcript && (
              <div style={{ display:"flex", flexDirection:"column", gap:2, alignItems:"flex-end", animation:"mi-in .15s ease forwards" }}>
                <span style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.2)", padding:"0 4px" }}>You</span>
                <div style={{ ...S.bubbleUser, opacity:0.65, fontStyle:"italic" }}>
                  {transcript}
                  <span style={{ display:"inline-block", width:6, height:6, borderRadius:"50%", background:"#a78bfa", marginLeft:5, verticalAlign:"middle", animation:"mi-dot .7s ease-in-out infinite" }} />
                </div>
              </div>
            )}
 
            {/* Processing indicator */}
            {speechState === "processing" && (
              <div style={{ display:"flex", flexDirection:"column", gap:2, alignItems:"flex-end", animation:"mi-in .15s ease forwards" }}>
                <span style={{ fontSize:9, color:"rgba(255,255,255,0.2)", padding:"0 4px" }}>You</span>
                <div style={{ ...S.bubbleUser, opacity:0.5, fontSize:11, fontStyle:"italic" }}>Sending…</div>
              </div>
            )}
 
            {isTyping && (
              <div style={{ display:"flex", flexDirection:"column", gap:2, animation:"mi-in .22s ease forwards" }}>
                <span style={{ fontSize:9, fontWeight:500, color:"rgba(255,255,255,0.2)", padding:"0 4px" }}>Visa Officer</span>
                <TypingDots />
              </div>
            )}
          </div>
 
          {/* DIVIDER R */}
          <div style={S.centerCol}>
            <div style={S.divLine} />
            <div style={{ width:22, height:22, flexShrink:0 }} />
            <div style={S.divLine} />
          </div>
 
          {/* RIGHT — User */}
          <div style={{ ...S.panel, flexDirection:"column", padding:0, overflow:"hidden", display:"flex" }}>
            {/* Large Video Display */}
            <div style={{ flex:1, position:"relative", width:"100%", background:"rgba(16,185,129,0.06)", display:"flex", alignItems:"center", justifyContent:"center", minHeight:0, overflow:"hidden" }}>
              {videoOn ? (
                <>
                  <video
                    ref={videoRef} autoPlay muted playsInline
                    style={{ width:"100%", height:"100%", objectFit:"cover" }}
                  />
                  {userSpeaking && (
                    <div style={{ position:"absolute", inset:0, pointerEvents:"none", border:"3px solid rgba(74,222,128,0.6)", borderRadius:14 }} />
                  )}
                </>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12, color:"rgba(255,255,255,0.4)" }}>
                  <div style={{ width:60, height:60, borderRadius:"50%", background:"rgba(16,185,129,0.1)", border:"2px solid rgba(16,185,129,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28 }}>
                    📹
                  </div>
                  <div style={{ fontSize:12, textAlign:"center" }}>Camera off</div>
                </div>
              )}
              {videoDenied && (
                <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.5)", backdropFilter:"blur(4px)" }}>
                  <div style={{ textAlign:"center", color:"#f87171", fontSize:11 }}>
                    <div style={{ marginBottom:8 }}>❌</div>
                    Camera access denied
                  </div>
                </div>
              )}
            </div>

            {/* User Info Footer */}
            <div style={{ padding:"12px 14px", background:"rgba(255,255,255,0.02)", borderTop:"0.5px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", gap:6, flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <div style={S.pname}>Rahul Kumar</div>
                  <div style={S.prole}>Applicant · You</div>
                </div>
                {userSpeaking && <div style={S.ringGreen} />}
              </div>

              {/* Speech not supported fallback */}
              {!speechSupported && (
                <div style={{ fontSize:9, color:"#fbbf24", textAlign:"center", padding:"4px 6px", lineHeight:1.5, background:"rgba(251,191,36,0.05)", borderRadius:4 }}>
                  Speech not supported. Use Chrome or Edge.
                </div>
              )}
 
              {/* Live mic status */}
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:6 }}>
                <div style={{ marginBottom:0 }}>
                  <MicBadge speechState={speechState} micBlocked={micBlocked} />
                </div>
                <div style={{ ...S.micRow, marginBottom:0, ...(userSpeaking ? S.micRowGreen : {}), flex:1, justifyContent:"center" }}>
                  <div style={{ ...S.dot, ...(userSpeaking ? S.dotGreen : {}) }} />
                  {userSpeaking
                    ? <><span>Speaking</span><SpeakingBars color="#4ade80" /></>
                    : speechState === "processing" ? "Processing…"
                    : speechState === "responding" ? "Wait…"
                    : "Listening…"}
                </div>
              </div>
            </div>
          </div>
 
          {/* FLOATING CONTROLS PILL */}
          <div style={S.floatBar}>
            <CtrlBtn
              icon={<MicIcon off={muted} />}
              label={muted ? "Unmute" : "Mute"}
              onClick={handleToggleMute}
              variant={muted ? "muted" : "default"}
            />
            <CtrlBtn
              icon={<VideoIcon off={!videoOn} />}
              label={videoOn ? "Stop Video" : "Start Video"}
              onClick={() => setVideoOn(v => !v)}
              variant={videoOn ? "active" : "default"}
            />
            <CtrlBtn
              icon={<PhoneOffIcon />}
              label="End Call"
              onClick={handleEndCall}
              variant="end"
              labelColor="#f87171"
            />
            <CtrlBtn icon={<DotsIcon />} label="More" variant="default" />
          </div>
 
        </div>
      </div>
    </>
  );
}
 
// ─── STYLES ──────────────────────────────────────────────────
const S = {
  root:        { display:"flex", flexDirection:"column", height:"100vh", background:"#0a0a10", fontFamily:"'Inter',system-ui,sans-serif", color:"#fff", overflow:"hidden" },
  topbar:      { display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 20px", background:"rgba(255,255,255,0.02)", borderBottom:"0.5px solid rgba(255,255,255,0.06)", flexShrink:0 },
  recDot:      { width:8, height:8, borderRadius:"50%", background:"#ef4444", animation:"mi-red 1.4s ease-in-out infinite" },
  badge:       { padding:"4px 12px", borderRadius:999, background:"rgba(109,74,255,0.15)", border:"0.5px solid rgba(109,74,255,0.3)", fontSize:11, fontWeight:600, color:"#a78bfa" },
  main:        { flex:1, display:"flex", gap:0, padding:"14px 12px 12px", minHeight:0, position:"relative" },
  panel:       { flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"flex-start", gap:8, padding:"14px 8px", borderRadius:14, background:"rgba(255,255,255,0.02)", border:"0.5px solid rgba(255,255,255,0.06)", position:"relative", minWidth:0, transition:"all .3s ease" },
  panelPurple: { borderColor:"rgba(109,74,255,0.4)", background:"rgba(109,74,255,0.04)", boxShadow:"0 0 0 1px rgba(109,74,255,0.15)" },
  panelGreen:  { borderColor:"rgba(16,185,129,0.4)",  background:"rgba(16,185,129,0.04)", boxShadow:"0 0 0 1px rgba(16,185,129,0.13)" },
  avatar:      { width:72, height:72, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, fontWeight:700, flexShrink:0 },
  avOfficer:   { background:"rgba(109,74,255,0.15)", border:"2px solid rgba(109,74,255,0.35)", color:"#a78bfa" },
  avUser:      { background:"rgba(16,185,129,0.13)",  border:"2px solid rgba(16,185,129,0.3)",  color:"#34d399" },
  ringPurple:  { position:"absolute", inset:-6, borderRadius:"50%", border:"2px solid rgba(109,74,255,0.5)", animation:"mi-ring 1.2s ease-in-out infinite", zIndex:1 },
  ringGreen:   { position:"absolute", inset:-6, borderRadius:"50%", border:"2px solid rgba(16,185,129,0.5)",  animation:"mi-ring 1.2s ease-in-out infinite", zIndex:1 },
  pname:       { fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.82)", textAlign:"center" },
  prole:       { fontSize:10, color:"rgba(255,255,255,0.28)", textAlign:"center" },
  micRow:      { display:"flex", alignItems:"center", gap:5, padding:"3px 9px", borderRadius:999, fontSize:10, fontWeight:500, background:"rgba(255,255,255,0.04)", border:"0.5px solid rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.35)", transition:"all .3s" },
  micRowPurple:{ borderColor:"rgba(109,74,255,0.22)", color:"rgba(200,200,255,0.75)" },
  micRowGreen: { borderColor:"rgba(16,185,129,0.22)", color:"rgba(180,255,210,0.75)" },
  dot:         { width:5, height:5, borderRadius:"50%", background:"rgba(255,255,255,0.18)", transition:"all .3s" },
  dotGreen:    { background:"#4ade80", animation:"mi-green .8s ease-in-out infinite" },
  dotPurple:   { background:"#a78bfa", animation:"mi-green .8s ease-in-out infinite" },
  centerCol:   { width:28, flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:5 },
  divLine:     { width:"0.5px", flex:1, background:"rgba(255,255,255,0.07)" },
  aiDot:       { width:22, height:22, borderRadius:"50%", background:"linear-gradient(135deg,#6d4aff,#a855f7)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 },
  feed:        { flex:"0 0 270px", maxWidth:290, minWidth:180, display:"flex", flexDirection:"column", gap:7, overflowY:"auto", background:"transparent", padding:"10px 6px 80px" },
  bubbleAI:    { padding:"8px 12px", background:"rgba(13,17,23,0.55)", border:"0.5px solid rgba(255,255,255,0.09)", borderRadius:"3px 10px 10px 10px", fontSize:11.5, color:"rgba(255,255,255,0.78)", lineHeight:1.62, backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" },
  bubbleUser:  { padding:"8px 12px", background:"rgba(79,58,191,0.55)", border:"0.5px solid rgba(124,58,237,0.3)", borderRadius:"10px 10px 3px 10px", fontSize:11.5, color:"rgba(255,255,255,0.9)", lineHeight:1.62, backdropFilter:"blur(6px)", WebkitBackdropFilter:"blur(6px)" },
  floatBar:    { position:"absolute", bottom:14, left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"center", justifyContent:"center", gap:10, background:"rgba(10,10,18,0.84)", backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", border:"0.5px solid rgba(255,255,255,0.1)", borderRadius:999, padding:"7px 16px", zIndex:10, whiteSpace:"nowrap" },
  actionBtn:   v => ({ padding:"8px 18px", borderRadius:8, fontSize:12, fontWeight:500, cursor:"pointer", fontFamily:"Inter,system-ui,sans-serif", border: v==="purple"?"0.5px solid rgba(109,74,255,0.3)":"0.5px solid rgba(255,255,255,0.08)", background: v==="purple"?"rgba(109,74,255,0.14)":"rgba(255,255,255,0.05)", color: v==="purple"?"#a78bfa":"rgba(255,255,255,0.45)" }),
};
 
// ─── GLOBAL CSS ──────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
      html, body, #root { height:100%; }
      body { font-family:'Inter',system-ui,sans-serif; background:#0a0a10; overflow:hidden; }
      @keyframes mi-red   { 0%,100%{opacity:1;transform:scale(1)}   50%{opacity:.45;transform:scale(.8)} }
      @keyframes mi-ring  { 0%,100%{transform:scale(1);opacity:.55}  50%{transform:scale(1.07);opacity:1} }
      @keyframes mi-green { 0%,100%{opacity:1}                        50%{opacity:.35} }
      @keyframes mi-in    { from{opacity:0;transform:translateY(5px)} to{opacity:1;transform:translateY(0)} }
      @keyframes mi-dot   { 0%,100%{opacity:.25;transform:scale(.7)}  50%{opacity:1;transform:scale(1)} }
      @keyframes mi-bar   { 0%,100%{height:4px}                       50%{height:14px} }
      ::-webkit-scrollbar       { width:2px; }
      ::-webkit-scrollbar-thumb { background:rgba(255,255,255,0.07); border-radius:999px; }
      button { font-family:inherit; }
    `}</style>
  );
}
