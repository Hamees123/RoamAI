import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateTripPlan(prompt: string) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

const result = await model.generateContent({
  contents: [
    {
      role: "user",
      parts: [{ text: prompt }]
    }
  ],
  generationConfig: {
    responseMimeType: "application/json"
  }
});
  const response = await result.response;

  return response.text();
}


