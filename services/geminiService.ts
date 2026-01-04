
import { GoogleGenAI, Type } from "@google/genai";

// Always initialize with the direct process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a poetic mood description and genre recommendations based on the user's mood and time of day.
 */
export const generateMoodMusicRecommendation = async (mood: string, timeOfDay: string) => {
  try {
    const response = await ai.models.generateContent({
      // Use gemini-3-flash-preview for creative and descriptive text tasks.
      model: "gemini-3-flash-preview",
      contents: `Suggest a curated "Music Vibe" description for a user feeling "${mood}" during the ${timeOfDay}. 
      Make it feel high-end and poetic. Also suggest 3 generic music genres that fit.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            vibeTitle: { type: Type.STRING },
            poeticDescription: { type: Type.STRING },
            genres: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["vibeTitle", "poeticDescription", "genres"],
          propertyOrdering: ["vibeTitle", "poeticDescription", "genres"]
        }
      }
    });
    // Access response.text property directly
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};

/**
 * Provides creative remix suggestions and stem manipulation ideas for a specific song.
 */
export const getSmartRemixInstructions = async (songTitle: string, artist: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `The user wants to 'Smart Remix' the song "${songTitle}" by ${artist}. 
      Provide a breakdown of what stems would be most interesting to manipulate (e.g. Lead Vocals, Bassline, Synth Pad) 
      and a creative remix suggestion (e.g. "Try muting the drums during the second verse for a cinematic feel").`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            stems: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            creativeTip: { type: Type.STRING }
          },
          required: ["stems", "creativeTip"],
          propertyOrdering: ["stems", "creativeTip"]
        }
      }
    });
    const text = response.text;
    if (!text) throw new Error("Empty response from AI");
    return JSON.parse(text.trim());
  } catch (error) {
    console.error("Gemini Error:", error);
    return null;
  }
};
