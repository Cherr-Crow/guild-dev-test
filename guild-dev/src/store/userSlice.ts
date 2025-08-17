import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  users: any[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('http://localhost:8080/users');
    const data = await response.json();
    return data; 
  }
);

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка при загрузке пользователей.';
      });
  },
});

export const { setCurrentPage } = userSlice.actions;

export const userReducer = userSlice.reducer;

