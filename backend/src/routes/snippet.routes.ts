import express from 'express';
import { snippetController } from '../controller/snippet.controller';
import { requireAuth, attachUser } from '../middleware/auth.authMiddleware';

const router = express.Router();

// Public routes
router.get('/', snippetController.getSnippets);
router.get('/:snippetId', snippetController.getSnippetById);
router.get('/:snippetId/stars/count', snippetController.getSnippetStarCount);

// Protected routes
router.use(requireAuth);
router.use(attachUser);

router.post('/', snippetController.createSnippet);
router.delete('/:snippetId', snippetController.deleteSnippet);
router.post('/:snippetId/star', snippetController.starSnippet);
router.get('/:snippetId/starred', snippetController.isSnippetStarred);
router.get('/user/starred', snippetController.getStarredSnippets);

export default router;