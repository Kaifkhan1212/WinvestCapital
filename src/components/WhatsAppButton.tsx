/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MessageSquareCode } from 'lucide-react';

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919579557272"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all duration-300 hover:scale-105 shadow-2xl shadow-emerald-500/30 pulse-emerald cursor-pointer flex items-center justify-center border-2 border-[#0A0F0D]"
      title="Chat with us on WhatsApp"
    >
      {/* WhatsApp vector representation using Lucide message icon */}
      <MessageSquareCode className="w-6 h-6 fill-black/10" />
      <span className="sr-only">Chat on WhatsApp</span>
    </a>
  );
}
