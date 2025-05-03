
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Upload } from "lucide-react";

interface RestaurantTypeTimingsProps {
  restaurantData: {
    restaurantType: string;
    cuisineType: string;
    openingHours: {
      from: string;
      to: string;
    };
    images: File[];
  };
  updateRestaurantData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
}

const RestaurantTypeTimings = ({
  restaurantData,
  updateRestaurantData,
  onNext,
  onBack
}: RestaurantTypeTimingsProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Restaurant types and cuisine types
  const restaurantTypes = ["RESTAURANT", "PUB", "HOTEL", "COFFEE_SHOP", "OTHER"];
  const cuisineTypes = ["AFRICAN", "EUROPEAN", "ASIAN", "MEDITERRANEAN", "MIDDLE_EASTERN", "OTHER"];

  const handleTypeChange = (value: string) => {
    updateRestaurantData({ restaurantType: value });
    if (errors.restaurantType) {
      setErrors(prev => ({ ...prev, restaurantType: "" }));
    }
  };

  const handleCuisineChange = (value: string) => {
    updateRestaurantData({ cuisineType: value });
    if (errors.cuisineType) {
      setErrors(prev => ({ ...prev, cuisineType: "" }));
    }
  };

  const handleTimeChange = (field: 'from' | 'to', value: string) => {
    updateRestaurantData({
      openingHours: {
        ...restaurantData.openingHours,
        [field]: value
      }
    });

    if (errors[`time_${field}`]) {
      setErrors(prev => ({ ...prev, [`time_${field}`]: "" }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files);
      updateRestaurantData({
        images: [...restaurantData.images, ...newImages]
      });

      if (errors.images) {
        setErrors(prev => ({ ...prev, images: "" }));
      }
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!restaurantData.restaurantType) {
      newErrors.restaurantType = "Please select a restaurant type";
    }

    if (!restaurantData.cuisineType) {
      newErrors.cuisineType = "Please select a cuisine type";
    }

    if (!restaurantData.openingHours.from) {
      newErrors.time_from = "Please enter opening time";
    }

    if (!restaurantData.openingHours.to) {
      newErrors.time_to = "Please enter closing time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Restaurant Type (restaurant, pub, hotel, coffeeshop, other)</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Select value={restaurantData.restaurantType} onValueChange={handleTypeChange}>
            <SelectTrigger className={errors.restaurantType ? "border-red-500" : ""}>
              <SelectValue placeholder="Restaurant" />
            </SelectTrigger>
            <SelectContent>
              {restaurantTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.restaurantType && <p className="text-sm text-red-500 mt-1">{errors.restaurantType}</p>}
        </div>

        <div>
          <Select value={restaurantData.cuisineType} onValueChange={handleCuisineChange}>
            <SelectTrigger className={errors.cuisineType ? "border-red-500" : ""}>
              <SelectValue placeholder="African" />
            </SelectTrigger>
            <SelectContent>
              {cuisineTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.cuisineType && <p className="text-sm text-red-500 mt-1">{errors.cuisineType}</p>}
        </div>

        <div>
          <h3 className="text-base font-medium mb-3">Opening Hours</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">From</label>
              <Input
                type="time"
                value={restaurantData.openingHours.from}
                onChange={(e) => handleTimeChange('from', e.target.value)}
                className={errors.time_from ? "border-red-500" : ""}
              />
              {errors.time_from && <p className="text-sm text-red-500 mt-1">{errors.time_from}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-500 mb-1">To</label>
              <Input
                type="time"
                value={restaurantData.openingHours.to}
                onChange={(e) => handleTimeChange('to', e.target.value)}
                className={errors.time_to ? "border-red-500" : ""}
              />
              {errors.time_to && <p className="text-sm text-red-500 mt-1">{errors.time_to}</p>}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-base font-medium mb-3">Upload Images (pictures or logo)</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center justify-center"
            >
              <Upload size={36} className="text-gray-400 mb-2" />
              <span className="text-gray-600">Choose Images</span>
              <span className="text-sm text-gray-400 mt-1">
                Click to browse files
              </span>
            </label>
          </div>

          {restaurantData.images.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Selected Images: {restaurantData.images.length}</p>
              <div className="flex flex-wrap gap-2">
                {restaurantData.images.map((file, index) => (
                  <div
                    key={index}
                    className="w-16 h-16 rounded-md bg-gray-100 relative overflow-hidden"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            Back
          </Button>
          <Button type="submit" className="bg-supamenu-orange hover:bg-supamenu-orange/90">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantTypeTimings;
