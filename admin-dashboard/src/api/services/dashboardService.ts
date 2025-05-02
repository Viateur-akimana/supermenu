import api from '../apiClient';

export const getDashboardData = async () => {
    const response = await api.get('/dashboard');
    return response.data; // { overview: {}, orders: [], menu: [] }
};