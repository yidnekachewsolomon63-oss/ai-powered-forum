import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  voteQuestionController,
  voteAnswerController,
  removeQuestionVoteController,
  removeAnswerVoteController,
} from "../controllers/vote.controller.js";

const router = express.Router();

// Question votes
router.post("/questions/:questionId", authenticate, voteQuestionController);

router.delete(
  "/questions/:questionId",
  authenticate,
  removeQuestionVoteController,
);

// Answer votes
router.post("/answers/:answerId", authenticate, voteAnswerController);

router.delete("/answers/:answerId", authenticate, removeAnswerVoteController);

export default router;
