'use client';

import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const metrics = [
  { value: 10, label: 'Students Helped', suffix: 'K+' },
  { value: 50, label: 'SOPs Generated', suffix: 'K+' },
  { value: 95, label: 'Success Rate', suffix: '%' },
  { value: 100, label: 'Universities', suffix: '+' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let current = 0;
    const increment = value / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-glow">
      {count}{suffix}
    </div>
  );
}

export function TrustMetrics() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted by <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">thousands</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Join students from around the world who have successfully secured admissions to their dream universities.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="glass-effect rounded-2xl p-6 md:p-8 text-center hover-glow"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                viewport={{ once: true }}
                /*className="mb-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full p-4 inline-block"*/
              >
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </motion.div>
              <p className="text-slate-300 text-lg">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
