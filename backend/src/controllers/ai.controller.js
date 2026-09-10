import { getQuestionById } from "../models/question.model.js";
import { askGemini } from "../services/ai.service.js";

export const askAI = async (req, res, next) => {
  try {
    const { prompt, context } = req.body;

    if (!prompt || typeof prompt !== "string") {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }

    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt cannot be empty",
      });
    }

    if (cleanedPrompt.length > 4000) {
      return res.status(400).json({
        success: false,
        message: "Prompt is too long. Maximum 4000 characters.",
      });
    }

    const answer = await askGemini({
      prompt: cleanedPrompt,
      context: context || "",
    });

    return res.status(200).json({
      success: true,
      data: {
        answer,
      },
    });
  } catch (error) {
    console.error("Gemini AI Error:", error);

    next(error);
  }
};
export const answerForumQuestionWithAI = async (req, res, next) => {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId) || questionId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await getQuestionById(questionId);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const prompt = `
Please answer the following forum question.

Title:
${question.title}

Question:
${question.body}

Give a clear and helpful answer.

If the question is about programming:
- Explain the problem.
- Explain why it happens.
- Give a corrected solution when appropriate.
- Use code examples when useful.
`;

    const answer = await askGemini({
      prompt,
    });

    return res.status(200).json({
      success: true,
      data: {
        question_id: question.question_id,
        question_title: question.title,
        answer,
      },
    });
  } catch (error) {
    console.error("Gemini forum question error:", error);

    next(error);
  }
};
