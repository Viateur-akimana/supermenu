import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { MenuItem } from "../../pages/CreateRestaurantPage";

interface CreateMenuProps {
  restaurantData: {
    menuItems: MenuItem[];
  };
  updateRestaurantData: (data: any) => void;
  onBack: () => void;
}

const CreateMenu = ({
  restaurantData,
  updateRestaurantData,
  onBack
}: CreateMenuProps) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>("Drink");
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: "",
    description: "",
    category: activeCategory,
    image: undefined
  });
  
  // Categories for menu items
  const categories = ["Drink", "Starter", "Appetizer", "Dessert", "Main"];
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setNewMenuItem(prev => ({ ...prev, category }));
  };
  
  const handleMenuItemChange = (field: keyof MenuItem, value: string) => {
    setNewMenuItem(prev => ({ ...prev, [field]: value }));
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setNewMenuItem(prev => ({
        ...prev,
        image: e.target.files![0]
      }));
    }
  };
  
  const addMenuItem = () => {
    // Validate required fields
    if (!newMenuItem.name.trim() || !newMenuItem.price.trim()) {
      toast.error("Please enter name and price");
      return;
    }
    
    // Add new menu item
    const menuItem = {
      ...newMenuItem,
      id: Date.now().toString() // Generate a simple ID
    };
    
    updateRestaurantData({
      menuItems: [...restaurantData.menuItems, menuItem]
    });
    
    // Reset form
    setNewMenuItem({
      id: "",
      name: "",
      price: "",
      description: "",
      category: activeCategory,
      image: undefined
    });
    
    toast.success("Menu item added");
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if we have at least one menu item
    if (restaurantData.menuItems.length === 0) {
      toast.error("Please add at least one menu item");
      return;
    }
    
    // Here you would typically submit the form to your backend
    toast.success("Restaurant profile created successfully!");
    
    // Navigate to the dashboard after successfully creating the restaurant
    setTimeout(() => {
      navigate("/restaurant-dashboard");
    }, 1000);
  };
  
  return (
    <div>
      <div className="flex space-x-2 mb-6">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md ${
              activeCategory === category 
                ? "bg-supamenu-orange text-white" 
                : "bg-white text-gray-500 hover:bg-gray-100"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            placeholder="Menu Name"
            value={newMenuItem.name}
            onChange={(e) => handleMenuItemChange("name", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <Input
            placeholder="RWF"
            value={newMenuItem.price}
            onChange={(e) => handleMenuItemChange("price", e.target.value)}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Menu description</label>
          <Textarea
            placeholder="Ingredients"
            value={newMenuItem.description}
            onChange={(e) => handleMenuItemChange("description", e.target.value)}
            className="min-h-[100px]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Image</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="menu-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
            <label
              htmlFor="menu-image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload size={36} className="text-gray-400 mb-2" />
              <span className="text-gray-600">Upload Image</span>
            </label>
          </div>
          
          {newMenuItem.image && (
            <div className="mt-2">
              <p className="text-sm font-medium mb-2">Selected Image:</p>
              <div className="w-20 h-20 rounded-md bg-gray-100 relative overflow-hidden">
                <img 
                  src={URL.createObjectURL(newMenuItem.image)}
                  alt="Menu item preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button 
            type="button" 
            variant="outline" 
            onClick={addMenuItem}
            className="flex items-center gap-2"
          >
            <span>Add more</span>
            <Plus size={16} />
          </Button>
          
          <div className="flex gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              Back
            </Button>
            
            <Button type="submit" className="bg-supamenu-orange hover:bg-supamenu-orange/90">
              Submit
            </Button>
          </div>
        </div>
      </form>
      
      {/* Display added menu items */}
      {restaurantData.menuItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Added Menu Items</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restaurantData.menuItems.map((item) => (
              <div 
                key={item.id} 
                className="border border-gray-200 rounded-lg p-4 flex items-start"
              >
                {item.image && (
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4 flex-shrink-0">
                    <img 
                      src={URL.createObjectURL(item.image)}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{item.name}</span>
                    <span className="ml-2 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-supamenu-orange mt-1">
                    RWF {item.price}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMenu;
