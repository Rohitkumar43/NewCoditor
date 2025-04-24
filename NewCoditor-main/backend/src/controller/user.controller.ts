import { Request, Response } from 'express';
import User from '../models/User';

// Optional: Define interface for authenticated requests if needed
interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
  };
}

export const userController = {
  syncUser: async (req: Request, res: Response): Promise<void> => {
    try {
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
      res.status(500).json({ error: 'Failed to sync user' });
    }
  },

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
        },
        { new: true }
      );

      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      res.json({
        clerkId: user.clerkId,
        isPro: user.isPro,
        availableLanguages: user.availableLanguages
      });
    } catch (error) {
      console.error('Update pro status error:', error);
      res.status(500).json({ error: 'Failed to update pro status' });
    }
  }
};