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
        formData.append('contactNumber', data.contactNumber);
        formData.append('ownerName', data.ownerName);
        formData.append('ownerEmail', data.ownerEmail);
        formData.append('ownerPhoneNumber', data.ownerPhone); // Change to match API expectation
        formData.append('restaurantType', data.restaurantType);
        formData.append('cuisineType', data.cuisineType);

        // Format opening hours as a string instead of JSON
        const openingHoursString = `${data.openingHours.from}-${data.openingHours.to}`;
        formData.append('openingHours', openingHoursString);

        // Handle restaurant images - change to singular "image" if only one is expected
        if (data.images && data.images.length > 0) {
            formData.append('image', data.images[0]); // Use singular 'image' instead of 'images'
        }

        // Update menu item format to use dot notation instead of bracket notation
        data.menuItems.forEach((item, index) => {
            formData.append(`menuItems[${index}].name`, item.name);
            formData.append(`menuItems[${index}].price`, item.price);
            formData.append(`menuItems[${index}].description`, item.description);

            // Map your category to the expected API category format if needed
            const categoryMap: Record<string, string> = {
                DRINK: 'DRINK',
                STARTER: 'STARTER',
                APPETIZER: 'APPETIZER',
                MAIN: 'MAIN',
                DESSERT: 'DESSERT',

            };
            const apiCategory = categoryMap[item.category] || item.category;
            formData.append(`menuItems[${index}].category`, apiCategory);

            if (item.image) {
                formData.append(`menuItems[${index}].image`, item.image);
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

export const getRestaurants = async (): Promise<RestaurantResponse[]> => {
    try {
        const response = await api.get('/restaurants');
        return response.data as RestaurantResponse[];
    } catch (error: any) {
        const apiError: ApiError = {
            message: error.response?.data?.message || error.message || 'Failed to fetch restaurants',
            status: error.response?.status || (error instanceof Error ? undefined : 500),
            details: error.response?.data?.details || {}
        };
        throw apiError;
    }
};