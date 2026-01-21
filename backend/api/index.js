// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenAI } from "@google/genai";

// dotenv.config();

// const app = express();

// app.use(cors({
//   origin: "*",
//   methods: ["GET", "POST"],
// }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).send("Backend is running 🚀");
// });


// const ai = new GoogleGenAI({
//   apiKey: process.env.GOOGLE_API_KEY,
// });

// app.post("/generate-insights", async (req, res) => {
//   try {
//     const { lfaData } = req.body;

//     const prompt = `
// You are an expert in education system reform working with government schools and education departments in India.

// You are reviewing a Logical Framework Approach (LFA) created by an education organization.

// Context:
// - The work operates within public school systems
// - Change must occur through teachers, school leaders, and system actors
// - Constraints include policy alignment, capacity, and scale

// Logical Framework Details:

// 1. Core Problem:
// ${lfaData.step1}

// 2. Desired Change:
// ${lfaData.step2}

// 3. Key Interventions:
// ${lfaData.step3}

// 4. Key Stakeholders:
// ${(lfaData.step4 || []).map(s => s.name).join(", ")}

// 5. Practice Changes Expected:
// ${lfaData.step5}

// 6. Success Indicators (KPIs):
// ${lfaData.step6}

// Review this LFA and provide insights under the following headings:

// ### Strengths
// - Identify 2–3 strong aspects of the design

// ### Gaps or Risks
// - Identify misalignments, missing actors, or feasibility concerns

// ### System-Level Suggestions
// - Suggest 2–3 improvements to strengthen impact at scale

// Guidelines:
// - Be specific to the content provided
// - Avoid generic or motivational language
// - Write clearly for practitioners and system leaders
// `;


//     const response = await ai.models.generateContent({
//       model: "gemini-3-flash-preview",
//       contents: prompt,
//     });

//     res.json({ text: response.text });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "AI generation failed" });
//   }
// });



// export default app;

import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  // Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).send("Backend is running 🚀");
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { lfaData } = req.body;

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY,
    });

    const prompt = `
Core Problem:
${lfaData.step1}

Desired Change:
${lfaData.step2}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    res.status(200).json({ text: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI generation failed" });
  }
}
