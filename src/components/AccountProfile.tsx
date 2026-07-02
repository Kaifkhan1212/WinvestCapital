import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { User, Phone, Mail, Upload, Save, LogOut, CheckCircle, AlertCircle, ShieldCheck, DollarSign, BarChart3, Clock, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

interface AccountProfileProps {
  onNavigate: (path: string) => void;
  accentColor: 'emerald' | 'blue';
}

export default function AccountProfile({ onNavigate, accentColor }: AccountProfileProps) {
  const { user, profile, refreshProfile, signOut, isConfigured } = useAuth();
  
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-400' : 'text-blue-400';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-blue-500 hover:bg-blue-600';
  const primaryRing = accentColor === 'emerald' ? 'focus:ring-emerald-500/20 focus:border-emerald-500/80' : 'focus:ring-blue-500/20 focus:border-blue-500/80';
  const primaryBorderGlow = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';

  // Load profile values when they arrive
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '');
      setPhone(profile.phone || '');
      setAvatarUrl(profile.avatar_url || '');
    }
  }, [profile]);

  // Handle profile update
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          phone: phone,
          avatar_url: avatarUrl,
        });

      if (updateError) throw updateError;
      
      await refreshProfile();
      setSuccess('Your investor profile has been successfully updated.');
    } catch (err: any) {
      setError(err?.message || 'Failed to update profile details.');
    } finally {
      setLoading(false);
    }
  };

  // Handle avatar upload to Supabase Storage
  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setSuccess(null);
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const file = files[0];
      if (!user) return;

      setUploading(true);

      // 1. Create bucket if not exists (handled gracefully by Supabase or ignored)
      try {
        await supabase.storage.createBucket('avatars', { public: true });
      } catch (bErr) {
        // This is safe to ignore if bucket already exists
      }

      // 2. Upload file
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { cacheControl: '3600', upsert: true });

      if (uploadError) throw uploadError;

      // 3. Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // 4. Update state and save to DB profiles
      setAvatarUrl(publicUrl);

      const { error: dbError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName || null,
          phone: phone || null,
          avatar_url: publicUrl,
        });

      if (dbError) throw dbError;

      await refreshProfile();
      setSuccess('Avatar image uploaded and profile updated.');
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'An error occurred uploading your photo. Please make sure the storage bucket is configured.');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      onNavigate('/');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen pt-32 pb-24 flex flex-col items-center justify-center bg-[#0A0F0D] text-slate-300">
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4 animate-bounce" />
        <h2 className="text-xl font-display font-bold text-white mb-2">Access Restrained</h2>
        <p className="text-sm text-slate-400 mb-6">You must be logged in to access this premium investor dashboard.</p>
        <button
          onClick={() => onNavigate('/login')}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer ${primaryBg} text-white`}
        >
          Proceed to Login
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#0A0F0D] relative overflow-hidden">
      {/* Dynamic Glow artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.05] pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-emerald-500/3 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Title with Log Out */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 border-b border-slate-900 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Investor Account</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Welcome back, <span className={primaryAccent}>{fullName || user.email?.split('@')[0]}</span>
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-800 bg-[#0E1512] text-slate-400 hover:text-red-400 hover:border-red-500/20 transition-all cursor-pointer text-xs font-semibold uppercase tracking-wider self-start sm:self-center"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Bento Dashboard Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Left - Metrics & Quick Summary Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Account Details Card with Avatar */}
            <div className={`bento-card p-6 rounded-3xl border border-slate-800 bg-[#0E1512]/90 md:backdrop-blur-md relative ${primaryBorderGlow}`}>
              <div className="flex flex-col items-center text-center py-4">
                {/* Avatar upload layout */}
                <div className="relative group mb-4">
                  <div className="w-24 h-24 rounded-full border-2 border-slate-800 overflow-hidden bg-slate-900 flex items-center justify-center relative">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={fullName || 'Avatar'}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-bold font-display text-emerald-400">
                        {(fullName || user.email || 'U').charAt(0).toUpperCase()}
                      </span>
                    )}
                    {uploading && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  
                  {/* Absolute Upload Badge */}
                  <label htmlFor="avatar-file" className="absolute bottom-0 right-0 p-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-lg active:scale-95 transition-all">
                    <Camera className="w-4 h-4" />
                    <input
                      id="avatar-file"
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarUpload}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>

                <h3 className="font-display font-semibold text-white text-lg">{fullName || 'Prestige Member'}</h3>
                <p className="text-slate-500 text-xs font-mono mt-1 break-all">{user.email}</p>

                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-slate-800 bg-slate-950 text-[10px] font-mono text-emerald-400 uppercase mt-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>PRESTIGE ID: {user.id.substring(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* Quick Portfolio Stats Card */}
            <div className="bento-card p-6 rounded-3xl border border-slate-800 bg-[#0E1512]/90 md:backdrop-blur-md">
              <h3 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Bespoke Analytics</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Tier Status</span>
                  <span className="block text-sm font-semibold text-white mt-1">Founders Elite</span>
                </div>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Advisory Desk</span>
                  <span className="block text-sm font-semibold text-emerald-400 mt-1">Priority Dedicated</span>
                </div>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Live Signals</span>
                  <span className="block text-sm font-semibold text-white mt-1">Unlimited Active</span>
                </div>
                <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900">
                  <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-500">Joined On</span>
                  <span className="block text-sm font-semibold text-slate-400 mt-1">
                    {new Date(profile?.created_at || user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Right - Edit Profile Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bento-card p-8 rounded-3xl border border-slate-800 bg-[#0E1512]/90 md:backdrop-blur-md">
              <h2 className="text-xl font-display font-bold text-white mb-6 tracking-tight flex items-center gap-2 border-b border-slate-900 pb-4">
                <User className="w-5 h-5 text-emerald-400" />
                <span>Manage Credentials</span>
              </h2>

              {/* Status Feedbacks */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm flex gap-2.5 items-start"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex gap-2.5 items-start"
                >
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{success}</span>
                </motion.div>
              )}

              <form onSubmit={handleUpdateProfile} className="space-y-6">
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
                      placeholder="Jane Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
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
                      className={`w-full pl-11 pr-4 py-3 rounded-xl border border-slate-800 bg-[#151A18] text-white text-sm outline-none transition-all duration-200 ${primaryRing}`}
                    />
                  </div>
                </div>

                {/* Read Only Email */}
                <div className="space-y-1.5">
                  <label htmlFor="emailReadOnly" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider opacity-60">
                    Email Address (Linked Account - Read Only)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="emailReadOnly"
                      type="email"
                      readOnly
                      disabled
                      value={user.email}
                      className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-900 bg-[#0A0F0D]/40 text-slate-500 text-sm outline-none select-none"
                    />
                  </div>
                  <span className="block text-[10px] text-slate-500 italic mt-1">
                    To change your primary email login, please open an inquiry with our advisory support desk.
                  </span>
                </div>

                {/* Save button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-6 py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 shadow-md disabled:opacity-50 ${primaryBg}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      <span>Saving Profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
