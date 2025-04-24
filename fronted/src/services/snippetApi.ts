<<<<<<< HEAD
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
=======
import api from './api';
import { Snippet, Comment } from '@/types/index';
import toast from 'react-hot-toast';
import axios from 'axios';

export const snippetApi = {
  getSnippets: async (): Promise<Snippet[]> => {
    try {
      const response = await api.get<Snippet[]>('/snippets');
      return response.data;
    } catch (error) {
      console.error('Error fetching snippets:', error);
      toast.error('Failed to fetch snippets');
      return [];
    }
  },

  getSnippetById: async (snippetId: string): Promise<Snippet | null> => {
    // Validate snippet ID
    if (!snippetId || snippetId === 'undefined') {
      console.warn('Invalid snippet ID provided to getSnippetById:', snippetId);
      toast.error('Invalid snippet ID');
      return null;
    }
    
    try {
      console.log(`Making API request to /snippets/${snippetId}`);
      
      // Create a timeout promise to handle request timeouts
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out after 10 seconds'));
        }, 10000);
      });
      
      // Create the actual API request promise
      const fetchPromise = api.get<Snippet>(`/snippets/${snippetId}`);
      
      // Race the two promises
      try {
        // Use Promise.race to either get the API response or timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]) as any;
        console.log('API response for getSnippetById:', response);
        
        if (!response?.data) {
          console.warn('No data returned from getSnippetById');
          toast.error('No snippet data returned from server');
          return null;
        }
        
        return response.data;
      } catch (timeoutError: any) {
        if (timeoutError.message === 'Request timed out after 10 seconds') {
          console.error('Request timed out');
          toast.error('Request timed out. Server may be unavailable.');
          return null;
        }
        throw timeoutError; // Re-throw if it's not a timeout error
      }
    } catch (error: any) {
      console.error('Error fetching snippet:', error);
      
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.status === 404) {
          toast.error('Snippet not found');
        } else {
          toast.error(`Failed to fetch snippet: ${error.response.data?.error || 'Unknown error'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server. Check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        toast.error(`Request error: ${error.message}`);
      }
      
      return null;
    }
  },

  createSnippet: async (title: string, language: string, code: string): Promise<Snippet | null> => {
    try {
      const response = await api.post<Snippet>('/snippets', {
        title,
        language,
        code
      });
      toast.success('Snippet created successfully');
      return response.data;
    } catch (error) {
      console.error('Error creating snippet:', error);
      toast.error('Failed to create snippet');
      return null;
    }
  },

  deleteSnippet: async (snippetId: string): Promise<boolean> => {
    try {
      await api.delete(`/snippets/${snippetId}`);
      toast.success('Snippet deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting snippet:', error);
      toast.error('Failed to delete snippet');
      return false;
    }
  },

  starSnippet: async (snippetId: string): Promise<boolean> => {
    try {
      await api.post(`/snippets/${snippetId}/star`);
      toast.success('Snippet starred');
      return true;
    } catch (error) {
      console.error('Error starring snippet:', error);
      toast.error('Failed to star snippet');
      return false;
    }
  },

  isSnippetStarred: async (snippetId: string): Promise<boolean> => {
    // Validate snippet ID
    if (!snippetId || snippetId === 'undefined') {
      console.warn('Invalid snippet ID provided to isSnippetStarred');
      return false;
    }
    
    try {
      const response = await api.get<{ starred: boolean }>(`/snippets/${snippetId}/starred`);
      return response.data.starred;
    } catch (error) {
      console.error('Error checking star status:', error);
      return false;
    }
  },

  getSnippetStarCount: async (snippetId: string): Promise<number> => {
    // Validate snippet ID
    if (!snippetId || snippetId === 'undefined') {
      console.warn('Invalid snippet ID provided to getSnippetStarCount');
      return 0;
    }
    
    try {
      const response = await api.get<{ count: number }>(`/snippets/${snippetId}/stars/count`);
      return response.data.count;
    } catch (error) {
      console.error('Error fetching star count:', error);
      return 0;
    }
  },

  getStarredSnippets: async (): Promise<Snippet[]> => {
    try {
      const response = await api.get<Snippet[]>('/snippets/user/starred');
      return response.data;
    } catch (error) {
      console.error('Error fetching starred snippets:', error);
      toast.error('Failed to fetch starred snippets');
      return [];
    }
  },

  getSnippetComments: async (snippetId: string): Promise<Comment[]> => {
    // Validate snippet ID
    if (!snippetId || snippetId === 'undefined') {
      console.warn('Invalid snippet ID provided to getSnippetComments:', snippetId);
      toast.error('Invalid snippet ID');
      return [];
    }
    
    try {
      console.log(`Making API request to /comments/snippet/${snippetId}`);
      
      // Create a timeout promise to handle request timeouts
      const timeoutPromise = new Promise<null>((_, reject) => {
        setTimeout(() => {
          reject(new Error('Request timed out after 10 seconds'));
        }, 10000);
      });
      
      // Create the actual API request promise
      const fetchPromise = api.get<Comment[]>(`/comments/snippet/${snippetId}`);
      
      // Race the two promises
      try {
        // Use Promise.race to either get the API response or timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]) as any;
        console.log('API response for getSnippetComments:', response);
        
        if (!response?.data) {
          console.warn('No data returned from getSnippetComments');
          return [];
        }
        
        return response.data;
      } catch (timeoutError: any) {
        if (timeoutError.message === 'Request timed out after 10 seconds') {
          console.error('Request timed out');
          toast.error('Request timed out. Server may be unavailable.');
          return [];
        }
        throw timeoutError; // Re-throw if it's not a timeout error
      }
    } catch (error: any) {
      console.error('Error fetching comments:', error);
      
      // More detailed error logging
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        
        if (error.response.status === 404) {
          toast.error('Comments not found');
        } else {
          toast.error(`Failed to fetch comments: ${error.response.data?.error || 'Unknown error'}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        toast.error('No response from server when fetching comments');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up request:', error.message);
        toast.error(`Request error for comments: ${error.message}`);
      }
      
      return [];
    }
  },

  addComment: async (snippetId: string, content: string): Promise<Comment | null> => {
    try {
      const response = await api.post<Comment>('/comments', {
        snippetId,
        content
      });
      toast.success('Comment added successfully');
      return response.data;
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
      return null;
    }
  },

  // delete the comment
  deleteComment: async (commentId: string): Promise<boolean> => {
    try {
      await api.delete(`/comments/${commentId}`);
      toast.success('Comment deleted successfully');
      return true;
    } catch (error) {
      console.error('Error deleting comment:', error);
      toast.error('Failed to delete comment');
      return false;
    }
  }
>>>>>>> 1aa82f4 (make the change in the price page)
};