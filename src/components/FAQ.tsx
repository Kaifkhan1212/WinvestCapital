/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq_1'); // default open first item

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="relative py-24 bg-[#0A0F0D] border-t border-slate-900 overflow-hidden">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[350px] h-[350px] bg-blue-500/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            Frequently Asked{' '}
            <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Everything you need to know about our advisory registration, WhatsApp alerts, billing and market risk standards.
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-white/10 bg-[#0D1211] hover:bg-[#151A18] transition-colors duration-300 overflow-hidden"
              >
                {/* Header Toggle */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer group"
                >
                  <span className="font-display font-bold text-sm sm:text-base text-slate-100 group-hover:text-emerald-400 transition-colors">
                    {item.question}
                  </span>
                  <div className={`p-1.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 group-hover:text-white group-hover:border-slate-700 transition-all duration-300 ${isOpen ? 'rotate-180 text-emerald-400 border-emerald-500/20' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-slate-400 text-xs sm:text-sm leading-relaxed border-t border-slate-900">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
