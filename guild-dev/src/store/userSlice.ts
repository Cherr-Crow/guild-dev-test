    // src/store/userSlice.ts
    import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
    import axios from 'axios';

    interface UserState {
      users: any[]; 
      loading: boolean;
      error: string | null;
    }

    const initialState: UserState = {
      users: [],
      loading: false,
      error: null,
    };

    export const fetchUsers = createAsyncThunk(
      'users/fetchUsers',
      async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users'); 
        return response.data;
      }
    );

    export const userSlice = createSlice({
      name: 'users',
      initialState,
      reducers: {

      },
      extraReducers: (builder) => {
        builder
          .addCase(fetchUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
          })
          .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Произошла ошибка';
          });
      },
    });

    export const userReducer = userSlice.reducer;
    export const { } = userSlice.actions;