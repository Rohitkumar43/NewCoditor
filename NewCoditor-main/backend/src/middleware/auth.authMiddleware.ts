// src/middleware/authMiddleware.ts
//import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';

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
  res: Response, 
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

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
    res.status(401).json({ error: 'Authentication failed' });
    return;
  }
};