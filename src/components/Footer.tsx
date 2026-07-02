/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Shield, Mail, Phone, MapPin, Send, Instagram, Facebook } from 'lucide-react';

export default function Footer() {
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

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Contact Us', id: 'contact' },
  ];

  const supportLinks = [
    'Privacy Policy',
    'Terms & Condition',
    'Refund Policy',
    'Complaint Data',
    'Investor Charter',
    'Disclaimer',
    'Legal Disclosure',
    'Grievance Redressal Policy',
    'Registered Research Analyst',
  ];

  return (
    <footer className="relative bg-[#050807] border-t border-slate-900 pt-20 pb-8 overflow-hidden">
      {/* Background candlestick artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Logo + Tagline + SEBI Badge */}
          <div>
            <div className="flex items-center space-x-2.5 mb-5 cursor-pointer group" onClick={() => scrollToSection('home')}>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Shield className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Winvest <span className="text-emerald-500">Capitals</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed mb-6">
              Empowering Indian traders with mathematically vetted stock research, disciplined index options alerts, and strategic long-term wealth portfolio setups.
            </p>

            <div className="inline-block px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800 text-[10px] font-mono text-slate-400">
              <span className="block font-semibold text-white uppercase text-[8px] tracking-widest text-emerald-400">SEBI Reg Analyst</span>
              <span>No. INH000025124</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="hover:text-emerald-400 transition-colors cursor-pointer text-left font-medium"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support & Policies */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5">
              Support &amp; Compliance
            </h4>
            <ul className="space-y-2.5 text-[11px] text-slate-400">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#contact"
                    className="hover:text-emerald-400 transition-colors text-left font-medium block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact details with Socials */}
          <div className="space-y-6">
            <div>
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5">
                Reg Office Desk
              </h4>
              <ul className="space-y-3.5 text-xs text-slate-400">
                <li className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                  <a
                    href="https://maps.google.com/?q=401-A+4th+Floor+Gurudatta+Plaza,+Beside+HP+Petrol+Pump,+Ganesh+Colony+Road,+Jalgaon,+Maharashtra+-+425001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-400 transition-colors leading-relaxed group/maplink"
                  >
                    401-A 4th Floor Gurudatta Plaza, Beside HP Petrol Pump, Ganesh Colony Road, Jalgaon, Maharashtra - 425001{" "}
                    <span className="inline-block text-[10px] text-emerald-400 group-hover/maplink:translate-x-0.5 group-hover/maplink:-translate-y-0.5 transition-transform duration-200">↗</span>
                  </a>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="tel:+919579557272" className="hover:text-white transition-colors">
                    +91 9579557272
                  </a>
                </li>
                <li className="flex items-center space-x-2.5 min-w-0">
                  <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href="mailto:winvestcapitals25@gmail.com" className="hover:text-white transition-colors break-all">
                    winvestcapitals25@gmail.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons */}
            <div>
              <h5 className="text-[10px] text-slate-500 uppercase tracking-widest font-mono mb-3">
                Connect Channels
              </h5>
              <div className="flex items-center space-x-3">
                <a
                  href="https://t.me/WinvestCapitals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-750 transition-all hover:-translate-y-0.5"
                  title="Telegram channel"
                >
                  <Send className="w-4 h-4 rotate-[-30deg]" />
                </a>
                <a
                  href="https://www.instagram.com/Winvest_Capitals"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-750 transition-all hover:-translate-y-0.5"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61589213969266"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-750 transition-all hover:-translate-y-0.5"
                  title="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href="mailto:winvestcapitals25@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-750 transition-all hover:-translate-y-0.5"
                  title="Email support"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        <hr className="border-slate-900 mb-8" />

        {/* Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <span className="text-slate-500">
              © 2026 Website designed &amp; developed by <span className="text-slate-400 hover:text-emerald-400 transition-colors font-sans font-medium">Kaif Khan</span>
            </span>
          </div>
          <span>BSE Enlistment No. 6950 | SEBI RA No. INH000025124</span>
        </div>
      </div>
    </footer>
  );
}
