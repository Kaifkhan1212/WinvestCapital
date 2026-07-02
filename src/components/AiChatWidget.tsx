/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, Sparkles, AlertCircle } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      text: "Hi! I'm here to help with questions about Winvest Capitals' plans and services. How can I assist you?",
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when messages or loading state change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      // Auto-focus input on desktop
      if (window.innerWidth >= 768) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
    }
  }, [isOpen, messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedMessage = inputValue.trim();
    if (!trimmedMessage || isLoading) return;

    setError(null);
    const userMessage: Message = {
      role: 'user',
      text: trimmedMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Create chat history format expected by Edge Function
      const history = messages.slice(1).map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      let replyText = '';

      try {
        if (!isSupabaseConfigured()) {
          throw new Error('Supabase is not configured.');
        }

        const { data, error: functionError } = await supabase.functions.invoke('gemini-chat', {
          body: {
            message: trimmedMessage,
            history,
          },
        });

        if (functionError) {
          throw functionError;
        }

        replyText = data?.reply;
      } catch (supabaseErr) {
        console.warn('Supabase edge function failed or is unconfigured. Trying local secure server fallback...', supabaseErr);

        try {
          // Fallback to local server API endpoint
          const response = await fetch('/api/gemini-chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: trimmedMessage,
              history,
            }),
          });

          if (!response.ok) {
            throw new Error(`Local API responded with status ${response.status}`);
          }

          // In static hosting environments like Netlify, unknown API routes return the static index.html file.
          // Check if response is actually HTML to catch this.
          const contentType = response.headers.get('content-type') || '';
          if (contentType.includes('text/html')) {
            throw new Error('Local API returned HTML instead of JSON. This suggests a static-only hosting environment.');
          }

          const localData = await response.json();
          replyText = localData?.reply;
        } catch (apiErr) {
          console.warn('Local secure server fallback failed. Trying direct client-side Gemini API call...', apiErr);

          // Get client-side configured API key (VITE_ prefixed is required by Vite in production builds)
          const clientApiKey = (import.meta as any).env.VITE_GEMINI_API_KEY || (import.meta as any).env.GEMINI_API_KEY || '';
          
          if (!clientApiKey) {
            console.error(
              'No Gemini API Key found for direct client fallback. ' +
              'Please configure VITE_GEMINI_API_KEY as an environment variable in your hosting platform (e.g., Netlify).'
            );
            throw new Error('No API key configured for direct client call.');
          }

          const contents = [
            ...history.map((item: any) => ({
              role: item.role === 'user' ? 'user' : 'model',
              parts: [{ text: item.text }],
            })),
            {
              role: 'user',
              parts: [{ text: trimmedMessage }],
            },
          ];

          const systemInstruction = `You are the AI assistant for Winvest Capitals, a SEBI Registered Research Analyst firm (Registration No: INH000025124, BSE Enlistment No: 6950). Help visitors with general questions about:
- Our plans: Free Trial (₹299), Equity Premium (₹1,500), Index Options (₹2,000), Combo Plan (₹3,000), Premium (₹6,000)
- How to get started, contact details, and SEBI compliance
- General SEBI/stock market advisory concepts

IMPORTANT RESTRICTIONS:
- NEVER give specific stock recommendations, buy/sell calls, price targets, or predict market movement
- NEVER guarantee or imply any returns or profit
- If asked for investment advice, politely explain you can only provide general information and direct them to contact the team via WhatsApp (+91 9579557272) or the contact form for personalized guidance
- Keep responses short (2-4 sentences), friendly, and professional`;

          const directResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${clientApiKey}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents,
              systemInstruction: {
                parts: [{ text: systemInstruction }]
              },
              generationConfig: {
                temperature: 0.7,
              }
            })
          });

          if (!directResponse.ok) {
            const errorText = await directResponse.text();
            throw new Error(`Direct Gemini API failed with status ${directResponse.status}: ${errorText}`);
          }

          const directData = await directResponse.json();
          replyText = directData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        }
      }

      if (!replyText) {
        throw new Error('Could not get a valid response from either Supabase or fallback API.');
      }
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: replyText,
          timestamp: new Date(),
        }
      ]);
    } catch (err) {
      console.error('Error invoking chat assistant:', err);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: "Sorry, I'm having trouble right now. Please reach out to us on WhatsApp or the contact form for help.",
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 p-4 rounded-full bg-[#0E1512] text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/30 hover:scale-105 shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center animate-pulse"
        title="Winvest AI Assistant"
        style={{
          boxShadow: '0 0 20px rgba(16, 185, 129, 0.15)',
        }}
      >
        <Sparkles className="w-6 h-6 text-emerald-400" />
        <span className="sr-only">AI Assistant</span>
      </button>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="fixed inset-x-0 bottom-0 md:bottom-36 md:right-6 md:left-auto md:w-96 h-[80vh] md:h-[550px] bg-[#0A0F0D] border-t md:border border-slate-800/80 md:rounded-2xl shadow-2xl shadow-black z-50 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-[#0E1512] border-b border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white font-display flex items-center gap-1.5">
                    Winvest AI Assistant
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Active Desk</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg border border-slate-800 bg-[#0E1512] text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Message Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((msg, index) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={index}
                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
                        isUser
                          ? 'bg-emerald-500 text-black font-medium rounded-tr-none'
                          : 'bg-[#0E1512] text-slate-100 border border-slate-800/50 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                      <span
                        className={`block text-[9px] mt-1.5 font-mono ${
                          isUser ? 'text-black/60 text-right' : 'text-slate-500'
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                );
              })}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#0E1512] text-slate-100 border border-slate-800/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center space-x-1.5">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form & Footer Disclaimer */}
            <div className="p-4 bg-[#0E1512] border-t border-slate-800/80 space-y-3">
              <form onSubmit={handleSend} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about plans, contact details, or compliance..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#0A0F0D] border border-slate-800 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="p-2.5 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-colors disabled:opacity-40 disabled:hover:bg-emerald-500 cursor-pointer flex items-center justify-center shadow-lg shadow-emerald-500/10"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

              {/* Disclaimer */}
              <div className="text-[10px] text-center text-slate-500 font-medium tracking-wide leading-normal">
                AI assistant for general queries only. Not investment advice.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
