import mongoose from 'mongoose';

const starSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  snippetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet', required: true }
}, { timestamps: true });

// Compound index for unique stars and efficient queries
starSchema.index({ userId: 1, snippetId: 1 }, { unique: true });
starSchema.index({ snippetId: 1 });

export const Star = mongoose.model('Star', starSchema);