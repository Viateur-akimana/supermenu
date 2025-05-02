import { useEffect, useState } from "react";
import Sidebar from "../components/restaurant-dashboard/Sidebar";
import OverviewContent from "../components/restaurant-dashboard/OverviewContent";
import MenuContent from "../components/restaurant-dashboard/MenuContent";
import OrdersContent from "@/components/restaurant-dashboard/OrdersContent";
import { getDashboardData } from "@/api/services/dashboardService";
import { fetchDashboardDataStart, fetchDashboardDataSuccess, fetchDashboardDataFailure } from "@/redux/slices/restaurantSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

type ActiveSection = "overview" | "clients" | "users" | "orders" | "menu" | "settings" | "account";

const RestaurantDashboardPage = () => {
  const [activeSection, setActiveSection] = useState<ActiveSection>("overview");
  const dispatch = useDispatch();
  const { dashboardData, loading, error } = useSelector((state: RootState) => state.restaurant);

  useEffect(() => {
    dispatch(fetchDashboardDataStart());
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        dispatch(fetchDashboardDataSuccess(data));
      } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Failed to load dashboard data';
        dispatch(fetchDashboardDataFailure(errorMessage));
        toast.error(errorMessage);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      <div className="flex-1">
        <header className="bg-white h-16 px-6 flex items-center justify-between border-b">
          <h1 className="text-xl font-semibold">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)}
          </h1>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="search"
                placeholder="Search..."
                className="pl-8 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-1 focus:ring-supamenu-orange"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <div className="flex items-center">
              <span className="text-gray-700 mr-2">Jacques Kagabo</span>
              <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                <img
                  src="/avatar.jpg"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="p-6">
          {activeSection === "overview" && <OverviewContent />}
          {activeSection === "menu" && <MenuContent />}
          {activeSection == "orders" && <OrdersContent />}
          {activeSection === "settings" && <div>Settings Content</div>}
          {activeSection === "users" && <div>Users accounts</div>}
          {activeSection === "clients" && <div>Clients for my food services</div>}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboardPage;
