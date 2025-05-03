import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

enum MenuCategory {
  DRINK = "DRINK",
  STARTER = "STARTER",
  APPETIZER = "APPETIZER",
  DESSERT = "DESSERT",
  MAIN = "MAIN",
}

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: MenuCategory;
  image?: File;
}

interface CreateMenuProps {
  restaurantData: {
    menuItems: MenuItem[];
    images: File[];
  };
  updateRestaurantData: (data: Partial<{ menuItems: MenuItem[]; images: File[] }>) => void;
  onBack: () => void;
  onSubmit: () => void;
  loading: boolean;
}

const CreateMenu = ({
  restaurantData,
  updateRestaurantData,
  onBack,
  onSubmit,
  loading,
}: CreateMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>(MenuCategory.DRINK);
  const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
    id: "",
    name: "",
    price: "",
    description: "",
    category: MenuCategory.DRINK,
    image: undefined,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof MenuItem, string>>>({});

  const categories = Object.values(MenuCategory);

  useEffect(() => {
    setNewMenuItem((prev) => ({ ...prev, category: activeCategory }));
  }, [activeCategory]);

  const handleCategoryChange = (category: string) => {
    const validCategory = Object.values(MenuCategory).includes(category as MenuCategory)
      ? (category as MenuCategory)
      : MenuCategory.DRINK;
    setActiveCategory(validCategory);
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: undefined }));
    }
  };

  const handleMenuItemChange = (field: keyof MenuItem, value: string) => {
    setNewMenuItem((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should not exceed 5MB");
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }
      setNewMenuItem((prev) => ({ ...prev, image: file }));
      if (errors.image) {
        setErrors((prev) => ({ ...prev, image: undefined }));
      }
    }
  };

  const validateMenuItem = (): boolean => {
    const newErrors: Partial<Record<keyof MenuItem, string>> = {};

    if (!newMenuItem.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!newMenuItem.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!newMenuItem.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(newMenuItem.price)) || Number(newMenuItem.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!Object.values(MenuCategory).includes(newMenuItem.category)) {
      newErrors.category = "Invalid category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addMenuItem = () => {
    if (!validateMenuItem()) {
      return;
    }

    const menuItem: MenuItem = {
      ...newMenuItem,
      id: Date.now().toString(),
      price: Number(newMenuItem.price).toFixed(2),
    };

    updateRestaurantData({
      menuItems: [...restaurantData.menuItems, menuItem],
    });

    setNewMenuItem({
      id: "",
      name: "",
      price: "",
      description: "",
      category: activeCategory,
      image: undefined,
    });

    toast.success("Menu item added successfully");
  };

  const removeMenuItem = (id: string) => {
    updateRestaurantData({
      menuItems: restaurantData.menuItems.filter((item) => item.id !== id),
    });
    toast.success("Menu item removed successfully");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (restaurantData.menuItems.length === 0) {
      toast.error("At least one menu item is required");
      return;
    }

    onSubmit();
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold mb-4">Create Your Menu</h2>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-4 py-2 rounded-md transition-colors ${activeCategory === category
              ? "bg-supamenu-orange text-white"
              : "bg-white text-gray-500 hover:bg-gray-100 border border-gray-200"
              }`}
            disabled={loading}
          >
            {category}
          </button>
        ))}
      </div>

      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <Input
            placeholder="Menu Item Name"
            value={newMenuItem.name}
            onChange={(e) => handleMenuItemChange("name", e.target.value)}
            disabled={loading}
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price (RWF)</label>
          <Input
            type="number"
            step="0.01"
            placeholder="Enter price in RWF"
            value={newMenuItem.price}
            onChange={(e) => handleMenuItemChange("price", e.target.value)}
            disabled={loading}
            className={errors.price ? "border-red-500" : ""}
          />
          {errors.price && <p className="text-sm text-red-500 mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <Select value={newMenuItem.category} onValueChange={handleCategoryChange} disabled={loading}>
            <SelectTrigger className={errors.category ? "border-red-500" : ""}>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            placeholder="Describe the menu item (e.g., ingredients, preparation)"
            value={newMenuItem.description}
            onChange={(e) => handleMenuItemChange("description", e.target.value)}
            className="min-h-[100px]"
            disabled={loading}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="menu-image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={loading}
            />
            <label
              htmlFor="menu-image-upload"
              className={`cursor-pointer flex flex-col items-center justify-center ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Upload size={36} className="text-gray-400 mb-2" />
              <span className="text-gray-600">Upload Image</span>
              <span className="text-sm text-gray-400 mt-1">Max 5MB, image files only</span>
            </label>
          </div>
          {newMenuItem.image && (
            <div className="mt-2 flex items-center gap-2">
              <div className="w-20 h-20 rounded-md bg-gray-100 relative overflow-hidden">
                <img
                  src={URL.createObjectURL(newMenuItem.image)}
                  alt="Menu item preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setNewMenuItem((prev) => ({ ...prev, image: undefined }))}
                disabled={loading}
              >
                Remove
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={addMenuItem}
            className="flex items-center gap-2"
            disabled={loading}
          >
            <span>Add Item</span>
            <Plus size={16} />
          </Button>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={onBack} disabled={loading}>
              Back
            </Button>
            <Button
              type="submit"
              className="bg-supamenu-orange hover:bg-supamenu-orange/90"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </form>

      {restaurantData.menuItems.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Added Menu Items ({restaurantData.menuItems.length})</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restaurantData.menuItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg p-4 flex items-start relative"
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
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.name}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeMenuItem(item.id)}
                      disabled={loading}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-gray-100 text-xs rounded-full">
                    {item.category}
                  </span>
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