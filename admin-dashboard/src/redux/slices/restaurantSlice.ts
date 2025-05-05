import { createSlice, PayloadAction } from '@reduxjs/toolkit';

enum MenuCategory {
    DRINK = "DRINK",
    STARTER = "STARTER",
    APPETIZER = "APPETIZER",
    DESSERT = "DESSERT",
    MAIN = "MAIN",
}

enum RestaurantType {
    RESTAURANT = "RESTAURANT",
    PUB = "PUB",
    HOTEL = "HOTEL",
    COFFEE_SHOP = "COFFEE_SHOP",
    OTHER = "OTHER",
}

enum RestaurantCuisineType {
    AFRICAN = "AFRICAN",
    EUROPEAN = "EUROPEAN",
    ASIAN = "ASIAN",
    MEDITERRANEAN = "MEDITERRANEAN",
    MIDDLE_EASTERN = "MIDDLE_EASTERN",
    OTHER = "OTHER",
}

interface OpeningHours {
    from: string;
    to: string;
}

interface MenuItem {
    id: string;
    name: string;
    price: string;
    description: string;
    category: MenuCategory;
    image?: File;
}

interface Restaurant {
    id: string;
    name: string;
    location: string;
    contactNumber: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    restaurantType: RestaurantType;
    cuisineType: RestaurantCuisineType;
    openingHours: OpeningHours;
    images: string[];
    menuItems: MenuItem[];
}

interface DashboardData {
    overview: any;
    orders: any;
    menu: any;
}

interface RestaurantState {
    restaurant: Restaurant | null;
    restaurants: Restaurant[];
    dashboardData: DashboardData | null;
    loading: boolean;
    error: string | null;
}

const initialState: RestaurantState = {
    restaurant: null,
    restaurants: [],
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
            state.restaurants.push(action.payload);
            state.loading = false;
        },
        createRestaurantFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        updateRestaurantStart(state) {
            state.loading = true;
            state.error = null;
        },
        updateRestaurantSuccess(state, action: PayloadAction<Restaurant>) {
            state.restaurant = action.payload;
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            }
            state.loading = false;
        },
        updateRestaurantFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteRestaurantStart(state) {
            state.loading = true;
            state.error = null;
        },
        deleteRestaurantSuccess(state, action: PayloadAction<string>) {
            state.restaurants = state.restaurants.filter(r => r.id !== action.payload);
            if (state.restaurant?.id === action.payload) {
                state.restaurant = null;
            }
            state.loading = false;
        },
        deleteRestaurantFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
        fetchRestaurantStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchRestaurantSuccess(state, action: PayloadAction<Restaurant>) {
            state.restaurant = action.payload;
            const index = state.restaurants.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.restaurants[index] = action.payload;
            } else {
                state.restaurants.push(action.payload);
            }
            state.loading = false;
        },
        fetchRestaurantFailure(state, action: PayloadAction<string>) {
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
        clearError(state) {
            state.error = null;
        }
    },
});

export const {
    createRestaurantStart,
    createRestaurantSuccess,
    createRestaurantFailure,
    updateRestaurantStart,
    updateRestaurantSuccess,
    updateRestaurantFailure,
    deleteRestaurantStart,
    deleteRestaurantSuccess,
    deleteRestaurantFailure,
    fetchRestaurantStart,
    fetchRestaurantSuccess,
    fetchRestaurantFailure,
    fetchDashboardDataStart,
    fetchDashboardDataSuccess,
    fetchDashboardDataFailure,
    clearError,
} = restaurantSlice.actions;

export default restaurantSlice.reducer;