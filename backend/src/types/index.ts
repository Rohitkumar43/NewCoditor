import { Request } from 'express';

<<<<<<< HEAD
export interface AuthRequest extends Request {
  auth: { userId: string };
  user?: any;
}
=======
// Import the AuthRequest type from the auth middleware
import { AuthRequest } from '../middleware/auth.authMiddleware';

// Re-export the AuthRequest type
export { AuthRequest };
>>>>>>> 1aa82f4 (make the change in the price page)

export interface CodeExecutionResult {
  output?: string;
  error?: string;
}