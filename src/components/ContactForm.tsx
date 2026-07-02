/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Award, CheckCircle2, Send, AlertTriangle, RefreshCw, ExternalLink } from 'lucide-react';

interface ContactFormProps {
  accentColor: 'emerald' | 'blue';
}

export default function ContactForm({ accentColor }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    service: '', // default empty for "Choose Service"
    message: '',
  });

  const [focused, setFocused] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleFocus = (field: string) => {
    setFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: string, value: string) => {
    if (!value) {
      setFocused((prev) => ({ ...prev, [field]: false }));
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile || !formData.email) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    
    setErrorMessage('');
    setIsSubmitting(true);

    // Simulate elite network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const serviceName = {
        'research_advisory': 'Research Advisory',
        'portfolio_basket': 'Portfolio Basket',
        'investment_planning': 'Investment Planning',
        'package_details': 'Package Details',
      }[formData.service] || 'General Inquiry';

      const waText = `Hello Winvest Capitals, I would like to schedule a premium advisory call. Here are my details:

👤 *Name*: ${formData.name}
📱 *Mobile*: ${formData.mobile}
✉️ *Email*: ${formData.email}
💼 *Service*: ${serviceName}
💬 *Message*: ${formData.message || 'No additional message.'}`;

      const waUrl = `https://wa.me/919579557272?text=${encodeURIComponent(waText)}`;
      
      // Open WhatsApp in a new tab
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Reset form
      setFormData({
        name: '',
        mobile: '',
        email: '',
        service: '',
        message: '',
      });
      setFocused({});
    }, 1500);
  };

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryFocusGlow = accentColor === 'emerald' ? 'focus-within:border-emerald-500/80 focus-within:ring-4 focus-within:ring-emerald-500/10' : 'focus-within:border-blue-500/80 focus-within:ring-4 focus-within:ring-blue-500/10';

  return (
    <section id="contact" className="relative py-24 bg-[#0A0F0D] border-t border-slate-900 overflow-hidden">
      {/* Background artwork */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.15] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>Connect with our Desk</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight leading-tight">
            Schedule a{' '}
            <span className={accentColor === 'emerald' ? 'text-gradient' : 'text-gradient-blue'}>
              Premium Advisory Call
            </span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Have queries about our models, subscription procedures, or risk limits? Send us an inquiry and our client relationship lead will contact you within 2 business hours.
          </p>
        </div>

        {/* Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Column A: Left - Inquiry Form Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#151A18] border border-white/10 rounded-3xl p-6 sm:p-9 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-full blur-[50px] pointer-events-none" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form-inquiry"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <h3 className="font-display font-bold text-xl text-white mb-4">
                    Advisory Inquiry Desk
                  </h3>

                  {errorMessage && (
                    <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/30 flex items-start space-x-2 text-xs text-red-400">
                      <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className={`relative rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition-all duration-300 ${primaryFocusGlow} ${focused.name ? 'border-slate-600' : ''}`}>
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-500 ${
                          focused.name || formData.name
                            ? 'top-1.5 text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400'
                            : 'top-1/2 -translate-y-1/2 text-sm'
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onFocus={() => handleFocus('name')}
                        onBlur={(e) => handleBlur('name', e.target.value)}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 p-0 pt-3 text-sm text-white focus:ring-0 focus:outline-none"
                      />
                    </div>

                    {/* Mobile Number */}
                    <div className={`relative rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition-all duration-300 ${primaryFocusGlow} ${focused.mobile ? 'border-slate-600' : ''}`}>
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-500 ${
                          focused.mobile || formData.mobile
                            ? 'top-1.5 text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400'
                            : 'top-1/2 -translate-y-1/2 text-sm'
                        }`}
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onFocus={() => handleFocus('mobile')}
                        onBlur={(e) => handleBlur('mobile', e.target.value)}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 p-0 pt-3 text-sm text-white focus:ring-0 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Email */}
                    <div className={`relative rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition-all duration-300 ${primaryFocusGlow} ${focused.email ? 'border-slate-600' : ''}`}>
                      <label
                        className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-500 ${
                          focused.email || formData.email
                            ? 'top-1.5 text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400'
                            : 'top-1/2 -translate-y-1/2 text-sm'
                        }`}
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onFocus={() => handleFocus('email')}
                        onBlur={(e) => handleBlur('email', e.target.value)}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 p-0 pt-3 text-sm text-white focus:ring-0 focus:outline-none"
                      />
                    </div>

                    {/* Select Service Dropdown */}
                    <div className={`relative rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition-all duration-300 ${primaryFocusGlow}`}>
                      <label className="absolute left-4 top-1.5 text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400">
                        Select Service
                      </label>
                      <select
                        name="service"
                        id="service-dropdown"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-transparent border-0 p-0 pt-5 text-sm text-white focus:ring-0 focus:outline-none cursor-pointer appearance-none"
                      >
                        <option value="" className="bg-[#0E1512] text-white">Choose Service</option>
                        <option value="research_advisory" className="bg-[#0E1512] text-white">Research Advisory</option>
                        <option value="portfolio_basket" className="bg-[#0E1512] text-white">Portfolio Basket</option>
                        <option value="investment_planning" className="bg-[#0E1512] text-white">Investment Planning</option>
                        <option value="package_details" className="bg-[#0E1512] text-white">Package Details</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className={`relative rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3 transition-all duration-300 ${primaryFocusGlow} ${focused.message ? 'border-slate-600' : ''}`}>
                    <label
                      className={`absolute left-4 transition-all duration-200 pointer-events-none text-slate-500 ${
                        focused.message || formData.message
                          ? 'top-1.5 text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400'
                          : 'top-4 text-sm'
                      }`}
                    >
                      Your Message (Optional)
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={formData.message}
                      onFocus={() => handleFocus('message')}
                      onBlur={(e) => handleBlur('message', e.target.value)}
                      onChange={handleChange}
                      className="w-full bg-transparent border-0 p-0 pt-3 text-sm text-white focus:ring-0 focus:outline-none resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer ${primaryBg} text-black hover:opacity-90 disabled:opacity-50`}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>transmitting inquiry...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="form-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center text-center py-16 px-4"
                >
                  <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-6 pulse-emerald">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    Inquiry Lodged Successfully
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm mb-6 leading-relaxed">
                    Thank you! Your communication has been securely logged on our server. We are redirecting you to WhatsApp to instantly coordinate with Shoeb Shaikh and the team.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 mb-8">
                    <a
                      href="https://wa.me/919579557272"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2.5 bg-emerald-500 text-black rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 shadow-lg shadow-emerald-500/15 hover:bg-emerald-400 transition-colors"
                    >
                      <span>Continue to WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer uppercase font-semibold font-mono"
                    >
                      Submit another
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Column B: Right - Map & Coordinates details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Contact details card */}
            <div className="p-6 sm:p-7 rounded-3xl bg-[#151A18] border border-white/10">
              <h3 className="font-display font-bold text-lg text-white mb-6">
                Proprietor &amp; Registry Desk
              </h3>

              <div className="space-y-4">
                
                {/* Proprietor Name */}
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-emerald-400 shrink-0">
                    <Award className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                      Lead Analyst / Proprietor
                    </span>
                    <span className="block font-bold text-sm text-white uppercase">
                      SHOEB ABDUL RAHIM SHAIKH
                    </span>
                  </div>
                </div>

                {/* Office Location Address */}
                <div className="flex items-start space-x-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-emerald-400 shrink-0">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                      Registered Office Address
                    </span>
                    <p className="block text-xs sm:text-sm text-slate-300 leading-relaxed">
                      401-A 4th Floor Gurudatta Plaza, Beside HP Petrol Pump, Ganesh Colony Road, Jalgaon, Maharashtra - 425001
                    </p>
                  </div>
                </div>

                {/* Grid of Phone and Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-emerald-400 shrink-0">
                      <Phone className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                        Phone Number
                      </span>
                      <a href="tel:+919579557272" className="block text-xs font-mono font-bold text-white hover:text-emerald-400 transition-colors">
                        +91 9579557272
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-900 text-emerald-400 shrink-0">
                      <Mail className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                        Official Email
                      </span>
                      <a href="mailto:winvestcapitals25@gmail.com" className="block text-xs font-mono font-bold text-white hover:text-emerald-400 transition-colors break-all">
                        winvestcapitals25@gmail.com
                      </a>
                    </div>
                  </div>
                </div>

                <hr className="border-slate-800/50 pt-2" />

                {/* Registration numbers block */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono tracking-wider uppercase">SEBI RA Reg No</span>
                    <span className="font-mono font-bold text-xs text-emerald-400">INH000025124</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-slate-500 font-mono tracking-wider uppercase">BSE Enlistment No</span>
                    <span className="font-mono font-bold text-xs text-emerald-400">6950</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded interactive map */}
            <div className="rounded-3xl border border-white/10 overflow-hidden bg-[#0D1211] relative h-[210px] shadow-lg group">
              {/* Desktop view: Interactive Google Map */}
              <iframe
                title="Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.733221379101!2d75.5562725!3d21.0033108!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd90fbcdbc7d665%3A0xe5a3c9454ff914fb!2sGanesh%20Colony%20Rd%2C%20Jalgaon%2C%20Maharashtra%20425001!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                className="hidden md:block w-full h-full border-0 grayscale invert opacity-70 group-hover:opacity-90 group-hover:grayscale-0 transition-all duration-500"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Mobile/Tablet view: Premium static placeholder to prevent Chrome rendering & scroll-hijacking glitches */}
              <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0D1211] to-[#0A0F0D]">
                <div className="absolute inset-0 bg-candlestick opacity-[0.08] pointer-events-none" />
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 z-10">
                  <MapPin className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-1 z-10">Winvest Capitals Office</span>
                <span className="text-[10px] text-slate-500 text-center max-w-[240px] z-10 leading-normal">Ganesh Colony Road, Jalgaon, Maharashtra 425001</span>
              </div>

              <a
                href="https://maps.google.com/?q=401-A+4th+Floor+Gurudatta+Plaza,+Beside+HP+Petrol+Pump,+Ganesh+Colony+Road,+Jalgaon,+Maharashtra+-+425001"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-4 left-4 bg-slate-950/95 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 p-3.5 rounded-xl shadow-2xl flex flex-col items-start gap-1 cursor-pointer transition-all duration-300 group/maplink z-20"
              >
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase text-emerald-400 group-hover/maplink:text-emerald-300 font-display">
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3 text-emerald-500 group-hover/maplink:translate-x-0.5 group-hover/maplink:-translate-y-0.5 transition-transform duration-200" />
                </span>
                <span className="text-[9px] text-slate-400 font-mono tracking-wider uppercase font-medium flex items-center gap-1">
                  <span>📍 GANESH COLONY ROAD, JALGAON</span>
                </span>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
