import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

const Sidebar: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div className="w-64 bg-gray-800 text-white h-screen p-4 fixed">
            <h2 className="text-2xl font-bold mb-6">Supamenu Admin</h2>
            <nav className="space-y-2">
                <NavLink
                    to="/"
                    className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/orders"
                    className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Orders
                </NavLink>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Menu
                </NavLink>
                <NavLink
                    to="/users"
                    className={({ isActive }) => `block p-2 rounded ${isActive ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                >
                    Users
                </NavLink>
                <button
                    onClick={() => dispatch(logout())}
                    className="block w-full text-left p-2 rounded hover:bg-gray-700"
                >
                    Logout
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;