import { apiClient } from '../core/api.client.js';

export async function getQuestions() {
  const { data } = await apiClient.get('/api/questions');
  return data.data;
}

export async function getQuestion(id) {
  const { data } = await apiClient.get(`/api/questions/${id}`);
  return data.data;
}

export async function createQuestion(payload) {
  const { data } = await apiClient.post('/api/questions', payload);
  return data.data;
}

export async function updateQuestion(id, payload) {
  const { data } = await apiClient.put(`/api/questions/${id}`, payload);
  return data.data;
}

export async function deleteQuestion(id) {
  const { data } = await apiClient.delete(`/api/questions/${id}`);
  return data;
}

export const questionService = { getQuestions, getQuestion, createQuestion, updateQuestion, deleteQuestion };
