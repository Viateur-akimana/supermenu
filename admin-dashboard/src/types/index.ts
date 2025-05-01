export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

export interface Order {
    id: number;
    user: User;
    tableNumber: string;
    status: string;
    totalAmount: number;
    createdAt: string;
    orderItems: OrderItem[];
}

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
}

export interface MenuItem {
    id: number;
    name: string;
    category: string;
    price: number;
    available: boolean;
    imageUrl?: string;
}

export interface Analytics {
    id: number;
    metricType: string;
    value: number;
    date: string;
}

export interface Metrics {
    totalOrders: number;
    pendingOrders: number;
    totalSales: number;
}