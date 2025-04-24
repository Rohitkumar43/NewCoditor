'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';
import { useAppDispatch } from '@/stores/hooks';
import { syncUser } from '@/stores/features/userSlice';

export function UserSync() {
  const { user, isLoaded } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoaded && user) {
      dispatch(syncUser({
        userId: user.id,
        email: user.primaryEmailAddress?.emailAddress || '',
        name: `${user.firstName} ${user.lastName}`
      }));
    }
  }, [isLoaded, user, dispatch]);

  return null;
}