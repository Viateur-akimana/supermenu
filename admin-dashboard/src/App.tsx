
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CreateRestaurantPage from "./pages/CreateRestaurantPage";
import RestaurantDashboardPage from "./pages/RestaurantDashboardPage";
import NotFound from "./pages/NotFound";
import OrdersContent from "./components/restaurant-dashboard/OrdersContent";
import HomePage from "./pages/Homepage";
import { useSelector } from "react-redux";
import { RootState } from "./redux/store";


const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  return token ? children : <Navigate to="/login" />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/create-restaurant"
            element={
              <PrivateRoute>
                <CreateRestaurantPage />
              </PrivateRoute>
            } />
          <Route
            path="/restaurant-dashboard"
            element={
              <PrivateRoute>
                <RestaurantDashboardPage />
              </PrivateRoute>
            } />
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <OrdersContent />
              </PrivateRoute>
            } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
