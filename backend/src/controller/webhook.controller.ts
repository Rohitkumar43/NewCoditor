import { Request, Response } from 'express';
<<<<<<< HEAD
import { User } from '../models/user.model';
=======
import User from '../models/User';
>>>>>>> 1aa82f4 (make the change in the price page)
import { Webhook } from 'svix';

export const webhookController = {
  handleClerkWebhook: async (req: Request, res: Response) => {
    const evt = req.body;
    const { type, data } = evt;

    switch (type) {
      case 'user.created':
      case 'user.updated':
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            name: `${data.first_name} ${data.last_name}`,
            updatedAt: new Date()
          },
          { upsert: true, new: true }
        );
        break;

      case 'user.deleted':
        await User.deleteOne({ clerkId: data.id });
        break;
    }

    res.status(200).json({ success: true });
  }
};