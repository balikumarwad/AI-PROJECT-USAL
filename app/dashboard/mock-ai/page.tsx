import { useState } from "react";
 
// ─── DATA ───────────────────────────────────────────────────────────────────
 
const OFFICERS = {
  beginner: [
    { initials: "MA", name: "Marcus", style: "Warm & Encouraging", diff: "Easy", diffClass: "easy", rating: "4.8", cnt: "1,240", desc: "Friendly, patient approach for first-time applicants. Focuses on building confidence with basic questions.", bg: "rgba(34,201,122,0.15)", color: "#22c97a" },
    { initials: "EL", name: "Elena", style: "Gentle & Supportive", diff: "Easy", diffClass: "easy", rating: "4.7", cnt: "980", desc: "Nurturing style that eases anxiety. Great for applicants who need extra reassurance.", bg: "rgba(79,127,255,0.15)", color: "#4f7fff" },
    { initials: "TJ", name: "Tyler", style: "Clear & Simple", diff: "Easy", diffClass: "easy", rating: "4.6", cnt: "1,105", desc: "Uses plain language and explains common pitfalls. Ideal for beginners unfamiliar with visa norms.", bg: "rgba(29,233,182,0.15)", color: "#1de9b6" },
    { initials: "AM", name: "Amara", style: "Patient & Educational", diff: "Easy", diffClass: "easy", rating: "4.9", cnt: "870", desc: "Thorough explanations after each answer. Helps you understand what officers are really looking for.", bg: "rgba(240,165,0,0.15)", color: "#f0a500" },
  ],
  intermediate: [
    { initials: "RO", name: "Rohan", style: "Friendly & Professional", diff: "Medium", diffClass: "medium", rating: "4.9", cnt: "892", desc: "Friendly yet professional approach with focus on educational goals. Balanced challenge.", bg: "rgba(240,165,0,0.15)", color: "#f0a500" },
    { initials: "LI", name: "Lily", style: "Future Plans Focus", diff: "Medium", diffClass: "medium", rating: "4.8", cnt: "1,456", desc: "Deep dives into future plans and intentions. Tests consistency in your story.", bg: "rgba(79,127,255,0.15)", color: "#4f7fff" },
    { initials: "HA", name: "Hana", style: "Academic Background", diff: "Medium", diffClass: "medium", rating: "4.8", cnt: "1,247", desc: "Verifies academic background and motivations. Pushes for specific details.", bg: "rgba(29,233,182,0.15)", color: "#1de9b6" },
    { initials: "NE", name: "Neha", style: "Technical Program Expert", diff: "Medium", diffClass: "medium", rating: "4.7", cnt: "1,034", desc: "Specializes in technical program expertise. Excellent for STEM visa categories.", bg: "rgba(34,201,122,0.15)", color: "#22c97a" },
  ],
  advanced: [
    { initials: "DK", name: "Drake", style: "Pressure Testing", diff: "Hard", diffClass: "hard", rating: "4.5", cnt: "2,156", desc: "Advanced questioning techniques and curveball scenarios. Will probe for inconsistencies.", bg: "rgba(255,92,92,0.15)", color: "#ff5c5c" },
    { initials: "SA", name: "Sava", style: "Pressure Handling", diff: "Hard", diffClass: "hard", rating: "4.5", cnt: "1,789", desc: "Designed for high-pressure simulation. Tests emotional composure and answer clarity under stress.", bg: "rgba(255,92,92,0.15)", color: "#ff5c5c" },
    { initials: "VK", name: "Viktor", style: "Detail Scrutiny", diff: "Hard", diffClass: "hard", rating: "4.4", cnt: "1,322", desc: "Dissects every detail of your application. Exposes gaps in financial and travel documentation.", bg: "rgba(255,140,59,0.15)", color: "#ff8c3b" },
    { initials: "PR", name: "Priya", style: "Cross-Examination", diff: "Hard", diffClass: "hard", rating: "4.6", cnt: "998", desc: "Repeats and rephrases questions to catch contradictions. Simulates strict consulate officers.", bg: "rgba(255,92,92,0.15)", color: "#ff5c5c" },
  ],
  expert: [
    { initials: "NV", name: "Nova", style: "Elite Simulation", diff: "Expert", diffClass: "expert", rating: "4.9", cnt: "640", desc: "Hyper-realistic simulation of the most demanding visa interviews. Minimal tolerance for vague answers.", bg: "rgba(108,99,255,0.15)", color: "#6c63ff" },
    { initials: "ZX", name: "Zara", style: "Rapid-Fire Mode", diff: "Expert", diffClass: "expert", rating: "4.8", cnt: "510", desc: "Fires rapid consecutive questions with no pause. Stress-tests your recall and response speed.", bg: "rgba(108,99,255,0.15)", color: "#6c63ff" },
    { initials: "KO", name: "Koen", style: "Legal Precision", diff: "Expert", diffClass: "expert", rating: "5.0", cnt: "390", desc: "Demands legally precise and consistent answers. Best for complex family or employment visas.", bg: "rgba(79,127,255,0.15)", color: "#4f7fff" },
    { initials: "IX", name: "Iris", style: "Psychological Probe", diff: "Expert", diffClass: "expert", rating: "4.9", cnt: "455", desc: "Uses silence, neutral expressions, and unexpected pauses to test psychological stability.", bg: "rgba(108,99,255,0.15)", color: "#6c63ff" },
  ],
};
 
const VISA_TYPES = [
  { key: "tourist",  label: "🌍 Tourist / B-2",  name: "Tourist / B-2",   desc: "For travel, tourism & family visits. Officers test genuine visitor intent and ties to home country.", rate: "34%", duration: "1–2 min", qs: "6–10",  total: "3,210", tips: ["Speak clearly and confidently", "State your purpose early", "Keep answers concise", "Mention ties to home country"] },
  { key: "student",  label: "🎓 Student / F-1",   name: "Student / F-1",   desc: "For full-time academic programs at accredited institutions. Officers verify enrollment intent and financial support.", rate: "42%", duration: "2–4 min", qs: "8–14",  total: "4,880", tips: ["Have I-20 details memorized", "Explain your study plan clearly", "Prove financial self-sufficiency", "Show intent to return home"] },
  { key: "work",     label: "💼 Work / H-1B",     name: "Work / H-1B",     desc: "Specialty occupation visa requiring employer sponsorship. Officers assess role qualifications and employer legitimacy.", rate: "28%", duration: "3–5 min", qs: "10–16", total: "2,340", tips: ["Know your LCA and petition details", "Explain how role is specialized", "Understand employer business", "Have approval notice ready"] },
  { key: "business", label: "🏢 Business / B-1",  name: "Business / B-1",  desc: "Short-term business activities including meetings and conferences. Officers probe company role and trip scope.", rate: "38%", duration: "1–3 min", qs: "7–12",  total: "1,760", tips: ["Clarify no US income will be earned", "Bring invitation letters", "State exact duration", "Show strong home country ties"] },
  { key: "family",   label: "❤️ Family / CR-1",   name: "Family / CR-1",   desc: "Spousal immigrant visa for US citizen petitioners. Officers evaluate relationship authenticity and documentation.", rate: "55%", duration: "4–7 min", qs: "12–20", total: "1,430", tips: ["Bring all relationship evidence", "Know your petitioner details", "Be ready for personal questions", "Remain calm and honest"] },
  { key: "exchange", label: "🔄 Exchange / J-1",  name: "Exchange / J-1",  desc: "Cultural exchange and educational program visas. Officers confirm program details and intent to return.", rate: "48%", duration: "2–3 min", qs: "7–11",  total: "990",   tips: ["Know your DS-2019 details", "Explain program goals clearly", "Show home country connections", "Understand 2-year rule if applicable"] },
];
 
const LEVELS = [
  { key: "beginner",     label: "Beginner",     cls: "beginner" },
  { key: "intermediate", label: "Intermediate", cls: "intermediate" },
  { key: "advanced",     label: "Advanced",     cls: "advanced" },
  { key: "expert",       label: "Expert",       cls: "expert" },
];
 
// ─── STYLES ─────────────────────────────────────────────────────────────────
 
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
 
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
 
  .vp-root {
    --bg:       #0d0f14;
    --surface:  #161920;
    --surface2: #1e2230;
    --surface3: #252a3a;
    --border:   rgba(255,255,255,0.07);
    --border2:  rgba(255,255,255,0.13);
    --text:     #eef0f6;
    --muted:    #7a8299;
    --accent:   #4f7fff;
    --accent2:  #6c63ff;
    --gold:     #f0a500;
    --green:    #22c97a;
    --red:      #ff5c5c;
    --orange:   #ff8c3b;
    --teal:     #1de9b6;
    --font:     'Syne', sans-serif;
    --mono:     'DM Mono', monospace;
    background: var(--bg);
    color: var(--text);
    font-family: var(--font);
    font-size: 14px;
    line-height: 1.5;
    min-height: 100vh;
    display: grid;
    grid-template-columns: 200px 1fr 260px;
  }
 
  /* ── SIDEBAR ── */
  .vp-sidebar {
    background: var(--surface);
    border-right: 1px solid var(--border);
    padding: 20px 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  .vp-logo {
    display: flex; align-items: center; gap: 8px;
    padding: 0 18px 24px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 16px;
  }
  .vp-logo-icon {
    width: 30px; height: 30px;
    background: var(--accent); border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; color: #fff;
  }
  .vp-logo-text { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; }
  .vp-nav-section { padding: 0 10px 16px; }
  .vp-nav-label {
    font-size: 10px; letter-spacing: 1.5px; color: var(--muted);
    text-transform: uppercase; padding: 0 8px 8px;
  }
  .vp-nav-item {
    display: flex; align-items: center; gap: 9px;
    padding: 8px 10px; border-radius: 8px;
    color: var(--muted); cursor: pointer; font-size: 13px;
    transition: all 0.15s; margin-bottom: 2px;
    font-family: var(--font); background: none; border: none; width: 100%; text-align: left;
  }
  .vp-nav-item:hover { background: var(--surface2); color: var(--text); }
  .vp-nav-item.active { background: rgba(79,127,255,0.12); color: var(--accent); }
  .vp-pro-badge {
    background: rgba(79,127,255,0.2); color: var(--accent);
    font-size: 9px; padding: 1px 5px; border-radius: 4px; margin-left: 2px;
  }
  .vp-spacer { flex: 1; }
  .vp-user-row {
    display: flex; align-items: center; gap: 10px;
    padding: 14px 18px; border-top: 1px solid var(--border);
  }
  .vp-user-avatar {
    width: 30px; height: 30px; border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0;
  }
  .vp-user-name { font-size: 12px; font-weight: 500; }
  .vp-user-plan { font-size: 11px; color: var(--muted); }
 
  /* ── MAIN ── */
  .vp-main {
    background: var(--bg);
    padding: 28px 28px 40px;
    overflow-y: auto;
  }
  .vp-page-title { font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
  .vp-page-sub { color: var(--muted); font-size: 13px; margin-top: 3px; margin-bottom: 22px; }
 
  /* ── VISA TABS ── */
  .vp-visa-tabs { display: flex; gap: 8px; margin-bottom: 22px; flex-wrap: wrap; }
  .vp-visa-tab {
    padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600;
    cursor: pointer; border: 1px solid var(--border2); color: var(--muted);
    transition: all 0.15s; font-family: var(--font); background: none;
  }
  .vp-visa-tab:hover { border-color: var(--accent); color: var(--accent); }
  .vp-visa-tab.active { background: var(--accent); border-color: var(--accent); color: #fff; }
 
  /* ── LEVEL PILLS ── */
  .vp-level-label { font-size: 11px; color: var(--muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px; }
  .vp-levels-row { display: flex; gap: 8px; margin-bottom: 22px; }
  .vp-level-pill {
    padding: 5px 14px; border-radius: 6px; font-size: 12px; font-weight: 600;
    cursor: pointer; border: 1px solid var(--border2); color: var(--muted);
    transition: all 0.15s; font-family: var(--font); background: none;
  }
  .vp-level-pill:hover { color: var(--text); border-color: var(--border2); }
  .vp-level-pill.beginner.active     { background: rgba(34,201,122,0.15); border-color: var(--green);  color: var(--green); }
  .vp-level-pill.intermediate.active { background: rgba(240,165,0,0.15);  border-color: var(--gold);   color: var(--gold); }
  .vp-level-pill.advanced.active     { background: rgba(255,92,92,0.15);  border-color: var(--red);    color: var(--red); }
  .vp-level-pill.expert.active       { background: rgba(108,99,255,0.15); border-color: var(--accent2); color: var(--accent2); }
 
  /* ── SELECTED CARD ── */
  .vp-selected-card {
    background: var(--surface); border: 1px solid var(--border2);
    border-radius: 14px; padding: 18px 20px; margin-bottom: 16px;
    display: flex; align-items: flex-start; gap: 16px;
  }
  .vp-sel-avatar {
    width: 52px; height: 52px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 16px; flex-shrink: 0; transition: all 0.2s;
  }
  .vp-sel-info { flex: 1; }
  .vp-sel-name-row { display: flex; align-items: center; gap: 8px; }
  .vp-sel-name { font-size: 17px; font-weight: 700; }
  .vp-sel-style { color: var(--muted); font-size: 12px; margin-top: 2px; }
  .vp-sel-rating { display: flex; align-items: center; gap: 6px; margin-top: 6px; }
  .vp-stars { color: var(--gold); font-size: 13px; }
  .vp-rating-num { font-size: 12px; color: var(--muted); }
  .vp-sel-desc {
    font-size: 12px; color: var(--muted); margin-top: 10px;
    padding-top: 10px; border-top: 1px solid var(--border);
  }
 
  /* ── DIFF BADGE ── */
  .vp-diff {
    font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 4px;
  }
  .vp-diff.easy       { background: rgba(34,201,122,0.15); color: var(--green); }
  .vp-diff.medium     { background: rgba(240,165,0,0.15);  color: var(--gold); }
  .vp-diff.hard       { background: rgba(255,92,92,0.15);  color: var(--red); }
  .vp-diff.expert     { background: rgba(108,99,255,0.15); color: var(--accent2); }
 
  /* ── START BUTTON ── */
  .vp-start-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: var(--accent); color: #fff; border: none; border-radius: 10px;
    padding: 12px 20px; font-size: 14px; font-weight: 600; cursor: pointer;
    width: 100%; margin-bottom: 22px; font-family: var(--font);
    transition: opacity 0.15s;
  }
  .vp-start-btn:hover { opacity: 0.88; }
 
  /* ── OFFICERS GRID ── */
  .vp-section-title { font-size: 14px; font-weight: 600; margin-bottom: 4px; }
  .vp-section-sub   { font-size: 12px; color: var(--muted); margin-bottom: 14px; }
  .vp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
  .vp-officer-card {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 14px; cursor: pointer;
    transition: all 0.15s;
  }
  .vp-officer-card:hover  { border-color: var(--border2); background: var(--surface2); }
  .vp-officer-card.active { border-color: var(--accent); background: rgba(79,127,255,0.07); }
  .vp-oc-top { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .vp-oc-avatar {
    width: 36px; height: 36px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; flex-shrink: 0;
  }
  .vp-oc-name { font-size: 13px; font-weight: 600; }
  .vp-oc-desc { font-size: 11px; color: var(--muted); margin-top: 2px; }
  .vp-oc-footer { display: flex; align-items: center; gap: 6px; margin-top: 8px; }
  .vp-oc-stars { color: var(--gold); font-size: 10px; }
  .vp-oc-cnt  { font-size: 10px; color: var(--muted); }
 
  /* ── RIGHT PANEL ── */
  .vp-right {
    background: var(--surface); border-left: 1px solid var(--border);
    padding: 24px 20px; display: flex; flex-direction: column; gap: 20px;
  }
  .vp-stats-title {
    font-size: 14px; font-weight: 600;
    display: flex; align-items: center; gap: 7px; margin-bottom: 14px;
  }
  .vp-stat-val {
    font-size: 28px; font-weight: 700; font-family: var(--mono); line-height: 1;
  }
  .vp-stat-val.green  { color: var(--green); }
  .vp-stat-val.accent { color: var(--accent); }
  .vp-stat-val.gold   { color: var(--gold); }
  .vp-stat-label { font-size: 11px; color: var(--muted); margin-top: 3px; margin-bottom: 14px; }
  .vp-divider { height: 1px; background: var(--border); }
  .vp-history-btn {
    display: flex; align-items: center; justify-content: center; gap: 6px;
    border: 1px solid var(--border2); border-radius: 8px; padding: 9px;
    font-size: 12px; color: var(--muted); cursor: pointer; background: none;
    font-family: var(--font); transition: all 0.15s; width: 100%;
  }
  .vp-history-btn:hover { background: var(--surface2); color: var(--text); }
  .vp-visa-info {
    background: var(--surface2); border-radius: 10px; padding: 14px;
  }
  .vp-vi-label { font-size: 10px; letter-spacing: 1px; text-transform: uppercase; color: var(--muted); margin-bottom: 8px; }
  .vp-vi-name  { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
  .vp-vi-desc  { font-size: 11px; color: var(--muted); line-height: 1.6; }
  .vp-tips-title { font-weight: 600; color: var(--text); font-size: 12px; margin-bottom: 8px; }
  .vp-tips-list  { font-size: 11px; color: var(--muted); line-height: 1.9; }
`;
 
// ─── ICONS ──────────────────────────────────────────────────────────────────
 
const IconGrid = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
);
const IconClock = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/>
  </svg>
);
const IconStar = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"/>
  </svg>
);
const IconEdit = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M12 20h9M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
  </svg>
);
const IconBook = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
  </svg>
);
const IconFile = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/>
  </svg>
);
const IconUser = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconLock = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
);
const IconActivity = () => (
  <svg width="15" height="15" fill="none" stroke="var(--accent)" strokeWidth="2" viewBox="0 0 24 24">
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
);
const IconPlay = () => (
  <svg width="16" height="16" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
    <polygon points="5,3 19,12 5,21"/>
  </svg>
);
 
// ─── COMPONENT ──────────────────────────────────────────────────────────────
 
export default function VisaProApp() {
  const [activeVisa, setActiveVisa]     = useState("tourist");
  const [activeLevel, setActiveLevel]   = useState("beginner");
  const [activeOfficer, setActiveOfficer] = useState(0);
 
  const visa    = VISA_TYPES.find(v => v.key === activeVisa);
  const officers = OFFICERS[activeLevel];
  const officer  = officers[activeOfficer];
 
  const handleVisaChange = (key) => {
    setActiveVisa(key);
  };
 
  const handleLevelChange = (key) => {
    setActiveLevel(key);
    setActiveOfficer(0);
  };
 
  return (
    <>
      <style>{css}</style>
      <div className="vp-root">
 
        {/* ── SIDEBAR ── */}
        <aside className="vp-sidebar">
          <div className="vp-logo">
            <div className="vp-logo-icon">V</div>
            <span className="vp-logo-text">VisaPro</span>
          </div>
 
          <div className="vp-nav-section">
            <div className="vp-nav-label">Interview Prep</div>
            <button className="vp-nav-item"><IconGrid /> Overview</button>
            <button className="vp-nav-item active"><IconClock /> Mock Interview</button>
            <button className="vp-nav-item"><IconStar /> Interview History</button>
            <button className="vp-nav-item">
              <IconEdit /> AI Prep Suite
              <span className="vp-pro-badge">Pro</span>
            </button>
          </div>
 
          <div className="vp-nav-section">
            <div className="vp-nav-label">Learning</div>
            <button className="vp-nav-item"><IconBook /> Question Bank</button>
            <button className="vp-nav-item"><IconFile /> Resources</button>
          </div>
 
          <div className="vp-spacer" />
 
          <div className="vp-nav-section">
            <div className="vp-nav-label">Account</div>
            <button className="vp-nav-item"><IconUser /> My Profile</button>
            <button className="vp-nav-item"><IconLock /> Subscription</button>
          </div>
 
          <div className="vp-user-row">
            <div className="vp-user-avatar">YS</div>
            <div>
              <div className="vp-user-name">Yaman Sarabariya</div>
              <div className="vp-user-plan">Pro Plan</div>
            </div>
          </div>
        </aside>
 
        {/* ── MAIN ── */}
        <main className="vp-main">
          <div className="vp-page-title">Mock Interview</div>
          <div className="vp-page-sub">Select visa type, difficulty level, and your officer</div>
 
          {/* Visa Type Tabs */}
          <div className="vp-visa-tabs">
            {VISA_TYPES.map(v => (
              <button
                key={v.key}
                className={`vp-visa-tab${activeVisa === v.key ? " active" : ""}`}
                onClick={() => handleVisaChange(v.key)}
              >
                {v.label}
              </button>
            ))}
          </div>
 
          {/* Level Pills */}
          <div className="vp-level-label">Difficulty</div>
          <div className="vp-levels-row">
            {LEVELS.map(lv => (
              <button
                key={lv.key}
                className={`vp-level-pill ${lv.cls}${activeLevel === lv.key ? " active" : ""}`}
                onClick={() => handleLevelChange(lv.key)}
              >
                {lv.label}
              </button>
            ))}
          </div>
 
          {/* Selected Officer Card */}
          <div className="vp-selected-card">
            <div
              className="vp-sel-avatar"
              style={{ background: officer.bg, color: officer.color }}
            >
              {officer.initials}
            </div>
            <div className="vp-sel-info">
              <div className="vp-sel-name-row">
                <span className="vp-sel-name">Officer {officer.name}</span>
                <span className={`vp-diff ${officer.diffClass}`}>{officer.diff}</span>
              </div>
              <div className="vp-sel-style">{officer.style}</div>
              <div className="vp-sel-rating">
                <span className="vp-stars">★★★★★</span>
                <span className="vp-rating-num">{officer.rating} · {officer.cnt} interviews</span>
              </div>
              <div className="vp-sel-desc">{officer.desc}</div>
            </div>
          </div>
 
          {/* Start Button */}
          <button className="vp-start-btn">
            <IconPlay />
            Start Interview with {officer.name}
          </button>
 
          {/* Officers Grid */}
          <div className="vp-section-title">Choose a Different Officer</div>
          <div className="vp-section-sub">
            {LEVELS.find(l => l.key === activeLevel)?.label} level officers for {visa.name}
          </div>
          <div className="vp-grid">
            {officers.map((o, i) => (
              <div
                key={o.initials}
                className={`vp-officer-card${activeOfficer === i ? " active" : ""}`}
                onClick={() => setActiveOfficer(i)}
              >
                <div className="vp-oc-top">
                  <div className="vp-oc-avatar" style={{ background: o.bg, color: o.color }}>
                    {o.initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="vp-oc-name">Officer {o.name}</div>
                    <div className="vp-oc-desc">{o.style}</div>
                  </div>
                  <span className={`vp-diff ${o.diffClass}`}>{o.diff}</span>
                </div>
                <div className="vp-oc-footer">
                  <span className="vp-oc-stars">★★★★★</span>
                  <span className="vp-oc-cnt">{o.rating} · {o.cnt}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
 
        {/* ── RIGHT PANEL ── */}
        <aside className="vp-right">
          <div>
            <div className="vp-stats-title">
              <IconActivity />
              Interview Stats
            </div>
            <div className="vp-stat-val green">{visa.rate}</div>
            <div className="vp-stat-label">Avg Success Rate</div>
 
            <div className="vp-stat-val accent">{visa.duration}</div>
            <div className="vp-stat-label">Typical Duration</div>
 
            <div className="vp-stat-val gold">{visa.qs}</div>
            <div className="vp-stat-label">Questions Asked</div>
 
            <div className="vp-stat-val">{visa.total}</div>
            <div className="vp-stat-label">Total Interviews</div>
          </div>
 
          <div className="vp-divider" />
 
          <button className="vp-history-btn">View Interview History →</button>
 
          <div className="vp-visa-info">
            <div className="vp-vi-label">Current Visa Type</div>
            <div className="vp-vi-name">{visa.name}</div>
            <div className="vp-vi-desc">{visa.desc}</div>
          </div>
 
          <div className="vp-divider" />
 
          <div>
            <div className="vp-tips-title">Tips for This Level</div>
            <div className="vp-tips-list">
              {visa.tips.map((tip, i) => (
                <div key={i}>· {tip}</div>
              ))}
            </div>
          </div>
        </aside>
 
      </div>
    </>
  );
}