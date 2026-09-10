import {
  createNewQuestion,
  getQuestions,
  getQuestion,
  updateUserQuestion,
  deleteUserQuestion,
  deleteAdminQuestion,
} from "../services/question.service.js";

import { validateQuestionInput } from "../validations/question.validation.js";

export async function createQuestionController(req, res, next) {
  try {
    const validationError = validateQuestionInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const { title, body } = req.body;

    const question = await createNewQuestion({
      user_id: req.user.user_id,
      title: title.trim(),
      body: body.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Question created successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionsController(req, res, next) {
  try {
    const questions = await getQuestions();

    res.status(200).json({
      success: true,
      data: questions,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionController(req, res, next) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await getQuestion(questionId);

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateQuestionController(req, res, next) {
  try {
    const validationError = validateQuestionInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const { title, body } = req.body;

    const question = await updateUserQuestion(
      questionId,
      req.user.user_id,
      title.trim(),
      body.trim(),
    );

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestionController(req, res, next) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    await deleteUserQuestion(questionId, req.user.user_id);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAdminQuestionController(req, res, next) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    await deleteAdminQuestion(questionId);

    res.status(200).json({
      success: true,
      message: "Question deleted by admin",
    });
  } catch (error) {
    next(error);
  }
}
