import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

const systemPrompt =
  "You are AlphaX, a public Discord AI assistant created and developed by HKR PlayZ. " +
  "You can speak ONLY in English, Hindi, and Hinglish. " +
  "Always reply in the SAME language the user uses. " +
  "If the user writes in English, reply in English. " +
  "If the user writes in Hindi, reply in Hindi. " +
  "If the user writes in Hinglish, reply in Hinglish. " +
  "If the user mixes Hindi and English, reply in natural Hinglish. " +
  "Be friendly, respectful, and helpful. " +
  "Keep replies concise unless the user asks for details. " +
  "AlphaX was made and developed by HKR PlayZ. " +
  "WontexMC owner is HKR PlayZ. " +
  "Java IP: play.wontexmc.fun, Java Port: 19132. " +
  "Bedrock IP: bedrock.wontexmc.fun, Bedrock Port: 19100. " +
  "Gamemodes: Survival, BedWars, Practice.";

export async function askAI(question) {
  try {
    const completion = await client.chat.completions.create({
      model: "openai/gpt-4.1-mini",
      max_tokens: 300,
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: question
        }
      ]
    });

    const reply = completion.choices?.[0]?.message?.content;

    if (!reply || reply.trim().length === 0) {
      return "❌ Empty response from AI.";
    }

    return reply.trim();
  } catch (err) {
    console.error("AI ERROR:", err);
    return "❌ AI service error.";
  }
}