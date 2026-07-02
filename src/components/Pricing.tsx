/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PRICING_PLANS } from '../data';
import { Check, Flame, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface PricingProps {
  accentColor: 'emerald' | 'blue';
}

export default function Pricing({ accentColor }: PricingProps) {
  const [animateStrikethrough, setAnimateStrikethrough] = useState(false);

  useEffect(() => {
    // Trigger strikethrough animation slightly after mount
    const timer = setTimeout(() => {
      setAnimateStrikethrough(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryBorder = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';

  return (
    <section id="pricing" className="relative py-24 bg-[#0A0F0D] border-t border-slate-900 overflow-hidden">
      {/* Subtle line art and ambient lighting */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.15] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Investment Plans</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            Choose Your{' '}
            <span className={accentColor === 'emerald' ? 'text-gradient' : 'text-gradient-blue'}>
              Investment Plan
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Honest research at competitive pricing. Select a plan tailored to your trading frequency and risk parameters. No commitment, upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.isPopular;
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, type: 'spring', stiffness: 90 }}
                className={`relative flex flex-col justify-between p-6.5 rounded-3xl transition-all duration-300 ${
                  isPopular
                    ? 'bg-[#151A18] border-2 border-emerald-500 shadow-2xl shadow-emerald-500/10 scale-102 z-10 md:translate-y-[-8px]'
                    : 'bg-[#0D1211] border border-white/10 hover:border-white/20'
                } hover:shadow-xl hover:shadow-black/50 hover-glow`}
              >
                {/* Most popular badge/ribbon */}
                {isPopular && (
                  <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-bold font-display uppercase tracking-wider">
                    <Flame className="w-3.5 h-3.5 fill-black" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Card Top */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-display font-bold text-lg text-white ${isPopular ? 'text-emerald-400' : ''}`}>
                      {plan.name}
                    </h3>
                    <span className="text-[10px] font-mono tracking-wider text-slate-500 uppercase px-2 py-0.5 rounded-md bg-slate-950 border border-slate-900">
                      {plan.duration}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed mb-6 min-h-[44px]">
                    {plan.tagline}
                  </p>

                  {/* Pricing figures */}
                  <div className="mb-6">
                    {/* Strikethrough price with dynamic width reveal */}
                    <div className="flex items-baseline gap-1.5 text-slate-500 text-xs font-mono mb-0.5">
                      <span className="relative">
                        ₹{plan.strikePrice.toLocaleString('en-IN')}
                        <span
                          className={`absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] bg-red-500/80 transition-all duration-1000 ${
                            animateStrikethrough ? 'w-full' : 'w-0'
                          }`}
                        />
                      </span>
                      <span>regular price</span>
                    </div>

                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-display font-extrabold text-white">
                        ₹{plan.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-slate-500 font-mono">/ access cycle</span>
                    </div>
                  </div>

                  <hr className="border-slate-800/50 mb-6" />

                  {/* Features list */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mr-2 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscribe CTA */}
                <button
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      // Pre-fill dropdown option
                      const dropdown = document.getElementById('service-dropdown') as HTMLSelectElement;
                      if (dropdown) {
                        dropdown.value = plan.id;
                      }
                    }
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold uppercase font-display tracking-wider transition-all duration-300 flex items-center justify-center space-x-1.5 cursor-pointer ${
                    isPopular
                      ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <span>Subscribe Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Legal disclosures below pricing */}
        <div className="mt-12 text-center">
          <p className="text-[11px] text-slate-500 max-w-2xl mx-auto flex items-center justify-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>All transaction payments are fully secured. Service alerts delivered directly on verified WhatsApp registration. No hidden charges.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
