
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MenuCategory = "Drink" | "Starter" | "Appetizer" | "Dessert" | "Main";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  category: MenuCategory;
}

const MenuContent = () => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Drink");

  // Sample menu items
  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Tom Yummy",
      price: "5,000",
      description: "Kaffy, Lime Vodka, Lemongrass, Ginger, Citrus",
      image: "/lovable-uploads/50e3e6bb-dba6-4251-ba7d-8d8e34135c32.png",
      category: "Drink"
    },
    {
      id: "2",
      name: "Singapore Sling",
      price: "5,000",
      description: "Gin, Grenadine, Citrus, Cucumber",
      image: "/lovable-uploads/aac27d61-1ef8-4503-bde2-abc62d90dc76.png",
      category: "Drink"
    },
    {
      id: "3",
      name: "Singapore Sling",
      price: "5,000",
      description: "Gin, Grenadine, Citrus, Cucumber",
      image: "/lovable-uploads/aac27d61-1ef8-4503-bde2-abc62d90dc76.png",
      category: "Drink"
    },
    {
      id: "4",
      name: "Singapore Sling",
      price: "5,000",
      description: "Gin, Grenadine, Citrus, Cucumber",
      image: "/lovable-uploads/aac27d61-1ef8-4503-bde2-abc62d90dc76.png",
      category: "Drink"
    },
    {
      id: "5",
      name: "Tom Yummy",
      price: "5,000",
      description: "Kaffy, Lime Vodka, Lemongrass, Ginger, Citrus",
      image: "/lovable-uploads/50e3e6bb-dba6-4251-ba7d-8d8e34135c32.png",
      category: "Drink"
    }
  ];

  const categories: MenuCategory[] = ["Drink", "Starter", "Appetizer", "Dessert", "Main"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Menus</CardTitle>
            <p className="text-xs text-gray-500">as of 25 May 2022, 09:41 PM</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-6 py-3 rounded-full ${activeCategory === category
                    ? "bg-supamenu-orange text-white"
                    : "bg-white border border-supamenu-orange text-supamenu-orange"
                  }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="space-y-4 pr-4">
              {menuItems
                .filter((item) => item.category === activeCategory)
                .map((item) => (
                  <div key={item.id} className="flex bg-gray-50 rounded-lg p-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="mb-1">
                        <p className="text-xs text-gray-500">{item.description}</p>
                        <h3 className="font-medium">{item.name} · 12.5</h3>
                      </div>
                      <p className="text-supamenu-orange">Frw {item.price}</p>
                    </div>
                  </div>
                ))}

              <div className="flex justify-end">
                <button className="flex items-center text-supamenu-orange">
                  <span className="mr-1">more</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="border-l pl-6">
              <h3 className="text-xl font-medium mb-6">Add Item</h3>

              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-500">Create new menu item</p>
                <button className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">+</button>
              </div>

              <div className="space-y-4 mt-8">
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                  <span>Dessert</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                  <span>Main</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-supamenu-orange border border-supamenu-orange flex items-center justify-center text-white">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span>Drink</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                  <span>Appetizer</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full border border-gray-300"></span>
                  <span>Starter</span>
                </div>
              </div>

            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuContent;
