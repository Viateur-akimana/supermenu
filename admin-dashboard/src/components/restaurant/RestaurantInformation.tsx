
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RestaurantInformationProps {
  restaurantData: {
    name: string;
    location: string;
    completeName: string;
    contactNumber: string;
    ownerName: string;
    ownerEmail: string;
    ownerPhone: string;
  };
  updateRestaurantData: (data: any) => void;
  onNext: () => void;
}

const RestaurantInformation = ({
  restaurantData,
  updateRestaurantData,
  onNext
}: RestaurantInformationProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    updateRestaurantData({ [id]: value });


    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!restaurantData.name.trim()) {
      newErrors.name = "Restaurant name is required";
    }


    if (!restaurantData.completeName.trim()) {
      newErrors.completeName = "Restaurant complete name is required";
    }
    if (!restaurantData.location.trim()) {
      newErrors.name = "Restaurant location is required";
    }
    if (!restaurantData.contactNumber.trim()) {
      newErrors.contactNumber = "Contact number is required";
    }

    if (!restaurantData.ownerName.trim()) {
      newErrors.ownerName = "Owner name is required";
    }

    if (!restaurantData.ownerEmail.trim()) {
      newErrors.ownerEmail = "Owner email is required";
    } else if (!/\S+@\S+\.\S+/.test(restaurantData.ownerEmail)) {
      newErrors.ownerEmail = "Please enter a valid email address";
    }

    if (!restaurantData.ownerPhone.trim()) {
      newErrors.ownerPhone = "Owner phone is required";
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
      <h2 className="text-xl font-semibold mb-6">Restaurant Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Input
            id="name"
            placeholder="Restaurant Name"
            value={restaurantData.name}
            onChange={handleChange}
            className={`${errors.name ? "border-red-500" : ""}`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <Input
            id="completeName"
            placeholder="Restaurant Complete Name"
            value={restaurantData.completeName}
            onChange={handleChange}
            className={`${errors.completeName ? "border-red-500" : ""}`}
          />
          {errors.completeName && <p className="text-sm text-red-500 mt-1">{errors.completeName}</p>}
        </div>
        <div>
          <Input
            id="location"
            placeholder="Restaurant Location"
            value={restaurantData.location}
            onChange={handleChange}
            className={`${errors.location ? "border-red-500" : ""}`}
          />
          {errors.location && <p className="text-sm text-red-500 mt-1">{errors.location}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Contacts number @ Restaurant</label>
          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              +250
            </span>
            <Input
              id="contactNumber"
              placeholder="Mobile number"
              value={restaurantData.contactNumber}
              onChange={handleChange}
              className={`rounded-l-none ${errors.contactNumber ? "border-red-500" : ""}`}
            />
          </div>
          {errors.contactNumber && <p className="text-sm text-red-500 mt-1">{errors.contactNumber}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-4">Restaurant owner details</label>

          <div className="flex">
            <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md text-gray-500">
              +250
            </span>
            <Input
              id="ownerPhone"
              placeholder="Mobile number"
              value={restaurantData.ownerPhone}
              onChange={handleChange}
              className={`rounded-l-none ${errors.ownerPhone ? "border-red-500" : ""}`}
            />
          </div>
          {errors.ownerPhone && <p className="text-sm text-red-500 mt-1">{errors.ownerPhone}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Input
                id="ownerName"
                placeholder="Owner Name"
                value={restaurantData.ownerName}
                onChange={handleChange}
                className={`${errors.ownerName ? "border-red-500" : ""}`}
              />
              {errors.ownerName && <p className="text-sm text-red-500 mt-1">{errors.ownerName}</p>}
            </div>

            <div>
              <Input
                id="ownerEmail"
                type="email"
                placeholder="Restaurant Owner Email"
                value={restaurantData.ownerEmail}
                onChange={handleChange}
                className={`${errors.ownerEmail ? "border-red-500" : ""}`}
              />
              {errors.ownerEmail && <p className="text-sm text-red-500 mt-1">{errors.ownerEmail}</p>}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="bg-supamenu-orange hover:bg-supamenu-orange/90">
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantInformation;
