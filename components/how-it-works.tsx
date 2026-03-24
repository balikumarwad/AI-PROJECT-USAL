'use client'
 
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Sparkles, CheckCircle } from 'lucide-react'
 
// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────
interface Step {
  num: string
  tag: string
  icon: React.ReactNode
  title: string
  titleHighlight: string
  desc: string
  bullets: string[]
  accent: { from: string; to: string; glow: string; text: string }
  mockup: React.ReactNode
  reverse: boolean
}
 
// ─────────────────────────────────────────────────────────────
// MOCKUP 01 — Profile Analysis
// ─────────────────────────────────────────────────────────────
function MockupProfile() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8', border: '0.5px solid rgba(99,102,241,0.2)' }}>
          ⚡ Profile Analysis
        </span>
      </div>
      <p className="text-xs font-medium text-foreground/70 mb-3">Your Academic Score</p>
      {[
        { label: 'GPA', val: '3.4', pct: 84 },
        { label: 'IELTS', val: '7.0', pct: 72 },
        { label: 'Extras', val: '9/10', pct: 90 },
      ].map(({ label, val, pct }) => (
        <div key={label} className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] text-foreground/40 w-14 shrink-0">{label}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full relative overflow-hidden"
              style={{ width: `${pct}%`, background: 'linear-gradient(to right,#6366f1,#8b5cf6)' }}>
              {/* shimmer */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', animation: 'shimmer 2s ease-in-out infinite' }} />
            </div>
          </div>
          <span className="text-[10px] text-foreground/50 w-7 text-right">{val}</span>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <p className="text-[10px] font-medium" style={{ color: '#818cf8' }}>✓ Analysis complete — 3 universities matched</p>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// MOCKUP 02 — University Matches
// ─────────────────────────────────────────────────────────────
function MockupMatches() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(168,85,247,0.1)', color: '#c084fc', border: '0.5px solid rgba(168,85,247,0.2)' }}>
          🎯 AI Recommendations
        </span>
      </div>
      <p className="text-xs font-medium text-foreground/70 mb-3">Your University Matches</p>
      {[
        { icon: '🎓', name: 'University of Arizona', match: '94% match', acc: '78% acceptance' },
        { icon: '🏫', name: 'Colorado State Univ.', match: '88% match', acc: '71% acceptance' },
        { icon: '🌟', name: 'Arizona State Univ.', match: '82% match', acc: '65% acceptance' },
      ].map(({ icon, name, match, acc }) => (
        <div key={name} className="flex items-center justify-between rounded-xl px-3 py-2.5 mb-2"
          style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(168,85,247,0.1)' }}>
          <div className="flex items-center gap-2">
            <span className="text-sm">{icon}</span>
            <div>
              <p className="text-[11px] font-medium text-foreground/80">{name}</p>
              <p className="text-[9px] text-foreground/40">{acc}</p>
            </div>
          </div>
          <span className="text-[10px] font-semibold" style={{ color: '#c084fc' }}>{match}</span>
        </div>
      ))}
      <div className="mt-2 pt-3 border-t border-white/[0.06]">
        <p className="text-[10px] font-medium" style={{ color: '#c084fc' }}>✓ SOP strategy ready · Interview plan set</p>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// MOCKUP 03 — Readiness Report
// ─────────────────────────────────────────────────────────────
function MockupReadiness() {
  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
          style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399', border: '0.5px solid rgba(16,185,129,0.2)' }}>
          📊 Readiness Report
        </span>
      </div>
      <p className="text-xs font-medium text-foreground/70 mb-3">Application Progress</p>
      {[
        { label: 'SOP', pct: 84 },
        { label: 'Interview', pct: 71 },
        { label: 'Uni Match', pct: 91 },
        { label: 'Visa Ready', pct: 68 },
      ].map(({ label, pct }) => (
        <div key={label} className="flex items-center gap-2 mb-2.5">
          <span className="text-[10px] text-foreground/40 w-16 shrink-0">{label}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div className="h-full rounded-full relative overflow-hidden"
              style={{ width: `${pct}%`, background: 'linear-gradient(to right,#10b981,#0ea5e9)' }}>
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)', animation: 'shimmer 2s ease-in-out infinite' }} />
            </div>
          </div>
          <span className="text-[10px] text-foreground/50 w-7 text-right">{pct}%</span>
        </div>
      ))}
      <div className="mt-3 pt-3 border-t border-white/[0.06]">
        <p className="text-[10px] font-medium" style={{ color: '#34d399' }}>✓ Application Ready — Submit now</p>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// MOCK CARD SHELL
// ─────────────────────────────────────────────────────────────
function MockShell({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -8, -4, 0], rotate: [0, 0.4, -0.3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
      className="w-full max-w-[268px] rounded-2xl p-5 relative z-10"
      style={{
        background: 'rgba(10,10,26,0.95)',
        border: '0.5px solid rgba(255,255,255,0.08)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* top dots */}
      <div className="flex gap-1.5 mb-4">
        {['#ef4444', '#eab308', '#22c55e'].map((c, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c }} />
        ))}
      </div>
      {/* REPLACE WITH REAL SCREENSHOT LATER */}
      {children}
    </motion.div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// STEP PANEL
// ─────────────────────────────────────────────────────────────
function StepPanel({ step, index }: { step: Step; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
 
  const fromLeft = !step.reverse
  const textVariants = {
    hidden: { opacity: 0, x: fromLeft ? -56 : 56, y: 16 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.05 } },
  }
  const mockVariants = {
    hidden: { opacity: 0, x: fromLeft ? 56 : -56, y: 16 },
    visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.2 } },
  }
 
  return (
    <div ref={ref}>
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden relative`}
        style={{ border: '0.5px solid rgba(255,255,255,0.07)' }}
      >
        {/* Text side */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`flex flex-col justify-center px-10 py-14 relative overflow-hidden ${step.reverse ? 'lg:order-2' : ''}`}
          style={{ background: 'rgba(8,8,20,0.97)' }}
        >
          {/* Accent left bar */}
          <div className="absolute left-0 top-[20%] bottom-[20%] w-[3px] rounded-r-full"
            style={{ background: `linear-gradient(to bottom,${step.accent.from},${step.accent.to})` }} />
 
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] font-semibold tracking-widest uppercase text-white/30">{step.tag}</span>
            <div className="h-px w-8 bg-white/10" />
          </div>
 
          {/* Number badge */}
          <div className="flex items-center justify-center w-11 h-11 rounded-[14px] text-lg font-medium text-white mb-5"
            style={{
              background: `linear-gradient(135deg,${step.accent.from},${step.accent.to})`,
              boxShadow: `0 8px 24px ${step.accent.glow}`,
            }}>
            {step.num}
          </div>
 
          {/* Title */}
          <h3 className="text-[clamp(22px,2.8vw,30px)] font-semibold text-white leading-tight mb-4">
            {step.title}{' '}
            <span style={{
              background: `linear-gradient(135deg,${step.accent.from},${step.accent.to})`,
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>
              {step.titleHighlight}
            </span>
          </h3>
 
          {/* Desc */}
          <p className="text-[14px] text-white/45 leading-[1.8] mb-6 max-w-[340px]">{step.desc}</p>
 
          {/* Bullets */}
          <ul className="flex flex-col gap-2.5">
            {step.bullets.map((b) => (
              <li key={b} className="flex items-center gap-3 text-[13px] text-white/50">
                <div className="w-[18px] h-[18px] rounded-[6px] flex items-center justify-center shrink-0"
                  style={{ background: `${step.accent.from}18`, border: `0.5px solid ${step.accent.from}30` }}>
                  <div className="w-[5px] h-[5px] rounded-full"
                    style={{ background: step.accent.text }} />
                </div>
                {b}
              </li>
            ))}
          </ul>
        </motion.div>
 
        {/* Visual side */}
        <motion.div
          variants={mockVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className={`flex items-center justify-center p-10 relative overflow-hidden min-h-[320px] ${step.reverse ? 'lg:order-1' : ''}`}
          style={{ background: `linear-gradient(135deg,${step.accent.from}08,${step.accent.to}0f)` }}
        >
          {/* Blurred orb */}
          <div className="absolute rounded-full pointer-events-none"
            style={{
              width: 260, height: 260,
              background: step.accent.from,
              filter: 'blur(60px)',
              opacity: 0.12,
              top: step.reverse ? 'auto' : '-60px',
              bottom: step.reverse ? '-60px' : 'auto',
              right: step.reverse ? 'auto' : '-60px',
              left: step.reverse ? '-60px' : 'auto',
            }} />
 
          <MockShell delay={index * 0.5}>
            {step.mockup}
          </MockShell>
        </motion.div>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// ARROW CONNECTOR
// ─────────────────────────────────────────────────────────────
function ArrowConnector() {
  return (
    <div className="flex justify-center items-center h-8 my-1">
      <div className="flex flex-col items-center gap-0.5">
        <div className="w-px h-5" style={{ background: 'linear-gradient(to bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.15))' }} />
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
          <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  )
}
 
// ─────────────────────────────────────────────────────────────
// STEPS DATA
// ─────────────────────────────────────────────────────────────
const steps: Step[] = [
  {
    num: '1', tag: 'Step 01',
    icon: <Upload className="w-5 h-5" />,
    title: 'Share Your', titleHighlight: 'Profile',
    desc: 'Upload your academic records, achievements, and aspirations. Our AI builds a complete picture of who you are in seconds.',
    bullets: ['GPA, test scores & achievements', 'Target universities & programs', 'Instant AI readiness analysis'],
    accent: { from: '#4f46e5', to: '#8b5cf6', glow: 'rgba(99,102,241,0.28)', text: '#818cf8' },
    mockup: <MockupProfile />,
    reverse: false,
  },
  {
    num: '2', tag: 'Step 02',
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Get', titleHighlight: 'AI Guidance',
    desc: 'Receive a personalized roadmap — university shortlist, SOP strategy, and interview prep — all tailored exactly to your profile.',
    bullets: ['University shortlist with match %', 'Personalized SOP writing strategy', 'Custom visa interview prep plan'],
    accent: { from: '#a855f7', to: '#ec4899', glow: 'rgba(168,85,247,0.28)', text: '#c084fc' },
    mockup: <MockupMatches />,
    reverse: true,
  },
  {
    num: '3', tag: 'Step 03',
    icon: <CheckCircle className="w-5 h-5" />,
    title: 'Execute', titleHighlight: '& Succeed',
    desc: 'Use AI tools to write your SOP, practice mock interviews, and track readiness — until the day you get that acceptance letter.',
    bullets: ['AI mock visa interview practice', 'Application readiness tracker', 'Accepted to dream university 🎓'],
    accent: { from: '#10b981', to: '#0ea5e9', glow: 'rgba(16,185,129,0.28)', text: '#34d399' },
    mockup: <MockupReadiness />,
    reverse: false,
  },
]
 
// ─────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────
export function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' })
 
  return (
    <section id="how-it-works" className="py-24 px-4 relative overflow-hidden">
 
      {/* Grid bg */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />
 
      <div className="max-w-5xl mx-auto relative z-10">
 
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5 text-[11px] font-semibold tracking-widest uppercase"
            style={{ border: '0.5px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.35)' }}>
            ✦ How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
            Three steps to your{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              dream university
            </span>
          </h2>
          <p className="text-white/40 text-lg max-w-lg mx-auto leading-relaxed">
            From profile to acceptance — USAL's AI guides every step with precision
          </p>
        </motion.div>
 
        {/* Step panels */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={step.num}>
              <StepPanel step={step} index={i} />
              {i < steps.length - 1 && <ArrowConnector />}
            </div>
          ))}
        </div>
 
      </div>
 
      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  )
}
