import api from './api';
import { useAuth } from '@clerk/nextjs';

export interface UserData {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  isPro: boolean;
}

export const userApi = {
  syncUserData: async (userData: UserData) => {
    try {
      const response = await api.post<UserData>('/users/sync', userData);
      return response.data;
    } catch (error) {
      console.error('Error syncing user data:', error);
      throw error;
    }
  },

  getUser: async (clerkId: string): Promise<UserData> => {
    try {
      const response = await api.get<UserData>(`/users/${clerkId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  checkProStatus: async (clerkId: string): Promise<boolean> => {
    try {
      const user = await userApi.getUser(clerkId);
      return user.isPro || false;
    } catch (error) {
      console.error('Error checking pro status:', error);
      return false;
    }
  }
}; 