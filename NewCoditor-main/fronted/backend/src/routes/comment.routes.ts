import express from 'express';
import { commentController } from '../controller/comment.controller';
import { requireAuth, attachUser } from '../middleware/auth.authMiddleware';

const router = express.Router();

// Public routes
router.get('/snippet/:snippetId', commentController.getComments);

// Protected routes
router.use(requireAuth);
router.use(attachUser);

router.post('/', commentController.addComment);
router.delete('/:commentId', commentController.deleteComment);

export default router;