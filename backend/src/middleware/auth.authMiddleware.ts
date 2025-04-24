// src/middleware/authMiddleware.ts
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

<<<<<<< HEAD
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
=======
// Define a type for authenticated requests using intersection instead of extension
export type AuthRequest = Request & {
  auth: { clerkId: string };
  clerkUser?: {
    clerkId: string;
    name: string;
    email: string;
  };
};

// Create a middleware that can be used with Express routes
export const requireAuth = async (
  req: Request, 
>>>>>>> 1aa82f4 (make the change in the price page)
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

<<<<<<< HEAD
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
=======
    try {
      // Verify the JWT token
      const jwtPayload = await clerkClient.verifyToken(token);
      
      if (!jwtPayload.sub) {
        res.status(401).json({ error: 'Invalid token' });
        return;
      }

      const user = await clerkClient.users.getUser(jwtPayload.sub);
      
      // Cast req to AuthRequest to add our custom properties
      (req as AuthRequest).auth = { clerkId: jwtPayload.sub };
      (req as AuthRequest).clerkUser = {
        clerkId: jwtPayload.sub,
        name: `${user.firstName} ${user.lastName}`.trim(),
        email: user.emailAddresses[0]?.emailAddress || ''
      };

      next();
    } catch (error) {
      console.error('Token verification error:', error);
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};