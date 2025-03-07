import { Request, Response } from 'express';
import { Snippet } from '../models/snippet.model';
import { Comment } from '../models/snippetComment.model';
import { Star } from '../models/star.model';

interface AuthRequest extends Request {
  auth: { userId: string };
  user?: any;
}

export const snippetController = {
  // Create snippet
  createSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const { title, language, code } = req.body;
      const snippet = await Snippet.create({
        userId: req.auth.userId,
        userName: req.user.name,
        title,
        language,
        code
      });
      res.status(201).json(snippet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create snippet' });
    }
  },

  // Delete snippet and related data
  deleteSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.snippetId,
        userId: req.auth.userId
      });

      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' });
      }

      // Delete related comments and stars
      await Comment.deleteMany({ snippetId: req.params.snippetId });
      await Star.deleteMany({ snippetId: req.params.snippetId });
      await snippet.deleteOne();

      res.json({ message: 'Snippet deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete snippet' });
    }
  },

  // Toggle star on snippet
  starSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const existing = await Star.findOne({
        userId: req.auth.userId,
        snippetId: req.params.snippetId
      });

      if (existing) {
        await existing.deleteOne();
        res.json({ starred: false });
      } else {
        await Star.create({
          userId: req.auth.userId,
          snippetId: req.params.snippetId
        });
        res.json({ starred: true });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to toggle star' });
    }
  },

  // Get all snippets
  getSnippets: async (_req: Request, res: Response) => {
    try {
      const snippets = await Snippet.find().sort({ createdAt: -1 });
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch snippets' });
    }
  },

  // Get single snippet
  getSnippetById: async (req: Request, res: Response) => {
    try {
      const snippet = await Snippet.findById(req.params.snippetId);
      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' });
      }
      res.json(snippet);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch snippet' });
    }
  },

  // Get snippet star status
  isSnippetStarred: async (req: AuthRequest, res: Response) => {
    try {
      const star = await Star.findOne({
        userId: req.auth.userId,
        snippetId: req.params.snippetId
      });
      res.json({ isStarred: !!star });
    } catch (error) {
      res.status(500).json({ error: 'Failed to check star status' });
    }
  },

  // Get star count
  getSnippetStarCount: async (req: Request, res: Response) => {
    try {
      const count = await Star.countDocuments({ snippetId: req.params.snippetId });
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get star count' });
    }
  },

  // Get starred snippets
  getStarredSnippets: async (req: AuthRequest, res: Response) => {
    try {
      const stars = await Star.find({ userId: req.auth.userId });
      const snippets = await Snippet.find({
        _id: { $in: stars.map(star => star.snippetId) }
      });
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch starred snippets' });
    }
  }
};