/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BentoGrid from './components/BentoGrid';
import MarketExpert from './components/MarketExpert';
import LivePerformance from './components/LivePerformance';
import Pricing from './components/Pricing';
import TransparencyTable from './components/TransparencyTable';
import WhyTrustUs from './components/WhyTrustUs';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import LegalDisclaimer from './components/LegalDisclaimer';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import AiChatWidget from './components/AiChatWidget';
import AccessibilityAssistant, { AccessibilitySettings } from './components/AccessibilityAssistant';

const DEFAULT_SETTINGS: AccessibilitySettings = {
  biggerText: 0,
  darkMode: true, // Default to true because the site's primary layout is dark
  highlightLinks: false,
  lineHeight: 0,
  hideImages: false,
  letterSpacing: 0,
  screenReader: false,
  textAlign: 0,
  pauseAnimation: false,
  saturation: 0,
  contrastPlus: false,
};

export default function App() {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const [highContrast, setHighContrast] = useState(false);
  const [accentColor, setAccentColor] = useState<'emerald' | 'blue'>('emerald');

  // Accessibility Assistant states
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(() => {
    try {
      const saved = localStorage.getItem('winvest-accessibility-settings');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse accessibility settings from localStorage:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Simple navigate function - no routes needed as login is removed
  const handleNavigate = (path: string) => {
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keep localStorage updated when settings change
  useEffect(() => {
    try {
      localStorage.setItem('winvest-accessibility-settings', JSON.stringify(accessibilitySettings));
    } catch (e) {
      console.error('Failed to save accessibility settings to localStorage:', e);
    }
  }, [accessibilitySettings]);

  const handleFontSizeChange = (size: 'normal' | 'large') => {
    setFontSize(size);
  };

  const handleContrastChange = (high: boolean) => {
    setHighContrast(high);
  };

  const handleAccentChange = (accent: 'emerald' | 'blue') => {
    setAccentColor(accent);
  };

  const handleAccessibilityChange = (newSettings: AccessibilitySettings) => {
    setAccessibilitySettings(newSettings);
  };

  const handleAccessibilityReset = () => {
    setAccessibilitySettings(DEFAULT_SETTINGS);
  };

  // Compute CSS filter style for Saturation (cycles 100% -> 50% -> 150% -> 0%)
  let satVal = '100%';
  if (accessibilitySettings.saturation === 1) satVal = '50%';
  else if (accessibilitySettings.saturation === 2) satVal = '150%';
  else if (accessibilitySettings.saturation === 3) satVal = '0%';

  // Compute CSS filter style for Contrast Plus (cycles 100% -> 130%)
  const contrastVal = accessibilitySettings.contrastPlus ? '130%' : '100%';

  // Combine dynamic inline styles for the root wrapper
  const rootWrapperStyle: React.CSSProperties = {};
  if (satVal !== '100%' || contrastVal !== '100%') {
    rootWrapperStyle.filter = `saturate(${satVal}) contrast(${contrastVal})`;
  }

  // Compute dynamic classes to apply globally
  const accessibilityClasses = [
    accessibilitySettings.biggerText > 0 ? `access-font-size-${accessibilitySettings.biggerText}` : '',
    accessibilitySettings.darkMode ? 'access-force-dark' : 'access-force-light',
    accessibilitySettings.highlightLinks ? 'access-highlight-links' : '',
    accessibilitySettings.lineHeight > 0 ? `access-line-height-${accessibilitySettings.lineHeight}` : '',
    accessibilitySettings.hideImages ? 'access-hide-images' : '',
    accessibilitySettings.letterSpacing > 0 ? `access-letter-spacing-${accessibilitySettings.letterSpacing}` : '',
    accessibilitySettings.textAlign > 0 ? `access-text-align-${accessibilitySettings.textAlign}` : '',
    accessibilitySettings.pauseAnimation ? 'access-pause-animation' : '',
    accessibilitySettings.contrastPlus ? 'access-contrast-plus' : '',
  ].filter(Boolean).join(' ');

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <MotionConfig reducedMotion={isMobile ? "always" : "user"}>
      <div
        className={`min-h-screen transition-all duration-300 ${accessibilityClasses} ${
          highContrast ? 'bg-black text-white selection:bg-white/30 selection:text-white' : 'bg-[#0A0F0D] text-slate-100'
        } ${fontSize === 'large' ? 'text-lg sm:text-xl font-medium' : 'text-sm sm:text-base'}`}
        style={rootWrapperStyle}
      >
      {/* Sticky Header and Navigation with states */}
      <Navbar
        onFontSizeChange={handleFontSizeChange}
        onContrastChange={handleContrastChange}
        onAccentChange={handleAccentChange}
        fontSize={fontSize}
        highContrast={highContrast}
        accentColor={accentColor}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        onNavigate={handleNavigate}
        currentPath="/"
      />

      {/* Hero Section */}
      <Hero accentColor={accentColor} />

      {/* About Section - Bento Feature Grid */}
      <BentoGrid accentColor={accentColor} />

      {/* Meet The Market Expert / Proprietor Profile */}
      <MarketExpert />

      {/* Cumulative Live Track Records / Performance Logs with Recharts */}
      <LivePerformance accentColor={accentColor} />

      {/* Pricing Section - 5 cards with strikethrough animations */}
      <Pricing accentColor={accentColor} />

      {/* Investor Transparency Complaints Data Table */}
      <TransparencyTable />

      {/* Why Trust Us Section */}
      <WhyTrustUs />

      {/* Client Testimonials */}
      <Testimonials />

      {/* FAQ Accordions */}
      <FAQ />

      {/* Legal & Compliance Disclaimers */}
      <LegalDisclaimer />

      {/* Contact Inquiry Form & Proprietor Office Card with grayscale map */}
      <ContactForm accentColor={accentColor} />

      {/* Footer Details and Links */}
      <Footer />

      {/* Accessibility Assistant Side Drawer Panel */}
      <AccessibilityAssistant
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        settings={accessibilitySettings}
        onChange={handleAccessibilityChange}
        onReset={handleAccessibilityReset}
      />

      {/* WhatsApp Floating Sticky Pulsating Button */}
      <WhatsAppButton />

      {/* AI Chat Assistant Widget */}
      <AiChatWidget />
    </div>
    </MotionConfig>
  );
}
