import api from '../apiClient';

export const createRestaurant = async (data: {
    name: string;
    completeName: string;
    location: string;
    contactNumber: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
    restaurantType: string;
    cuisineType: string;
    openingHours: { from: string; to: string };
    images: File[];
    menuItems: Array<{
        id: string;
        name: string;
        price: string;
        description: string;
        image?: File;
    }>;
}) => {
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
    formData.append('openingHours', JSON.stringify(data.openingHours));
    data.images.forEach((image, index) => {
        formData.append('images', image);
    });
    formData.append('menuItems', JSON.stringify(data.menuItems));
    data.menuItems.forEach((item) => {
        if (item.image) {
            formData.append(`menuItemImages_${item.id}`, item.image);
        }
    });

    const response = await api.post('/restaurants', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data; // { restaurant: { id, name, ... } }
};