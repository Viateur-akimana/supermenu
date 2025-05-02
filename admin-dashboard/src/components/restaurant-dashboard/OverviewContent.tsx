
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const OverviewContent = () => {
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

  const restaurantData = [
    {
      name: "Restaurants",
      items: [
        { name: "Sole Luna", sales: "46000" },
        { name: "Soy", sales: "12000" },
      ],
    },
    {
      name: "Hotels",
      items: [
        { name: "Park Inn", sales: "4238" },
        { name: "M Hotel", sales: "1005" },
      ],
    },
    {
      name: "Pubs",
      items: [
        { name: "Sundowner", sales: "300" },
        { name: "Gate N10", sales: "150" },
      ],
    },
    {
      name: "Cafes",
      items: [
        { name: "Aroma", sales: "2238" },
        { name: "Patisserie Royale", sales: "500" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">60</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Revenues (FRW)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">38234000</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-normal text-gray-500">Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">67569</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Today's trends</CardTitle>
              <p className="text-sm text-gray-500">As of 25 May 2025, 09:41 PM</p>
            </div>
            <div className="flex space-x-4 text-sm">
              <button
                className={`flex items-center ${activeFilter === 'today' ? 'text-blue-500' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('today')}
              >
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Today
              </button>
              <button
                className={`flex items-center ${activeFilter === 'week' ? 'text-gray-400' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('week')}
              >
                <span className="w-3 h-3 rounded-full bg-gray-300 mr-2"></span>
                Week
              </button>
              <button
                className={`flex items-center ${activeFilter === 'month' ? 'text-red-500' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('month')}
              >
                <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                Month
              </button>
              <button
                className={`flex items-center ${activeFilter === 'year' ? 'text-green-500' : 'text-gray-500'}`}
                onClick={() => setActiveFilter('year')}
              >
                <span className="w-3 h-3 rounded-full bg-gray-200 mr-2"></span>
                Year
              </button>
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
        {restaurantData.map((category) => (
          <Card key={category.name}>
            <CardHeader className="pb-2 flex justify-between items-center">
              <CardTitle>{category.name}</CardTitle>
              <a href="#" className="text-sm text-supamenu-orange">View details</a>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-xs text-gray-500 mb-2">Sales</p>
              {category.items.map((item) => (
                <div key={item.name} className="flex justify-between items-center py-2">
                  <span>{item.name}</span>
                  <span className="text-gray-500">{item.sales}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Section */}
      <Card>
        <CardHeader className="pb-2 flex justify-between items-center">
          <CardTitle>Create</CardTitle>
          <a href="#" className="text-sm text-supamenu-orange">View all</a>
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
