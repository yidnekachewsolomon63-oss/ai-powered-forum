import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  createAnswerController,
  getQuestionAnswersController,
  updateAnswerController,
  deleteAnswerController,
} from "../controllers/answer.controller.js";

const router = express.Router();

// Get all answers for a question
router.get("/questions/:questionId", getQuestionAnswersController);

// Create an answer
router.post("/questions/:questionId", authenticate, createAnswerController);

// Update own answer
router.put("/:id", authenticate, updateAnswerController);

// Delete own answer
router.delete("/:id", authenticate, deleteAnswerController);

export default router;
