/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { COMPLAINT_DATA } from '../data';
import { ShieldCheck, FileSpreadsheet, RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

export default function TransparencyTable() {
  return (
    <section className="relative py-20 bg-[#050807] border-t border-slate-900 overflow-hidden">
      {/* Sparkles of candlestick pattern */}
      <div className="absolute inset-0 bg-candlestick opacity-[0.1] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Verification note */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SEBI Compliance</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mb-2 tracking-tight">
            Investor Transparency Reports
          </h2>
          {/* Warm human sentence requested */}
          <p className="text-slate-300 font-medium text-sm sm:text-base mt-3 max-w-xl mx-auto bg-[#0D1211] border border-white/10 py-2.5 px-4 rounded-xl text-center">
            "We publish this every month — full transparency, zero complaints since inception."
          </p>
        </div>

        {/* Complaint Table Sheet Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#151A18] border border-white/10 rounded-3xl overflow-hidden p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/80">
            <div>
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                Investor Transparency — Number of Client Complaints
              </h3>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                Data of the month ending April 2026 (Updated on 5th of every month)
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-900 self-start sm:self-auto">
              <RefreshCw className="w-3 h-3 text-emerald-500" />
              <span>Status: Verified Active</span>
            </div>
          </div>

          {/* Clean Data Table (Not cramped like default table) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  <th className="py-4.5 px-4 font-semibold">Received From</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Pending Last Month</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Received</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Resolved</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Total Pending</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Pending &gt; 3 Months</th>
                  <th className="py-4.5 px-4 text-center font-semibold">Avg Time (Days)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-xs sm:text-sm">
                {COMPLAINT_DATA.map((row, index) => {
                  const isGrandTotal = row.receivedFrom === 'Grand Total';
                  return (
                    <tr
                      key={index}
                      className={`transition-colors hover:bg-slate-900/20 ${
                        isGrandTotal ? 'bg-slate-900/50 font-bold border-t border-slate-700' : ''
                      }`}
                    >
                      <td className={`py-4.5 px-4 font-semibold ${isGrandTotal ? 'text-emerald-400' : 'text-slate-300'}`}>
                        {row.receivedFrom}
                      </td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.pendingLastMonth}</td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.received}</td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.resolved}</td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.totalPending}</td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.pendingMoreThan3Months}</td>
                      <td className="py-4.5 px-4 text-center font-mono text-slate-400">{row.avgTimeDays}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footnotes as requested */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-2">
            <p className="text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
              <span>
                * Standard advisory rules dictate regular monthly publishing of client grievance registers. Average resolution time represents days computed from date of receipt of the complaint to the date of actual communication of response to the client.
              </span>
            </p>
            <p className="text-[10px] text-slate-500 leading-relaxed flex items-start gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                Regulatory disclosures: Registrant operates as a Proprietorship under SEBI registration no. INH000025124. Past resolution metrics are verified under periodic audit cycles.
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
