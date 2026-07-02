/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { TESTIMONIALS } from '../data';
import { motion } from 'motion/react';
import { Quote, Star, Award, Users, ThumbsUp, ShieldAlert } from 'lucide-react';

export default function Testimonials() {
  
  // Custom helper to choose unique gradient for avatar circles
  const getGradient = (initials: string) => {
    if (initials === 'SS') return 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30';
    if (initials === 'SH') return 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30';
    return 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30';
  };

  const getBadgeStyle = (badge: string) => {
    if (badge === 'Verified Purchase') return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
    if (badge === 'Top Rated') return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
  };

  const trustBadges = [
    { label: 'SEBI Registered', value: 'INH000025124', icon: Award },
    { label: 'Active Users', value: '1,250+ Members', icon: Users },
    { label: 'Avg Rating', value: '4.8 / 5.0 Stars', icon: Star },
    { label: 'Market Discipline', value: '100% Compliant', icon: ThumbsUp },
  ];

  return (
    <section className="relative py-24 bg-[#050807] border-t border-slate-900 overflow-hidden">
      {/* Sparkles background */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.12] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[350px] h-[350px] bg-emerald-500/2 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Success Stories</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight">
            Indians Trade With{' '}
            <span className="text-gradient">Winvest Capitals</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Verified reviews from real stock market traders across Maharashtra. Discover how accurate research can elevate your market journey.
          </p>
        </div>

        {/* 3 Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6.5 mb-16">
          {TESTIMONIALS.map((test, index) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-6.5 rounded-3xl bg-[#151A18] border border-white/10 hover:border-white/20 hover-glow flex flex-col justify-between min-h-[250px]"
            >
              {/* Card Top: Quotes indicator and verified badge */}
              <div className="flex items-start justify-between mb-6">
                <div className={`p-2.5 rounded-xl bg-black/40 border border-white/10 text-emerald-400`}>
                  <Quote className="w-4 h-4 fill-emerald-400/10" />
                </div>
                <span className={`px-2.5 py-1 rounded-full border text-[10px] font-semibold uppercase tracking-wider font-mono ${getBadgeStyle(test.badge)}`}>
                  {test.badge}
                </span>
              </div>

              {/* Card Mid: User Quote */}
              <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed mb-6">
                "{test.quote}"
              </p>

              <hr className="border-white/5 mb-4" />

              {/* Card Bottom: User Identity */}
              <div className="flex items-center space-x-3">
                {/* Avatar Initial Circle */}
                <div className={`w-11 h-11 rounded-full border bg-gradient-to-br flex items-center justify-center font-display font-bold text-sm shrink-0 shadow-inner ${getGradient(test.initials)}`}>
                  {test.initials}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white">
                    {test.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {test.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges Row */}
        <div className="p-6.5 rounded-3xl bg-[#0D1211] border border-white/10 mb-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
            {trustBadges.map((badge, index) => {
              const Icon = badge.icon;
              return (
                <div key={index} className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left justify-center md:justify-start">
                  <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                      {badge.label}
                    </span>
                    <span className="block font-display font-bold text-sm sm:text-base text-white">
                      {badge.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Regulatory Disclaimer at bottom of section */}
        <div className="max-w-3xl mx-auto text-center mt-6">
          <p className="text-[10px] text-slate-500 leading-relaxed flex items-center justify-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-slate-600 shrink-0" />
            <span>
              Disclaimer: Registration granted by SEBI and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
            </span>
          </p>
        </div>

      </div>
    </section>
  );
}
