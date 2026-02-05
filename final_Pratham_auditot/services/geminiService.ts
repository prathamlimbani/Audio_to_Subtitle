
import { GoogleGenAI, Type } from "@google/genai";
import { SubtitleSegment } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function transcribeAudio(audioBase64: string, mimeType: string): Promise<SubtitleSegment[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        {
          parts: [
            {
              inlineData: {
                data: audioBase64,
                mimeType: mimeType
              }
            },
            {
              text: `Transcribe this audio precisely into subtitle segments. 
              Each segment must include:
              1. 'start': timestamp in the format HH:MM:SS,mmm (e.g., 00:00:05,200)
              2. 'end': timestamp in the format HH:MM:SS,mmm
              3. 'text': the actual spoken words.
              
              Ensure the segments are chronologically ordered and capture all spoken words accurately. 
              Be especially careful with the millisecond accuracy for synchronization.`
            }
          ]
        }
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              start: { type: Type.STRING, description: "Start time in HH:MM:SS,mmm" },
              end: { type: Type.STRING, description: "End time in HH:MM:SS,mmm" },
              text: { type: Type.STRING, description: "The transcribed text" }
            },
            required: ["start", "end", "text"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No transcription received from Gemini.");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini Transcription Error:", error);
    throw error;
  }
}
