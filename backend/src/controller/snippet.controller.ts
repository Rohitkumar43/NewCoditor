import { Request, Response } from 'express';
import { Snippet } from '../models/snippet.model';
import { SnippetComment } from '../models/snippetComment.model';
import { Star } from '../models/star.model';
import { AuthRequest } from '../middleware/auth.authMiddleware';

<<<<<<< HEAD


=======
>>>>>>> 1aa82f4 (make the change in the price page)
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
<<<<<<< HEAD
      if (!req.auth?.userId || !req.user?.name) {
=======
      if (!req.auth?.clerkId || !req.clerkUser?.name) {
>>>>>>> 1aa82f4 (make the change in the price page)
        return res.status(401).json({ error: 'User authentication required' });
      }

      const snippet = await Snippet.create({
<<<<<<< HEAD
        userId: req.auth.userId,
        userName: req.user.name,
=======
        userId: req.auth.clerkId,
        userName: req.clerkUser.name,
>>>>>>> 1aa82f4 (make the change in the price page)
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
<<<<<<< HEAD
        userId: req.auth.userId
      });

      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' });
      }

      // Delete related comments and stars
      await SnippetComment.deleteMany({ snippetId: req.params.snippetId });
      await Star.deleteMany({ snippetId: req.params.snippetId });
      await snippet.deleteOne();

      res.json({ message: 'Snippet deleted successfully' });
    } catch (error) {
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to delete snippet' });
    }
  },

  // Toggle star on snippet
  starSnippet: async (req: AuthRequest, res: Response) => {
    try {
<<<<<<< HEAD
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
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)
        });
        res.json({ starred: true });
      }
    } catch (error) {
<<<<<<< HEAD
      res.status(500).json({ error: 'Failed to toggle star' });
=======
      console.error('Star snippet error:', error);
      res.status(500).json({ error: 'Failed to star/unstar snippet' });
>>>>>>> 1aa82f4 (make the change in the price page)
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
<<<<<<< HEAD
      const snippet = await Snippet.findById(req.params.snippetId);
=======
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const snippet = await Snippet.findById(snippetId);
>>>>>>> 1aa82f4 (make the change in the price page)
      if (!snippet) {
        return res.status(404).json({ error: 'Snippet not found' });
      }
      res.json(snippet);
    } catch (error) {
<<<<<<< HEAD
=======
      console.error('Get snippet error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to fetch snippet' });
    }
  },

  // Get snippet star status
  isSnippetStarred: async (req: AuthRequest, res: Response) => {
    try {
<<<<<<< HEAD
      const star = await Star.findOne({
        userId: req.auth.userId,
        snippetId: req.params.snippetId
      });
      res.json({ isStarred: !!star });
    } catch (error) {
=======
      const { snippetId } = req.params;
      
      const star = await Star.findOne({
        snippetId,
        userId: req.auth.clerkId
      });

      res.json({ starred: !!star });
    } catch (error) {
      console.error('Check star status error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to check star status' });
    }
  },

  // Get star count
  getSnippetStarCount: async (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
      const count = await Star.countDocuments({ snippetId: req.params.snippetId });
      res.json({ count });
    } catch (error) {
=======
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const count = await Star.countDocuments({ snippetId });
      res.json({ count });
    } catch (error) {
      console.error('Get star count error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to get star count' });
    }
  },

  // Get starred snippets
  getStarredSnippets: async (req: AuthRequest, res: Response) => {
    try {
<<<<<<< HEAD
      const stars = await Star.find({ userId: req.auth.userId });
      const snippets = await Snippet.find({
        _id: { $in: stars.map(star => star.snippetId) }
      });
      res.json(snippets);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch starred snippets' });
=======
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
>>>>>>> 1aa82f4 (make the change in the price page)
    }
  }
};