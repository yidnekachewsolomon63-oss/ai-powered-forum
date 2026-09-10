import { apiClient } from '../core/api.client.js';

export async function voteQuestion(questionId, vote_type) {
  const { data } = await apiClient.post(`/api/votes/questions/${questionId}`, { vote_type });
  return data.data;
}
export async function removeQuestionVote(questionId) {
  const { data } = await apiClient.delete(`/api/votes/questions/${questionId}`);
  return data.data;
}
export async function voteAnswer(answerId, vote_type) {
  const { data } = await apiClient.post(`/api/votes/answers/${answerId}`, { vote_type });
  return data.data;
}
export async function removeAnswerVote(answerId) {
  const { data } = await apiClient.delete(`/api/votes/answers/${answerId}`);
  return data.data;
}
export const voteService = { voteQuestion, removeQuestionVote, voteAnswer, removeAnswerVote };
