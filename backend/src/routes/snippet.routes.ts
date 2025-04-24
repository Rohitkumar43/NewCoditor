<<<<<<< HEAD
import express, { Router } from 'express';
import { snippetController } from '../controller/snippet.controller';
import { requireAuth } from '../middleware/auth.authMiddleware';
=======
import express, { Router, Request, Response, NextFunction } from 'express';
import { snippetController } from '../controller/snippet.controller';
import { requireAuth, AuthRequest } from '../middleware/auth.authMiddleware';
>>>>>>> 1aa82f4 (make the change in the price page)

const router: Router = express.Router();

// Public routes
<<<<<<< HEAD
router.get('/', snippetController.getSnippets);
router.get('/:snippetId', snippetController.getSnippetById);
router.get('/:snippetId/stars/count', snippetController.getSnippetStarCount);

// Protected routes
router.use(requireAuth);
// Remove attachUser as it's now handled in requireAuth

// Protected endpoints
router.post('/', snippetController.createSnippet);
router.delete('/:snippetId', snippetController.deleteSnippet);
router.post('/:snippetId/star', snippetController.starSnippet);
router.get('/:snippetId/starred', snippetController.isSnippetStarred);
router.get('/user/starred', snippetController.getStarredSnippets);
=======
// @ts-ignore
router.get('/', (req: Request, res: Response) => {
  return snippetController.getSnippets(req, res);
});

// @ts-ignore
router.get('/:snippetId', (req: Request, res: Response) => {
  return snippetController.getSnippetById(req, res);
});

// @ts-ignore
router.get('/:snippetId/stars/count', (req: Request, res: Response) => {
  return snippetController.getSnippetStarCount(req, res);
});

// Protected routes
// @ts-ignore
router.use((req: Request, res: Response, next: NextFunction) => {
  return requireAuth(req as AuthRequest, res, next);
});

// Protected endpoints
// @ts-ignore
router.post('/', (req: Request, res: Response) => {
  return snippetController.createSnippet(req as AuthRequest, res);
});

// @ts-ignore
router.delete('/:snippetId', (req: Request, res: Response) => {
  return snippetController.deleteSnippet(req as AuthRequest, res);
});

// @ts-ignore
router.post('/:snippetId/star', (req: Request, res: Response) => {
  return snippetController.starSnippet(req as AuthRequest, res);
});

// @ts-ignore
router.get('/:snippetId/starred', (req: Request, res: Response) => {
  return snippetController.isSnippetStarred(req as AuthRequest, res);
});

// @ts-ignore
router.get('/user/starred', (req: Request, res: Response) => {
  return snippetController.getStarredSnippets(req as AuthRequest, res);
});
>>>>>>> 1aa82f4 (make the change in the price page)

export default router;