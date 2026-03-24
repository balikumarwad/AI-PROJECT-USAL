'use client';

import { motion } from 'framer-motion';
import { BarChart3, FileText, MessageSquare } from 'lucide-react';

export function DashboardPreview() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Intuitive <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Dashboard</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Monitor your progress, track your applications, and get real-time feedback from AI.
          </p>
        </motion.div>

        {/* Dashboard mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Glow background */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-3xl" />

          {/* Dashboard container */}
          <div className="relative glass-effect rounded-3xl p-8 md:p-12 border border-indigo-500/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* SOP Progress */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-2xl p-6 border border-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-indigo-400" />
                  </div>
                  <h3 className="font-semibold text-white">SOP Progress</h3>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400">Draft Complete</span>
                    <span className="text-indigo-400 font-semibold">75%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      initial={{ width: 0 }}
                      whileInView={{ width: '75%' }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <p className="text-xs text-slate-500">2 more revisions needed</p>
              </motion.div>

              {/* Interview Prep */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-2xl p-6 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-purple-400" />
                  </div>
                  <h3 className="font-semibold text-white">Interview Score</h3>
                </div>
                <div className="mb-4">
                  <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                    8.5/10
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Up from 7.2 last week</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Communication</span>
                    <span className="text-purple-400">90%</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Content Quality</span>
                    <span className="text-purple-400">85%</span>
                  </div>
                </div>
              </motion.div>

              {/* Applications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-effect rounded-2xl p-6 border border-cyan-500/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-semibold text-white">Applications</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">In Progress</span>
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-sm font-semibold">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Submitted</span>
                    <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-sm font-semibold">5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-400">Accepted</span>
                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-semibold">2</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="mt-8 pt-8 border-t border-slate-700/50 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                { label: 'AI Chats', value: '42' },
                { label: 'Mock Interviews', value: '8' },
                { label: 'Documents', value: '12' },
                { label: 'Days Left', value: '45' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.05 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-xl font-bold text-indigo-400">{stat.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
