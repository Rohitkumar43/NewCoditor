import express from 'express';
import { codeController } from '../controller/code.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

router.post('/execute', requireAuth, codeController.execute);

export default router;