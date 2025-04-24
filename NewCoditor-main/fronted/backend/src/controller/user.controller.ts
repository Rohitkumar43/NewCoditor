import { Request, Response } from 'express';
import { User } from '../models/user.model';

// Optional: Define interface for authenticated requests if needed
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const userController = {
  syncUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, email, name } = req.body;

      const user = await User.findOneAndUpdate(
        { userId },
        { 
          userId,
          email,
          name,
          $setOnInsert: {
            isPro: false
          }
        },
        { upsert: true, new: true }
      );

      res.json({
        userId: user.userId,
        email: user.email,
        name: user.name,
        isPro: user.isPro,
        proSince: user.proSince
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to sync user' });
    }
  },

  updateProStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId, isPro, customerId, orderId } = req.body;

      const user = await User.findOneAndUpdate(
        { userId },
        { 
          isPro,
          proSince: isPro ? new Date() : null,
          lemonSqueezyCustomerId: customerId,
          lemonSqueezyOrderId: orderId
        },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        userId: user.userId,
        isPro: user.isPro,
        proSince: user.proSince
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update pro status' });
    }
  },

  getUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
      const user = await User.findOne({ userId });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        userId: user.userId,
        email: user.email,
        name: user.name,
        isPro: user.isPro,
        proSince: user.proSince
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get user' });
    }
  }
};