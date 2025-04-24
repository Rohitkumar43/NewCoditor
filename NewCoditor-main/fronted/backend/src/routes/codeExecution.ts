import express from 'express';
import { codeExecutionController } from '../controller/codeExecution.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

router.post('/execute', requireAuth, codeExecutionController.executeCode);
router.get('/history', requireAuth, codeExecutionController.getExecutionHistory);

export default router;