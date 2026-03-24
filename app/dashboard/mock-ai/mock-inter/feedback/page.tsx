<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Mock Interview Feedback</title>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0;}
  :root{
    --bg:#0D0D0F;
    --bg2:#141417;
    --bg3:#1A1A1F;
    --bg4:#202027;
    --border:rgba(255,255,255,0.07);
    --border2:rgba(255,255,255,0.12);
    --ink:#F0EEE8;
    --ink2:#A9A7A0;
    --ink3:#646260;
    --gold:#D4A94E;
    --gold2:#F0CC72;
    --green:#3ECF8E;
    --green-bg:rgba(62,207,142,0.08);
    --green-border:rgba(62,207,142,0.18);
    --red:#F87171;
    --red-bg:rgba(248,113,113,0.08);
    --red-border:rgba(248,113,113,0.18);
    --amber:#FCA441;
    --amber-bg:rgba(252,164,65,0.08);
    --blue:#60A5FA;
    --pill-good-bg:rgba(62,207,142,0.12);
    --pill-avg-bg:rgba(252,164,65,0.12);
    --pill-weak-bg:rgba(248,113,113,0.12);
  }
  body{
    font-family:'DM Sans',sans-serif;
    background:var(--bg);
    color:var(--ink);
    min-height:100vh;
  }
 
  /* Subtle grid bg */
  body::before{
    content:'';
    position:fixed;top:0;left:0;right:0;bottom:0;
    background-image:
      linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
      linear-gradient(90deg,rgba(255,255,255,0.015) 1px, transparent 1px);
    background-size:40px 40px;
    pointer-events:none;z-index:0;
  }
 
  .page{max-width:940px;margin:0 auto;padding:32px 20px 64px;position:relative;z-index:1;}
 
  /* ── TOP BAR ── */
  .top-bar{
    display:flex;justify-content:space-between;align-items:flex-start;
    border-bottom:1px solid var(--border);padding-bottom:20px;margin-bottom:28px;
  }
  .top-bar h1{
    font-family:'Syne',sans-serif;font-size:22px;font-weight:700;
    color:var(--ink);letter-spacing:-0.01em;
  }
  .top-bar .sub{font-size:12px;color:var(--ink3);margin-top:4px;}
  .badge-officer{
    background:var(--bg3);border:1px solid var(--border2);
    color:var(--ink2);font-size:11px;font-weight:500;letter-spacing:0.04em;
    padding:7px 14px;border-radius:20px;display:flex;align-items:center;gap:7px;
    white-space:nowrap;
  }
  .badge-officer .dot{width:7px;height:7px;border-radius:50%;background:var(--gold);flex-shrink:0;}
 
  /* ── VERDICT BANNER ── */
  .verdict-bar{
    background:var(--bg3);
    border:1px solid var(--border2);
    border-radius:18px;padding:26px 30px;
    margin-bottom:24px;
    display:flex;justify-content:space-between;align-items:center;
    position:relative;overflow:hidden;
  }
  .verdict-bar::before{
    content:'';position:absolute;top:0;right:0;
    width:300px;height:100%;
    background:radial-gradient(ellipse at 100% 50%, rgba(212,169,78,0.08) 0%, transparent 70%);
    pointer-events:none;
  }
  .verdict-bar h2{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;margin-bottom:6px;color:var(--ink);}
  .verdict-bar p{font-size:13px;color:var(--ink2);max-width:400px;line-height:1.65;}
  .verdict-score{text-align:right;flex-shrink:0;margin-left:24px;}
  .verdict-score .big{font-family:'Syne',sans-serif;font-size:52px;font-weight:800;color:var(--gold2);line-height:1;}
  .verdict-score .lbl{font-size:11px;color:var(--ink3);margin-top:3px;letter-spacing:0.05em;text-transform:uppercase;}
  .verdict-badge{
    display:inline-block;margin-top:8px;
    background:var(--amber-bg);border:1px solid rgba(252,164,65,0.25);
    color:var(--amber);font-size:11px;font-weight:600;letter-spacing:0.04em;
    padding:3px 10px;border-radius:10px;text-transform:uppercase;
  }
 
  /* ── SCORE SECTION ── */
  .score-section{display:grid;grid-template-columns:210px 1fr;gap:18px;margin-bottom:20px;}
  .ring-wrap{
    background:var(--bg3);border:1px solid var(--border);border-radius:16px;
    display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px 16px;
  }
  .ring-label{font-size:10px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:10px;}
  .ring-verdict-tag{
    font-size:11px;font-weight:600;color:var(--amber);
    background:var(--amber-bg);border:1px solid rgba(252,164,65,0.2);
    padding:3px 10px;border-radius:8px;margin-top:10px;
  }
 
  .cats{background:var(--bg3);border:1px solid var(--border);border-radius:16px;padding:22px 24px;}
  .cats-title{font-size:10px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:18px;}
  .cat-row{display:grid;grid-template-columns:148px 1fr 38px;align-items:center;gap:14px;margin-bottom:14px;}
  .cat-name{font-size:12px;color:var(--ink2);}
  .bar-bg{height:6px;background:rgba(255,255,255,0.06);border-radius:3px;overflow:hidden;}
  .bar-fill{height:100%;border-radius:3px;}
  .cat-score{font-size:12px;font-weight:600;text-align:right;}
 
  /* ── STATS ── */
  .stats-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;}
  .stat-card{
    background:var(--bg3);border:1px solid var(--border);border-radius:14px;
    padding:18px 20px;
  }
  .stat-label{font-size:10px;color:var(--ink3);text-transform:uppercase;letter-spacing:0.06em;margin-bottom:8px;}
  .stat-value{font-family:'Syne',sans-serif;font-size:30px;font-weight:700;color:var(--ink);line-height:1;}
  .stat-unit{font-size:12px;color:var(--ink3);font-weight:400;}
 
  /* ── SECTION HEADER ── */
  .section-header{
    display:flex;align-items:center;gap:12px;margin:32px 0 16px;
    font-size:10px;font-weight:600;color:var(--ink3);text-transform:uppercase;letter-spacing:0.1em;
  }
  .section-header::before,.section-header::after{content:'';flex:1;height:1px;background:var(--border);}
 
  /* ── Q&A CARDS ── */
  .qa-card{
    background:var(--bg3);border:1px solid var(--border);
    border-radius:14px;margin-bottom:12px;overflow:hidden;
    transition:border-color 0.2s;
  }
  .qa-card:hover{border-color:var(--border2);}
  .qa-card.open{border-color:var(--border2);}
 
  .qa-header{
    display:flex;align-items:center;gap:14px;padding:16px 20px;
    cursor:pointer;user-select:none;
    border-bottom:1px solid transparent;transition:border-color 0.2s;
  }
  .qa-card.open .qa-header{border-color:var(--border);}
 
  .qa-num{
    width:30px;height:30px;border-radius:50%;border:1px solid var(--border2);
    font-size:11px;font-weight:600;color:var(--ink3);
    display:flex;align-items:center;justify-content:center;flex-shrink:0;
    font-family:'Syne',sans-serif;
  }
  .qa-question{flex:1;font-size:14px;font-weight:500;color:var(--ink);}
  .qa-meta{display:flex;align-items:center;gap:10px;flex-shrink:0;}
  .qa-score-pill{font-size:11px;font-weight:600;padding:3px 10px;border-radius:8px;}
  .pill-good{background:var(--pill-good-bg);color:var(--green);}
  .pill-avg{background:var(--pill-avg-bg);color:var(--amber);}
  .pill-weak{background:var(--pill-weak-bg);color:var(--red);}
  .qa-time{font-size:11px;color:var(--ink3);}
  .qa-chevron{font-size:18px;color:var(--ink3);transition:transform 0.25s;line-height:1;}
  .qa-card.open .qa-chevron{transform:rotate(90deg);}
 
  .qa-body{padding:0 20px;max-height:0;overflow:hidden;transition:max-height 0.4s ease,padding 0.2s;}
  .qa-card.open .qa-body{max-height:700px;padding:18px 20px;}
 
  /* ── ANSWER SIGNALS (top tags) ── */
  .answer-signals{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px;}
  .signal-tag{
    display:inline-flex;align-items:center;gap:5px;
    font-size:10px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;
    padding:4px 10px;border-radius:8px;
  }
  .signal-tag.memorised{background:rgba(62,207,142,0.1);color:var(--green);border:1px solid rgba(62,207,142,0.2);}
  .signal-tag.ai-sounding{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.2);}
  .signal-tag.natural{background:rgba(96,165,250,0.1);color:var(--blue);border:1px solid rgba(96,165,250,0.2);}
  .signal-tag.vague{background:rgba(252,164,65,0.1);color:var(--amber);border:1px solid rgba(252,164,65,0.2);}
  .signal-tag.structured{background:rgba(62,207,142,0.1);color:var(--green);border:1px solid rgba(62,207,142,0.2);}
  .signal-tag.rehearsed{background:rgba(248,113,113,0.1);color:var(--red);border:1px solid rgba(248,113,113,0.2);}
 
  .qa-answer-block{
    font-size:13px;color:var(--ink2);line-height:1.75;margin-bottom:16px;
    background:var(--bg4);border:1px solid var(--border);border-radius:10px;padding:14px 16px;
  }
  .qa-answer-block strong{color:var(--ink);font-weight:500;}
 
  .insight-row{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;}
  .insight-box{border-radius:10px;padding:14px 16px;}
  .insight-box.mistakes{background:var(--red-bg);border:1px solid var(--red-border);}
  .insight-box.improve{background:var(--green-bg);border:1px solid var(--green-border);}
  .insight-title{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:10px;}
  .insight-box.mistakes .insight-title{color:var(--red);}
  .insight-box.improve .insight-title{color:var(--green);}
  .insight-list{list-style:none;}
  .insight-list li{
    font-size:12px;color:var(--ink2);padding:4px 0;
    display:flex;align-items:flex-start;gap:7px;line-height:1.5;
  }
  .insight-list li::before{
    content:'';display:inline-block;width:5px;height:5px;border-radius:50%;
    flex-shrink:0;margin-top:5px;
  }
  .insight-box.mistakes .insight-list li::before{background:var(--red);}
  .insight-box.improve .insight-list li::before{background:var(--green);}
 
  .hesitation-row{font-size:12px;color:var(--ink3);padding-top:4px;}
  .umm-tag{
    display:inline-block;background:rgba(252,164,65,0.12);border:1px solid rgba(252,164,65,0.2);
    color:var(--amber);font-size:10px;font-weight:600;padding:2px 8px;border-radius:6px;margin-right:4px;
  }
 
  /* ── TIPS GRID ── */
  .tips-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
  .tip-card{
    background:var(--bg3);border:1px solid var(--border);border-radius:14px;padding:20px 22px;
    transition:border-color 0.2s;
  }
  .tip-card:hover{border-color:var(--border2);}
  .tip-icon{font-size:22px;margin-bottom:12px;}
  .tip-title{font-size:13px;font-weight:600;color:var(--ink);margin-bottom:6px;font-family:'Syne',sans-serif;}
  .tip-text{font-size:12px;color:var(--ink2);line-height:1.7;}
 
  @media(max-width:640px){
    .score-section{grid-template-columns:1fr;}
    .stats-row{grid-template-columns:1fr 1fr;}
    .tips-grid{grid-template-columns:1fr;}
    .insight-row{grid-template-columns:1fr;}
    .verdict-bar{flex-direction:column;gap:16px;}
    .verdict-score{text-align:left;margin-left:0;}
  }
</style>
</head>
<body>
<div class="page">
 
  <!-- Top bar -->
  <div class="top-bar">
    <div>
      <h1>Mock Interview Feedback</h1>
      <div class="sub">Student Visa Interview &nbsp;·&nbsp; March 15, 2026 &nbsp;·&nbsp; 24 min session</div>
    </div>
    <div class="badge-officer"><span class="dot"></span> Officer: David Thompson</div>
  </div>
 
  <!-- Verdict banner -->
  <div class="verdict-bar">
    <div>
      <h2>Overall Performance</h2>
      <p>Solid foundation, but improvement needed in research depth and reducing hesitation. With focused practice, visa interview performance can improve significantly.</p>
      <span class="verdict-badge">Needs Improvement</span>
    </div>
    <div class="verdict-score">
      <div class="big">67</div>
      <div class="lbl">out of 100</div>
    </div>
  </div>
 
  <!-- Score ring + categories -->
  <div class="score-section">
    <div class="ring-wrap">
      <div class="ring-label">Overall Score</div>
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.06)" stroke-width="10"/>
        <circle cx="60" cy="60" r="50" fill="none" stroke="#D4A94E" stroke-width="10"
          stroke-dasharray="314" stroke-dashoffset="103" stroke-linecap="round"
          transform="rotate(-90 60 60)"/>
        <text x="60" y="66" text-anchor="middle" font-family="Syne,sans-serif" font-size="26" font-weight="700" fill="#F0EEE8">67</text>
      </svg>
      <div class="ring-verdict-tag">Needs Improvement</div>
    </div>
 
    <div class="cats">
      <div class="cats-title">Category Breakdown</div>
      <div class="cat-row">
        <div class="cat-name">Communication</div>
        <div class="bar-bg"><div class="bar-fill" style="width:72%;background:#3ECF8E"></div></div>
        <div class="cat-score" style="color:#3ECF8E">72</div>
      </div>
      <div class="cat-row">
        <div class="cat-name">Confidence</div>
        <div class="bar-bg"><div class="bar-fill" style="width:65%;background:#D4A94E"></div></div>
        <div class="cat-score" style="color:#D4A94E">65</div>
      </div>
      <div class="cat-row">
        <div class="cat-name">Research Depth</div>
        <div class="bar-bg"><div class="bar-fill" style="width:55%;background:#FCA441"></div></div>
        <div class="cat-score" style="color:#FCA441">55</div>
      </div>
      <div class="cat-row">
        <div class="cat-name">Answer Quality</div>
        <div class="bar-bg"><div class="bar-fill" style="width:70%;background:#3ECF8E"></div></div>
        <div class="cat-score" style="color:#3ECF8E">70</div>
      </div>
      <div class="cat-row">
        <div class="cat-name">Fluency</div>
        <div class="bar-bg"><div class="bar-fill" style="width:60%;background:#FCA441"></div></div>
        <div class="cat-score" style="color:#FCA441">60</div>
      </div>
      <div class="cat-row">
        <div class="cat-name">University Knowledge</div>
        <div class="bar-bg"><div class="bar-fill" style="width:50%;background:#F87171"></div></div>
        <div class="cat-score" style="color:#F87171">50</div>
      </div>
    </div>
  </div>
 
  <!-- Stats row -->
  <div class="stats-row">
    <div class="stat-card">
      <div class="stat-label">Interview Duration</div>
      <div class="stat-value">24 <span class="stat-unit">min</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Questions Asked</div>
      <div class="stat-value">8</div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Avg. Answer Time</div>
      <div class="stat-value">2.1 <span class="stat-unit">min</span></div>
    </div>
    <div class="stat-card">
      <div class="stat-label">Hesitation (umm)</div>
      <div class="stat-value" style="color:var(--amber)">14 <span class="stat-unit">times</span></div>
    </div>
  </div>
 
  <!-- Q&A -->
  <div class="section-header">Question-by-Question Feedback</div>
 
  <!-- Q1 -->
  <div class="qa-card" id="q1">
    <div class="qa-header" onclick="toggleQ('q1')">
      <div class="qa-num">1</div>
      <div class="qa-question">Why do you want to study in the UK?</div>
      <div class="qa-meta">
        <span class="qa-score-pill pill-good">80/100</span>
        <span class="qa-time">2 min 10 sec</span>
        <span class="qa-chevron">›</span>
      </div>
    </div>
    <div class="qa-body">
      <div class="answer-signals">
        <span class="signal-tag natural">🟢 Natural Delivery</span>
        <span class="signal-tag structured">✅ Structured</span>
        <span class="signal-tag vague">⚠️ Slightly Generic</span>
      </div>
      <div class="qa-answer-block">
        <strong>Your answer summary:</strong> Mentioned quality of education, career opportunities, and personal growth. Answer was structured and clear. Good eye contact maintained. However, it felt like a practised answer — officers hear "quality education" and "career growth" dozens of times per day. You didn't stand out.
      </div>
      <div class="insight-row">
        <div class="insight-box mistakes">
          <div class="insight-title">❌ Mistakes</div>
          <ul class="insight-list">
            <li>Too generic — "quality education" is said by every applicant</li>
            <li>Did not compare UK vs other countries (why not Canada, Australia?)</li>
            <li>No mention of Graduate Route (2-year post-study work visa)</li>
            <li>No personal story or specific connection to UK</li>
          </ul>
        </div>
        <div class="insight-box improve">
          <div class="insight-title">✅ How to Improve</div>
          <ul class="insight-list">
            <li>Add a specific reason: UK specialises in X, your field is ranked there</li>
            <li>Compare: "UK offers what Nepal/India cannot yet — X research environment"</li>
            <li>Mention the 2-year Graduate Route as part of your plan</li>
            <li>Add a personal story: professor, research paper, or event that drew you</li>
          </ul>
        </div>
      </div>
      <div class="hesitation-row">Hesitations: <span class="umm-tag">umm ×2</span></div>
    </div>
  </div>
 
  <!-- Q2 -->
  <div class="qa-card" id="q2">
    <div class="qa-header" onclick="toggleQ('q2')">
      <div class="qa-num">2</div>
      <div class="qa-question">Tell me about your university and chosen course.</div>
      <div class="qa-meta">
        <span class="qa-score-pill pill-weak">45/100</span>
        <span class="qa-time">1 min 50 sec</span>
        <span class="qa-chevron">›</span>
      </div>
    </div>
    <div class="qa-body">
      <div class="answer-signals">
        <span class="signal-tag ai-sounding">🔴 Sounded Unprepared</span>
        <span class="signal-tag vague">⚠️ Vague Facts</span>
        <span class="signal-tag rehearsed">⚠️ Hesitant Throughout</span>
      </div>
      <div class="qa-answer-block">
        <strong>Your answer summary:</strong> Could not name faculty/department head. Did not know the course module names. Mentioned the university ranking but was unsure of the exact number. Spoke hesitantly throughout. This is the single most important question — officers use it to verify genuine intent. You must know your own university better than this.
      </div>
      <div class="insight-row">
        <div class="insight-box mistakes">
          <div class="insight-title">❌ Mistakes</div>
          <ul class="insight-list">
            <li>Did not know specific modules or course structure — critical failure</li>
            <li>Unsure of university QS ranking — major red flag to officers</li>
            <li>No mention of campus city, location, or cost of living</li>
            <li>Could not name a professor or research group — shows no real research</li>
            <li>No mention of student support, campus life, or facilities</li>
          </ul>
        </div>
        <div class="insight-box improve">
          <div class="insight-title">✅ How to Improve</div>
          <ul class="insight-list">
            <li>Memorise: exact QS ranking, 4–5 module names, course duration</li>
            <li>Know the city, nearest airport, cost of living breakdown</li>
            <li>Research at least one professor from your department — name them</li>
            <li>Read the course prospectus page 3–4 times before real interview</li>
            <li>Practice saying: "My course at [Uni] covers X, Y, Z in year 1..."</li>
          </ul>
        </div>
      </div>
      <div class="hesitation-row">Hesitations: <span class="umm-tag">umm ×5</span> — highest in session</div>
    </div>
  </div>
 
  <!-- Q3 -->
  <div class="qa-card" id="q3">
    <div class="qa-header" onclick="toggleQ('q3')">
      <div class="qa-num">3</div>
      <div class="qa-question">How will you fund your studies?</div>
      <div class="qa-meta">
        <span class="qa-score-pill pill-good">78/100</span>
        <span class="qa-time">2 min 30 sec</span>
        <span class="qa-chevron">›</span>
      </div>
    </div>
    <div class="qa-body">
      <div class="answer-signals">
        <span class="signal-tag natural">🟢 Confident Delivery</span>
        <span class="signal-tag structured">✅ Specific Amount Mentioned</span>
        <span class="signal-tag vague">⚠️ No Cost Breakdown</span>
      </div>
      <div class="qa-answer-block">
        <strong>Your answer summary:</strong> Clearly explained family sponsorship and savings. Mentioned exact bank balance amount — this is good and shows preparation. Spoke with reasonable confidence. However you did not explain how you arrived at the total funding figure, and officers want to see you've calculated realistic costs.
      </div>
      <div class="insight-row">
        <div class="insight-box mistakes">
          <div class="insight-title">❌ Mistakes</div>
          <ul class="insight-list">
            <li>Did not mention scholarship as a backup or supplementary option</li>
            <li>No breakdown of how total cost was calculated (tuition + living)</li>
            <li>Did not reference CAS letter confirming fee amount</li>
          </ul>
        </div>
        <div class="insight-box improve">
          <div class="insight-title">✅ How to Improve</div>
          <ul class="insight-list">
            <li>Break down clearly: tuition (£X) + accommodation (£X) + living (£X/month)</li>
            <li>Mention CAS letter and official fee amount from university</li>
            <li>If eligible, mention any partial scholarship or bursary</li>
          </ul>
        </div>
      </div>
      <div class="hesitation-row">Hesitations: <span class="umm-tag">umm ×1</span></div>
    </div>
  </div>
 
  <!-- Q4 -->
  <div class="qa-card" id="q4">
    <div class="qa-header" onclick="toggleQ('q4')">
      <div class="qa-num">4</div>
      <div class="qa-question">What are your plans after completing your degree?</div>
      <div class="qa-meta">
        <span class="qa-score-pill pill-avg">62/100</span>
        <span class="qa-time">1 min 45 sec</span>
        <span class="qa-chevron">›</span>
      </div>
    </div>
    <div class="qa-body">
      <div class="answer-signals">
        <span class="signal-tag ai-sounding">🔴 Sounded AI-Written</span>
        <span class="signal-tag vague">⚠️ No Specific Plan</span>
        <span class="signal-tag rehearsed">⚠️ Officer Asked Follow-up</span>
      </div>
      <div class="qa-answer-block">
        <strong>Your answer summary:</strong> Stated intention to return to Nepal and work in a relevant field. However, the answer was vague with no specific job role, company type, or industry mentioned. The officer asked a follow-up question — this means your first answer was not convincing. Officers are specifically looking for reasons you WILL return to Nepal. Vague answers raise suspicion.
      </div>
      <div class="insight-row">
        <div class="insight-box mistakes">
          <div class="insight-title">❌ Mistakes</div>
          <ul class="insight-list">
            <li>"I will work in Nepal in my field" is not convincing — every applicant says this</li>
            <li>No specific career goal, role, or employer type mentioned</li>
            <li>Did not show strong ties to Nepal (family, property, career network)</li>
            <li>Answer triggered a follow-up — officer was not satisfied</li>
          </ul>
        </div>
        <div class="insight-box improve">
          <div class="insight-title">✅ How to Improve</div>
          <ul class="insight-list">
            <li>State a specific goal: "I plan to join X type of firm / start my own practice in Y"</li>
            <li>Mention ties: family business, family home, sibling/parents in Nepal</li>
            <li>Show officer you have a clear reason to return — not stay in UK</li>
            <li>Example: "My father's business needs someone with UK-trained X skills"</li>
          </ul>
        </div>
      </div>
      <div class="hesitation-row">Hesitations: <span class="umm-tag">umm ×3</span></div>
    </div>
  </div>
 
  <!-- Q5–8 -->
  <div class="qa-card" id="q5">
    <div class="qa-header" onclick="toggleQ('q5')">
      <div class="qa-num">5–8</div>
      <div class="qa-question">Academic background, English proficiency, visa history, study gaps</div>
      <div class="qa-meta">
        <span class="qa-score-pill pill-avg">68/100</span>
        <span class="qa-time">~14 min total</span>
        <span class="qa-chevron">›</span>
      </div>
    </div>
    <div class="qa-body">
      <div class="answer-signals">
        <span class="signal-tag natural">🟢 Q6 & Q7 Good</span>
        <span class="signal-tag ai-sounding">🔴 Q8 High Risk</span>
        <span class="signal-tag vague">⚠️ Q5 Weak Connection</span>
      </div>
      <div class="qa-answer-block">
        <strong>Q5 — Academic background (72/100):</strong> Explained grades and subjects well. Could have connected past studies more directly to chosen UK course — officer wants a thread: "I studied X → that led me to Y → UK is the best place for Z."<br><br>
        <strong>Q6 — English proficiency (75/100):</strong> IELTS score clearly stated. No issues. Well answered.<br><br>
        <strong>Q7 — Visa / travel history (70/100):</strong> Clear and honest. Good.<br><br>
        <strong>Q8 — Study gap explanation (55/100):</strong> The explanation was weak and unclear. The officer probed twice — this is a red flag. A study gap without a clear, rehearsed explanation is one of the top reasons visas are rejected. This needs significant preparation before your real interview.
      </div>
      <div class="insight-row">
        <div class="insight-box mistakes">
          <div class="insight-title">❌ Key Mistakes (Q5–Q8)</div>
          <ul class="insight-list">
            <li>Study gap reason not clearly prepared — officer noticed hesitation</li>
            <li>Did not link academic background to future career goal (no thread)</li>
            <li>No supporting document reference during gap explanation</li>
            <li>Gap answer triggered two follow-ups — critical failure area</li>
          </ul>
        </div>
        <div class="insight-box improve">
          <div class="insight-title">✅ How to Improve</div>
          <ul class="insight-list">
            <li>Prepare a 2-sentence gap explanation — practice until fluent</li>
            <li>Reference gap year certificate or work letter if available</li>
            <li>Build the thread: past study → UK course → Nepal career plan</li>
            <li>Practice Q8 out loud 20 times until it sounds completely natural</li>
          </ul>
        </div>
      </div>
      <div class="hesitation-row">Hesitations: <span class="umm-tag">umm ×3</span></div>
    </div>
  </div>
 
  <!-- Priority Improvements -->
  <div class="section-header">Priority Improvements</div>
  <div class="tips-grid">
    <div class="tip-card">
      <div class="tip-icon">📚</div>
      <div class="tip-title">Research your university deeply</div>
      <div class="tip-text">Know your ranking, modules, campus city, at least one professor's name, and student union. Officer will test this — it is the #1 red flag if you don't know your own university well.</div>
    </div>
    <div class="tip-card">
      <div class="tip-icon">🗣️</div>
      <div class="tip-title">Reduce hesitation (umm/err)</div>
      <div class="tip-text">You said "umm" 14 times in 24 minutes. Practice answering out loud daily. Record yourself. Pause silently instead of filling with umm — silence sounds more confident than filler words.</div>
    </div>
    <div class="tip-card">
      <div class="tip-icon">🎯</div>
      <div class="tip-title">Sharpen your return plan</div>
      <div class="tip-text">Your post-study plan must be specific. Name an industry, role type, or family business you will return to. Officers look for genuine intent to return to Nepal after completing studies.</div>
    </div>
    <div class="tip-card">
      <div class="tip-icon">📝</div>
      <div class="tip-title">Prepare gap year answer</div>
      <div class="tip-text">This was your weakest moment. Write a 2–3 sentence explanation and memorise it. If you have a gap certificate or work letter, know exactly what it says and be ready to reference it.</div>
    </div>
  </div>
 
</div>
<script>
function toggleQ(id){
  const card=document.getElementById(id);
  card.classList.toggle('open');
}
</script>
</body>
</html>