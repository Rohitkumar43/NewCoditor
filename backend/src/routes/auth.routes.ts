import express from 'express';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

// Protected route example
router.get('/protected', requireAuth, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.auth.userId });
});

export default router;