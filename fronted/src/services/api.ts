import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'
});


// Create a function to set the auth token
// export const setAuthToken = (token: string | null) => {
//   if (token) {
//     api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete api.defaults.headers.common['Authorization'];
//   }
// };


export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // ✅ Fix: Proper backticks
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};


export const snippetApi = {
  shareSnippet: async (title: string, language: string, code: string) => {
    const response = await api.post('/snippets', { 
      title, 
      language, 
      code 
    });
    return response.data;
  },
  // ... other api methods
};


interface ExecuteCodeParams {
  code: string;
  language: string;
}

// export const executeCode = async ({ code, language }: ExecuteCodeParams): Promise<AxiosResponse<any, any>> => {
//   return axios.post('/execute', { code, language });
// };

// export const executeCode = async ({ code, language }: ExecuteCodeParams) => {
//   const response = await axios.post('http://localhost:5000/api/execute', {
//     code,
//     language
//   });
//   return response;
// };


export const executeCode = async ({ code, language }: ExecuteCodeParams) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
  
  const response = await axios.post(`${API_URL}/api/execute`, {
    code,
    language
  });
  return response;
};






export default api;