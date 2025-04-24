'use client';

import { useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { userApi } from '@/services/userApi';
import toast from 'react-hot-toast';

export default function UserDataSync() {
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const syncUserData = async () => {
      if (!isLoaded || !isSignedIn || !user) return;

      try {
        await userApi.syncUserData({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          username: user.username || user.firstName || 'Anonymous',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          profileImage: user.imageUrl || '',
        });
      } catch (error) {
        console.error('Error syncing user data:', error);
        toast.error('Failed to sync user data');
      }
    };

    syncUserData();
  }, [isLoaded, isSignedIn, user]);

  // This is a utility component that doesn't render anything
  return null;
} 