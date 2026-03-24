'use client'
 
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Facebook, Twitter, Linkedin, Instagram, Github, Mail, Target, Eye, Zap, Brain, Shield, Rocket, Quote } from 'lucide-react'
 
// ─── STATS SECTION ───────────────────────────────────────────────────────────
 
function StatsSection() {
  const stats = [
    { label: 'Happy Users', value: '98%' },
    { label: 'Active Users', value: '10K+' },
    { label: 'Customer Rating', value: '4.9★' },
    { label: 'Years Growing', value: '2+' },
  ]
 
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative p-6 md:p-8 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all text-center">
                <div className="text-3xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text mb-2">
                  {stat.value}
                </div>
                <p className="text-slate-300 text-sm md:text-base">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
 
// ─── HERO SECTION ─────────────────────────────────────────────────────────────
 
function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span className="text-sm text-blue-300">About Our Journey</span>
          </div>
 
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            Transforming the
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"> Future</span>
            <br />
            with AI Innovation
          </h1>
 
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Since 2024, we've been on a mission to make artificial intelligence accessible, ethical, and
            transformative for businesses worldwide. Join us as we explore our story, vision, and the
            community driving innovation forward.
          </p>
 
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
          >
            <button className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all transform hover:scale-105">
              Explore Our Story
            </button>
            <button className="px-8 py-3 border border-blue-500/50 text-blue-300 rounded-lg font-semibold hover:bg-blue-500/10 transition-all">
              Get In Touch
            </button>
          </motion.div>
        </motion.div>
 
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="mt-20 relative h-80 hidden md:block"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text">
                AI
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
 
// ─── WHO WE ARE ───────────────────────────────────────────────────────────────
 
function WhoWeAre() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl" />
            <div className="relative h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-blue-500/30 flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text"
              >
                WHO
              </motion.div>
            </div>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Who <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">We Are</span>
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed">
                We are a team of passionate innovators, engineers, and dreamers dedicated to making artificial
                intelligence accessible, ethical, and transformative for every business size. Since our inception
                in 2024, we've been breaking barriers and challenging the status quo.
              </p>
            </div>
 
            <div className="space-y-4">
              {[
                'Visionary leadership with 20+ years of combined AI experience',
                'Diverse team spanning 15+ countries with unique perspectives',
                'Committed to ethical AI practices and transparent operations',
                'Driven by a mission to democratize cutting-edge technology',
              ].map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <p className="text-slate-300">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
 
// ─── MISSION & VISION ─────────────────────────────────────────────────────────
 
function MissionVision() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative p-8 md:p-12 rounded-3xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6"
              >
                <Target size={32} className="text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                To make artificial intelligence accessible, ethical, and transformative for businesses of all
                sizes, enabling them to solve complex problems and unlock unprecedented opportunities.
              </p>
              <div className="space-y-3">
                {[
                  'Democratizing AI technology globally',
                  'Ensuring ethical and responsible AI practices',
                  'Creating sustainable value for all stakeholders',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    <span className="text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
 
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all" />
            <div className="relative p-8 md:p-12 rounded-3xl border border-purple-500/30 bg-slate-900/50 backdrop-blur-md hover:border-purple-500/60 transition-all">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 mb-6"
              >
                <Eye size={32} className="text-white" />
              </motion.div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                To become the world's most trusted AI partner, fostering a future where intelligent technology
                empowers human potential and creates positive impact across industries and communities.
              </p>
              <div className="space-y-3">
                {[
                  'Leading innovation in AI research and development',
                  'Building a global community of AI pioneers',
                  'Shaping the future of human-AI collaboration',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                    <span className="text-slate-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
 
// ─── WHAT WE OFFER ────────────────────────────────────────────────────────────
 
function WhatWeOffer() {
  const offerings = [
    { icon: Brain, title: 'AI Solutions', description: 'Custom AI models and solutions tailored to your business needs' },
    { icon: Zap, title: 'Fast Implementation', description: 'Rapid deployment with minimal disruption to your operations' },
    { icon: Shield, title: 'Enterprise Security', description: 'Military-grade security and compliance for your data' },
    { icon: Rocket, title: 'Scalable Growth', description: 'Solutions that grow with your business from startup to enterprise' },
  ]
 
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">We Offer</span>
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Comprehensive AI solutions designed to transform your business and unlock new possibilities
          </p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {offerings.map((offer, index) => {
            const Icon = offer.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                <div className="relative p-6 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all h-full">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-4 right-4 opacity-10"
                  >
                    <Icon size={40} className="text-blue-400" />
                  </motion.div>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{offer.title}</h3>
                  <p className="text-slate-400">{offer.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
 
// ─── TIMELINE ─────────────────────────────────────────────────────────────────
 
function TimelineSection() {
  const milestones = [
    {
      year: '2024',
      title: 'The Beginning',
      description: 'Founded with a vision to democratize AI technology. Built our first AI solution and launched to early adopters.',
      highlights: ['Company Launch', 'First 100 Users', 'MVP Release'],
    },
    {
      year: '2025',
      title: 'Rapid Growth',
      description: 'Expanded our team, reached 10K users, and launched enterprise features. Secured Series A funding.',
      highlights: ['10K Users', 'Series A Funding', 'Enterprise Features'],
    },
    {
      year: '2026',
      title: 'Global Scale',
      description: 'Established operations in 15 countries, reached 98% user satisfaction, and became industry leaders.',
      highlights: ['Global Expansion', '98% Satisfaction', '4.9★ Rating'],
    },
  ]
 
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Journey</span>
          </h2>
          <p className="text-slate-300 text-lg">From 2024 to 2026: Milestones that shaped our mission</p>
        </motion.div>
 
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-500 to-purple-500 hidden md:block" />
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className={`md:grid md:grid-cols-2 md:gap-8 items-center ${index % 2 === 0 ? '' : 'md:[direction:rtl]'}`}
              >
                <div className={index % 2 === 1 ? 'md:[direction:ltr]' : ''}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative p-6 md:p-8 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all">
                      <div className="inline-block px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/40 mb-4">
                        <span className="text-blue-300 font-bold">{milestone.year}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-slate-300 mb-4">{milestone.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {milestone.highlights.map((h, i) => (
                          <span key={i} className="px-3 py-1 text-sm rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center my-8 md:my-0">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 border-4 border-slate-950 flex items-center justify-center"
                  >
                    <span className="text-white font-bold text-lg">{index + 1}</span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
 
// ─── FOUNDER MESSAGE ──────────────────────────────────────────────────────────
 
function FounderMessage() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-2xl" />
          <div className="relative rounded-3xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md p-8 md:p-12">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <Quote size={32} className="text-white" />
              </div>
            </motion.div>
 
            <div className="mb-8">
              <p className="text-lg md:text-2xl text-white leading-relaxed font-light mb-6">
                <span className="text-3xl md:text-4xl text-blue-400 font-bold">"</span>
                When we founded this company in 2024, we had a singular vision: to make AI not just powerful,
                but accessible and ethical for everyone. We believed that artificial intelligence should be a
                tool for progress, not privilege.
              </p>
              <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6">
                Today, seeing 10,000+ businesses transform their operations with our solutions, achieving a 98%
                satisfaction rate, and building a community spanning 15 countries—that's the fulfillment of our
                mission. But this is just the beginning.
              </p>
              <p className="text-lg md:text-2xl text-white leading-relaxed font-light">
                Thank you for being part of this journey. Together, we're not just building technology—we're
                shaping the future.
                <span className="text-3xl md:text-4xl text-blue-400 font-bold">"</span>
              </p>
            </div>
 
            <div className="flex items-center gap-4 pt-6 border-t border-blue-500/20">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
              <div>
                <h4 className="text-white font-bold">John Davis</h4>
                <p className="text-slate-400 text-sm">Founder & CEO</p>
              </div>
            </div>
          </div>
 
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -top-8 -right-8 w-16 h-16 border-2 border-blue-500/30 rounded-full hidden md:block"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-8 -left-8 w-20 h-20 border-2 border-purple-500/20 rounded-full hidden md:block"
          />
        </motion.div>
      </div>
    </section>
  )
}
 
// ─── TEAM SECTION ─────────────────────────────────────────────────────────────
 
function TeamSection() {
  const team = [
    { name: 'John Davis', role: 'Founder & CEO', initials: 'JD', bio: '20+ years in AI research and development' },
    { name: 'Sarah Chen', role: 'CTO', initials: 'SC', bio: 'ML architect with Fortune 500 experience' },
    { name: 'Michael Rodriguez', role: 'Head of Product', initials: 'MR', bio: 'Product leader from leading tech companies' },
    { name: 'Emma Thompson', role: 'Head of Operations', initials: 'ET', bio: 'Operations expert scaling startups globally' },
  ]
 
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Meet Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Team</span>
          </h2>
          <p className="text-slate-300 text-lg">Diverse talents united by a common mission</p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
              <div className="relative p-6 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">{member.initials}</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{member.name}</h4>
                <p className="text-blue-400 text-sm font-semibold mb-3">{member.role}</p>
                <p className="text-slate-400 text-sm">{member.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
 
// ─── COMMUNITY SECTION ────────────────────────────────────────────────────────
 
function CommunitySection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
 
  const socialLinks = [
    { icon: Facebook, label: 'Facebook', href: '#' },
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Instagram, label: 'Instagram', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Mail, label: 'Email', href: '#' },
  ]
 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message })
    setName('')
    setEmail('')
    setMessage('')
  }
 
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Our <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text">Community</span>
          </h2>
          <p className="text-slate-300 text-lg">Connect with thousands of AI innovators worldwide</p>
        </motion.div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-8">Connect With Us</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative p-6 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all flex flex-col items-center justify-center gap-3 h-full">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon size={24} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold text-white text-center">{social.label}</span>
                    </div>
                  </motion.a>
                )
              })}
            </div>
 
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-10 p-6 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md"
            >
              <h4 className="text-white font-bold mb-4">Why Join Us?</h4>
              <ul className="space-y-3">
                {[
                  'Access to exclusive AI resources and tutorials',
                  'Network with industry experts and innovators',
                  'Early access to new features and products',
                  'Support from a passionate community',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <div className="w-2 h-2 bg-blue-400 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
 
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all" />
            <form
              onSubmit={handleSubmit}
              className="relative p-8 md:p-10 rounded-2xl border border-blue-500/30 bg-slate-900/50 backdrop-blur-md hover:border-blue-500/60 transition-all space-y-6"
            >
              <h3 className="text-2xl font-bold text-white">Get In Touch</h3>
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-blue-500/30 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-blue-500/30 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                  required
                />
              </div>
 
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-blue-500/30 text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all resize-none"
                  required
                />
              </div>
 
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all"
              >
                Send Message
              </motion.button>
 
              <p className="text-xs text-slate-400 text-center">
                We'll get back to you within 24 hours. Your message helps us serve you better.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
 
// ─── MAIN ABOUT PAGE ──────────────────────────────────────────────────────────
 
export default function AboutPage() {
  return (
    <main className="bg-slate-950 min-h-screen">
      <HeroSection />
      <StatsSection />
      <WhoWeAre />
      <MissionVision />
      <WhatWeOffer />
      <TimelineSection />
      <FounderMessage />
      <TeamSection />
      <CommunitySection />
    </main>
  )
}