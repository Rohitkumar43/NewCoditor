import axios from 'axios';
import { Snippet } from '@/types/index';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const snippetApi = {
  getSnippets: async (): Promise<Snippet[]> => {
    const response = await axios.get(`${API_URL}/snippets`);
    return response.data;
  },

  getSnippetById: async (snippetId: string): Promise<Snippet> => {
    const response = await axios.get(`${API_URL}/snippets/${snippetId}`);
    return response.data;
  },

  createSnippet: async (title: string, language: string, code: string): Promise<Snippet> => {
    const response = await axios.post(`${API_URL}/snippets`, {
      title,
      language,
      code
    });
    return response.data;
  },

  deleteSnippet: async (snippetId: string): Promise<void> => {
    await axios.delete(`${API_URL}/snippets/${snippetId}`);
  },

  starSnippet: async (snippetId: string): Promise<void> => {
    await axios.post(`${API_URL}/snippets/${snippetId}/star`);
  },

  isSnippetStarred: async (snippetId: string): Promise<boolean> => {
    const response = await axios.get(`${API_URL}/snippets/${snippetId}/starred`);
    return response.data.isStarred;
  },

  getSnippetStarCount: async (snippetId: string): Promise<number> => {
    const response = await axios.get(`${API_URL}/snippets/${snippetId}/stars/count`);
    return response.data.count;
  },

  getStarredSnippets: async (): Promise<Snippet[]> => {
    const response = await axios.get(`${API_URL}/snippets/user/starred`);
    return response.data;
  },
  // Add these methods to your existing snippetApi object
getSnippetComments: async (snippetId: string): Promise<Comment[]> => {
    const response = await axios.get(`${API_URL}/snippets/${snippetId}/comments`);
    return response.data;
},

addComment: async (snippetId: string, content: string): Promise<Comment> => {
    const response = await axios.post(`${API_URL}/snippets/${snippetId}/comments`, {
        content
    });
    return response.data;
  },
  // Add this to your existing snippetApi object
deleteComment: async (commentId: string): Promise<void> => {
    await axios.delete(`${API_URL}/snippets/comments/${commentId}`);
},
};