/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Eye, ShieldAlert, Clock, ArrowRight, Zap, Target, BookOpen, HeartHandshake } from 'lucide-react';

export default function WhyTrustUs() {
  const scrollToPerformance = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const featureRow = [
    {
      icon: Eye,
      title: '100% Transparent Track Record',
      desc: 'All trading calls, profits, and stop-losses are meticulously recorded in our public log.',
    },
    {
      icon: ShieldAlert,
      title: 'Real-Time Entry/Exit Alerts',
      desc: 'Instant real-time execution support delivered directly to your verified phone via WhatsApp.',
    },
    {
      icon: Clock,
      title: 'Dedicated Support 9AM-5PM',
      desc: 'A responsive support team ready to assist with onboarding, queries, and execution.',
    },
  ];

  const statChips = [
    { icon: Zap, label: 'Live Market Updates' },
    { icon: Target, label: 'Expert Research Calls' },
    { icon: BookOpen, label: 'High Accuracy Rate' },
    { icon: HeartHandshake, label: 'Fast Customer Support' },
  ];

  return (
    <section className="relative py-24 bg-[#0A0F0D] border-t border-slate-900 overflow-hidden">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.2] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[450px] h-[450px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Column A (Left): Main Context */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Uncompromising Principles</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
              Winvest Active Traders{' '}
              <span className="text-gradient">Can't Be Wrong</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-8">
              We stand apart in an industry crowded with noise and empty promises. As a regulated research entity, our core metric of success is your consistent wealth compounding. We don't guess; we test.
            </p>

            {/* Smaller Stat Chips */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {statChips.map((chip, index) => {
                const Icon = chip.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-2.5 p-3 rounded-xl bg-[#0D1211] border border-white/10 hover:border-white/25 transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
                      {chip.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* View Performance Button */}
            <button
              onClick={scrollToPerformance}
              className="px-6 py-3.5 rounded-full text-xs font-bold font-display uppercase tracking-wider transition-all duration-300 bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer flex items-center space-x-2"
            >
              <span>View Performance Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Column B (Right): Feature Rows block */}
          <div className="lg:col-span-7 space-y-5">
            {featureRow.map((feat, index) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col sm:flex-row items-start gap-4 p-6.5 rounded-2xl bg-[#151A18] border border-white/10 hover:border-white/20 transition-colors group hover-glow"
                >
                  <div className="p-3 rounded-xl bg-black/40 border border-white/10 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-white mb-1.5 group-hover:text-emerald-400 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
