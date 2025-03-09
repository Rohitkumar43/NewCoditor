// src/middleware/authMiddleware.ts
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

// Define a shared interface for authenticated requests
export interface AuthRequest extends Request {
  auth: { userId: string };
  user?: {
    userId: string;
    name: string;
    email: string;
  };
}

export const requireAuth = async (
  req: AuthRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    const session = await clerkClient.sessions.verifySession(token, token);
    if (!session) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    const user = await clerkClient.users.getUser(session.userId);
    
    req.auth = { userId: session.userId };
    req.user = {
      userId: session.userId,
      name: `${user.firstName} ${user.lastName}`.trim(),
      email: user.emailAddresses[0]?.emailAddress || ''
    };

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};