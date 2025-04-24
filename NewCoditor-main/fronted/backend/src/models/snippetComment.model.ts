import mongoose from 'mongoose';

const snippetCommentSchema = new mongoose.Schema({
  snippetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Snippet', required: true, index: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

export const SnippetComment = mongoose.model('SnippetComment', snippetCommentSchema);