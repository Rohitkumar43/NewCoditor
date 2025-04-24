import { Request, Response } from 'express';
import User from '../models/User';

export const createOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const { clerkId, email, username, firstName, lastName, profileImage } = req.body;

    if (!clerkId || !email || !username) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Try to find existing user
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      // Update existing user
      existingUser.email = email;
      existingUser.username = username;
      existingUser.firstName = firstName;
      existingUser.lastName = lastName;
      existingUser.profileImage = profileImage;
      
      await existingUser.save();
      return res.json(existingUser);
    }

    // Create new user
    const newUser = new User({
      clerkId,
      email,
      username,
      firstName,
      lastName,
      profileImage
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error in createOrUpdateUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error in getUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}; 