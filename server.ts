/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for parsing JSON
  app.use(express.json());

  // Initialize Gemini client lazily
  let aiClient: GoogleGenAI | null = null;
  const getAiClient = () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      console.warn('GEMINI_API_KEY environment variable is not defined.');
      return null;
    }
    if (!aiClient) {
      aiClient = new GoogleGenAI({ apiKey: key });
    }
    return aiClient;
  };

  // API endpoints
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.post('/api/gemini-chat', async (req, res) => {
    try {
      const { message, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      const client = getAiClient();
      if (!client) {
        console.error('Gemini API key is missing. Please configure GEMINI_API_KEY in the settings.');
        return res.json({
          reply: "I'm sorry, my Gemini API key is not configured yet. Please configure GEMINI_API_KEY in your environment/settings, or reach out to us on WhatsApp (+91 9579557272) for assistance!",
        });
      }

      // Convert history and message to the format expected by GoogleGenAI SDK
      // The SDK expects contents to have role and parts
      const contents = [
        ...history.map((item: any) => ({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        })),
        {
          role: 'user',
          parts: [{ text: message }],
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

      const response = await client.models.generateContent({
        model: 'gemini-1.5-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const reply = response.text || "Sorry, I couldn't generate a response.";
      res.json({ reply });
    } catch (error) {
      console.error('Error handling Gemini chat endpoint:', error);
      res.json({
        reply: "Sorry, I'm having trouble right now. Please reach out to us on WhatsApp or the contact form for help.",
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
