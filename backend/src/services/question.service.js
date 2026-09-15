import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  getQuestionByHash,
  updateQuestion,
  deleteQuestion,
  deleteQuestionByAdmin,
} from "../models/question.model.js";

import { getAnswersByQuestionId } from "../models/answer.model.js";

export async function createNewQuestion({
  user_id,
  title,
  body,
}) {
  const questionId = await createQuestion({
    user_id,
    title,
    body,
  });

  return await getQuestionById(questionId);
}

export async function getQuestions() {
  return await getAllQuestions();
}

export async function getQuestion(questionId) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  return question;
}

export async function getQuestionDetails(questionHash) {
  const question = await getQuestionByHash(questionHash);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  const answers = await getAnswersByQuestionId(
    question.question_id,
  );

  return {
    question,
    answers,
  };
}

export async function updateUserQuestion(
  questionId,
  userId,
  title,
  body,
) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  if (question.user_id !== userId) {
    const error = new Error(
      "You are not authorized to update this question",
    );
    error.statusCode = 403;
    throw error;
  }

  await updateQuestion(
    questionId,
    userId,
    title,
    body,
  );

  return await getQuestionById(questionId);
}

export async function deleteUserQuestion(
  questionId,
  userId,
) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  if (question.user_id !== userId) {
    const error = new Error(
      "You are not authorized to delete this question",
    );
    error.statusCode = 403;
    throw error;
  }

  await deleteQuestion(questionId, userId);

  return true;
}

export async function deleteAdminQuestion(questionId) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  await deleteQuestionByAdmin(questionId);

  return true;
}
