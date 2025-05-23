import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes';
import snippetRoutes from './routes/snippet.routes';
<<<<<<< HEAD
// import codeExecutionRoutes from './routes/codeExecution';
// import commentRoutes from './routes/comment.routes';

=======
import codeRoutes from './routes/code.routes';
import codeExecutionRoutes from './routes/codeExecution';
import commentRoutes from './routes/comment.routes';
>>>>>>> 1aa82f4 (make the change in the price page)

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get('/api/test', (_req, res) => {
  res.json({ message: 'API is working' });
});

// Routes
app.use('/api/users', userRoutes);
<<<<<<< HEAD
 app.use('/api/snippets', snippetRoutes);
// app.use('/api/comments', commentRoutes);
// app.use('/api/code', codeExecutionRoutes);
=======
app.use('/api/snippets', snippetRoutes);
app.use('/api/code', codeRoutes);
app.use('/api', codeExecutionRoutes);
app.use('/api/comments', commentRoutes);
>>>>>>> 1aa82f4 (make the change in the price page)

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI!)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});