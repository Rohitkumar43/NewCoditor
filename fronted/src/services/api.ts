import axios from 'axios';
import { useAuth } from '@clerk/nextjs';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
});


export const executeCode = async (code: string, language: string) => {
  const response = await api.post('/code/execute', { code, language });
  return response.data;
};

export const shareSnippet = async (title: string, language: string, code: string) => {
  const response = await api.post('/snippets', { title, language, code });
  return response.data;
};

api.interceptors.request.use(async (config) => {
  const { getToken } = useAuth();
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;