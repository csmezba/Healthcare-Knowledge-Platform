import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Google GenAI on the server using process.env.GEMINI_API_KEY
// We set User-Agent to 'aistudio-build' as required for telemetry
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

app.use(express.json());

// API Endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

// AI Search and Assistant Endpoint
app.post("/api/ai/assistant", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
       res.status(400).json({ error: "Message is required." });
       return;
    }

    if (!ai) {
       res.json({
        text: "The AuraCare AI Assistant is currently in sandbox mode because the Gemini API key was not detected. Please add your GEMINI_API_KEY in Settings > Secrets to activate the full AI-powered medical insights engine.\n\n**Typical Sandbox Response:** For symptoms like standard headaches or light joint strain, mild rest and hydration are highly recommended, but always consult a physician if symptoms persist.",
        sandbox: true
      });
      return;
    }

    // Prepare system instructions for medical editorial guidelines
    const systemInstruction = 
      "You are AuraCare's premium, world-class medical editor and healthcare informational assistant. " +
      "Your tone is deeply empathetic, authoritative, precise, and objective. " +
      "Always include a professional informational disclaimer: state that your responses are for educational, " +
      "informational purposes only and should not substitute professional medical diagnosis, advice, or treatment. " +
      "Provide structured, beautiful Markdown with clear headings, bullet points, and highlight warnings where relevant. " +
      "Give detailed explanations about active drug ingredients, symptom analysis, medical equipment uses, or general nutrition.";

    // Let's use the recommended gemini-3.5-flash for general informational Q&A and text tasks.
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API Error in backend:", error);
    res.status(500).json({ 
      error: "Failed to generate health insights. Please try again.", 
      details: error.message 
    });
  }
});

// Vite middleware setup or Static assets serving
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AuraCare Server] Running on http://0.0.0.0:${PORT}`);
  });
}

setupServer();
