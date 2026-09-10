import { apiClient } from '../core/api.client.js';

export async function askAI(prompt, context = '') {
  const { data } = await apiClient.post('/api/ai/ask', { prompt, context });
  return data.answer;
}

export const aiService = { askAI };
