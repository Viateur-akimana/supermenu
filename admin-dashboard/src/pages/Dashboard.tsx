import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMetricsStart, fetchMetricsSuccess, fetchMetricsFailure, fetchOrdersSuccess } from '../redux/slices/dashboardSlice';
import { getDashboardMetrics, getOrders } from '../services/api';
import { RootState } from '../redux/store';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const Dashboard: React.FC = () => {
    const dispatch = useDispatch();
    const { metrics, orders, loading, error } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(fetchMetricsStart());
            try {
                const metricsData = await getDashboardMetrics();
                dispatch(fetchMetricsSuccess(metricsData));
                const ordersData = await getOrders('PENDING');
                dispatch(fetchOrdersSuccess(ordersData));
            } catch (err) {
                dispatch(fetchMetricsFailure('Failed to load data'));
                toast.error('Failed to load dashboard data');
            }
        };
        fetchData();
    }, [dispatch]);

    // Mock chart data (replace with Analytics API call)
    const chartData = [
        { date: '2025-05-01', sales: 1000 },
        { date: '2025-05-02', sales: 1200 },
        { date: '2025-05-03', sales: 900 },
    ];

    return (
        <div className="ml-64 p-6 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-red-500">{error}</div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow transform transition hover:scale-105">
                            <h2 className="text-lg font-semibold">Total Orders</h2>
                            <p className="text-3xl">{metrics?.totalOrders || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow transform transition hover:scale-105">
                            <h2 className="text-lg font-semibold">Pending Orders</h2>
                            <p className="text-3xl">{metrics?.pendingOrders || 0}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow transform transition hover:scale-105">
                            <h2 className="text-lg font-semibold">Total Sales</h2>
                            <p className="text-3xl">${metrics?.totalSales.toFixed(2) || '0.00'}</p>
                        </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                        <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold mb-4">Pending Orders</h2>
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
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-2 text-center">No pending orders</td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr key={order.id} className="border-b">
                                                <td className="p-2">{order.id}</td>
                                                <td className="p-2">{order.tableNumber}</td>
                                                <td className="p-2">{order.status}</td>
                                                <td className="p-2">${order.totalAmount.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;