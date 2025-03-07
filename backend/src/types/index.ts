import { Request } from 'express';

export interface AuthRequest extends Request {
  auth: { userId: string };
  user?: any;
}

export interface CodeExecutionResult {
  output?: string;
  error?: string;
}