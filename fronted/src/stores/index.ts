import { configureStore } from '@reduxjs/toolkit';
import editorReducer from './features/editorSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
    editor: editorReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;