/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Trade {
  id: string;
  stock: string;
  entry: string;
  target: string;
  stopLoss: string;
  exit: string;
  result: string;
  type: 'profit' | 'loss';
}

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  strikePrice: number;
  duration: string;
  features: string[];
  isPopular?: boolean;
  tagline: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  badge: 'Verified Purchase' | 'Top Rated' | 'New Member';
  initials: string;
}

export interface ComplaintRow {
  receivedFrom: string;
  pendingLastMonth: number;
  received: number;
  resolved: number;
  totalPending: number;
  pendingMoreThan3Months: number;
  avgTimeDays: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface ChartDataPoint {
  month: string;
  returnPct: number;
  cumulativeReturn: number;
}

export interface Profile {
  id: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}
