import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchMenuFailure, fetchMenuStart, fetchMenuSuccess } from "@/redux/slices/menuSlice";
import { fetchMenuItems } from "@/api/services/menuService";
import { useDispatch, useSelector } from "react-redux";

type MenuCategory = "Drink" | "Starter" | "Appetizer" | "Dessert" | "Main";

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string; // Optional if the backend doesn't provide an image
  category: MenuCategory;
}

const MenuContent = () => {
  const dispatch = useDispatch();
  // const menuItemsFromStore = useSelector((state: any) => state.menu.menuItems);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("Drink");
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [restaurantId] = useState<string>("9b9c2111-ae7b-4207-b1be-5d2d52fdb91d"); // Replace with dynamic restaurant ID if needed

  useEffect(() => {
    const loadMenuItems = async () => {
      dispatch(fetchMenuStart());
      try {
        const data = await fetchMenuItems("restaurantId", "category");
        dispatch(fetchMenuSuccess(data));
      } catch (err: any) {
        dispatch(fetchMenuFailure(err.message));
      }
    };

    loadMenuItems();
  }, [dispatch]);

  const categories: MenuCategory[] = ["Drink", "Starter", "Appetizer", "Dessert", "Main"];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-0">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Menus</CardTitle>
            <p className="text-xs text-gray-500">as of {new Date().toLocaleString()}</p>
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
          {loading ? (
            <p>Loading menu items...</p>
          ) : menuItems.length === 0 ? (
            <p>No menu items found for the selected category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="space-y-4 pr-4">
                {menuItems.map((item) => (
                  <div key={item.id} className="flex bg-gray-50 rounded-lg p-4">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="mb-1">
                        <p className="text-xs text-gray-500">{item.description}</p>
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-supamenu-orange">Frw {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MenuContent;
