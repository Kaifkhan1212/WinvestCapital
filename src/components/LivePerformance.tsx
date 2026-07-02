/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TRADE_RECORDS, CHART_DATA } from '../data';
import CountUp from './CountUp';
import { TrendingUp, Percent, FileCheck, Users, Calendar, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

interface LivePerformanceProps {
  accentColor: 'emerald' | 'blue';
}

export default function LivePerformance({ accentColor }: LivePerformanceProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'profit' | 'loss'>('all');

  const filteredTrades = TRADE_RECORDS.filter((trade) => {
    if (activeTab === 'all') return true;
    return trade.type === activeTab;
  });

  const primaryAccent = accentColor === 'emerald' ? 'text-emerald-500' : 'text-blue-500';
  const primaryBg = accentColor === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500';
  const primaryBorder = accentColor === 'emerald' ? 'border-emerald-500/20' : 'border-blue-500/20';

  // Custom tooltips for recharts
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0E1512] border border-slate-800 p-3 rounded-xl shadow-xl">
          <p className="text-xs text-slate-400 font-mono mb-1">{payload[0].payload.month}</p>
          <p className="text-sm font-bold text-emerald-400">
            Cumulative: +{payload[0].value}%
          </p>
          <p className="text-[10px] text-slate-500">Month Return: +{payload[0].payload.returnPct}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="services" className="relative py-24 bg-[#050807] border-t border-slate-900 overflow-hidden">
      {/* Decorative Blur elements */}
      <div className="absolute top-10 right-10 w-[400px] h-[400px] bg-blue-500/3 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-emerald-500/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-wider text-emerald-400 uppercase mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>Verified Investment Performance</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white mb-4 tracking-tight leading-none">
              Live Track Record &{' '}
              <span className={accentColor === 'emerald' ? 'text-gradient' : 'text-gradient-blue'}>
                Performance Log
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed">
              Every single trading call we publish is logged transparently. We never hide stop-losses or exaggerate targets. Here is our mathematical footprint in the Indian securities market.
            </p>
          </div>
          
          {/* Timestamp or verification note */}
          <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono bg-slate-900/40 border border-slate-800/80 px-4.5 py-2.5 rounded-xl self-start md:self-auto">
            <RefreshCw className="w-3.5 h-3.5 animate-spin-slow text-emerald-500" />
            <span>Updated: {new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
          </div>
        </div>

        {/* 1. Stat Strip with Count-Up Animations */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          
          {/* Stat 1: Win Rate */}
          <div className="p-6 rounded-2xl bg-[#151A18] border border-white/10 hover:border-emerald-500/25 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Win Rate</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-display font-bold text-white mb-1">
              <CountUp end={83.3} decimals={1} suffix="%" />
            </div>
            <p className="text-[11px] text-slate-500">Based on last 120 calls</p>
          </div>

          {/* Stat 2: Total Calls */}
          <div className="p-6 rounded-2xl bg-[#151A18] border border-white/10 hover:border-blue-500/25 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Total Calls</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <FileCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-display font-bold text-white mb-1">
              <CountUp end={142} suffix="+" />
            </div>
            <p className="text-[11px] text-slate-500">Registered since Jan 2026</p>
          </div>

          {/* Stat 3: Avg Return % */}
          <div className="p-6 rounded-2xl bg-[#151A18] border border-white/10 hover:border-emerald-500/25 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Avg Return</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-display font-bold text-white mb-1">
              <CountUp end={18.42} decimals={2} prefix="+" suffix="%" />
            </div>
            <p className="text-[11px] text-slate-500">Per profitable trade cycle</p>
          </div>

          {/* Stat 4: Active Clients */}
          <div className="p-6 rounded-2xl bg-[#151A18] border border-white/10 hover:border-blue-500/25 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">Active Clients</span>
              <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-4xl font-display font-bold text-white mb-1">
              <CountUp end={1250} suffix="+" />
            </div>
            <p className="text-[11px] text-slate-500">Across WhatsApp Premium</p>
          </div>
        </div>

        {/* 2. Visual Content Area: Split Grid between Table & Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column A (Left): Data Table (8 cols on desktop) */}
          <div className="lg:col-span-8 bg-[#0D1211] border border-white/10 rounded-2xl overflow-hidden p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Recent Track Records</h3>
                <p className="text-xs text-slate-500">Real-time update of last 6 recommendation cycles</p>
              </div>
              
              {/* Tab Filters */}
              <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'all'
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Logs
                </button>
                <button
                  onClick={() => setActiveTab('profit')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'profit'
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Profits
                </button>
                <button
                  onClick={() => setActiveTab('loss')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    activeTab === 'loss'
                      ? 'bg-red-500/10 text-red-400'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Losses
                </button>
              </div>
            </div>

            {/* Scrollable Table Wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] sm:text-xs font-mono text-slate-500 uppercase tracking-wider">
                    <th className="py-4 px-3">Stock / Symbol</th>
                    <th className="py-4 px-3">Entry Level</th>
                    <th className="py-4 px-3">Target Price</th>
                    <th className="py-4 px-3">Stop-Loss</th>
                    <th className="py-4 px-3">Exit Price</th>
                    <th className="py-4 px-3 text-right">Net Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-xs sm:text-sm">
                  {filteredTrades.map((trade) => (
                    <tr
                      key={trade.id}
                      className="hover:bg-slate-900/30 transition-colors group"
                    >
                      {/* Stock name */}
                      <td className="py-4 px-3 font-semibold text-white">
                        <span className="flex items-center gap-1.5">
                          <span className={`w-1.5 h-1.5 rounded-full ${trade.type === 'profit' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                          {trade.stock}
                        </span>
                      </td>
                      
                      {/* Entry */}
                      <td className="py-4 px-3 font-mono text-slate-300">{trade.entry}</td>
                      
                      {/* Target */}
                      <td className="py-4 px-3 font-mono text-slate-300">{trade.target}</td>
                      
                      {/* Stop loss */}
                      <td className="py-4 px-3 font-mono text-slate-400">{trade.stopLoss}</td>
                      
                      {/* Exit */}
                      <td className="py-4 px-3 font-mono text-slate-300">{trade.exit}</td>
                      
                      {/* Result */}
                      <td className={`py-4 px-3 text-right font-mono font-bold ${
                        trade.type === 'profit' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        <span className="flex items-center justify-end gap-1">
                          {trade.type === 'profit' ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                          {trade.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {filteredTrades.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-slate-500 font-mono text-xs">
                        No trade logs found matching this filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column B (Right): Cumulative Chart (4 cols on desktop) */}
          <div className="lg:col-span-4 bg-[#0D1211] border border-white/10 rounded-2xl p-6">
            <div className="mb-6">
              <h3 className="font-display font-bold text-lg text-white">Cumulative Performance</h3>
              <p className="text-xs text-slate-500">Mathematical portfolio growth since January 2026</p>
            </div>

            {/* Recharts Chart Area */}
            <div className="h-[260px] w-full" id="cumulative-chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={CHART_DATA}
                  margin={{ top: 10, right: 10, left: -25, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={accentColor === 'emerald' ? '#10B981' : '#3B82F6'} stopOpacity={0.2}/>
                      <stop offset="95%" stopColor={accentColor === 'emerald' ? '#10B981' : '#3B82F6'} stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" opacity={0.3} />
                  <XAxis
                    dataKey="month"
                    stroke="#64748B"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis
                    stroke="#64748B"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `+${value}%`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="cumulativeReturn"
                    stroke={accentColor === 'emerald' ? '#10B981' : '#3B82F6'}
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#colorReturn)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Performance highlight notes */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">Cumulative Return %</span>
              <span className="text-emerald-400 font-bold font-display text-sm">+94.30% YTD</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
