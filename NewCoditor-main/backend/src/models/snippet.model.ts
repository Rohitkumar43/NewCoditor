import mongoose from 'mongoose';

const snippetSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  userName: { type: String, required: true }
}, { timestamps: true });

export const Snippet = mongoose.model('Snippet', snippetSchema);