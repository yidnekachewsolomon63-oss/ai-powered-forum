import { apiClient } from '../core/api.client.js';

export async function getAnswers(questionId) {
  const { data } = await apiClient.get(`/api/answers/questions/${questionId}`);
  return data.data;
}

export async function createAnswer(questionId, body) {
  const { data } = await apiClient.post(`/api/answers/questions/${questionId}`, { body });
  return data.data;
}

export async function updateAnswer(id, body) {
  const { data } = await apiClient.put(`/api/answers/${id}`, { body });
  return data.data;
}

export async function deleteAnswer(id) {
  return (await apiClient.delete(`/api/answers/${id}`)).data;
}

export const answerService = { getAnswers, createAnswer, updateAnswer, deleteAnswer };
