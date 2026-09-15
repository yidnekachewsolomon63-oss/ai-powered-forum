import {
  createNewQuestion,
  getQuestions,
  getQuestion,
  getQuestionDetails,
  updateUserQuestion,
  deleteUserQuestion,
  deleteAdminQuestion,
} from "../services/question.service.js";

import { validateQuestionInput } from "../validations/question.validation.js";

export async function createQuestionController(
  req,
  res,
  next,
) {
  try {
    const { title, body } = req.body;

    const validationError = validateQuestionInput({
      title,
      body,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const userId = req.user.user_id;

    const question = await createNewQuestion({
      user_id: userId,
      title,
      body,
    });

    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function getQuestionsController(
  req,
  res,
  next,
) {
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

export async function getQuestionController(
  req,
  res,
  next,
) {
  try {
    const { questionHash } = req.params;

    if (!questionHash) {
      return res.status(400).json({
        success: false,
        message: "Question hash is required",
      });
    }

    const questionDetails =
      await getQuestionDetails(questionHash);

    res.status(200).json({
      success: true,
      data: questionDetails,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateQuestionController(
  req,
  res,
  next,
) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const { title, body } = req.body;

    const validationError = validateQuestionInput({
      title,
      body,
    });

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError,
      });
    }

    const userId = req.user.user_id;

    const question = await updateUserQuestion(
      questionId,
      userId,
      title,
      body,
    );

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteQuestionController(
  req,
  res,
  next,
) {
  try {
    const questionId = Number(req.params.id);

    if (!Number.isInteger(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const userId = req.user.user_id;

    await deleteUserQuestion(questionId, userId);

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteAdminQuestionController(
  req,
  res,
  next,
) {
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
      message: "Question deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
