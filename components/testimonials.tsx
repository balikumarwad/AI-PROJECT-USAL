'use client'
 
import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
 
interface Testimonial {
  name: string
  country: string
  university: string
  rating: number
  text: string
  avatar: string
}
 
const testimonials: Testimonial[] = [
  {
    name: 'Priya Singh',
    country: '🇮🇳 India',
    university: 'MIT',
    rating: 5,
    text: 'USAL helped me craft the perfect SOP. I got accepted to my dream university!',
    avatar: 'PS',
  },
  {
    name: 'Ahmed Hassan',
    country: '🇪🇬 Egypt',
    university: 'Stanford',
    rating: 5,
    text: 'The interview prep module was incredibly helpful. Felt confident in my visa interview.',
    avatar: 'AH',
  },
  {
    name: 'Lisa Chen',
    country: '🇹🇼 Taiwan',
    university: 'Harvard',
    rating: 5,
    text: 'The university matching algorithm helped me find schools I never considered. Perfect fit!',
    avatar: 'LC',
  },
  {
    name: 'Carlos Rodriguez',
    country: '🇨🇴 Colombia',
    university: 'CMU',
    rating: 5,
    text: 'Amazing platform! The AI guidance was spot-on and the support team was always there.',
    avatar: 'CR',
  },
  {
    name: 'Yuki Tanaka',
    country: '🇯🇵 Japan',
    university: 'Berkeley',
    rating: 5,
    text: 'From SOP to acceptance in 6 months. USAL made the entire process seamless.',
    avatar: 'YT',
  },
  {
    name: 'Fatima Al-Rashid',
    country: '🇸🇦 Saudi Arabia',
    university: 'Penn',
    rating: 5,
    text: 'The personalized guidance made all the difference. Highly recommend to all students!',
    avatar: 'FR',
  },
]
 
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <Card className="flex-shrink-0 w-80 p-6 glass-dark border-0 hover:glass-sm transition-all duration-300">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
 
      <p className="text-foreground/80 mb-6 text-sm leading-relaxed">
        "{testimonial.text}"
      </p>
 
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full usal-gradient flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.avatar}
        </div>
        <div>
          <p className="font-semibold text-sm">{testimonial.name}</p>
          <p className="text-xs text-foreground/50">{testimonial.country}</p>
          <p className="text-xs text-usal-indigo font-medium">{testimonial.university}</p>
        </div>
      </div>
    </Card>
  )
}
 
// ── FIX 1: export naam "Testimonials" — page.tsx import sanga exact match ──
export function Testimonials() {
  const duplicatedTestimonials = [...testimonials, ...testimonials]
 
  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
 
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Loved by <span className="usal-gradient-text">students worldwide</span>
          </h2>
          <p className="text-foreground/60 text-lg">
            Join thousands of students who've achieved their dreams with USAL
          </p>
        </motion.div>
 
        {/* ── FIX 2+3: Row 1 — left scroll, -50% seamless, hover pause ── */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 py-8"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
            style={{ willChange: 'transform' }}
            whileHover={{ animationPlayState: 'paused' } as any}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`row1-${testimonial.name}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
 
        {/* ── FIX 4: Row 2 — opposite (right) direction ── */}
        <div className="relative overflow-hidden mt-4">
          <motion.div
            className="flex gap-6 py-8"
            animate={{ x: ['-50%', '0%'] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'linear',
              repeatType: 'loop',
            }}
            style={{ willChange: 'transform' }}
            whileHover={{ animationPlayState: 'paused' } as any}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`row2-${testimonial.name}-${index}`}
                testimonial={testimonial}
              />
            ))}
          </motion.div>
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
        </div>
 
      </div>
    </section>
  )
}