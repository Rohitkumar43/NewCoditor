import { Request, Response } from 'express';
import { executeCode, canExecuteLanguage } from '../services/codeExecution';

export const executeCodeHandler = async (req: Request, res: Response) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ error: 'Code and language are required' });
    }

    // Check if user can execute this language
    const canExecute = await canExecuteLanguage(req, language);
    if (!canExecute) {
      return res.status(403).json({
        error: 'Pro subscription required for this language',
        requiresPro: true
      });
    }

    const result = await executeCode(code, language);
    res.json(result);
  } catch (error) {
    console.error('Error executing code:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 