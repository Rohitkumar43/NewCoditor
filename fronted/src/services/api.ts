<<<<<<< HEAD
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
=======
import axios from 'axios';

declare global {
  interface Window {
    Clerk?: {
      session?: {
        getToken: () => Promise<string>;
      };
    };
  }
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  timeout: 10000, // 10 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to automatically add auth token
api.interceptors.request.use(
  function(config) {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    
    if (config.headers?.Authorization) {
      return config;
    }
  
    return new Promise((resolve) => {
      window.Clerk?.session?.getToken()
        .then(token => {
          if (token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
          }
          resolve(config);
        })
        .catch(error => {
          console.error('Error getting auth token:', error);
          resolve(config);
        });
    });
});

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.config.method?.toUpperCase()} ${response.config.baseURL}${response.config.url} - ${response.status}`);
    return response;
  },
  (error) => {
    console.error(`API Error: ${error.config.method?.toUpperCase()} ${error.config.baseURL}${error.config.url} - ${error.response?.status}`);
    if (error?.response?.status === 401) {
      // Handle unauthorized error
      console.error('Unauthorized request:', error);
    }
    return Promise.reject(error);
  }
);

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
>>>>>>> 1aa82f4 (make the change in the price page)
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

<<<<<<< HEAD
=======
export interface ExecuteCodeParams {
  code: string;
  language: string;
}

export const executeCode = async ({ code, language }: ExecuteCodeParams) => {
  const response = await api.post('/execute', {
    code,
    language
  });
  return response;
};
>>>>>>> 1aa82f4 (make the change in the price page)

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

<<<<<<< HEAD

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






=======
>>>>>>> 1aa82f4 (make the change in the price page)
export default api;