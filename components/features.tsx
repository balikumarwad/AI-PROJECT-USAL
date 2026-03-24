'use client';

import { useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import { MessageCircle, Mic, BarChart2, GraduationCap, FileText, Target } from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// FEATURES DATA
// ─────────────────────────────────────────────────────────────
const features = [
  {
    id: 1,
    num: '01',
    tag: 'AI Counselor',
    icon: MessageCircle,
    title: 'Your Personal AI Counselor',
    description:
      'Get instant expert guidance available 24/7. Ask anything about SOPs, universities, visas, or applications and get personalized answers in seconds.',
    bullets: ['Available 24/7, no appointments', 'Personalized to your profile', 'Covers SOPs, visas & emails'],
    gradFrom: '#4F46E5',
    gradTo: '#8B5CF6',
    bgCard: '#0A0A14',
    accentColor: '#6366f1',
  },
  {
    id: 2,
    num: '02',
    tag: 'Mock Interview',
    icon: Mic,
    title: 'AI Mock Interview Practice',
    description:
      'Practice real US visa interview questions. Choose Easy, Hard, or Super Hard difficulty and get instant officer-style AI feedback after every answer.',
    bullets: ['Easy / Hard / Super Hard modes', 'Real visa officer questions', 'Instant AI feedback'],
    gradFrom: '#EC4899',
    gradTo: '#8B5CF6',
    bgCard: '#120512',
    accentColor: '#ec4899',
  },
  {
    id: 3,
    num: '03',
    tag: 'Answer Review',
    icon: BarChart2,
    title: 'AI Answer Review & Coaching',
    description:
      'Submit your visa interview answers and get detailed AI feedback — scored on clarity, confidence, and content with an AI-improved version side by side.',
    bullets: ['Scores clarity, confidence, content', 'Improvement tips per answer', 'Side-by-side comparison'],
    gradFrom: '#F59E0B',
    gradTo: '#EF4444',
    bgCard: '#140E00',
    accentColor: '#f59e0b',
  },
  {
    id: 4,
    num: '04',
    tag: 'SOP Generator',
    icon: FileText,
    title: 'AI-Powered SOP Writing',
    description:
      'Generate a professional, university-specific Statement of Purpose in minutes. Tailored to what admissions officers actually want to read.',
    bullets: ['Tailored per university', 'Highlights your strengths', 'Regenerate anytime'],
    gradFrom: '#10B981',
    gradTo: '#0EA5E9',
    bgCard: '#00140D',
    accentColor: '#10b981',
  },
  {
    id: 5,
    num: '05',
    tag: 'Feedback System',
    icon: Target,
    title: 'Personalized AI Feedback',
    description:
      'Get a full application readiness report — SOP quality, interview prep, university match, and visa readiness score all in one place.',
    bullets: ['Overall readiness score', 'Section-by-section analysis', 'Clear next steps'],
    gradFrom: '#8B5CF6',
    gradTo: '#4F46E5',
    bgCard: '#0C081A',
    accentColor: '#8b5cf6',
  },
];

// ─────────────────────────────────────────────────────────────
// MOCKUP VISUALS
// ─────────────────────────────────────────────────────────────
function MockupCounselor() {
  return (
    <div className="flex flex-col gap-3 p-2 w-full">
      <div className="flex items-center gap-2 pb-3 border-b border-indigo-900/40">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">U</div>
        <span className="text-sm text-indigo-300 font-semibold">USAL AI Counselor</span>
        <div className="ml-auto flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-green-400">Online</span>
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] leading-relaxed shadow-lg">
          Which universities for a 3.4 GPA?
        </div>
      </div>
      <div className="flex">
        <div className="bg-indigo-950/80 border border-indigo-800/30 text-indigo-200 text-xs rounded-2xl rounded-bl-sm px-4 py-3 max-w-[90%] leading-relaxed shadow-lg">
          I recommend <span className="text-indigo-400 font-semibold">U of Arizona</span>, <span className="text-indigo-400 font-semibold">Colorado State</span>, and <span className="text-indigo-400 font-semibold">Arizona State</span> — 70–80% acceptance. 🎓
        </div>
      </div>
      <div className="flex justify-end">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs rounded-2xl rounded-br-sm px-4 py-3 max-w-[85%] shadow-lg">
          Can you help write my SOP?
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <div className="flex gap-1.5 bg-indigo-950/80 border border-indigo-800/30 px-4 py-3 rounded-2xl">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-2 h-2 rounded-full bg-indigo-400"
              style={{ animation: `bounce 0.6s ease-in-out ${i * 0.15}s infinite` }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupInterview() {
  return (
    <div className="flex flex-col items-center gap-4 p-2 w-full">
      <div className="flex items-center justify-between w-full pb-3 border-b border-pink-900/40">
        <span className="text-sm text-pink-300 font-semibold">Mock Interview</span>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
          <span className="text-xs text-red-400 font-bold tracking-wider">LIVE</span>
        </div>
      </div>
      <div className="relative flex items-center justify-center h-20 w-20 my-2">
        <div className="absolute w-16 h-16 rounded-full border-2 border-pink-500/30" style={{ animation: 'ping 2s ease-out infinite' }} />
        <div className="absolute w-20 h-20 rounded-full border-2 border-pink-500/15" style={{ animation: 'ping 2s ease-out 0.7s infinite' }} />
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-xl shadow-lg z-10">🎤</div>
      </div>
      <div className="w-full bg-pink-950/40 border border-pink-900/30 rounded-xl px-4 py-3 text-xs text-pink-100 leading-relaxed text-center">
        "Why do you want to study in the United States?"
      </div>
      <div className="flex gap-2 w-full justify-center">
        <span className="text-[10px] px-3 py-1 rounded-full border border-green-500/30 text-green-400 bg-green-500/10">Easy</span>
        <span className="text-[10px] px-3 py-1 rounded-full border border-yellow-400 text-yellow-400 bg-yellow-500/20 font-bold">● Hard</span>
        <span className="text-[10px] px-3 py-1 rounded-full border border-red-500/30 text-red-400 bg-red-500/10">Expert</span>
      </div>
      <div className="w-full mt-2">
        <div className="text-[10px] text-pink-800 mb-1.5 flex justify-between">
          <span>Question 3 of 10</span>
          <span>30%</span>
        </div>
        <div className="h-1.5 bg-pink-950 rounded-full overflow-hidden">
          <div className="h-full w-[30%] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

function MockupReview() {
  return (
    <div className="flex flex-col gap-3 p-2 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-yellow-900/30">
        <span className="text-sm text-yellow-300 font-semibold">Answer Analysis</span>
        <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-md">✅ Complete</span>
      </div>
      <div className="border-l-2 border-indigo-500/50 pl-4 bg-black/30 rounded-r-xl py-3 pr-3">
        <div className="text-[10px] font-bold tracking-widest text-gray-500 mb-1.5">YOUR ANSWER</div>
        <div className="text-xs text-gray-400 leading-relaxed italic">"I want to study because USA has good universities and I like the country..."</div>
      </div>
      <div className="flex flex-col gap-2.5 my-1">
        {[{ label: 'Clarity', pct: 72, color: 'bg-yellow-400' }, { label: 'Confidence', pct: 58, color: 'bg-red-400' }, { label: 'Content', pct: 83, color: 'bg-green-400' }].map(({ label, pct, color }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs text-gray-400 w-20 shrink-0">{label}</span>
            <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
              <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
            </div>
            <span className="text-xs text-gray-500 w-8 text-right font-mono">{pct}%</span>
          </div>
        ))}
      </div>
      <div className="border border-yellow-500/30 bg-yellow-500/10 rounded-xl px-4 py-3 mt-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-yellow-500" />
        <div className="text-[10px] font-bold tracking-widest text-yellow-500 mb-1.5 flex items-center gap-1">
          <span>✨</span> AI IMPROVED
        </div>
        <div className="text-xs text-yellow-100/90 leading-relaxed">"I chose the US for its world-class AI research infrastructure and the opportunity to collaborate with industry leaders..."</div>
      </div>
    </div>
  );
}

function MockupSOP() {
  return (
    <div className="flex flex-col gap-3 p-2 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-emerald-900/30">
        <span className="text-sm text-emerald-300 font-semibold">SOP Generator</span>
        <span className="text-xs text-gray-400 bg-white/5 px-2 py-1 rounded-md">Arizona State</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-1">
        {[['GPA', '3.4'], ['Major', 'Comp Sci'], ['Goal', 'AI Research']].map(([l, v]) => (
          <div key={l} className="bg-black/30 border border-emerald-900/20 rounded-lg p-2 text-center">
            <div className="text-[9px] text-gray-500 uppercase tracking-wider mb-1">{l}</div>
            <div className="text-xs text-emerald-400 font-medium">{v}</div>
          </div>
        ))}
      </div>
      <div className="relative bg-black/50 border border-white/5 rounded-xl p-4 overflow-hidden h-32">
        <p className="text-xs text-gray-300 leading-relaxed">
          My academic journey has been defined by an unwavering passion for artificial intelligence. With a strong foundation in Computer Science, I am eager to contribute to the innovative research environment at Arizona State University. My previous projects involving machine learning have prepared me to tackle complex...
        </p>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#0A0F11] to-transparent pointer-events-none" />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-gray-500">487 / 800 words</span>
        <div className="flex gap-2">
          <button className="text-xs px-3 py-1.5 rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10 transition-colors">Regenerate</button>
          <button className="text-xs px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/20">Copy SOP</button>
        </div>
      </div>
    </div>
  );
}

function MockupFeedback() {
  return (
    <div className="flex flex-col gap-3 p-2 w-full">
      <div className="flex items-center justify-between pb-3 border-b border-purple-900/30">
        <span className="text-sm text-purple-300 font-semibold">Application Report</span>
        <span className="text-xs text-gray-500">Updated today</span>
      </div>
      <div className="flex justify-center py-2 relative">
        <div className="relative flex items-center justify-center">
          <svg width={100} height={100} viewBox="0 0 100 100">
            <circle cx={50} cy={50} r={40} fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth={8} />
            <circle cx={50} cy={50} r={40} fill="none" stroke="url(#pgf2)" strokeWidth={8}
              strokeLinecap="round" strokeDasharray={251} strokeDashoffset={52}
              transform="rotate(-90 50 50)" />
            <defs>
              <linearGradient id="pgf2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#D946EF" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute text-center">
            <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">79%</div>
            <div className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Ready</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {[{ l: 'SOP Quality', s: '84%', c: 'text-green-400', bg: 'bg-green-400/10', b: 'border-green-400/20' }, 
          { l: 'Interview', s: '71%', c: 'text-yellow-400', bg: 'bg-yellow-400/10', b: 'border-yellow-400/20' }, 
          { l: 'Uni Match', s: '91%', c: 'text-green-400', bg: 'bg-green-400/10', b: 'border-green-400/20' }, 
          { l: 'Visa Ready', s: '68%', c: 'text-red-400', bg: 'bg-red-400/10', b: 'border-red-400/20' }].map(({ l, s, c, bg, b }) => (
          <div key={l} className={`bg-black/40 border ${b} rounded-xl p-3 flex flex-col items-center justify-center`}>
            <div className={`text-lg font-black ${c} mb-1`}>{s}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-wider text-center">{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const mockupMap: Record<number, React.FC> = {
  1: MockupCounselor,
  2: MockupInterview,
  3: MockupReview,
  4: MockupSOP,
  5: MockupFeedback,
};

// ─────────────────────────────────────────────────────────────
// HERO SCREEN (THE STICKY BASE LAYER)
// ─────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────
// HERO SCREEN (THE STICKY BASE LAYER)
// ─────────────────────────────────────────────────────────────
function HeroScreen() {
  return (
    <div 
      className="sticky top-0 h-screen w-full flex flex-col items-center justify-center px-6 overflow-hidden bg-[#030305]"
      style={{ zIndex: 0 }}
    >
      {/* Center Glow to break up the solid black */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight text-center">
          Everything You Need to{' '}
          <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">
            Study Abroad
          </span>
        </h2>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto text-center leading-relaxed border-t border-white/10 pt-6 mt-6">
          Five powerful AI tools — each designed to take you one step closer to your dream university.
        </p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export function Features() {
  return (
    // The relative wrapper holds all sticky children together
    <div id="features" className="relative w-full bg-[#030305]">
      {/* 1. The base intro screen */}
      <HeroScreen />
      
      {/* 2. The stacked feature cards */}
      {features.map((feature, index) => (
        <FullScreenFeature key={feature.id} feature={feature} index={index} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FULL SCREEN FEATURE SECTION (STACKING CARDS)
// ─────────────────────────────────────────────────────────────
function FullScreenFeature({ feature, index }: { feature: typeof features[0]; index: number }) {
  const contentRef = useRef<HTMLDivElement>(null);

  // --- MOUSE TRACKING (For 3D Parallax Inside the Card) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], ['-12deg', '12deg']);
  
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const bgTranslateX = useTransform(smoothX, [-0.5, 0.5], [60, -60]);
  const bgTranslateY = useTransform(smoothY, [-0.5, 0.5], [60, -60]);

  const innerTranslateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15]);
  const innerTranslateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!contentRef.current) return;
    const rect = contentRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const MockupComponent = mockupMap[feature.id as keyof typeof mockupMap];

  return (
    <div
      ref={contentRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // CRITICAL: We use 'sticky top-0 h-screen' directly without wrappers,
      // and a shadow-top to emphasize the overlap effect.
      className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden shadow-[0_-20px_50px_rgba(0,0,0,0.6)]"
      style={{ 
        backgroundColor: feature.bgCard,
        // Increment z-index so each new card stacks on top of the previous one
        zIndex: (index + 1) * 10 
      }}
    >
      {/* Ambient background glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] blur-[150px] rounded-full opacity-10 pointer-events-none"
        style={{ 
          backgroundColor: feature.accentColor,
          x: bgTranslateX,
          y: bgTranslateY
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-6 py-24 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center z-10">
        
        {/* --- TEXT SIDE --- */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-sm font-black tracking-widest"
              style={{
                background: `linear-gradient(135deg, ${feature.gradFrom}, ${feature.gradTo})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {feature.num}
            </span>
            <div 
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-bold tracking-wider" 
              style={{ color: feature.accentColor }}
            >
              {feature.tag}
            </div>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
            {feature.title}
          </h2>
          
          <p className="text-lg text-slate-400 mb-10 max-w-lg leading-relaxed">
            {feature.description}
          </p>

          <ul className="space-y-4 mb-10">
            {feature.bullets.map(b => (
              <li key={b} className="flex items-center gap-4 text-base text-slate-300">
                <div 
                  className="w-2 h-2 rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]" 
                  style={{ background: `linear-gradient(135deg, ${feature.gradFrom}, ${feature.gradTo})` }} 
                />
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* --- VISUAL SIDE (3D Mouse Parallax) --- */}
        <div className="relative perspective-[1500px] flex justify-center w-full">
          <motion.div 
            style={{ 
              x: translateX,
              y: translateY,
              rotateX, 
              rotateY,
              transformStyle: 'preserve-3d'
            }} 
            className="w-full max-w-[400px] p-6 rounded-[2rem] border border-white/10 shadow-2xl bg-[#0A0A1A]/80 backdrop-blur-xl"
          >
            <motion.div style={{ x: innerTranslateX, y: innerTranslateY, z: 60 }}>
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-white/5">
                {['#EF4444', '#EAB308', '#22C55E'].map((c, i) => (
                  <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                ))}
              </div>
              
              <MockupComponent />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}