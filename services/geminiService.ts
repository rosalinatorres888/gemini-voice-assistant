import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY || process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const genAI = new GoogleGenerativeAI(API_KEY);

export function createChat() {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-pro",
  });
  
  const chat = model.startChat({
    history: [],
  });
  
  return chat;
}
