import { Request, Response } from 'express';
<<<<<<< HEAD
import { Comment } from '../models/snippetComment.model';

interface AuthRequest extends Request {
  auth: { userId: string };
  user?: any;
}
=======
import { SnippetComment } from '../models/snippetComment.model';
import { AuthRequest } from '../middleware/auth.authMiddleware';
>>>>>>> 1aa82f4 (make the change in the price page)

export const commentController = {
  // Add comment
  addComment: async (req: AuthRequest, res: Response) => {
    try {
      const { snippetId, content } = req.body;
<<<<<<< HEAD
      const comment = await Comment.create({
        snippetId,
        userId: req.auth.userId,
        userName: req.user.name,
=======
      
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
>>>>>>> 1aa82f4 (make the change in the price page)
        content
      });
      res.status(201).json(comment);
    } catch (error) {
<<<<<<< HEAD
=======
      console.error('Add comment error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to add comment' });
    }
  },

  // Delete comment
  deleteComment: async (req: AuthRequest, res: Response) => {
    try {
<<<<<<< HEAD
      const comment = await Comment.findOne({
        _id: req.params.commentId,
        userId: req.auth.userId
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
=======
      const comment = await SnippetComment.findOne({
        _id: req.params.commentId,
        userId: req.auth.clerkId
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found or not authorized' });
>>>>>>> 1aa82f4 (make the change in the price page)
      }

      await comment.deleteOne();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
<<<<<<< HEAD
=======
      console.error('Delete comment error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },

  // Get comments for snippet
  getComments: async (req: Request, res: Response) => {
    try {
<<<<<<< HEAD
      const comments = await Comment.find({ snippetId: req.params.snippetId })
        .sort({ createdAt: -1 });
      res.json(comments);
    } catch (error) {
=======
      const { snippetId } = req.params;
      
      if (!snippetId || snippetId === 'undefined') {
        return res.status(400).json({ error: 'Valid snippet ID is required' });
      }
      
      const comments = await SnippetComment.find({ snippetId })
        .sort({ createdAt: -1 });
      res.json(comments);
    } catch (error) {
      console.error('Get comments error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }
};