import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MenuItem {
    id: string;
    name: string;
    price: string;
    description: string;
    category: string;
    image?: string;
}

interface MenuState {
    menuItems: MenuItem[];
    loading: boolean;
    error: string | null;
}

const initialState: MenuState = {
    menuItems: [],
    loading: false,
    error: null,
};

const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers: {
        fetchMenuStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchMenuSuccess(state, action: PayloadAction<MenuItem[]>) {
            state.menuItems = action.payload;
            state.loading = false;
        },
        fetchMenuFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        addMenuItem(state, action: PayloadAction<MenuItem>) {
            state.menuItems.push(action.payload);
        },
        removeMenuItem(state, action: PayloadAction<string>) {
            state.menuItems = state.menuItems.filter((item) => item.id !== action.payload);
        },
    },
});

export const {
    fetchMenuStart,
    fetchMenuSuccess,
    fetchMenuFailure,
    addMenuItem,
    removeMenuItem,
} = menuSlice.actions;

export default menuSlice.reducer;