import express from 'express';
import { createOrUpdateUser, getUser } from '../controller/userController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

// Protected routes - require authentication
router.post('/sync', authMiddleware, createOrUpdateUser);
router.get('/:clerkId', authMiddleware, getUser);

export default router; 