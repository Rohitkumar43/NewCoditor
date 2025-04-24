import express, { RequestHandler } from 'express';
import { commentController } from '../controller/comment.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';

const router = express.Router();

// Public routes
router.get('/snippet/:snippetId', commentController.getComments as RequestHandler);

// Protected routes - apply requireAuth middleware to specific routes
// Use double casting to avoid TypeScript errors
router.post('/', requireAuth, (commentController.addComment as unknown) as RequestHandler);
router.delete('/:commentId', requireAuth, (commentController.deleteComment as unknown) as RequestHandler);

export default router;