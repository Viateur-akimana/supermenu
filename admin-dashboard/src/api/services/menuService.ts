import api from "../apiClient";

export const fetchMenuItems = async (restaurantId: string, category: string, page: number = 0, size: number = 10) => {
    const response = await api.get(`/restaurants/${restaurantId}/menu-items`, {
        params: { category, page, size },
    });
    return response.data;
};

export const createMenuItem = async (restaurantId: string, menuItem: any) => {
    const response = await api.post(`/restaurants/${restaurantId}/menu-items`, menuItem);
    return response.data;
};

export const deleteMenuItem = async (restaurantId: string, menuItemId: string) => {
    const response = await api.delete(`/restaurants/${restaurantId}/menu-items/${menuItemId}`);
    return response.data;
};