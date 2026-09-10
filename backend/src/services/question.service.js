import {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestion,
  deleteQuestion,
  deleteQuestionByAdmin,
} from "../models/question.model.js";

export async function createNewQuestion({ user_id, title, body }) {
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

export async function updateUserQuestion(questionId, userId, title, body) {
  const existingQuestion = await getQuestionById(questionId);

  if (!existingQuestion) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingQuestion.user_id !== userId) {
    const error = new Error("You can only update your own questions");

    error.statusCode = 403;
    throw error;
  }

  await updateQuestion(questionId, userId, title, body);

  return await getQuestionById(questionId);
}

export async function deleteUserQuestion(questionId, userId) {
  const existingQuestion = await getQuestionById(questionId);

  if (!existingQuestion) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  if (existingQuestion.user_id !== userId) {
    const error = new Error("You can only delete your own questions");

    error.statusCode = 403;
    throw error;
  }

  await deleteQuestion(questionId, userId);

  return true;
}

export async function deleteAdminQuestion(questionId) {
  const existingQuestion = await getQuestionById(questionId);

  if (!existingQuestion) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  await deleteQuestionByAdmin(questionId);

  return true;
}
