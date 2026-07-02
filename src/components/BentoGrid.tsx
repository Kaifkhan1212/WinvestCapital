/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { BrainCircuit, ShieldCheck, Zap, Headphones, BarChart3, Star } from 'lucide-react';

interface BentoGridProps {
  accentColor: 'emerald' | 'blue';
}

export default function BentoGrid({ accentColor }: BentoGridProps) {
  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryBorder = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section id="about" className="relative py-24 bg-[#0A0F0D] border-t border-slate-900 overflow-hidden">
      {/* Background candlestick artwork faded */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.2] pointer-events-none" />
      
      {/* Blur spheres */}
      <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-emerald-500/2 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Smart Research Backed By Real Market</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white mb-6 tracking-tight leading-tight"
          >
            The New Benchmark In{' '}
            <span className={accentColor === 'emerald' ? 'text-gradient' : 'text-gradient-blue'}>
              Securities Research
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-slate-400 leading-relaxed text-base sm:text-lg"
          >
            We leverage proprietary quantitative models, real-time tracking engines, and years of fundamental expertise to generate trade setups that work. No hearsay. Just mathematically vetted ideas designed to keep you ahead of the trend.
          </motion.p>
        </div>

        {/* Bento Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Card 1: Research Driven (Span 2 cols on desktop) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-8 rounded-3xl bg-[#151A18] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-blue-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#10B981]/10 blur-[80px]"></div>
            
            <div className="flex items-start justify-between">
              <div className={`p-3.5 rounded-2xl bg-emerald-500/10 border ${primaryBorder} group-hover:scale-105 transition-transform duration-300`}>
                <BrainCircuit className={`w-6 h-6 ${primaryAccent}`} />
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] text-slate-300 font-mono tracking-wider uppercase">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                <span>Proprietary Algorithms</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Research Driven Analytics
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                We synthesize hundreds of technical vectors, historical chart loops, and institutional volume flows to engineer high-conviction strategies with strict, pre-vetted entry and exit guidelines.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Trusted Advisory */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 rounded-3xl bg-[#0D1211] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3B82F6]/10 blur-[80px]"></div>
            
            <div className="flex items-start justify-between">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-6 h-6 text-blue-400" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                Trusted Advisory
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                As a fully registered SEBI Research Analyst, client capital safety and regulatory compliance are our ultimate operating pillars.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Growth Focused */}
          <motion.div
            variants={itemVariants}
            className="group relative p-8 rounded-3xl bg-[#0D1211] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/5 to-slate-500/5 rounded-full blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#10B981]/10 blur-[80px]"></div>
            
            <div className="flex items-start justify-between">
              <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 group-hover:scale-105 transition-transform duration-300">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Growth Focused Outperformance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Focused on identifying high-velocity momentum breakout signals to maximize compounding effects over the medium and long term.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Quick Support (Span 2 cols on desktop) */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-2 group relative p-8 rounded-3xl bg-[#151A18] border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[300px]"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-emerald-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3B82F6]/10 blur-[80px]"></div>
            
            <div className="flex items-start justify-between">
              <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                <Headphones className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/40 border border-white/10 text-[10px] text-emerald-400 font-mono tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active Channels</span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                Instant Advisory Alerts & Support
              </h3>
              <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
                Get real-time updates directly on your WhatsApp. No checking stale portals or missing fast-moving trading setups. Standard customer help desk operates from 9 AM to 5 PM with high efficiency.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
