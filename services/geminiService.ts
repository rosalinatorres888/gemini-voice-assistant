import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = import.meta.env.VITE_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export function createChat(): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: 'You are a friendly and conversational AI assistant. Keep your responses concise and natural, as if you were speaking in a real conversation.',
    },
  });
}
