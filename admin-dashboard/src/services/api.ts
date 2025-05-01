import axios from 'axios';
import { MenuItem, Metrics, Order } from '../types';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const login = async (credentials: { email: string; password: string }) => {
    const response = await api.post<{ token: string; user: { email: string; role: string } }>('/auth/login', credentials);
    return response.data;
};

export const getDashboardMetrics = async () => {
    const response = await api.get<Metrics>('/dashboard/metrics');
    return response.data;
};

export const getOrders = async (status?: string) => {
    const response = await api.get<Order[]>(`/orders${status ? `?status=${status}` : ''}`);
    return response.data;
};

export const createOrder = async (order: Partial<Order>) => {
    const response = await api.post<Order>('/orders', order);
    return response.data;
};

export const getMenuItems = async () => {
    const response = await api.get<MenuItem[]>('/menu-items');
    return response.data;
};