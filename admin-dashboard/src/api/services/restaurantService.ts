import api from '../apiClient';

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

interface RestaurantResponse {
    id: string;
    name: string;
    location: string;
    completeName: string;
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

interface ApiError {
    message: string;
    status?: number;
    details?: Record<string, string>;
}

export const createRestaurant = async (data: {
    name: string;
    completeName: string;
    location: string;
    contactNumber: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    restaurantType: RestaurantType;
    cuisineType: RestaurantCuisineType;
    openingHours: OpeningHours;
    images: File[];
    menuItems: MenuItem[];
}): Promise<RestaurantResponse> => {
    try {
        if (!data.name || !data.location || !data.contactNumber || !data.ownerName || !data.ownerEmail || !data.ownerPhone || !data.restaurantType || !data.cuisineType || !data.openingHours || data.menuItems.length === 0) {
            throw new Error('Missing required fields');
        }

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('location', data.location);
        formData.append('completeName', data.completeName);
        formData.append('contactNumber', data.contactNumber);
        formData.append('ownerName', data.ownerName);
        formData.append('ownerEmail', data.ownerEmail);
        formData.append('ownerPhone', data.ownerPhone);
        formData.append('restaurantType', data.restaurantType);
        formData.append('cuisineType', data.cuisineType);
        if (typeof data.openingHours === 'object') {
            formData.append('openingHours', JSON.stringify(data.openingHours));
        } else {
            formData.append('openingHours', data.openingHours.toString());
        }

        // Handle restaurant images
        if (data.images && data.images.length > 0) {
            data.images.forEach((image, index) => {
                if (image.size > 5 * 1024 * 1024 || !image.type.startsWith('image/')) {
                    throw new Error('Invalid image file: Size must be under 5MB and must be an image');
                }
                formData.append('images', image, `restaurant-image-${index}.${image.name.split('.').pop() || 'jpg'}`);
            });
        }
        data.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}][name]`, item.name);
            formData.append(`menuItems[${index}][price]`, item.price);
            formData.append(`menuItems[${index}][description]`, item.description);
            formData.append(`menuItems[${index}][category]`, item.category);
            formData.append(`menuItems[${index}][id]`, item.id);

            if (item.image) {
                if (item.image.size > 5 * 1024 * 1024 || !item.image.type.startsWith('image/')) {
                    throw new Error('Invalid menu item image: Size must be under 5MB and must be an image');
                }
                formData.append(`menuItems[${index}][image]`, item.image, `menu-item-${item.id}.${item.image.name.split('.').pop() || 'jpg'}`);
            }
        });

        const response = await api.post('/restaurants', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (!response.data || !response.data.id) {
            throw new Error('Invalid response from server');
        }
        return response.data as RestaurantResponse;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to create restaurant',
            status: error.response?.status || (error instanceof Error ? undefined : 500),
            details: error.response?.data?.details || {}
        };
        throw apiError;
    }
};

export const updateRestaurant = async (id: string, data: Partial<RestaurantResponse>): Promise<RestaurantResponse> => {
    try {
        const formData = new FormData();

        // Handle basic fields
        if (data.name) formData.append('name', data.name);
        if (data.location) formData.append('location', data.location);
        if (data.completeName) formData.append('completeName', data.completeName);
        if (data.contactNumber) formData.append('contactNumber', data.contactNumber);
        if (data.ownerName) formData.append('ownerName', data.ownerName);
        if (data.ownerEmail) formData.append('ownerEmail', data.ownerEmail);
        if (data.ownerPhone) formData.append('ownerPhone', data.ownerPhone);
        if (data.restaurantType) formData.append('restaurantType', data.restaurantType);
        if (data.cuisineType) formData.append('cuisineType', data.cuisineType);

        if (data.openingHours) {
            formData.append('openingHours', JSON.stringify(data.openingHours));
        }
        if (data.images && Array.isArray(data.images)) {
            data.images.forEach((image, index) => {
                if (image instanceof File) {
                    if (image.size > 5 * 1024 * 1024 || !image.type.startsWith('image/')) {
                        throw new Error('Invalid image file: Size must be under 5MB and must be an image');
                    }
                    formData.append('images', image, `restaurant-image-${index}.${image.name.split('.').pop() || 'jpg'}`);
                }
            });
        }

        // Handle menu items with the same format as create
        if (data.menuItems && Array.isArray(data.menuItems)) {
            data.menuItems.forEach((item, index) => {
                formData.append(`menuItems[${index}][name]`, item.name);
                formData.append(`menuItems[${index}][price]`, item.price);
                formData.append(`menuItems[${index}][description]`, item.description);
                formData.append(`menuItems[${index}][category]`, item.category);
                formData.append(`menuItems[${index}][id]`, item.id);

                if (item.image && item.image instanceof File) {
                    if (item.image.size > 5 * 1024 * 1024 || !item.image.type.startsWith('image/')) {
                        throw new Error('Invalid menu item image: Size must be under 5MB and must be an image');
                    }
                    formData.append(`menuItems[${index}][image]`, item.image, `menu-item-${item.id}.${item.image.name.split('.').pop() || 'jpg'}`);
                }
            });
        }

        const response = await api.put(`/restaurants/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        if (!response.data || !response.data.id) {
            throw new Error('Invalid response from server');
        }
        return response.data as RestaurantResponse;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to update restaurant',
            status: error.response?.status || (error instanceof Error ? undefined : 500),
            details: error.response?.data?.details || {}
        };
        throw apiError;
    }
};

export const deleteRestaurant = async (id: string): Promise<void> => {
    try {
        const response = await api.delete(`/restaurants/${id}`);
        if (response.status !== 200 && response.status !== 204) {
            throw new Error('Failed to delete restaurant');
        }
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to delete restaurant',
            status: error.response?.status || (error instanceof Error ? undefined : 500),
            details: error.response?.data?.details || {}
        };
        throw apiError;
    }
};

export const getRestaurant = async (id: string): Promise<RestaurantResponse> => {
    try {
        const response = await api.get(`/restaurants/${id}`);
        if (!response.data || !response.data.id) {
            throw new Error('Invalid response from server');
        }
        return response.data as RestaurantResponse;
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to fetch restaurant',
            status: error.response?.status || (error instanceof Error ? undefined : 500),
            details: error.response?.data?.details || {}
        };
        throw apiError;
    }
};