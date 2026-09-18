/* eslint-disable */
// Used Gemini
import { GoogleGenAI } from "@google/genai";

//initialize AI
const ai = new GoogleGenAI({});

export async function generateResponse(message: string): Promise<string> {
  try {
    //create response with system instructions
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: message,
      config: {
        systemInstruction: [
          "You are a helpful species and animal chatbot.",

          "Only answer questions related to:",
          "- Animals",
          "- Animal species",
          "- Wildlife",
          "- Zoology",
          "- Animal behavior",
          "- Animal habitats",
          "- Conservation",
          "- Animal biology",

          "If the user asks about something unrelated to animals or species, politely explain that you can only answer questions about animals and species.",
          "Keep answers clear, accurate, and reasonably concise.",
        ],
      },
    });
    return String(response.text);
  } catch (error) {
    return "Sorry, I did not understand. Can you please try asking again or rephrasing the question?";
  }
}
