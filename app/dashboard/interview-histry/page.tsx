import { useState, useEffect, useRef } from "react";
 
// ── Data ────────────────────────────────────────────────────────────────────
const SESSIONS = [
  {
    id: 1, date: "Jan 15, 2026", label: "Session 1 — First Mock",
    officer: "David Thompson", officerKey: "DT", duration: 27, questions: 7, score: 45,
    hesitations: 18, tier: "weak",
    highlights: ["No preparation felt", "18 hesitations", "Starting point"],
    highlightTypes: ["red", "red", "amber"],
  },
  {
    id: 2, date: "Jan 30, 2026", label: "Session 2",
    officer: "Sarah Reynolds", officerKey: "SR", duration: 22, questions: 7, score: 55,
    hesitations: 16, tier: "weak",
    highlights: ["Uni ranking unknown", "High hesitation 16×"],
    highlightTypes: ["red", "red"],
  },
  {
    id: 3, date: "Feb 14, 2026", label: "Session 3",
    officer: "Mike Kaplan", officerKey: "MK", duration: 20, questions: 7, score: 60,
    hesitations: 15, tier: "amber",
    highlights: ["Tough officer style", "Probed on funding"],
    highlightTypes: ["red", "amber"],
  },
  {
    id: 4, date: "Feb 28, 2026", label: "Session 4 — Best Session",
    officer: "David Thompson", officerKey: "DT", duration: 26, questions: 9, score: 74,
    hesitations: 13, tier: "green",
    highlights: ["Best confidence yet", "Modules prepared", "Hesitation dropped"],
    highlightTypes: ["green", "green", "amber"],
  },
  {
    id: 5, date: "Mar 8, 2026", label: "Session 5",
    officer: "Sarah Reynolds", officerKey: "SR", duration: 23, questions: 8, score: 65,
    hesitations: 12, tier: "amber",
    highlights: ["Return plan vague", "Communication up"],
    highlightTypes: ["amber", "green"],
  },
  {
    id: 6, date: "Mar 15, 2026", label: "Session 6 — Latest",
    officer: "David Thompson", officerKey: "DT", duration: 24, questions: 8, score: 67,
    hesitations: 10, tier: "amber",
    highlights: ["Uni knowledge weak", "Finance strong", "Study gap unclear"],
    highlightTypes: ["amber", "green", "red"],
  },
];
 
const OFFICERS = [
  { key: "DT", name: "David Thompson", sessions: 3, avgMin: 24, avgScore: 71, trend: "up", color: "green" },
  { key: "SR", name: "Sarah Reynolds", sessions: 2, avgMin: 22, avgScore: 58, trend: "down", color: "amber" },
  { key: "MK", name: "Mike Kaplan",    sessions: 1, avgMin: 20, avgScore: 52, trend: "down", color: "red" },
];
 
const SKILLS = [
  { name: "Communication",      score: 74, badge: "Strong",  color: "green", note: "Consistently above average · clear sentences · good structure" },
  { name: "University Knowledge", score: 48, badge: "Weak",  color: "red",   note: "Biggest weak point · module names, ranking, campus often missed" },
  { name: "Confidence",         score: 63, badge: "Average", color: "amber", note: "Improving · voice steadier in recent sessions · eye contact better" },
  { name: "Research Depth",     score: 52, badge: "Weak",    color: "red",   note: "Vague on course details, scholarship, living costs in sessions 1–4" },
  { name: "Answer Quality",     score: 67, badge: "Average", color: "amber", note: "Good on finance, weak on return plan and study gap explanation" },
  { name: "Fluency",            score: 61, badge: "Average", color: "amber", note: "Umm count falling each session · pause technique improving slowly" },
];
 
const Q_CATEGORIES = [
  { col: "green", title: "Strong ✓",         items: ["Funding & finance","English proficiency","Visa/travel history","Why study abroad"] },
  { col: "amber", title: "Average — improve", items: ["Academic background","Confidence in tone","Career motivation","Future goals (general)"] },
  { col: "red",   title: "Weak — urgent",     items: ["University knowledge","Course module names","Study gap explanation","Return plan (specific)"] },
  { col: "blue",  title: "Fix Today",         items: ["Memorise QS ranking","Know 5 module names","Prepare gap answer","Name one professor"] },
];
 
const TIPS_IMMEDIATE = [
  { icon: "📚", title: "University knowledge", priority: "High", color: "red",
    desc: "Memorise: QS ranking, 5 module names, professor name, campus city, tuition fee exact amount. Failed this 4 out of 6 sessions." },
  { icon: "🗒️", title: "Study gap answer", priority: "High", color: "red",
    desc: "Write a 2-sentence explanation. Practice aloud 10 times daily. Officer probed this 3 times — it's a red flag for them." },
  { icon: "🎯", title: "Return plan — be specific", priority: "Medium", color: "amber",
    desc: "Name a role, industry, or family business you will return to. Vague answers raise suspicion." },
];
 
const TIPS_ONGOING = [
  { icon: "🗣️", title: "Reduce umm/err", priority: "Medium", color: "amber",
    desc: "Down from 18 to 10 — great progress. Pause silently instead. Record yourself once a day and count hesitations." },
  { icon: "💬", title: "Keep up communication quality", priority: null, color: "green",
    desc: "Your strongest area at 74/100. Keep structuring answers: point → reason → example. Do not lose this." },
  { icon: "🔁", title: "Book session with Mike Kaplan again", priority: null, color: "blue",
    desc: "Your lowest score was with him (52). His tough style is good practice — improving there builds real confidence." },
];
 
const PRACTICE = [
  { label: "Uni research",  pct: 90, color: "#C1440E", textColor: "#E8856A" },
  { label: "Return plan",   pct: 80, color: "#D4770F", textColor: "#E8C96A" },
  { label: "Gap answer",    pct: 75, color: "#D4770F", textColor: "#E8C96A" },
  { label: "Fluency drills",pct: 50, color: "#2D6A4F", textColor: "#52B788" },
  { label: "Mock sessions", pct: 40, color: "#2D6A4F", textColor: "#52B788" },
];
 
// ── Palette helpers ──────────────────────────────────────────────────────────
const C = {
  green:  { bg: "#E8F5EE", text: "#2D6A4F", bar: "#2D6A4F" },
  amber:  { bg: "#FFF4E5", text: "#D4770F", bar: "#D4770F" },
  red:    { bg: "#FEF0EA", text: "#C1440E", bar: "#C1440E" },
  blue:   { bg: "#E6EEF8", text: "#1B4A8A", bar: "#1B4A8A" },
  gray:   { bg: "#F0EEE8", text: "#5F5E5A", bar: "#5F5E5A" },
};
 
const scoreColor = (s) => s >= 70 ? C.green.text : s >= 60 ? C.amber.text : C.red.text;
const tierDot    = (t) => t === "green" ? "#52B788" : t === "amber" ? "#C9A84C" : "#C1440E";
 
// ── Mini line chart (SVG) ────────────────────────────────────────────────────
function ScoreChart() {
  const scores = SESSIONS.map(s => s.score);
  const labels = SESSIONS.map(s => s.date.split(",")[0]);
  const W = 460, H = 140, PAD = { t: 16, r: 16, b: 28, l: 32 };
  const minS = 30, maxS = 100;
  const xs = scores.map((_, i) => PAD.l + (i / (scores.length - 1)) * (W - PAD.l - PAD.r));
  const ys = scores.map(s => PAD.t + ((maxS - s) / (maxS - minS)) * (H - PAD.t - PAD.b));
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${ys[i].toFixed(1)}`).join(" ");
  const area = `${path} L${xs[xs.length-1].toFixed(1)},${(H-PAD.b).toFixed(1)} L${xs[0].toFixed(1)},${(H-PAD.b).toFixed(1)} Z`;
  const gridLines = [40, 60, 80, 100];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: H }}>
      {gridLines.map(v => {
        const y = PAD.t + ((maxS - v) / (maxS - minS)) * (H - PAD.t - PAD.b);
        return (
          <g key={v}>
            <line x1={PAD.l} y1={y} x2={W - PAD.r} y2={y} stroke="rgba(28,26,23,0.07)" strokeWidth={0.5} />
            <text x={PAD.l - 6} y={y + 4} fontSize={9} fill="#8A877F" textAnchor="end">{v}</text>
          </g>
        );
      })}
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#C9A84C" stopOpacity={0.18} />
          <stop offset="100%" stopColor="#C9A84C" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#areaGrad)" />
      <path d={path} fill="none" stroke="#C9A84C" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {xs.map((x, i) => (
        <g key={i}>
          <circle cx={x} cy={ys[i]} r={4.5} fill="#C9A84C" stroke="#fff" strokeWidth={2} />
          <text x={x} y={H - 4} fontSize={9} fill="#8A877F" textAnchor="middle">{labels[i]}</text>
        </g>
      ))}
    </svg>
  );
}
 
// ── Bar component ─────────────────────────────────────────────────────────────
function Bar({ pct, color = "#2D6A4F", height = 7 }) {
  return (
    <div style={{ height, background: "rgba(28,26,23,0.07)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4 }} />
    </div>
  );
}
 
// ── Avatar ────────────────────────────────────────────────────────────────────
function Avatar({ initials, color = "blue" }) {
  return (
    <div style={{
      width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
      background: C[color].bg, color: C[color].text,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 12, fontWeight: 600,
    }}>{initials}</div>
  );
}
 
// ── Pill ──────────────────────────────────────────────────────────────────────
function Pill({ text, color = "amber" }) {
  return (
    <span style={{
      fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 8,
      background: C[color].bg, color: C[color].text,
    }}>{text}</span>
  );
}
 
// ── Section title ─────────────────────────────────────────────────────────────
function SectionTitle({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 14px" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(28,26,23,0.10)" }} />
      <span style={{ fontSize: 11, fontWeight: 500, color: "#8A877F", textTransform: "uppercase", letterSpacing: "0.07em", whiteSpace: "nowrap" }}>{children}</span>
      <div style={{ flex: 1, height: 1, background: "rgba(28,26,23,0.10)" }} />
    </div>
  );
}
 
// ── Card ──────────────────────────────────────────────────────────────────────
function Card({ children, style = {} }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid rgba(28,26,23,0.10)",
      borderRadius: 16, ...style,
    }}>{children}</div>
  );
}
 
function CardTitle({ children, right }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
      <span style={{ fontSize: 11, fontWeight: 500, color: "#8A877F", textTransform: "uppercase", letterSpacing: "0.07em" }}>{children}</span>
      {right}
    </div>
  );
}
 
// ── Main component ────────────────────────────────────────────────────────────
export default function InterviewHistory() {
  const [activeFilter, setActiveFilter] = useState("All");
 
  const avgScore = Math.round(SESSIONS.reduce((a, s) => a + s.score, 0) / SESSIONS.length);
  const totalMin = SESSIONS.reduce((a, s) => a + s.duration, 0);
  const avgHes   = Math.round(SESSIONS.reduce((a, s) => a + s.hesitations, 0) / SESSIONS.length);
  const successPct = Math.round((SESSIONS.filter(s => s.score >= 60).length / SESSIONS.length) * 100);
 
  const styles = {
    page: {
      fontFamily: "'DM Sans', system-ui, sans-serif",
      background: "#F7F5F0",
      minHeight: "100vh",
      color: "#1C1A17",
    },
    inner: { maxWidth: 980, margin: "0 auto", padding: "28px 20px 60px" },
    topnav: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 },
    h1: { fontFamily: "Georgia, serif", fontSize: 26, fontWeight: 400, margin: 0 },
    sub: { fontSize: 12, color: "#8A877F", marginTop: 2 },
    navPills: { display: "flex", gap: 8 },
    kpiRow: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14, marginBottom: 24 },
    mainGrid: { display: "grid", gridTemplateColumns: "1fr 300px", gap: 20, marginBottom: 24 },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 24 },
    ummSection: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 },
    qaGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 14 },
    tipsSection: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 },
  };
 
  return (
    <div style={styles.page}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
 
      <div style={styles.inner}>
 
        {/* TOP NAV */}
        <div style={styles.topnav}>
          <div>
            <h1 style={styles.h1}>Interview History</h1>
            <div style={styles.sub}>UK Student Visa — All Sessions Overview</div>
          </div>
          <div style={styles.navPills}>
            {["All", "2025", "2026"].map(f => (
              <button key={f} onClick={() => setActiveFilter(f)} style={{
                fontSize: 12, fontWeight: 500, padding: "6px 16px", borderRadius: 20,
                border: "1px solid rgba(28,26,23,0.12)", cursor: "pointer",
                background: activeFilter === f ? "#1C1A17" : "transparent",
                color: activeFilter === f ? "#fff" : "#4A4740",
                transition: "all .2s",
              }}>{f}</button>
            ))}
          </div>
        </div>
 
        {/* KPI ROW */}
        <div style={styles.kpiRow}>
          {[
            { label: "Total Interviews", val: "6", delta: "↑ 3 this month", up: true },
            { label: "Average Score", val: `${avgScore}`, unit: "/100", delta: "↑ +8 from start", up: true, valColor: "#D4770F" },
            { label: "Success Rate", val: `${successPct}`, unit: "%", delta: "↑ improving", up: true, valColor: "#2D6A4F" },
            { label: "Total Time", val: `${totalMin}`, unit: " min", delta: "across 6 sessions", up: null },
            { label: "Avg. Hesitations", val: `${avgHes}`, unit: "×", delta: "↓ was 18 at start", up: true, valColor: "#D4770F" },
          ].map((k, i) => (
            <Card key={i} style={{ padding: "16px 18px" }}>
              <div style={{ fontSize: 10, color: "#8A877F", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{k.label}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 30, lineHeight: 1, color: k.valColor || "#1C1A17" }}>
                {k.val}<span style={{ fontSize: 11, color: "#8A877F" }}>{k.unit}</span>
              </div>
              <div style={{ fontSize: 11, marginTop: 4, color: k.up === true ? "#2D6A4F" : k.up === false ? "#C1440E" : "#8A877F" }}>{k.delta}</div>
            </Card>
          ))}
        </div>
 
        {/* CHART + OFFICERS */}
        <div style={styles.mainGrid}>
          <Card style={{ padding: "22px 24px" }}>
            <CardTitle right={<span style={{ fontSize: 11, color: "#2D6A4F", background: "#E8F5EE", padding: "2px 10px", borderRadius: 8, fontWeight: 500 }}>+22 pts growth</span>}>
              Score Progress Over Time
            </CardTitle>
            <ScoreChart />
          </Card>
 
          <Card style={{ padding: 20 }}>
            <CardTitle>By Visa Officer</CardTitle>
            {OFFICERS.map((o, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < OFFICERS.length - 1 ? "1px solid rgba(28,26,23,0.08)" : "none" }}>
                <Avatar initials={o.key} color={o.color} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{o.name}</div>
                  <div style={{ fontSize: 11, color: "#8A877F" }}>{o.sessions} sessions · avg {o.avgMin} min</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 22, color: C[o.color].text }}>{o.avgScore}</div>
                  <div style={{ fontSize: 10, color: o.trend === "up" ? "#2D6A4F" : "#C1440E" }}>
                    {o.trend === "up" ? "↑ best score" : "↓ needs work"}
                  </div>
                </div>
              </div>
            ))}
          </Card>
        </div>
 
        {/* SKILLS */}
        <SectionTitle>Skill-by-Skill Analysis</SectionTitle>
        <div style={styles.skillsGrid}>
          {SKILLS.map((sk, i) => (
            <Card key={i} style={{ padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{sk.name}</span>
                <span style={{ fontSize: 10, fontWeight: 500, padding: "2px 8px", borderRadius: 8, background: C[sk.color].bg, color: C[sk.color].text }}>{sk.badge}</span>
              </div>
              <Bar pct={sk.score} color={C[sk.color].bar} />
              <div style={{ fontSize: 11, color: "#8A877F", marginTop: 8, lineHeight: 1.5 }}>{sk.note}</div>
            </Card>
          ))}
        </div>
 
        {/* UMM + QUESTION STATS */}
        <div style={styles.ummSection}>
          <Card style={{ padding: "20px 22px" }}>
            <CardTitle>Hesitation Tracker (umm/err per session)</CardTitle>
            {SESSIONS.map((s, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "90px 1fr 36px", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#4A4740" }}>Session {s.id}</span>
                <Bar pct={(s.hesitations / 18) * 100} color="#D4770F" height={7} />
                <span style={{ fontSize: 12, fontWeight: 500, textAlign: "right", color: i === SESSIONS.length - 1 ? "#2D6A4F" : "#D4770F" }}>{s.hesitations}×</span>
              </div>
            ))}
          </Card>
 
          <Card style={{ padding: "20px 22px" }}>
            <CardTitle>Question Stats</CardTitle>
            {[
              { label: "Total Qs asked",   pct: 100, val: "46",    color: "#1B4A8A", textColor: "#1B4A8A" },
              { label: "Avg Qs/session",   pct: 76,  val: "7.7",   color: "#1B4A8A", textColor: "#1B4A8A" },
              { label: "Avg answer time",  pct: 52,  val: "2.1m",  color: "#1B4A8A", textColor: "#1B4A8A" },
              { label: "Best answered",    pct: 88,  val: "Finance",color: "#2D6A4F", textColor: "#2D6A4F" },
              { label: "Worst answered",   pct: 45,  val: "Uni info",color: "#C1440E",textColor: "#C1440E" },
              { label: "Follow-up probes", pct: 60,  val: "11×",   color: "#D4770F", textColor: "#D4770F" },
            ].map((row, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 52px", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: "#4A4740" }}>{row.label}</span>
                <Bar pct={row.pct} color={row.color} height={7} />
                <span style={{ fontSize: 12, fontWeight: 500, textAlign: "right", color: row.textColor }}>{row.val}</span>
              </div>
            ))}
          </Card>
        </div>
 
        {/* TIMELINE */}
        <SectionTitle>Session Timeline</SectionTitle>
        <Card style={{ padding: "22px 24px", marginBottom: 24 }}>
          {SESSIONS.slice().reverse().map((s, i, arr) => (
            <div key={s.id} style={{ display: "grid", gridTemplateColumns: "110px 28px 1fr auto", gap: "0 12px", padding: "14px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(28,26,23,0.08)" : "none" }}>
              <div style={{ fontSize: 12, color: "#8A877F", paddingTop: 2 }}>{s.date}</div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: tierDot(s.tier), flexShrink: 0 }} />
                {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: "rgba(28,26,23,0.10)", marginTop: 4, minHeight: 30 }} />}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: "#8A877F", marginBottom: 6 }}>Officer: {s.officer} · {s.duration} min · {s.questions} questions</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {s.highlights.map((h, j) => <Pill key={j} text={h} color={s.highlightTypes[j]} />)}
                </div>
              </div>
              <div style={{ textAlign: "right", paddingTop: 2 }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 24, color: scoreColor(s.score) }}>{s.score}</div>
                <div style={{ fontSize: 10, color: "#8A877F" }}>/100</div>
              </div>
            </div>
          ))}
        </Card>
 
        {/* Q ANALYSIS */}
        <Card style={{ padding: "22px 24px", marginBottom: 24 }}>
          <CardTitle>Question Category Performance — across all sessions</CardTitle>
          <div style={styles.qaGrid}>
            {Q_CATEGORIES.map((cat, i) => (
              <div key={i} style={{ borderRadius: 12, padding: "14px 16px", border: "1px solid rgba(28,26,23,0.08)", background: C[cat.col].bg + "88" }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: C[cat.col].text, marginBottom: 8 }}>{cat.title}</div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {cat.items.map((item, j) => (
                    <li key={j} style={{ fontSize: 11, color: "#4A4740", padding: "3px 0", display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 4, height: 4, borderRadius: "50%", background: C[cat.col].text, flexShrink: 0, display: "inline-block" }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Card>
 
        {/* PRACTICE METER */}
        <div style={{ background: "linear-gradient(135deg,#1C1A17 0%,#3A3730 100%)", borderRadius: 16, padding: "24px 28px", color: "#fff", display: "flex", gap: 28, alignItems: "center", marginBottom: 24 }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, fontWeight: 400, marginBottom: 6 }}>Practice Recommendation</h3>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, maxWidth: 360, margin: 0 }}>
              Based on 6 sessions, you need focused daily practice on university knowledge and return plan. Fluency is improving naturally — keep the daily speaking habit going.
            </p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, minWidth: 220 }}>
            {PRACTICE.map((p, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr 32px", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{p.label}</span>
                <div style={{ height: 5, background: "rgba(255,255,255,0.15)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${p.pct}%`, background: p.color, borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 500, textAlign: "right", color: p.textColor }}>{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
 
        {/* TIPS */}
        <SectionTitle>Key Improvement Tips</SectionTitle>
        <div style={styles.tipsSection}>
          {[
            { title: "Immediate — fix this week", tips: TIPS_IMMEDIATE },
            { title: "Ongoing — keep practising",  tips: TIPS_ONGOING },
          ].map((group, gi) => (
            <Card key={gi} style={{ padding: "20px 22px" }}>
              <CardTitle>{group.title}</CardTitle>
              {group.tips.map((tip, ti) => (
                <div key={ti} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: ti < group.tips.length - 1 ? "1px solid rgba(28,26,23,0.08)" : "none" }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: C[tip.color].bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{tip.icon}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: "#1C1A17", marginBottom: 2 }}>
                      {tip.title}
                      {tip.priority && (
                        <span style={{ fontSize: 9, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em", padding: "1px 6px", borderRadius: 4, marginLeft: 6, background: C[tip.color].bg, color: C[tip.color].text }}>{tip.priority}</span>
                      )}
                    </div>
                    <div style={{ fontSize: 12, color: "#8A877F", lineHeight: 1.5 }}>{tip.desc}</div>
                  </div>
                </div>
              ))}
            </Card>
          ))}
        </div>
 
      </div>
    </div>
  );
}