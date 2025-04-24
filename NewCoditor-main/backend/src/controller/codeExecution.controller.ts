import { Request, Response } from 'express';
import { CodeExecution } from '../models/codeExecution.model';
import { executeCodeInSandbox } from '../services/codeExecution.service';
import { AuthRequest } from '../middleware/auth.authMiddleware';

export const codeExecutionController = {
  // Execute code
  executeCode: async (req: Request, res: Response) => {
    try {
      const { language, code } = req.body;
      
      // Add your code execution logic here
      const result = await executeCodeInSandbox(code, language);

      // Only save to database if user is authenticated
      const authReq = req as AuthRequest;
      if (authReq.auth && authReq.auth.clerkId) {
        await CodeExecution.create({
          userId: authReq.auth.clerkId,
          language,
          code,
          output: result.output,
          error: result.error
        });
      }

      res.json({
        language,
        output: result.output,
        error: result.error
      });
    } catch (error) {
      console.error('Code execution error:', error);
      res.status(500).json({ error: 'Failed to execute code' });
    }
  },

  // Get execution history
  getExecutionHistory: async (req: AuthRequest, res: Response) => {
    try {
      if (!req.auth?.clerkId) {
        return res.status(401).json({ error: 'User authentication required' });
      }

      const history = await CodeExecution.find({ 
        userId: req.auth.clerkId 
      }).sort({ createdAt: -1 }).limit(10);
      
      res.json(history);
    } catch (error) {
      console.error('Get execution history error:', error);
      res.status(500).json({ error: 'Failed to fetch execution history' });
    }
  }
};