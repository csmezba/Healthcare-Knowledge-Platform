import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        text: "The TakeCare AI Assistant is currently in sandbox mode because the Gemini API key was not detected. Please add your GEMINI_API_KEY in Settings > Secrets to activate the full AI-powered medical insights engine.\n\n**Typical Sandbox Response:** For symptoms like standard headaches or light joint strain, mild rest and hydration are highly recommended, but always consult a physician if symptoms persist.",
        sandbox: true
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });

    const systemInstruction = 
      "You are TakeCare's premium, world-class medical editor and healthcare informational assistant. " +
      "Your tone is deeply empathetic, authoritative, precise, and objective. " +
      "Always include a professional informational disclaimer: state that your responses are for educational, " +
      "informational purposes only and should not substitute professional medical diagnosis, advice, or treatment. " +
      "Provide structured, beautiful Markdown with clear headings, bullet points, and highlight warnings where relevant. " +
      "Give detailed explanations about active drug ingredients, symptom analysis, medical equipment uses, or general nutrition.";

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return NextResponse.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    return NextResponse.json(
      { error: "Failed to generate health insights. Please try again.", details: error.message },
      { status: 500 }
    );
  }
}
