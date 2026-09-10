import {
  createAnswer,
  getAnswersByQuestionId,
  getAnswerById,
  updateAnswer,
  deleteAnswer,
} from "../models/answer.model.js";

import { getQuestionById } from "../models/question.model.js";

export async function createNewAnswer({ question_id, user_id, body }) {
  const question = await getQuestionById(question_id);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  const answerId = await createAnswer({
    question_id,
    user_id,
    body,
  });

  return await getAnswerById(answerId);
}

export async function getQuestionAnswers(questionId) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  return await getAnswersByQuestionId(questionId);
}

export async function updateUserAnswer(answerId, userId, body) {
  const existingAnswer = await getAnswerById(answerId);

  if (!existingAnswer) {
    const error = new Error("Answer not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingAnswer.user_id !== userId) {
    const error = new Error("You can only update your own answers");

    error.statusCode = 403;
    throw error;
  }

  await updateAnswer(answerId, userId, body);

  return await getAnswerById(answerId);
}

export async function deleteUserAnswer(answerId, userId) {
  const existingAnswer = await getAnswerById(answerId);

  if (!existingAnswer) {
    const error = new Error("Answer not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingAnswer.user_id !== userId) {
    const error = new Error("You can only delete your own answers");

    error.statusCode = 403;
    throw error;
  }

  await deleteAnswer(answerId, userId);

  return true;
}
