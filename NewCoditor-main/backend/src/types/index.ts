import { Request } from 'express';

// Import the AuthRequest type from the auth middleware
import { AuthRequest } from '../middleware/auth.authMiddleware';

// Re-export the AuthRequest type
export { AuthRequest };

export interface CodeExecutionResult {
  output?: string;
  error?: string;
}