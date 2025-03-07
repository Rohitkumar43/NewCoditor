import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Clerk user ID
  email: { type: String, required: true },
  name: { type: String, required: true },
  isPro: { type: Boolean, default: false },
  proSince: { type: Date },
  lemonSqueezyCustomerId: { type: String },
  lemonSqueezyOrderId: { type: String }
}, { timestamps: true });

// Index for faster lookups by userId
userSchema.index({ userId: 1 });

export const User = mongoose.model('User', userSchema);