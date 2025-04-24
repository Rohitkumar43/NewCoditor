import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/api';

interface UserState {
  userId: string | null;
  email: string | null;
  name: string | null;
  isPro: boolean;
  proSince: Date | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userId: null,
  email: null,
  name: null,
  isPro: false,
  proSince: null,
  isLoading: false,
  error: null
};

export const syncUser = createAsyncThunk(
  'user/syncUser',
  async (userData: { userId: string; email: string; name: string }) => {
    const response = await api.post('/users/sync', userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
    setIsPro: (state, action) => {
      state.isPro = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(syncUser.fulfilled, (state, action) => {
        state.isLoading = false;
        return { ...state, ...action.payload };
      })
      .addCase(syncUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to sync user';
      });
  }
});

export const { setUser, clearUser, setIsPro } = userSlice.actions;
export default userSlice.reducer;