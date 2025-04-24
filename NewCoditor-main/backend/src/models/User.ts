import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  profileImage: String,
  isPro: {
    type: Boolean,
    default: false
  },
  availableLanguages: {
    type: [String],
    default: ['javascript', 'java', 'python', 'java']
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Update the updatedAt timestamp before saving
userSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Check if the model exists before creating it
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 