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
};