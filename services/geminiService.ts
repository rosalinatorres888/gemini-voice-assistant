import { GoogleGenAI, Chat } from "@google/genai";

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set in .env file");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export function createChat(): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a friendly and conversational AI assistant. Keep your responses concise and natural, as if you were speaking in a real conversation.',
    },
  });
}
