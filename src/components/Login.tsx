import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, Sparkles, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface LoginProps {
  onNavigate: (path: string) => void;
  accentColor: 'emerald' | 'blue';
}

export default function Login({ onNavigate, accentColor }: LoginProps) {
  const { isConfigured } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-400' : 'text-blue-400';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600';
  const primaryRing = accentColor === 'emerald' ? 'focus:ring-emerald-500/20 focus:border-emerald-500/80' : 'focus:ring-blue-500/20 focus:border-blue-500/80';
  const primaryBorderGlow = accentColor === 'emerald' ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-blue-500/20 hover:border-blue-500/40';

  const validateForm = () => {
    if (!email) {
      setError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setError('Password is required.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    return true;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (!validateForm()) return;

    if (!isConfigured) {
      setError('Supabase is not configured yet. Please add VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
      } else {
        // Success: AuthContext will pick it up, redirect to dashboard/home
        onNavigate('/account');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setError(null);
    setInfoMessage(null);

    if (!email) {
      setError('Please enter your email address to reset your password.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!isConfigured) {
      setError('Supabase is not configured yet.');
      return;
    }

    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });

      if (resetError) {
        setError(resetError.message);
      } else {
        setInfoMessage('Password reset link has been sent to your email.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred sending reset link.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setInfoMessage(null);

    if (!isConfigured) {
      setError('Supabase is not configured yet.');
      return;
    }

    try {
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/account',
        }
      });

      if (oauthError) {
        setError(oauthError.message);
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during Google sign in.');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-[#0A0F0D] relative overflow-hidden">
      {/* Dynamic Glow elements */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Warning if Supabase is unconfigured */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm flex gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-semibold">Supabase is not connected</p>
              <p className="text-xs mt-1 text-amber-400">
                Please add <code className="bg-black/30 px-1 py-0.5 rounded text-white font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment variables to enable authentication.
              </p>
            </div>
          </div>
        )}

        <div className={`bento-card p-8 rounded-3xl border border-slate-800 bg-[#0E1512]/90 md:backdrop-blur-md shadow-2xl relative ${primaryBorderGlow}`}>
          {/* Top Logo / Label */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-[#151A18] text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premium Access</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
              Sign In to <span className={primaryAccent}>Winvest Capitals</span>
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Access your bespoke asset portfolio and live market signals.
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex gap-2.5 items-start"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}

          {infoMessage && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex gap-2.5 items-start"
            >
              <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </motion.div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className={`text-xs font-semibold hover:underline cursor-pointer ${primaryAccent}`}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full pl-11 pr-11 py-3 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md shadow-emerald-950/20 disabled:opacity-50 ${primaryBg}`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center justify-between text-xs text-slate-500">
            <span className="w-[30%] h-[1px] bg-slate-800" />
            <span className="uppercase tracking-wider">or connect with</span>
            <span className="w-[30%] h-[1px] bg-slate-800" />
          </div>

          {/* Social Sign In */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading || !isConfigured}
            className="w-full py-3 px-4 rounded-xl border border-slate-800 hover:border-slate-700 bg-[#151A18] text-white font-medium text-sm flex items-center justify-center gap-2.5 cursor-pointer transition-all active:scale-98 disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.48 14.98 1 12 1 7.35 1 3.4 3.65 1.5 7.5l3.9 3.02C6.35 7.6 8.94 5.04 12 5.04z"
              />
              <path
                fill="#4285F4"
                d="M23.49 12.27c0-.8-.07-1.56-.2-2.3H12v4.51h6.44c-.28 1.47-1.11 2.71-2.36 3.55l3.66 2.84c2.14-1.97 3.75-4.87 3.75-8.6z"
              />
              <path
                fill="#FBBC05"
                d="M5.4 14.52c-.24-.71-.38-1.47-.38-2.27s.14-1.56.38-2.27L1.5 6.96C.54 8.88 0 11.02 0 13.25s.54 4.37 1.5 6.29l3.9-3.02z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.24 0 5.95-1.08 7.93-2.91l-3.66-2.84c-1.01.67-2.3 1.07-4.27 1.07-3.06 0-5.65-2.56-6.6-5.48l-3.9 3.02C3.4 19.35 7.35 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Footer Navigation */}
          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs sm:text-sm">
            <span className="text-slate-400">New to Winvest Capitals? </span>
            <button
              type="button"
              onClick={() => onNavigate('/signup')}
              className={`font-semibold hover:underline cursor-pointer ${primaryAccent}`}
            >
              Create an account
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
