import { Request, Response } from 'express';
import { executeCodeInPiston } from '../services/piston.service';

export const codeController = {
  execute: async (req: Request, res: Response) => {
    try {
      const { code, language } = req.body;
      const result = await executeCodeInPiston(code, language);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: 'Code execution failed' });
    }
  }
};