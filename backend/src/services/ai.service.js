import ai from "../../db/ai.js";

const GEMINI_MODEL = process.env.GEMINI_TEXT_MODEL || "gemini-2.5-flash";

export const askGemini = async ({ prompt, context = "" }) => {
  if (!prompt || typeof prompt !== "string") {
    throw new Error("Prompt is required");
  }

  const cleanPrompt = prompt.trim();

  if (!cleanPrompt) {
    throw new Error("Prompt cannot be empty");
  }

  let fullPrompt = cleanPrompt;

  if (context && typeof context === "string" && context.trim()) {
    fullPrompt = `
Use the following context to help answer the user's question.

Context:
${context.trim()}

User Question:
${cleanPrompt}
`;
  }

  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents: fullPrompt,
    });

    const answer = response.text;

    if (!answer) {
      throw new Error("Gemini returned an empty response");
    }

    return answer.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);

    throw new Error(
      error?.message || "Failed to generate response from Gemini",
    );
  }
};
