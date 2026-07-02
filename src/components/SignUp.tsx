import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, Mail, Lock, User, Phone, Sparkles, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface SignUpProps {
  onNavigate: (path: string) => void;
  accentColor: 'emerald' | 'blue';
}

export default function SignUp({ onNavigate, accentColor }: SignUpProps) {
  const { isConfigured } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-400' : 'text-blue-400';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600';
  const primaryRing = accentColor === 'emerald' ? 'focus:ring-emerald-500/20 focus:border-emerald-500/80' : 'focus:ring-blue-500/20 focus:border-blue-500/80';
  const primaryBorderGlow = accentColor === 'emerald' ? 'border-emerald-500/20 hover:border-emerald-500/40' : 'border-blue-500/20 hover:border-blue-500/40';

  const validateForm = () => {
    if (!fullName.trim()) {
      setError('Full Name is required.');
      return false;
    }
    if (!phone.trim()) {
      setError('Phone number is required.');
      return false;
    }
    if (!email) {
      setError('Email address is required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }
    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;

    if (!isConfigured) {
      setError('Supabase is not configured yet. Please add VITE_SUPABASE_ANON_KEY in your environment variables.');
      return;
    }

    setLoading(true);
    try {
      // 1. Sign up the user via auth
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      }

      const user = data.user;
      if (user) {
        // 2. Insert metadata into "profiles" table
        // We use upsert since an automated DB trigger might have already run (or might run soon)
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            full_name: fullName,
            phone: phone,
          });

        if (profileError) {
          console.error('Profile creation error:', profileError.message);
          // Don't fail the entire signup because the Auth user is created successfully
        }
        
        setSuccess(true);
      } else {
        throw new Error('Failed to create user session.');
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred during signup.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center bg-[#0A0F0D] relative overflow-hidden">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.08] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg relative z-10"
      >
        {/* Warning if Supabase is unconfigured */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-300 text-sm flex gap-3 shadow-lg">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-semibold">Supabase is not connected</p>
              <p className="text-xs mt-1 text-amber-400">
                Please add <code className="bg-black/30 px-1 py-0.5 rounded text-white font-mono">VITE_SUPABASE_ANON_KEY</code> in your environment variables to enable registration.
              </p>
            </div>
          </div>
        )}

        <div className={`bento-card p-8 rounded-3xl border border-slate-800 bg-[#0E1512]/90 md:backdrop-blur-md shadow-2xl relative ${primaryBorderGlow}`}>
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-3">Registration Successful!</h2>
              <p className="text-slate-400 text-sm max-w-sm mx-auto mb-8">
                Your elite investor account has been provisioned. Please check your email inbox to verify your address before signing in.
              </p>
              <button
                onClick={() => onNavigate('/login')}
                className={`w-full py-3 px-4 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md ${primaryBg}`}
              >
                <span>Proceed to Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-800 bg-[#151A18] text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-4">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Exclusive Club</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-display font-bold text-white tracking-tight">
                  Open a <span className={primaryAccent}>Prestige Account</span>
                </h1>
                <p className="text-slate-400 text-xs sm:text-sm mt-2">
                  Gain institutional grade execution, bespoke strategies, and priority desk routing.
                </p>
              </div>

              {/* Feedback Error */}
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

              {/* Form */}
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <Phone className="w-4 h-4" />
                      </span>
                      <input
                        id="phone"
                        type="tel"
                        required
                        placeholder="+1 (555) 019-2834"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Email Address */}
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
                      className={`w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Password */}
                  <div className="space-y-1.5">
                    <label htmlFor="password" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Password
                    </label>
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
                        className={`w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-1.5">
                    <label htmlFor="confirmPassword" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                        <Lock className="w-4 h-4" />
                      </span>
                      <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
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
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 px-4 mt-2 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md disabled:opacity-50 ${primaryBg}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Creating Account...</span>
                    </>
                  ) : (
                    <>
                      <span>Open Prestige Account</span>
                    </>
                  )}
                </button>
              </form>

              {/* Back to login */}
              <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs sm:text-sm">
                <span className="text-slate-400">Already have an account? </span>
                <button
                  onClick={() => onNavigate('/login')}
                  className={`font-semibold hover:underline cursor-pointer ${primaryAccent}`}
                >
                  Sign In
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
