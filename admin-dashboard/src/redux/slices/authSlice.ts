import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationalId: string;
}

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<{ user: User; token: string }>) {
            console.log('Redux loginSuccess payload:', action.payload); // Debug log
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.loading = false;
            localStorage.setItem('token', action.payload.token);
        },
        loginFailure(state, action: PayloadAction<string>) {
            console.error('Redux loginFailure:', action.payload); // Debug log
            state.loading = false;
            state.error = action.payload;
        },
        signupStart(state) {
            state.loading = true;
            state.error = null;
        },
        signupSuccess(state, action: PayloadAction<User>) {
            state.user = action.payload;
            state.loading = false;
        },
        signupFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    signupStart,
    signupSuccess,
    signupFailure,
    logout,
} = authSlice.actions;

export default authSlice.reducer;