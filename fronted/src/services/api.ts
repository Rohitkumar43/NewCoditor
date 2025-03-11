import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'
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
export default api;