import { createSlice, createAsyncThunk, PayloadAction, SerializedError } from '@reduxjs/toolkit';

interface RejectedError {
  message: string;
}

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
        const response = await fetch('https://randomuser.me/api/?results=10');
        const data = await response.json();
        console.log("Данные из API:", data);
        return data.results; 
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
        if (action.error.name === 'AxiosError') {
          const axiosError = action.error as any; 
          state.error = axiosError.response?.data?.message || action.error.message || 'Произошла ошибка';
        } else {
          const errorMessage = (action.error as Error)?.message || 'Произошла ошибка';
          state.error = errorMessage;
        }

      });
  },
});

export const { setCurrentPage } = userSlice.actions;

export const userReducer = userSlice.reducer;

