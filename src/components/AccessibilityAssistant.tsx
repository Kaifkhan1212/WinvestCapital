/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Type,
  Moon,
  Sun,
  Highlighter,
  AlignJustify,
  ImageOff,
  Columns,
  Volume2,
  VolumeX,
  AlignLeft,
  AlignCenter,
  Pause,
  Droplet,
  Contrast,
  RefreshCw,
  Eye,
  Settings,
  HelpCircle,
  Accessibility
} from 'lucide-react';

export interface AccessibilitySettings {
  biggerText: number; // 0 = 100%, 1 = 110%, 2 = 120%, 3 = 130%
  darkMode: boolean;  // true = high-contrast dark, false = high-contrast light
  highlightLinks: boolean;
  lineHeight: number; // 0 = normal, 1 = 1.5, 2 = 1.8, 3 = 2.2
  hideImages: boolean;
  letterSpacing: number; // 0 = normal, 1 = 0.05em, 2 = 0.1em, 3 = 0.15em
  screenReader: boolean;
  textAlign: number; // 0 = left, 1 = center, 2 = justify
  pauseAnimation: boolean;
  saturation: number; // 0 = 100%, 1 = 50%, 2 = 150%, 3 = 0%
  contrastPlus: boolean;
}

interface AccessibilityAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AccessibilitySettings;
  onChange: (newSettings: AccessibilitySettings) => void;
  onReset: () => void;
}

export default function AccessibilityAssistant({
  isOpen,
  onClose,
  settings,
  onChange,
  onReset,
}: AccessibilityAssistantProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Screen Reader logic
  useEffect(() => {
    if (!settings.screenReader) {
      window.speechSynthesis?.cancel();
      return;
    }

    // Speak introductory message
    const introUtterance = new SpeechSynthesisUtterance('Screen reader activated. Hover or focus on elements to read them.');
    introUtterance.rate = 1.0;
    window.speechSynthesis?.speak(introUtterance);

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Find closest readable element
      const readable = target.closest('p, h1, h2, h3, h4, h5, h6, a, button, li, span, th, td');
      if (readable) {
        const text = readable.textContent?.trim();
        if (text && (readable as any)._lastSpokenText !== text) {
          window.speechSynthesis?.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.05;
          window.speechSynthesis?.speak(utterance);
          
          // Prevent speaking the same element multiple times continuously
          (readable as any)._lastSpokenText = text;
          setTimeout(() => {
            (readable as any)._lastSpokenText = null;
          }, 2000);
        }
      }
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (target) {
        const text = target.textContent?.trim() || target.getAttribute('aria-label') || target.getAttribute('placeholder');
        if (text) {
          window.speechSynthesis?.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.rate = 1.05;
          window.speechSynthesis?.speak(utterance);
        }
      }
    };

    document.addEventListener('mouseover', handleHover);
    document.addEventListener('focusin', handleFocus);

    return () => {
      document.removeEventListener('mouseover', handleHover);
      document.removeEventListener('focusin', handleFocus);
      window.speechSynthesis?.cancel();
    };
  }, [settings.screenReader]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        // Check if the click target is the toggle button to avoid double triggering
        const toggleBtn = document.getElementById('access-panel-toggle');
        const mobileToggleBtn = document.getElementById('access-panel-toggle-mobile');
        if (
          (toggleBtn && toggleBtn.contains(e.target as Node)) ||
          (mobileToggleBtn && mobileToggleBtn.contains(e.target as Node))
        ) {
          return;
        }
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const toggleSetting = (key: keyof AccessibilitySettings) => {
    const value = settings[key];
    if (typeof value === 'boolean') {
      onChange({ ...settings, [key]: !value });
    }
  };

  const cycleSetting = (key: keyof AccessibilitySettings, max: number) => {
    const value = settings[key];
    if (typeof value === 'number') {
      const nextValue = (value + 1) % (max + 1);
      onChange({ ...settings, [key]: nextValue });
    }
  };

  const getBiggerTextLabel = () => {
    if (settings.biggerText === 0) return 'Standard (100%)';
    if (settings.biggerText === 1) return 'Medium (110%)';
    if (settings.biggerText === 2) return 'Large (120%)';
    return 'Extra (130%)';
  };

  const getLineHeightLabel = () => {
    if (settings.lineHeight === 0) return 'Default (1.2)';
    if (settings.lineHeight === 1) return 'Medium (1.5)';
    if (settings.lineHeight === 2) return 'Spacious (1.8)';
    return 'Double (2.2)';
  };

  const getLetterSpacingLabel = () => {
    if (settings.letterSpacing === 0) return 'Standard (0)';
    if (settings.letterSpacing === 1) return 'Loose (0.05em)';
    if (settings.letterSpacing === 2) return 'Spacious (0.1em)';
    return 'Wide (0.15em)';
  };

  const getTextAlignLabel = () => {
    if (settings.textAlign === 0) return 'Left Align';
    if (settings.textAlign === 1) return 'Center';
    return 'Justify';
  };

  const getSaturationLabel = () => {
    if (settings.saturation === 0) return 'Standard (100%)';
    if (settings.saturation === 1) return 'Low (50%)';
    if (settings.saturation === 2) return 'High (150%)';
    return 'Grayscale (0%)';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 pointer-events-auto"
          />

          {/* Drawer container */}
          <motion.div
            ref={panelRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="accessibility-assistant-drawer fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white text-slate-900 shadow-2xl z-50 flex flex-col overflow-hidden"
          >
            {/* Header section (Black Bar) */}
            <div className="bg-black text-white px-6 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center space-x-2">
                <Accessibility className="w-5 h-5 text-[#10B981] animate-pulse" />
                <h2 className="font-display font-bold text-base tracking-wide uppercase">
                  Accessibility Assistant
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Assistant"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              
              {/* Reset All Button */}
              <button
                onClick={() => {
                  onReset();
                  // Speak confirmation
                  if (window.speechSynthesis) {
                    window.speechSynthesis.cancel();
                    window.speechSynthesis.speak(new SpeechSynthesisUtterance('All settings have been reset to default.'));
                  }
                }}
                className="w-full flex items-center justify-center space-x-2 py-3 px-5 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-md active:scale-98"
              >
                <RefreshCw className="w-4 h-4 animate-spin-hover" />
                <span>Reset All Settings</span>
              </button>

              <div className="border-t border-slate-100 my-4" />

              {/* 3-Column Toggle Card Grid (re-adjusts on smaller viewports) */}
              <div className="grid grid-cols-2 xs:grid-cols-2 md:grid-cols-3 gap-3">
                
                {/* 1. Bigger Text */}
                <button
                  onClick={() => cycleSetting('biggerText', 3)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.biggerText > 0
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Type className={`w-6 h-6 mb-2 ${settings.biggerText > 0 ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Bigger Text</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">{getBiggerTextLabel()}</span>
                </button>

                {/* 2. Dark Mode */}
                <button
                  onClick={() => toggleSetting('darkMode')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.darkMode
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {settings.darkMode ? (
                    <Moon className="w-6 h-6 mb-2 text-[#10B981]" />
                  ) : (
                    <Sun className="w-6 h-6 mb-2 text-slate-500" />
                  )}
                  <span className="font-bold text-xs">Dark Mode</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.darkMode ? 'HC Dark (On)' : 'HC Light (Off)'}
                  </span>
                </button>

                {/* 3. Highlight Links */}
                <button
                  onClick={() => toggleSetting('highlightLinks')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.highlightLinks
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Highlighter className={`w-6 h-6 mb-2 ${settings.highlightLinks ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Highlight Links</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.highlightLinks ? 'Enabled' : 'Disabled'}
                  </span>
                </button>

                {/* 4. Line Height */}
                <button
                  onClick={() => cycleSetting('lineHeight', 3)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.lineHeight > 0
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <AlignJustify className={`w-6 h-6 mb-2 ${settings.lineHeight > 0 ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Line Height</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">{getLineHeightLabel()}</span>
                </button>

                {/* 5. Hide Images */}
                <button
                  onClick={() => toggleSetting('hideImages')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.hideImages
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <ImageOff className={`w-6 h-6 mb-2 ${settings.hideImages ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Hide Images</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.hideImages ? 'Images Hidden' : 'Visible'}
                  </span>
                </button>

                {/* 6. Letter Spacing */}
                <button
                  onClick={() => cycleSetting('letterSpacing', 3)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.letterSpacing > 0
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Columns className={`w-6 h-6 mb-2 ${settings.letterSpacing > 0 ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Letter Spacing</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">{getLetterSpacingLabel()}</span>
                </button>

                {/* 7. Screen Reader */}
                <button
                  onClick={() => toggleSetting('screenReader')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.screenReader
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {settings.screenReader ? (
                    <Volume2 className="w-6 h-6 mb-2 text-[#10B981]" />
                  ) : (
                    <VolumeX className="w-6 h-6 mb-2 text-slate-500" />
                  )}
                  <span className="font-bold text-xs">Screen Reader</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.screenReader ? 'On (Hover/Focus)' : 'Off'}
                  </span>
                </button>

                {/* 8. Text Align */}
                <button
                  onClick={() => cycleSetting('textAlign', 2)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.textAlign > 0
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {settings.textAlign === 1 ? (
                    <AlignCenter className="w-6 h-6 mb-2 text-[#10B981]" />
                  ) : (
                    <AlignLeft className={`w-6 h-6 mb-2 ${settings.textAlign > 0 ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  )}
                  <span className="font-bold text-xs">Text Align</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">{getTextAlignLabel()}</span>
                </button>

                {/* 9. Pause Animation */}
                <button
                  onClick={() => toggleSetting('pauseAnimation')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.pauseAnimation
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Pause className={`w-6 h-6 mb-2 ${settings.pauseAnimation ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Pause Animation</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.pauseAnimation ? 'Paused' : 'Active'}
                  </span>
                </button>

                {/* 10. Saturation */}
                <button
                  onClick={() => cycleSetting('saturation', 3)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.saturation > 0
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Droplet className={`w-6 h-6 mb-2 ${settings.saturation > 0 ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Saturation</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">{getSaturationLabel()}</span>
                </button>

                {/* 11. Contrast + */}
                <button
                  onClick={() => toggleSetting('contrastPlus')}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all ${
                    settings.contrastPlus
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#064e3b]'
                      : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <Contrast className={`w-6 h-6 mb-2 ${settings.contrastPlus ? 'text-[#10B981]' : 'text-slate-500'}`} />
                  <span className="font-bold text-xs">Contrast +</span>
                  <span className="text-[10px] mt-1 font-semibold opacity-80">
                    {settings.contrastPlus ? '130% Contrast' : 'Default'}
                  </span>
                </button>

              </div>

              {/* Instructions text box */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 space-y-2">
                <div className="flex items-center space-x-1.5 text-slate-700 font-bold uppercase tracking-wider text-[10px]">
                  <HelpCircle className="w-4 h-4 text-emerald-600" />
                  <span>How to use</span>
                </div>
                <p className="leading-relaxed">
                  These accessibility options apply globally to all text, links, and layout elements of the Winvest Capitals portal instantly. Settings are stored securely on this browser.
                </p>
              </div>

            </div>

            {/* Footer with compliance badge */}
            <div className="border-t border-slate-100 p-4 bg-slate-50 text-center text-[10px] text-slate-400 font-mono flex items-center justify-between">
              <span>Winvest Accessibility Assistant</span>
              <span>v2.1</span>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
