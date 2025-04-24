import { Request, Response } from 'express';
import { CodeExecution } from '../models/codeExecution.model';
<<<<<<< HEAD

interface AuthRequest extends Request {
  auth: { userId: string };
}

export const codeExecutionController = {
  // Execute code
  executeCode: async (req: AuthRequest, res: Response) => {
=======
import { executeCodeInSandbox } from '../services/codeExecution.service';
import { AuthRequest } from '../middleware/auth.authMiddleware';

export const codeExecutionController = {
  // Execute code
  executeCode: async (req: Request, res: Response) => {
>>>>>>> 1aa82f4 (make the change in the price page)
    try {
      const { language, code } = req.body;
      
      // Add your code execution logic here
<<<<<<< HEAD
      const result = await executeCodeInSandbox(code, language); // You'll need to implement this

      const execution = await CodeExecution.create({
        userId: req.auth.userId,
        language,
        code,
        output: result.output,
        error: result.error
      });

      res.json(execution);
    } catch (error) {
      res.status(500).json({ error: 'Code execution failed' });
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)
    }
  },

  // Get execution history
  getExecutionHistory: async (req: AuthRequest, res: Response) => {
    try {
<<<<<<< HEAD
      const executions = await CodeExecution.find({ userId: req.auth.userId })
        .sort({ createdAt: -1 })
        .limit(10);
      res.json(executions);
    } catch (error) {
=======
      if (!req.auth?.clerkId) {
        return res.status(401).json({ error: 'User authentication required' });
      }

      const history = await CodeExecution.find({ 
        userId: req.auth.clerkId 
      }).sort({ createdAt: -1 }).limit(10);
      
      res.json(history);
    } catch (error) {
      console.error('Get execution history error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to fetch execution history' });
    }
  }
};