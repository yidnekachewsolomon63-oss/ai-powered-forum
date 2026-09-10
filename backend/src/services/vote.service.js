import {
  findQuestionVote,
  findAnswerVote,
  createQuestionVote,
  createAnswerVote,
  updateVote,
  deleteVote,
  getQuestionVoteCounts,
  getAnswerVoteCounts,
} from "../models/vote.model.js";

import { getQuestionById } from "../models/question.model.js";
import { getAnswerById } from "../models/answer.model.js";

// add the question voting service

export async function voteOnQuestion({ userId, questionId, voteType }) {
  const question = await getQuestionById(questionId);

  if (!question) {
    const error = new Error("Question not found");
    error.statusCode = 404;
    throw error;
  }

  const existingVote = await findQuestionVote(userId, questionId);

  if (existingVote) {
    if (existingVote.vote_type === voteType) {
      const error = new Error("You have already voted this way");

      error.statusCode = 409;

      throw error;
    }

    await updateVote(existingVote.vote_id, voteType);
  } else {
    await createQuestionVote({
      userId,
      questionId,
      voteType,
    });
  }

  return await getQuestionVoteCounts(questionId);
}

// add Answer voting service
export async function voteOnAnswer({ userId, answerId, voteType }) {
  const answer = await getAnswerById(answerId);

  if (!answer) {
    const error = new Error("Answer not found");
    error.statusCode = 404;
    throw error;
  }

  const existingVote = await findAnswerVote(userId, answerId);

  if (existingVote) {
    if (existingVote.vote_type === voteType) {
      const error = new Error("You have already voted this way");

      error.statusCode = 409;

      throw error;
    }

    await updateVote(existingVote.vote_id, voteType);
  } else {
    await createAnswerVote({
      userId,
      answerId,
      voteType,
    });
  }

  return await getAnswerVoteCounts(answerId);
}
// add remove votes service

export async function removeQuestionVote({ userId, questionId }) {
  const existingVote = await findQuestionVote(userId, questionId);

  if (!existingVote) {
    const error = new Error("Vote not found");
    error.statusCode = 404;
    throw error;
  }

  await deleteVote(existingVote.vote_id);

  return await getQuestionVoteCounts(questionId);
}

export async function removeAnswerVote({ userId, answerId }) {
  const existingVote = await findAnswerVote(userId, answerId);

  if (!existingVote) {
    const error = new Error("Vote not found");
    error.statusCode = 404;
    throw error;
  }

  await deleteVote(existingVote.vote_id);

  return await getAnswerVoteCounts(answerId);
}
