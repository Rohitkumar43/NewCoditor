import { Request, Response } from 'express';
import { Comment } from '../models/snippetComment.model';

interface AuthRequest extends Request {
  auth: { userId: string };
  user?: any;
}

export const commentController = {
  // Add comment
  addComment: async (req: AuthRequest, res: Response) => {
    try {
      const { snippetId, content } = req.body;
      const comment = await Comment.create({
        snippetId,
        userId: req.auth.userId,
        userName: req.user.name,
        content
      });
      res.status(201).json(comment);
    } catch (error) {
      res.status(500).json({ error: 'Failed to add comment' });
    }
  },

  // Delete comment
  deleteComment: async (req: AuthRequest, res: Response) => {
    try {
      const comment = await Comment.findOne({
        _id: req.params.commentId,
        userId: req.auth.userId
      });

      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }

      await comment.deleteOne();
      res.json({ message: 'Comment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete comment' });
    }
  },

  // Get comments for snippet
  getComments: async (req: Request, res: Response) => {
    try {
      const comments = await Comment.find({ snippetId: req.params.snippetId })
        .sort({ createdAt: -1 });
      res.json(comments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  }
};