import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  askAI,
  answerForumQuestionWithAI,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/ask", authenticate, askAI);

router.post("/questions/:id/answer", authenticate, answerForumQuestionWithAI);

export default router;
