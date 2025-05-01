import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Metrics, Order } from '../../types';

interface DashboardState {
    metrics: Metrics | null;
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    metrics: null,
    orders: [],
    loading: false,
    error: null,
};

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        fetchMetricsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchMetricsSuccess: (state, action: PayloadAction<Metrics>) => {
            state.metrics = action.payload;
            state.loading = false;
        },
        fetchMetricsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
        fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
            state.orders = action.payload;
            state.loading = false;
        },
    },
});

export const { fetchMetricsStart, fetchMetricsSuccess, fetchMetricsFailure, fetchOrdersSuccess } = dashboardSlice.actions;
export default dashboardSlice.reducer;