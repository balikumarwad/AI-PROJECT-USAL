'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does USAL\'s AI counselor work?',
    answer: 'Our AI counselor uses advanced machine learning to understand your profile, goals, and concerns. It provides personalized guidance on SOP writing, university selection, interview preparation, and visa processes. The AI learns from thousands of successful applications to give you the best advice.',
  },
  {
    question: 'Can I get admitted to my dream university using USAL?',
    answer: 'While USAL provides comprehensive guidance and tools, admission depends on multiple factors including your academics, test scores, and application materials. USAL significantly increases your chances by helping you create compelling applications, practice interviews, and navigate the entire process.',
  },
  {
    question: 'Is the AI SOP generator plagiarism-free?',
    answer: 'Yes! Our SOP generator creates unique, personalized statements based on your specific information. Each SOP is original and tailored to your story. We also provide tips on how to further personalize and improve your SOP.',
  },
  {
    question: 'How often should I practice mock interviews?',
    answer: 'We recommend practicing at least 2-3 times per week in the month leading up to your actual interview. The AI provides feedback on your answers, body language interpretation, and suggestions for improvement with each practice session.',
  },
  {
    question: 'Do you offer support in multiple languages?',
    answer: 'Currently, USAL provides support in English. However, you can chat with our AI counselor in English, and they can help you translate and adapt your materials to other languages if needed.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 14-day money-back guarantee if you\'re not satisfied with our service. Simply contact our support team, and we\'ll process your refund within 5 business days.',
  },
];

export function FAQ() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Everything you need to know about USAL and how it can help you succeed.
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="glass-effect rounded-lg px-6 border-0"
                >
                  <AccordionTrigger className="text-lg font-semibold text-white hover:text-indigo-400 transition-colors py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-300 text-base pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
