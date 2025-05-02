import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuItem {
    id: string;
    name: string;
    price: string;
    description: string;
    category: string;
    image?: File;
}

interface Restaurant {
    id: string;
    name: string;
    location: string;
    completeName: string;
    contactNumber: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    restaurantType: string;
    cuisineType: string;
    openingHours: { from: string; to: string };
    images: File[];
    menuItems: MenuItem[];
}

interface DashboardData {
    overview: any; // Replace with actual type
    orders: any; // Replace with actual type
    menu: any; // Replace with actual type
}

interface RestaurantState {
    restaurant: Restaurant | null;
    dashboardData: DashboardData | null;
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    restaurant: null,
    dashboardData: null,
    loading: false,
    error: null,
};

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        createRestaurantStart(state) {
            state.loading = true;
            state.error = null;
        },
        createRestaurantSuccess(state, action: PayloadAction<Restaurant>) {
            state.restaurant = action.payload;
            state.loading = false;
        },
        createRestaurantFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchDashboardDataStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchDashboardDataSuccess(state, action: PayloadAction<DashboardData>) {
            state.dashboardData = action.payload;
            state.loading = false;
        },
        fetchDashboardDataFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    createRestaurantStart,
    createRestaurantSuccess,
    createRestaurantFailure,
    fetchDashboardDataStart,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure,
} = restaurantSlice.actions;
export default restaurantSlice.reducer;