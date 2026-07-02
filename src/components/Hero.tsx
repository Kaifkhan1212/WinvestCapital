/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, TrendingUp, ArrowUpRight, HelpCircle, AlertCircle } from 'lucide-react';

interface HeroProps {
  accentColor: 'emerald' | 'blue';
}

export default function Hero({ accentColor }: HeroProps) {
  const [istTime, setIstTime] = useState('');
  const [isMarketOpen, setIsMarketOpen] = useState(false);

  useEffect(() => {
    const updateMarketStatus = () => {
      // Get current UTC time
      const now = new Date();
      
      // Calculate IST (UTC + 5.5 hours)
      const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
      const istDate = new Date(utc + (3600000 * 5.5));
      
      const day = istDate.getDay(); // 0 is Sunday, 6 is Saturday
      const hours = istDate.getHours();
      const minutes = istDate.getMinutes();
      const totalMinutes = hours * 60 + minutes;

      const openMinutes = 9 * 60 + 15;  // 9:15 AM
      const closeMinutes = 15 * 60 + 30; // 3:30 PM
      
      const weekday = day >= 1 && day <= 5;
      const hoursInMarket = totalMinutes >= openMinutes && totalMinutes < closeMinutes;

      setIsMarketOpen(weekday && hoursInMarket);

      // Format IST Time
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setIstTime(now.toLocaleTimeString('en-US', options));
    };

    updateMarketStatus();
    const interval = setInterval(updateMarketStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const tickerItems = [
    'Trusted Research Support',
    'Daily Market Insights',
    'Fast Client Assistance',
    'Expert Guidance',
    'Growth Focused',
    'Premium Support',
  ];

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryBorder = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';
  const gradientHeader = accentColor === 'emerald' ? 'text-gradient' : 'text-gradient-blue';

  return (
    <section id="home" className="relative pt-32 pb-16 bg-[#0A0F0D] bg-candlestick overflow-hidden">
      {/* Decorative radial gradients for premium depth */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* SEBI Badge & Live Market Telemetry */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-medium tracking-wide text-slate-300 uppercase"
            >
              <ShieldCheck className={`w-3.5 h-3.5 ${primaryAccent}`} />
              <span>SEBI Registered Research Analyst</span>
            </motion.div>

            {/* Live market status badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border ${
                isMarketOpen ? 'border-emerald-500/20 text-emerald-400' : 'border-red-500/20 text-red-400'
              } text-[11px] font-medium tracking-wide uppercase font-mono`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isMarketOpen ? 'bg-emerald-500 animate-ping' : 'bg-red-500'}`} />
              <span>{isMarketOpen ? 'Markets Open' : 'Markets Closed'}</span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">{istTime || '11:30:00 AM'} IST</span>
            </motion.div>
          </div>

          {/* Registration Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-block mb-4"
          >
            <div className={`px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border ${primaryBorder} text-xs text-emerald-400 font-mono tracking-wide`} id="sebi-chip">
              Registration No: <span className="font-bold text-white">INH000025124</span>
            </div>
          </motion.div>

          {/* Headline with premium gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-7xl font-display font-bold tracking-tight text-white mb-6 leading-tight"
          >
            Expert Stock Market Research For{' '}
            <span className={gradientHeader}>Long Term Growth</span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Expert stock market research, investment advisory and portfolio management solutions focused on long-term wealth creation.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <button
              onClick={() => scrollToSection('pricing')}
              className={`w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 ${primaryBg} text-black font-display shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2`}
            >
              <span>Explore Plans</span>
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold tracking-wide uppercase transition-all duration-300 bg-transparent border border-slate-700 hover:border-slate-500 hover:bg-slate-900/50 text-white font-display hover:-translate-y-0.5 cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Marquee Ticker Strip */}
        <div className="relative mt-4 mb-10 w-full overflow-hidden border-y border-slate-900 bg-[#070B0A]/80 md:backdrop-blur-sm py-4 rounded-2xl shadow-inner">
          <div className="animate-marquee flex whitespace-nowrap gap-12 text-xs font-mono tracking-wider text-slate-400">
            {/* Double the array for infinite scroll effect */}
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <div key={index} className="flex items-center space-x-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-semibold uppercase text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SEBI Mandatory Risk Disclaimer Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-3xl mx-auto p-4 rounded-2xl bg-red-950/20 border border-red-900/30 text-center"
        >
          <p className="text-[10px] sm:text-xs text-red-400/90 leading-relaxed flex items-start sm:items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong>Mandatory SEBI Risk Disclaimer:</strong> Investments in securities market are subject to market risks. Read all related documents carefully before investing. We DO NOT provide any assurance or guarantee of profit or returns with any of our services.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
