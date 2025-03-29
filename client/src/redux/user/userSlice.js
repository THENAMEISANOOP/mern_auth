import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    loading: false,
    error: null,  // Change from `false` to `null` for better error handling
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signinStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error when starting a request
        },
        signinSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signinFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload; // Store error message for debugging
        },
    },
});

export const { signinStart, signinSuccess, signinFailure } = userSlice.actions;

export default userSlice.reducer;
