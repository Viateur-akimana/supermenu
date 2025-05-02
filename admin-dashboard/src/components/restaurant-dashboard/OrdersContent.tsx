
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Plus } from "lucide-react";

type Order = {
  id: number;
  items: {
    name: string;
    quantity: number;
  }[];
  table: number;
  status: "new" | "delivered" | "rejected";
  total: number;
  customer: {
    type: "Guest" | "Member";
    phone: string;
  };
};

// Mock data for orders
const mockOrders: Order[] = [
  {
    id: 1,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 1,
    status: "new",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 2,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 5,
    status: "new",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 3,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 8,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 4,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 8,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 5,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 6,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 7,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 8,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "delivered",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 9,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "new",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  },
  {
    id: 10,
    items: [{ name: "Kafir Lime Vodka, Lemongrass, Ginger, Citrus", quantity: 2 }],
    table: 9,
    status: "rejected",
    total: 5000,
    customer: { type: "Guest", phone: "0788123456" }
  }
];

const orderCategories = [
  { id: "dessert", name: "Dessert", isNew: true },
  { id: "main", name: "Main", isNew: true },
  { id: "drink", name: "Drink", isDefault: true },
  { id: "appetizer", name: "Appetizer", isNew: true },
  { id: "starter", name: "Starter", isNew: true }
];

const OrdersContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [showAddOrder, setShowAddOrder] = useState(false);

  const filteredOrders = mockOrders.filter(order => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return order.status === "new";
    if (activeTab === "delivered") return order.status === "delivered";
    if (activeTab === "rejected") return order.status === "rejected";
    return true;
  });

  // Count orders by status
  const newOrdersCount = mockOrders.filter(order => order.status === "new").length;
  const deliveredOrdersCount = mockOrders.filter(order => order.status === "delivered").length;
  const rejectedOrdersCount = mockOrders.filter(order => order.status === "rejected").length;
  const allOrdersCount = mockOrders.length;

  const toggleAddOrder = () => {
    setShowAddOrder(!showAddOrder);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Orders</h2>
          <p className="text-sm text-gray-500">As of 25 May 2025, 09:41 PM</p>
        </div>
        <div className="flex mt-4 md:mt-0">
          <button
            className="bg-supamenu-orange text-white px-4 py-2 rounded-md flex items-center space-x-2 shadow-sm hover:bg-opacity-90 transition-colors"
            onClick={toggleAddOrder}
          >
            <Plus size={18} />
            <span>Add Order</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-gray-100 p-1 rounded-md mb-6">
              <TabsTrigger value="new" className="data-[state=active]:bg-supamenu-orange data-[state=active]:text-white">
                New
              </TabsTrigger>
              <TabsTrigger value="delivered" className="data-[state=active]:bg-supamenu-orange data-[state=active]:text-white">
                Delivered
              </TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-supamenu-orange data-[state=active]:text-white">
                Rejected
              </TabsTrigger>
              <TabsTrigger value="all" className="data-[state=active]:bg-supamenu-orange data-[state=active]:text-white">
                All
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-supamenu-orange font-medium">Order #{order.id}</h3>
                        </div>
                        <div className="mt-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              <div>{item.name}</div>
                              <div className="font-medium">Tom Yummy × {item.quantity}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 flex gap-6">
                          <div>Table {order.table}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-supamenu-orange font-medium">Frw {order.total.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-400 flex flex-col items-end">
                          <div>{order.customer.type}</div>
                          <div>{order.customer.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="new" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-supamenu-orange font-medium">Order #{order.id}</h3>
                        </div>
                        <div className="mt-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              <div>{item.name}</div>
                              <div className="font-medium">Tom Yummy × {item.quantity}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 flex gap-6">
                          <div>Table {order.table}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-supamenu-orange font-medium">Frw {order.total.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-400 flex flex-col items-end">
                          <div>{order.customer.type}</div>
                          <div>{order.customer.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="delivered" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-supamenu-orange font-medium">Order #{order.id}</h3>
                        </div>
                        <div className="mt-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              <div>{item.name}</div>
                              <div className="font-medium">Tom Yummy × {item.quantity}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 flex gap-6">
                          <div>Table {order.table}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-supamenu-orange font-medium">Frw {order.total.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-400 flex flex-col items-end">
                          <div>{order.customer.type}</div>
                          <div>{order.customer.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rejected" className="mt-0">
              <div className="bg-white rounded-lg shadow-sm">
                {filteredOrders.map(order => (
                  <div key={order.id} className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-supamenu-orange font-medium">Order #{order.id}</h3>
                        </div>
                        <div className="mt-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="text-sm text-gray-600">
                              <div>{item.name}</div>
                              <div className="font-medium">Tom Yummy × {item.quantity}</div>
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-400 mt-2 flex gap-6">
                          <div>Table {order.table}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-supamenu-orange font-medium">Frw {order.total.toLocaleString()}</div>
                        <div className="mt-2 text-xs text-gray-400 flex flex-col items-end">
                          <div>{order.customer.type}</div>
                          <div>{order.customer.phone}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-center mb-4">
              <div className="text-gray-600 text-sm">Delivered</div>
              <div className="text-3xl font-semibold">{deliveredOrdersCount}</div>
            </div>
            <div className="text-center mb-4">
              <div className="text-gray-600 text-sm">Waiting</div>
              <div className="text-3xl font-semibold">{newOrdersCount}</div>
            </div>
            <div className="text-center mb-4">
              <div className="text-gray-600 text-sm">Rejected</div>
              <div className="text-3xl font-semibold">{rejectedOrdersCount}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-sm">All</div>
              <div className="text-3xl font-semibold">{allOrdersCount}</div>
            </div>
          </div>

          {showAddOrder && (
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-4">Add Order</h3>
              <p className="text-gray-500 text-xs mb-4">Manually</p>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Create new Order"
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 pr-10"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-100 rounded-md p-1">
                  <Plus size={18} />
                </button>
              </div>

              <div className="space-y-3">
                {orderCategories.map(category => (
                  <div key={category.id} className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category"
                        checked={category.isDefault}
                        className="accent-supamenu-orange"
                      />
                      <span className="text-gray-700">{category.name}</span>
                    </label>
                    {category.isNew && (
                      <span className="bg-supamenu-orange text-white text-xs px-2 py-0.5 rounded">NEW</span>
                    )}
                    {category.isDefault && (
                      <span className="bg-gray-200 text-gray-600 text-xs px-2 py-0.5 rounded">DEFAULT</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersContent;