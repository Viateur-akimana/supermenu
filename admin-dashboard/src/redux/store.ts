import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import restaurantReducer from "./slices/restaurantSlice"
import menuReducer from "./slices/menuSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        restaurant: restaurantReducer,
        menu: menuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

