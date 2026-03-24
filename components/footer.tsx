'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Linkedin, Twitter, Instagram, ArrowRight } from 'lucide-react';

const footerLinks = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Security', href: '#security' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Blog', href: '#blog' },
      { label: 'Careers', href: '#careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '#privacy' },
      { label: 'Terms', href: '#terms' },
      { label: 'Contact', href: '#contact' },
    ],
  },
];

const socialLinks = [
  { icon: Mail, href: 'mailto:hello@usal.ai', label: 'Email' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
];

export function Footer() {
  return (
    // 1. Added mt-48 to push the footer down, making room for the top half of the card.
    // 2. Set the background to a deep dark blue (#050B14).
    <footer className="relative mt-48 overflow-visible border-t border-slate-800/50 bg-[#050B14]">
      
      {/* Floating CTA Card */}
      {/* z-20 ensures this card sits on top of the footer's top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-6xl px-4 z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B1221] to-[#050B14] border border-slate-800 p-8 md:p-14 shadow-2xl"
        >
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Take the first step towards your <span className="text-indigo-400">study abroad</span> dream.
            </h3>
            <p className="text-slate-400 text-lg mb-8">
              Personalized, AI-powered guidance for global universities. Join thousands of students today.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-200 transition-colors"
            >
              Get started <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Decorative SVG Graphic */}
          <div className="absolute right-[-10%] top-[-20%] h-[140%] w-1/2 opacity-20 pointer-events-none hidden md:block">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <defs>
                <radialGradient id="globeGradient">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="transparent" />
                </radialGradient>
              </defs>
              <circle cx="100" cy="100" r="80" stroke="url(#globeGradient)" strokeWidth="0.5" fill="none" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="60" stroke="url(#globeGradient)" strokeWidth="0.5" fill="none" strokeDasharray="2 2" />
              <path d="M100 20 Q 140 100 100 180" stroke="#4f46e5" fill="none" opacity="0.5" />
              <path d="M100 20 Q 60 100 100 180" stroke="#4f46e5" fill="none" opacity="0.5" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Main Footer Content */}
      {/* pt-56 pushes the links down so they don't hide behind the floating card */}
      <div className="max-w-6xl mx-auto px-4 pt-56 pb-16 md:pb-24">
        
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-1"
          >
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">US</span>
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                USAL
              </span>
            </Link>
            <p className="text-slate-400 text-sm">
              AI-powered platform helping students achieve their study abroad dreams.
            </p>
          </motion.div>

          {/* Footer links */}
          {footerLinks.map((section, idx) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: (idx + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-white uppercase text-xs tracking-wider mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-slate-400 hover:text-indigo-400 transition-all duration-300 text-sm hover-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent mb-8" />

        {/* Bottom section (Untouched) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Copyright */}
          <div className="text-slate-500 text-sm">
            © 2024 USAL. All rights reserved. Made with ❤️ for students worldwide.
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full glass-effect flex items-center justify-center text-slate-400 hover:text-indigo-400 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/30 hover:border-indigo-400/50 border border-transparent"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}