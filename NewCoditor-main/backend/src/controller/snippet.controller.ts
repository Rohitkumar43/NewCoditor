import { Request, Response } from 'express';
import { Snippet } from '../models/snippet.model';
import { SnippetComment } from '../models/snippetComment.model';
import { Star } from '../models/star.model';
import { AuthRequest } from '../middleware/auth.authMiddleware';

// interface AuthRequest extends Request {
//   auth: { userId: string };
//   user?: {
//     id: string;
//     name: string;
//     email: string;
//   };
// }

export const snippetController = {
  // Create snippet
  createSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const { title, language, code } = req.body;

      // Add input validation
      if (!title?.trim() || !language?.trim() || !code?.trim()) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      // Add user validation
      if (!req.auth?.clerkId || !req.clerkUser?.name) {
        return res.status(401).json({ error: 'User authentication required' });
      }

      const snippet = await Snippet.create({
        userId: req.auth.clerkId,
        userName: req.clerkUser.name,
        title,
        language,
        code
      });

      res.status(201).json(snippet);
    } catch (error) {
      console.error('Create snippet error:', error);
      res.status(500).json({ error: 'Failed to create snippet' });
    }
  },
  // Delete snippet and related data
  deleteSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const snippet = await Snippet.findOne({
        _id: req.params.snippetId,
        userId: req.auth.clerkId
      });

      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found or not authorized' });
      }

      // Delete the snippet
      await Snippet.deleteOne({ _id: req.params.snippetId });

      // Delete related comments
      await SnippetComment.deleteMany({ snippetId: req.params.snippetId });

      // Delete related stars
      await Star.deleteMany({ snippetId: req.params.snippetId });

      res.json({ message: 'Snippet and related data deleted successfully' });
    } catch (error) {
      console.error('Delete snippet error:', error);
      res.status(500).json({ error: 'Failed to delete snippet' });
    }
  },

  // Toggle star on snippet
  starSnippet: async (req: AuthRequest, res: Response) => {
    try {
      const { snippetId } = req.params;
      
      // Check if already starred
      const existingStar = await Star.findOne({
        snippetId,
        userId: req.auth.clerkId
      });

      if (existingStar) {
        // Remove star if already exists
        await Star.deleteOne({
          snippetId,
          userId: req.auth.clerkId
        });
        res.json({ starred: false });
      } else {
        // Add new star
        await Star.create({
          snippetId,
          userId: req.auth.clerkId
        });
        res.json({ starred: true });
      }
    } catch (error) {
      console.error('Star snippet error:', error);
      res.status(500).json({ error: 'Failed to star/unstar snippet' });
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
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const snippet = await Snippet.findById(snippetId);
      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' });
      }
      res.json(snippet);
    } catch (error) {
      console.error('Get snippet error:', error);
      res.status(500).json({ error: 'Failed to fetch snippet' });
    }
  },

  // Get snippet star status
  isSnippetStarred: async (req: AuthRequest, res: Response) => {
    try {
      const { snippetId } = req.params;
      
      const star = await Star.findOne({
        snippetId,
        userId: req.auth.clerkId
      });

      res.json({ starred: !!star });
    } catch (error) {
      console.error('Check star status error:', error);
      res.status(500).json({ error: 'Failed to check star status' });
    }
  },

  // Get star count
  getSnippetStarCount: async (req: Request, res: Response) => {
    try {
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const count = await Star.countDocuments({ snippetId });
      res.json({ count });
    } catch (error) {
      console.error('Get star count error:', error);
      res.status(500).json({ error: 'Failed to get star count' });
    }
  },

  // Get starred snippets
  getStarredSnippets: async (req: AuthRequest, res: Response) => {
    try {
      // Find all stars by this user
      const stars = await Star.find({ userId: req.auth.clerkId });
      
      // Get the snippet IDs
      const snippetIds = stars.map(star => star.snippetId);
      
      // Find all snippets with those IDs
      const snippets = await Snippet.find({ _id: { $in: snippetIds } });
      
      res.json(snippets);
    } catch (error) {
      console.error('Get starred snippets error:', error);
      res.status(500).json({ error: 'Failed to get starred snippets' });
    }
  }
};