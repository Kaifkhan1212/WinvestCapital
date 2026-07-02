/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Shield, Eye, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onFontSizeChange: (size: 'normal' | 'large') => void;
  onContrastChange: (high: boolean) => void;
  onAccentChange: (accent: 'emerald' | 'blue') => void;
  fontSize: 'normal' | 'large';
  highContrast: boolean;
  accentColor: 'emerald' | 'blue';
  onOpenAssistant: () => void;
  onNavigate: (path: string) => void;
  currentPath: string;
}

export default function Navbar({
  accentColor,
  onOpenAssistant,
  onNavigate,
  currentPath,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);

    if (currentPath !== '/') {
      onNavigate('/');
      setTimeout(() => {
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
      }, 150);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky navbar
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

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryBorder = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';

  return (
    <>
      <nav
        id="navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0F0D]/90 md:backdrop-blur-md border-b border-slate-800/80 py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              onClick={() => scrollToSection('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className={`p-2 rounded-xl ${primaryBg}/10 border ${primaryBorder} group-hover:scale-105 transition-transform duration-300`}>
                <Shield className={`w-5 h-5 ${primaryAccent} animate-pulse`} />
              </div>
              <div>
                <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Winvest <span className={primaryAccent}>Capitals</span>
                </span>
                <span className="block text-[9px] text-slate-400 font-mono tracking-widest uppercase">
                  SEBI RA INH000025124
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-emerald-400 hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Accessibility Toggle Button */}
              <button
                id="access-panel-toggle"
                onClick={onOpenAssistant}
                className="px-4 py-2.5 rounded-xl border border-slate-800 bg-[#0E1512] text-slate-400 hover:text-white hover:border-slate-700 transition-all flex items-center space-x-2 font-display text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-md hover:shadow-lg active:scale-98"
                title="Open Accessibility Assistant"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span>Accessibility</span>
              </button>

              <button
                onClick={() => scrollToSection('pricing')}
                className={`px-5 py-2 rounded-full text-xs font-bold font-display tracking-wide uppercase transition-all duration-300 ${primaryBg} hover:opacity-90 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 text-black hover:-translate-y-0.5 cursor-pointer flex items-center space-x-1.5`}
              >
                <span>Get Started</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Accessibility Toggle on Mobile */}
              <button
                id="access-panel-toggle-mobile"
                onClick={onOpenAssistant}
                className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1512] text-slate-400 hover:text-white flex items-center space-x-1 cursor-pointer active:scale-95"
                title="Open Accessibility Assistant"
              >
                <Eye className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-bold tracking-wider uppercase">Access</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 rounded-xl border border-slate-800 bg-[#0E1512] text-slate-400 hover:text-white cursor-pointer"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-[#0A0F0D] border-b border-slate-800"
            >
              <div className="px-4 pt-2 pb-6 space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left py-2.5 px-3 rounded-xl text-base font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-slate-900 px-3">
                  <button
                    onClick={() => scrollToSection('pricing')}
                    className={`w-full py-3 px-4 rounded-xl text-center text-sm font-bold tracking-wide uppercase transition-all duration-300 ${primaryBg} text-black shadow-lg shadow-emerald-500/10`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}
