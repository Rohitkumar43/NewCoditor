import express from 'express';
import { userController } from '../controller/user.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

router.post('/sync', requireAuth, userController.syncUser);
//router.post('/pro-status', requireAuth, userController.updateProStatus);
router.get('/:userId', requireAuth, userController.getUser);

export default router;











