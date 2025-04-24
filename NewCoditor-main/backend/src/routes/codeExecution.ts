import express from 'express';
import { codeExecutionController } from '../controller/codeExecution.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

// Temporarily remove authentication for testing
router.post('/execute', codeExecutionController.executeCode);
// Use type assertion to fix the type error
router.get('/history', (req, res, next) => {
  requireAuth(req as any, res, next);
}, codeExecutionController.getExecutionHistory);

export default router;