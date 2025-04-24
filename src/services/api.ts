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
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

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

export default api;