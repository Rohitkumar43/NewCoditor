import express, { Router, Request, Response, NextFunction } from 'express';
import { snippetController } from '../controller/snippet.controller';
import { requireAuth, AuthRequest } from '../middleware/auth.authMiddleware';

const router: Router = express.Router();

// Public routes
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

export default router;