/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Shield, Sparkles, Send, Instagram, Facebook, Mail, Award, CheckCircle } from 'lucide-react';

export default function MarketExpert() {
  const socialLinks = [
    {
      name: 'Instagram',
      icon: <Instagram className="w-4 h-4 text-white" />,
      url: 'https://www.instagram.com/Winvest_Capitals',
      bg: 'bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 shadow-pink-500/20',
    },
    {
      name: 'Telegram',
      icon: <Send className="w-4 h-4 text-white -translate-x-0.5 translate-y-0.5 rotate-[-25deg]" />,
      url: 'https://t.me/WinvestCapitals',
      bg: 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-blue-500/20',
    },
    {
      name: 'Email',
      icon: <Mail className="w-4 h-4 text-white" />,
      url: 'mailto:winvestcapitals25@gmail.com',
      bg: 'bg-gradient-to-r from-orange-400 to-rose-500 shadow-orange-500/20',
    },
    {
      name: 'Facebook',
      icon: <Facebook className="w-4 h-4 text-white" />,
      url: 'https://www.facebook.com/profile.php?id=61589213969266',
      bg: 'bg-gradient-to-r from-blue-600 to-blue-700 shadow-blue-600/20',
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#0A0F0D] border-t border-slate-900/50 overflow-hidden">
      {/* Decorative Grid and Ambient Lights */}
      <div className="absolute inset-0 bg-grid opacity-[0.05] pointer-events-none" />
      <div className="absolute -top-40 right-10 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-blue-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badging */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-1.5 bg-black px-3.5 py-1.5 rounded-full border border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-3 tracking-tight">
            Meet The <span className="text-emerald-400">Market</span> <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">Expert</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base font-medium max-w-xl mx-auto">
            Focused on disciplined research &amp; smarter market decisions
          </p>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#151A18] text-white shadow-2xl rounded-[2.5rem] p-8 sm:p-12 border border-white/10 max-w-5xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-16 relative"
        >
          {/* Left Side: Avatar Column */}
          <div className="flex flex-col items-center shrink-0">
            <div className="relative">
              {/* Outer soft shadow aura */}
              <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl scale-110 pointer-events-none" />
              {/* Large green initials circle */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-[#0D1211] border-4 border-emerald-500/30 flex items-center justify-center text-emerald-400 text-6xl sm:text-7xl font-bold font-display shadow-2xl">
                SS
              </div>
            </div>

            {/* Verification Tag */}
            <div className="mt-5 inline-flex items-center space-x-1.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 py-1.5 px-4 rounded-full text-xs font-bold shadow-sm">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Research Driven Leadership</span>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center space-x-3.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-full text-white ${social.bg} transition-transform duration-300 hover:scale-110 shadow-lg cursor-pointer flex items-center justify-center`}
                  title={social.name}
                >
                  {social.icon}
                  <span className="sr-only">{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side: Biography Column */}
          <div className="flex-1 text-center md:text-left pt-2">
            <h3 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 tracking-tight">
              Shoeb Shaikh
            </h3>
            
            {/* Professional Role Badge */}
            <div className="inline-block bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase font-mono mb-3 shadow-md border border-emerald-500/20">
              SEBI Registered Research Analyst
            </div>

            {/* Registration Gold Tag */}
            <div className="block md:inline-flex mt-1 items-center space-x-1.5 bg-amber-500/10 border border-amber-500/20 px-4 py-2 rounded-xl text-xs font-semibold text-amber-400 shadow-sm shadow-amber-500/5 mb-6">
              <Award className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Registration No: INH000025124 | Valid till: 2031</span>
            </div>

            {/* Bio text */}
            <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              <p>
                Shoeb Shaikh leads Winvest Capitals with a strong focus on transparent market research, disciplined strategies, and risk-managed trading decisions.
              </p>
              <p>
                His philosophy is simple — <span className="font-semibold text-white">"Markets reward discipline, not luck."</span> The mission is to simplify stock market research for every investor.
              </p>
            </div>

            {/* Quote Block */}
            <div className="bg-[#0A0F0D]/60 text-white rounded-3xl p-6 sm:p-7 mt-8 relative border border-slate-850 shadow-xl overflow-hidden">
              <div className="absolute top-2 right-4 text-emerald-500/10 font-serif text-8xl leading-none select-none pointer-events-none">
                “
              </div>
              <p className="relative z-10 text-slate-100 text-sm sm:text-[15px] leading-relaxed font-semibold italic text-center md:text-left">
                My goal is to make professional stock market research accessible to every retail investor. No confusion, no conflict — just pure data-driven insights.
              </p>
              <div className="relative z-10 mt-3 text-right text-xs font-bold text-emerald-400 font-mono tracking-wider uppercase">
                — Shoeb Shaikh
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
