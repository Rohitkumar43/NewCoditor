import { Request, Response } from 'express';
<<<<<<< HEAD
import { User } from '../models/user.model';
=======
import User from '../models/User';
>>>>>>> 1aa82f4 (make the change in the price page)

// Optional: Define interface for authenticated requests if needed
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const userController = {
  syncUser: async (req: Request, res: Response): Promise<void> => {
    try {
<<<<<<< HEAD
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
=======
      const { clerkId, email, username, firstName, lastName, profileImage } = req.body;

      // First try to find the user by clerkId
      let user = await User.findOne({ clerkId });

      if (user) {
        // Update existing user
        user = await User.findOneAndUpdate(
          { clerkId },
          { 
            email,
            username,
            firstName,
            lastName,
            profileImage,
            updatedAt: new Date()
          },
          { new: true }
        );
      } else {
        // Try to find user by email
        user = await User.findOne({ email });
        
        if (user) {
          // Update existing user with new clerkId
          user = await User.findOneAndUpdate(
            { email },
            { 
              clerkId,
              username,
              firstName,
              lastName,
              profileImage,
              updatedAt: new Date()
            },
            { new: true }
          );
        } else {
          // Create new user
          user = await User.create({
            clerkId,
            email,
            username,
            firstName,
            lastName,
            profileImage,
            isPro: false,
            availableLanguages: ['javascript', 'java', 'python', 'java']
          });
        }
      }

      res.json({
        clerkId: user.clerkId,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        isPro: user.isPro,
        availableLanguages: user.availableLanguages
      });
    } catch (error) {
      console.error('Sync user error:', error);
>>>>>>> 1aa82f4 (make the change in the price page)
      res.status(500).json({ error: 'Failed to sync user' });
    }
  },

<<<<<<< HEAD
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
=======
  getUser: async (req: Request, res: Response): Promise<void> => {
    try {
      const { clerkId } = req.params;
      const user = await User.findOne({ clerkId });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        clerkId: user.clerkId,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        profileImage: user.profileImage,
        isPro: user.isPro,
        availableLanguages: user.availableLanguages
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Failed to get user' });
    }
  },

  updateProStatus: async (req: Request, res: Response): Promise<void> => {
    try {
      const { clerkId, isPro } = req.body;

      const user = await User.findOneAndUpdate(
        { clerkId },
        { 
          isPro,
          $set: {
            availableLanguages: isPro ? 
              ['javascript', 'typescript', 'python', 'java', 'go', 'rust', 'cpp', 'csharp', 'ruby', 'swift'] :
              ['javascript', 'java', 'python', 'java']
          }
>>>>>>> 1aa82f4 (make the change in the price page)
        },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
<<<<<<< HEAD
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
=======
        clerkId: user.clerkId,
        isPro: user.isPro,
        availableLanguages: user.availableLanguages
      });
    } catch (error) {
      console.error('Update pro status error:', error);
      res.status(500).json({ error: 'Failed to update pro status' });
    }
>>>>>>> 1aa82f4 (make the change in the price page)
  }
};