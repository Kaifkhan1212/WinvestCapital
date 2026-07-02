/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not configured in Supabase secrets.");
      return new Response(
        JSON.stringify({
          reply: "Sorry, I'm having trouble right now. Please reach out to us on WhatsApp or the contact form for help."
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    }

    const { message, history = [] } = await req.json();

    if (!message) {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400
        }
      );
    }

    // Transform history and current message to Gemini API format
    const contents = [
      ...history.map((item: any) => ({
        role: item.role === "user" ? "user" : "model",
        parts: [{ text: item.text }]
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const systemInstructionText = `You are the AI assistant for Winvest Capitals, a SEBI Registered Research Analyst firm (Registration No: INH000025124, BSE Enlistment No: 6950). Help visitors with general questions about:
- Our plans: Free Trial (₹299), Equity Premium (₹1,500), Index Options (₹2,000), Combo Plan (₹3,000), Premium (₹6,000)
- How to get started, contact details, and SEBI compliance
- General SEBI/stock market advisory concepts

IMPORTANT RESTRICTIONS:
- NEVER give specific stock recommendations, buy/sell calls, price targets, or predict market movement
- NEVER guarantee or imply any returns or profit
- If asked for investment advice, politely explain you can only provide general information and direct them to contact the team via WhatsApp (+91 9579557272) or the contact form for personalized guidance
- Keep responses short (2-4 sentences), friendly, and professional`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: systemInstructionText }]
          },
          generationConfig: {
            temperature: 0.7,
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error response:", errText);
      throw new Error(`Gemini API returned status ${response.status}`);
    }

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't understand that. Please contact us on WhatsApp for assistance.";

    return new Response(
      JSON.stringify({ reply }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error) {
    console.error("Error in gemini-chat function:", error);
    return new Response(
      JSON.stringify({
        reply: "Sorry, I'm having trouble right now. Please reach out to us on WhatsApp or the contact form for help."
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200
      }
    );
  }
});
