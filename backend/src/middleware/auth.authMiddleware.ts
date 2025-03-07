// src/middleware/authMiddleware.ts
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

// Add this interface to extend the Express Request type
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const requireAuth = async (
  req: AuthenticatedRequest, 
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return; // Return void instead of returning the response
    }

    const session = await clerkClient.sessions.verifySession(token, token);
    if (!session) {
      res.status(401).json({ error: 'Invalid token' });
      return; // Return void instead of returning the response
    }

    req.user = { userId: session.userId };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
    return; // Return void instead of returning the response
  }
};