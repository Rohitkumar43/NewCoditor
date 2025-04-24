import mongoose from 'mongoose';

const codeExecutionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  output: { type: String },
  error: { type: String }
}, { timestamps: true });

export const CodeExecution = mongoose.model('CodeExecution', codeExecutionSchema);