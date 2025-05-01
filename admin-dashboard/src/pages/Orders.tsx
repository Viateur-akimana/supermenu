// src/pages/Orders.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrdersSuccess } from '../redux/slices/dashboardSlice';
import { getOrders } from '../services/api';
import { RootState } from '../redux/store';

const Orders: React.FC = () => {
    const dispatch = useDispatch();
    const { orders, loading } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ordersData = await getOrders();
                dispatch(fetchOrdersSuccess(ordersData));
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className="flex-1 p-6 bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Orders</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-4">All Orders</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="p-2">Order ID</th>
                                    <th className="p-2">Table</th>
                                    <th className="p-2">Status</th>
                                    <th className="p-2">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b">
                                        <td className="p-2">{order.id}</td>
                                        <td className="p-2">{order.tableNumber}</td>
                                        <td className="p-2">{order.status}</td>
                                        <td className="p-2">${order.totalAmount.toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;