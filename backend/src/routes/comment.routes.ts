<<<<<<< HEAD
import express from 'express';
import { commentController } from '../controller/comment.controller';
import { requireAuth, attachUser } from '../middleware/auth.authMiddleware';
=======
import express, { RequestHandler } from 'express';
import { commentController } from '../controller/comment.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';
>>>>>>> 1aa82f4 (make the change in the price page)

const router = express.Router();

// Public routes
<<<<<<< HEAD
router.get('/snippet/:snippetId', commentController.getComments);

// Protected routes
router.use(requireAuth);
router.use(attachUser);

router.post('/', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);
=======
router.get('/snippet/:snippetId', commentController.getComments as RequestHandler);

// Protected routes - apply requireAuth middleware to specific routes
// Use double casting to avoid TypeScript errors
router.post('/', requireAuth, (commentController.addComment as unknown) as RequestHandler);
router.delete('/:commentId', requireAuth, (commentController.deleteComment as unknown) as RequestHandler);
>>>>>>> 1aa82f4 (make the change in the price page)

export default router;