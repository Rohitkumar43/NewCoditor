import { Request, Response } from 'express';
import { CodeExecution } from '../models/codeExecution.model';

interface AuthRequest extends Request {
  auth: { userId: string };
}

export const codeExecutionController = {
  // Execute code
  executeCode: async (req: AuthRequest, res: Response) => {
    try {
      const { language, code } = req.body;
      
      // Add your code execution logic here
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
    }
  },

  // Get execution history
  getExecutionHistory: async (req: AuthRequest, res: Response) => {
    try {
      const executions = await CodeExecution.find({ userId: req.auth.userId })
        .sort({ createdAt: -1 })
        .limit(10);
      res.json(executions);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch execution history' });
    }
  }
};