import { apiClient } from '../core/api.client.js';

async function register({ firstName, lastName, email, password }) {
  const response = await apiClient.post('/api/auth/register', {
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email: email.trim().toLowerCase(),
    password,
  });
  return response.data.data;
}

async function login({ email, password }) {
  const response = await apiClient.post('/api/auth/login', {
    email: email.trim().toLowerCase(),
    password,
  });

  const result = response.data.data;
  localStorage.setItem('token', result.token);
  localStorage.setItem('user', JSON.stringify(result.user));
  return result;
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
}

function getStoredToken() {
  return localStorage.getItem('token');
}

function getStoredUser() {
  const raw = localStorage.getItem('user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { localStorage.removeItem('user'); return null; }
}

export const authService = { register, login, logout, getStoredToken, getStoredUser };
