import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import api from "@/api/apiClient";
import { toast } from "sonner";

const OverviewContent = () => {
  const [restaurantCount, setRestaurantCount] = useState<number>(0);
  const [menuCount, setMenuCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [restaurantData, setRestaurantData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const chartData = [
    { time: 0, today: 20, week: 15, month: 25 },
    { time: 1, today: 25, week: 20, month: 30 },
    { time: 2, today: 30, week: 25, month: 20 },
    { time: 3, today: 35, week: 30, month: 15 },
    { time: 4, today: 25, week: 35, month: 25 },
    { time: 5, today: 30, week: 25, month: 35 },
    { time: 6, today: 40, week: 20, month: 30 },
    { time: 7, today: 35, week: 25, month: 25 },
    { time: 8, today: 25, week: 30, month: 35 },
    { time: 9, today: 30, week: 35, month: 30 },
    { time: 10, today: 40, week: 30, month: 25 },
    { time: 11, today: 35, week: 25, month: 35 },
    { time: 12, today: 30, week: 30, month: 40 },
    { time: 13, today: 40, week: 35, month: 30 },
    { time: 14, today: 45, week: 30, month: 25 },
    { time: 15, today: 35, week: 25, month: 35 },
    { time: 16, today: 30, week: 30, month: 40 },
    { time: 17, today: 35, week: 35, month: 35 },
    { time: 18, today: 45, week: 30, month: 30 },
    { time: 19, today: 40, week: 25, month: 35 },
    { time: 20, today: 35, week: 30, month: 40 },
    { time: 21, today: 30, week: 35, month: 35 },
    { time: 22, today: 25, week: 30, month: 30 },
  ];

  const [activeFilter, setActiveFilter] = useState("today");

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch restaurants
        const restaurantResponse = await api.get("/restaurants", {
          params: { page: 0, size: 100 }, // Adjust pagination as needed
        });
        const restaurants = restaurantResponse.data.data;
        setRestaurantCount(restaurants.length);
        setRestaurantData(restaurants);
        let totalMenus = 0;
        for (const restaurant of restaurants) {
          const menuResponse = await api.get(`/restaurants/${restaurant.id}/menu-items`, {
            params: { page: 0, size: 100 },
          });
          totalMenus += menuResponse.data.data.length;
        }
        setMenuCount(totalMenus);
        setOrderCount(0);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Restaurants</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-3xl font-bold">{restaurantCount}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Menus</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-3xl font-bold">{menuCount}</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading...</p>
            ) : (
              <p className="text-3xl font-bold">{orderCount}</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's trends</CardTitle>
              <p className="text-sm text-gray-500">As of {new Date().toLocaleString()}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="time" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="today"
                stroke="#FF9800"
                strokeWidth={3}
                dot={false}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="week"
                stroke="#e5e5e5"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <p>Loading stats...</p>
        ) : (
          restaurantData.map((restaurant) => (
            <Card key={restaurant.id}>
              <CardHeader className="pb-2 flex justify-between items-center">
                <CardTitle>{restaurant.name}</CardTitle>
                <a href="#" className="text-sm text-supamenu-orange">View details</a>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500 mb-2">Location: {restaurant.location}</p>
                <p className="text-xs text-gray-500 mb-2">Contact: {restaurant.contactNumber}</p>
                <p className="text-xs text-gray-500 mb-2">Cuisine: {restaurant.cuisineType}</p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <Card>
        <CardHeader className="pb-2 flex justify-between items-center">
          <CardTitle>Create</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-500">Today</p>
            <button className="flex items-center gap-2 text-gray-500">
              <span>Create new</span>
              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">+</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                <span>Restaurants</span>
              </div>
              <span className="px-3 py-1 bg-supamenu-orange text-white text-xs rounded-md">NEW</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                <span>Hotels</span>
              </div>
              <span className="px-3 py-1 bg-supamenu-orange text-white text-xs rounded-md">NEW</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-full bg-supamenu-orange border border-supamenu-orange flex items-center justify-center text-white">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>Pub</span>
              </div>
              <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-md">DEFAULT</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewContent;
