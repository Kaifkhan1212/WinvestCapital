/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Trade, PricingPlan, Testimonial, ComplaintRow, FAQItem, ChartDataPoint } from './types';

export const TRADE_RECORDS: Trade[] = [
  {
    id: 't1',
    stock: 'TATA MOTORS',
    entry: '₹940.00',
    target: '₹980.00',
    stopLoss: '₹920.00',
    exit: '₹982.50',
    result: '+4.52%',
    type: 'profit',
  },
  {
    id: 't2',
    stock: 'RELIANCE',
    entry: '₹2,450.00',
    target: '₹2,520.00',
    stopLoss: '₹2,410.00',
    exit: '₹2,525.00',
    result: '+3.06%',
    type: 'profit',
  },
  {
    id: 't3',
    stock: 'INFOSYS',
    entry: '₹1,510.00',
    target: '₹1,560.00',
    stopLoss: '₹1,485.00',
    exit: '₹1,562.00',
    result: '+3.44%',
    type: 'profit',
  },
  {
    id: 't4',
    stock: 'HDFC BANK',
    entry: '₹1,620.00',
    target: '₹1,680.00',
    stopLoss: '₹1,595.00',
    exit: '₹1,595.00',
    result: '-1.54%',
    type: 'loss',
  },
  {
    id: 't5',
    stock: 'COAL INDIA',
    entry: '₹420.00',
    target: '₹455.00',
    stopLoss: '₹405.00',
    exit: '₹456.20',
    result: '+8.62%',
    type: 'profit',
  },
  {
    id: 't6',
    stock: 'STATE BANK OF INDIA',
    entry: '₹780.00',
    target: '₹820.00',
    stopLoss: '₹760.00',
    exit: '₹822.40',
    result: '+5.43%',
    type: 'profit',
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'plan_free',
    name: 'Free Trial',
    price: 299,
    strikePrice: 1500,
    duration: '10 Days Access',
    tagline: 'Test our precision and feel the premium quality before making a decision.',
    features: [
      '10 Days Premium Access',
      'Equity & Index Premium Calls',
      'Real-time WhatsApp Alerts',
      'Basic Email Support',
      'Daily Market Previews',
    ],
  },
  {
    id: 'plan_equity',
    name: 'Equity Premium',
    price: 1500,
    strikePrice: 4500,
    duration: '1 Month Access',
    tagline: 'Specifically structured for core stock traders aiming for high consistency.',
    features: [
      '3-6 High-Conviction Equity Calls Weekly',
      'Strict Targets + Stoploss levels',
      'Priority Real-time Updates via WhatsApp',
      'Direct Support from Lead Analyst',
      'Complete Entry-to-Exit Handholding',
    ],
    isPopular: true,
  },
  {
    id: 'plan_index',
    name: 'Index Options',
    price: 2000,
    strikePrice: 4500,
    duration: '1 Month Access',
    tagline: 'Engineered for option traders focusing on Nifty and BankNifty movements.',
    features: [
      '1-3 Live Momentum Index Alerts Daily',
      'Precise Nifty & BankNifty Focus',
      'Clear Targets & Safe Stoploss',
      'Real-time Market Execution Support',
      'Pre-Market Outlook & Levels',
    ],
  },
  {
    id: 'plan_combo',
    name: 'Combo Plan',
    price: 3000,
    strikePrice: 7500,
    duration: '1 Month Access',
    tagline: 'The ultimate powerhouse package combining equity calls and index options.',
    features: [
      'All Equity Premium Access',
      'All Index Options Premium Access',
      'Best Combo Savings (Save ₹500/mo)',
      'Dedicated Call & Chat Support',
      'Exclusive Mid-Week Market Strategy Reports',
    ],
  },
  {
    id: 'plan_value',
    name: 'Value & Momentum',
    price: 6000,
    strikePrice: 12000,
    duration: '3 Months Access',
    tagline: 'Curated premium basket designed for sustainable long-term wealth creation.',
    features: [
      '15-20 Curated Stock Basket',
      'Monthly Systematic Rebalancing',
      'Value + Momentum Screening Strategy',
      'Direct Analyst Consultation Call',
      'Detailed Investment Thesis PDF',
    ],
  },
];

export const COMPLAINT_DATA: ComplaintRow[] = [
  {
    receivedFrom: 'Directly from Investors',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingMoreThan3Months: 0,
    avgTimeDays: 0,
  },
  {
    receivedFrom: 'SEBI (SCORES)',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingMoreThan3Months: 0,
    avgTimeDays: 0,
  },
  {
    receivedFrom: 'Other Sources',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingMoreThan3Months: 0,
    avgTimeDays: 0,
  },
  {
    receivedFrom: 'Grand Total',
    pendingLastMonth: 0,
    received: 0,
    resolved: 0,
    totalPending: 0,
    pendingMoreThan3Months: 0,
    avgTimeDays: 0,
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test_1',
    name: 'Suresh Salve',
    location: 'Jalna, MH',
    quote: 'Equity calls are accurate and support team is very helpful. Great experience so far. Highly recommend the Equity Premium plan.',
    badge: 'Verified Purchase',
    initials: 'SS',
  },
  {
    id: 'test_2',
    name: 'Sahil Shaikh',
    location: 'Jalgaon, MH',
    quote: 'Daily option alerts helped me improve discipline and confidence in trading. No more random trades or overtrading.',
    badge: 'Top Rated',
    initials: 'SH',
  },
  {
    id: 'test_3',
    name: 'Azhar Shaikh',
    location: 'Nashik, MH',
    quote: 'Joined recently and already satisfied with market research quality and support. Transparent entry, target and stoploss levels.',
    badge: 'New Member',
    initials: 'AS',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq_1',
    question: 'What services does Winvest Capitals provide?',
    answer: 'Winvest Capitals provides professional equity research, live option alerts for Nifty & BankNifty, high-conviction short-term and long-term equity calls, and research-backed portfolio advisory designed for sustainable long-term wealth creation.',
  },
  {
    id: 'faq_2',
    question: 'Is Winvest Capitals a SEBI Registered Research Analyst?',
    answer: 'Yes, Winvest Capitals is fully registered with the Securities and Exchange Board of India (SEBI) under registration number INH000025124. This registration ensures we adhere to standard compliance and regulatory frameworks, putting client transparency first.',
  },
  {
    id: 'faq_3',
    question: 'How can I start stock market advisory services with Winvest Capitals?',
    answer: 'Starting is very easy. First, explore our plans and select the one that fits your trading size. After subscribing, you will be instantly integrated into our WhatsApp Premium Alert delivery network and a dedicated customer support manager will guide you through our standard entry and exit practices.',
  },
  {
    id: 'faq_4',
    question: 'Do you guarantee profit?',
    answer: 'No, we do not provide any assurance or guarantee of profit or returns. Stock market investments are subject to market risks. We rely on extensive analytical research, technical models, and risk-to-reward optimization to build high-probability trades, but we strictly advise clients to review all legal disclosures and understand market volatility before subscribing.',
  },
];

export const CHART_DATA: ChartDataPoint[] = [
  { month: 'Jan 26', returnPct: 12.4, cumulativeReturn: 12.4 },
  { month: 'Feb 26', returnPct: 11.2, cumulativeReturn: 23.6 },
  { month: 'Mar 26', returnPct: 15.1, cumulativeReturn: 38.7 },
  { month: 'Apr 26', returnPct: 14.8, cumulativeReturn: 53.5 },
  { month: 'May 26', returnPct: 12.0, cumulativeReturn: 65.5 },
  { month: 'Jun 26', returnPct: 16.3, cumulativeReturn: 81.8 },
  { month: 'Jul 26', returnPct: 12.5, cumulativeReturn: 94.3 },
];
