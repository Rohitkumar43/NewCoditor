import { Request, Response } from 'express';
import { SnippetComment } from '../models/snippetComment.model';
import { AuthRequest } from '../middleware/auth.authMiddleware';

export const commentController = {
  // Add comment
  addComment: async (req: AuthRequest, res: Response) => {
    try {
      const { snippetId, content } = req.body;
      
      if (!snippetId) {
        return res.status(400).json({ error: 'Snippet ID is required' });
      }
      
      if (!content?.trim()) {
        return res.status(400).json({ error: 'Comment content is required' });
      }
      
      if (!req.auth?.clerkId || !req.clerkUser?.name) {
        return res.status(401).json({ error: 'User authentication required' });
      }
      
      const comment = await SnippetComment.create({
        snippetId,
        userId: req.auth.clerkId,
        userName: req.clerkUser.name,
        content
      });
      res.status(201).json(comment);
    } catch (error) {
      console.error('Add comment error:', error);
      res.status(500).json({ error: 'Failed to add comment' });
    }
  },

  // Delete comment
  deleteComment: async (req: AuthRequest, res: Response) => {
    try {
      const comment = await SnippetComment.findOne({
        _id: req.params.commentId,
        userId: req.auth.clerkId
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found or not authorized' });
      }

      await comment.deleteOne();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      console.error('Delete comment error:', error);
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },

  // Get comments for snippet
  getComments: async (req: Request, res: Response) => {
    try {
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const comments = await SnippetComment.find({ snippetId })
        .sort({ createdAt: -1 });
      res.json(comments);
    } catch (error) {
      console.error('Get comments error:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }
};