import { Request, Response } from 'express';
import { executeCodeInPiston } from '../services/piston.service';
<<<<<<< HEAD
=======
import { canExecuteLanguage } from '../services/codeExecution';
>>>>>>> 1aa82f4 (make the change in the price page)

export const codeController = {
  execute: async (req: Request, res: Response) => {
    try {
      const { code, language } = req.body;
<<<<<<< HEAD
      const result = await executeCodeInPiston(code, language);
      res.json(result);
    } catch (error) {
=======

      // Check if user can execute this language
      const canExecute = await canExecuteLanguage(req, language);
      if (!canExecute) {
        return res.status(403).json({
          error: 'Pro subscription required for this language',
          requiresPro: true
        });
      }

      const result = await executeCodeInPiston(code, language);
      res.json(result);
    } catch (error) {
      console.error('Code execution error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Code execution failed' });
    }
  }
};