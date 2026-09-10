import express from "express";

import authenticate from "../middleware/auth.middleware.js";

import { authorizeRole } from "../middleware/role.middleware.js";

import {
  createQuestionController,
  getQuestionsController,
  getQuestionController,
  updateQuestionController,
  deleteQuestionController,
  deleteAdminQuestionController,
} from "../controllers/question.controller.js";

const router = express.Router();

// Public routes

router.get("/", getQuestionsController);

router.get("/:id", getQuestionController);

// Authenticated user routes

router.post("/", authenticate, createQuestionController);

router.put("/:id", authenticate, updateQuestionController);

router.delete("/:id", authenticate, deleteQuestionController);

// Admin route

router.delete(
  "/admin/:id",
  authenticate,
  authorizeRole("admin"),
  deleteAdminQuestionController,
);

export default router;
