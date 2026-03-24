'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import Image from 'next/image'; // Added this import

// 1. List of different photos for the circles
const userPhotos = [
  '/image.png', 
  '/u2.png', 
  '/u3.png', 
  '/u4.png'
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-4">
      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        
        {/* Glowing aura effect behind headline */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex justify-center"
        >
          <div className="glass-effect rounded-full px-4 py-2 text-sm text-indigo-300 border border-indigo-500/30">
            🚀 AI-Powered Study Abroad Platform
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 text-balance"
        >
          <span className="text-slate-100">
            Write a Powerful SOP
          </span>
          <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            & Prepare for Your Dream University with AI
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 mb-10 text-balance max-w-2xl mx-auto"
        >
          Get personalized guidance from our advanced AI counselor. Generate compelling SOPs, prepare for interviews, and master the university application process all in one platform.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:glow-border-primary border-2 border-transparent hover:border-indigo-400"
            >
              Start Mock Interview
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 transition-all duration-300 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20"
            >
              Chat With AI Counselor
            </Button>
          </motion.div>
        </div>

        {/* Social Proof Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex items-center justify-center gap-4"
        >
          <div className="flex -space-x-2">
            {userPhotos.map((imgSrc, i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-slate-900 overflow-hidden bg-slate-800"
              >
                <Image
                  src={imgSrc}
                  alt={`User ${i + 1}`}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-slate-300 ml-2">
              <span className="font-semibold">4.9/5</span> from 500+ students
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
