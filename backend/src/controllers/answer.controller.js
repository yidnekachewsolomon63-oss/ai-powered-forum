import {
  createNewAnswer,
  getQuestionAnswers,
  updateUserAnswer,
  deleteUserAnswer,
} from "../services/answer.service.js";

import { validateAnswerInput } from "../validations/answer.validation.js";

export async function createAnswerController(req, res, next) {
  try {
    const validationError = validateAnswerInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const questionId = Number(req.params.questionId);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const { body } = req.body;

    const answer = await createNewAnswer({
      question_id: questionId,
      user_id: req.user.user_id,
      body: body.trim(),
    });

    res.status(201).json({
      success: true,
      message: "Answer created successfully",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionAnswersController(req, res, next) {
  try {
    const questionId = Number(req.params.questionId);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const answers = await getQuestionAnswers(questionId);

    res.status(200).json({
      success: true,
      data: answers,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateAnswerController(req, res, next) {
  try {
    const validationError = validateAnswerInput(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const answerId = Number(req.params.id);

    if (!Number.isInteger(answerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer ID",
      });
    }

    const { body } = req.body;

    const answer = await updateUserAnswer(
      answerId,
      req.user.user_id,
      body.trim(),
    );

    res.status(200).json({
      success: true,
      message: "Answer updated successfully",
      data: answer,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAnswerController(req, res, next) {
  try {
    const answerId = Number(req.params.id);

    if (!Number.isInteger(answerId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid answer ID",
      });
    }

    await deleteUserAnswer(answerId, req.user.user_id);

    res.status(200).json({
      success: true,
      message: "Answer deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
