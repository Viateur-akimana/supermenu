import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Sidebar from './components/sidebar';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Router>
      <div className="flex">
        {token ? <Sidebar /> : null}
        <Routes>
          <Route
            path="/login"
            element={token ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={token ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/orders"
            element={token ? <Orders /> : <Navigate to="/login" />}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/" : "/login"} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;