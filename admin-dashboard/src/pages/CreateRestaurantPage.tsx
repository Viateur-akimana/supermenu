import { useState } from "react";
import Logo from "../components/Logo";
import { Search, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RestaurantInformation from "../components/restaurant/RestaurantInformation";
import RestaurantTypeTimings from "../components/restaurant/RestaurantTypeTimings";
import CreateMenu from "../components/restaurant/CreateMenu";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurantFailure, createRestaurantStart, createRestaurantSuccess } from "@/redux/slices/restaurantSlice";
import { createRestaurant } from "@/api/services/restaurantService";
import { RootState } from "@/redux/store";

interface RestaurantData {
  name: string;
  location: string;
  completeName: string;
  contactNumber: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  restaurantType: string;
  cuisineType: string;
  openingHours: {
    from: string;
    to: string;
  };
  images: File[];
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: string;
  image?: File;
}

const CreateRestaurantPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    name: "",
    location: "",
    completeName: "",
    contactNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    restaurantType: "",
    cuisineType: "",
    openingHours: {
      from: "14:00",
      to: "02:00",
    },
    images: [],
    menuItems: [],
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.restaurant);
  const navigate = useNavigate();

  const updateRestaurantData = (data: Partial<RestaurantData>) => {
    setRestaurantData((prev) => ({ ...prev, ...data }));
  };

  const goToNextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    dispatch(createRestaurantStart());
    try {
      const response = await createRestaurant(restaurantData);
      dispatch(createRestaurantSuccess(response.restaurant));
      toast.success("Restaurant created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Failed to create restaurant";
      dispatch(createRestaurantFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black py-4 px-6 flex justify-between items-center">
        <Link to="/">
          <Logo />
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-white hover:text-supamenu-orange">
            <Search size={20} />
          </button>
          <button className="text-white hover:text-supamenu-orange">
            <Bell size={20} />
          </button>
          <div className="flex items-center">
            <span className="text-white mr-2 hidden md:inline">Jacques Kagabo</span>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <User size={16} className="text-gray-600" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-grow p-6">
        <div className="w-full max-w-xs mr-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="font-semibold text-lg mb-4">1. Create your restaurant profile</h2>
            <div
              className={`flex items-start mb-4 ${currentStep === 1 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 1 ? "bg-supamenu-orange text-white" : "bg-gray-200"
                  }`}
              >
                1
              </div>
              <div>
                <h3 className="font-medium">Restaurant Information</h3>
                <p className="text-sm text-gray-500">Restaurant name, address, Details, owner details</p>
              </div>
            </div>

            <div
              className={`flex items-start mb-4 ${currentStep === 2 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 2 ? "bg-supamenu-orange text-white" : "bg-gray-200"
                  }`}
              >
                2
              </div>
              <div>
                <h3 className="font-medium">Restaurant Type & Timings</h3>
                <p className="text-sm text-gray-500">Establishment & cuisine type, opening hours</p>
              </div>
            </div>

            <div
              className={`flex items-start ${currentStep === 3 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"
                }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 3 ? "bg-supamenu-orange text-white" : "bg-gray-200"
                  }`}
              >
                3
              </div>
              <div>
                <h3 className="font-medium">Create your menu</h3>
                <p className="text-sm text-gray-500">Menu, restaurant, food images</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
            {currentStep === 1 && (
              <RestaurantInformation
                restaurantData={restaurantData}
                updateRestaurantData={updateRestaurantData}
                onNext={goToNextStep}
              />
            )}

            {currentStep === 2 && (
              <RestaurantTypeTimings
                restaurantData={restaurantData}
                updateRestaurantData={updateRestaurantData}
                onNext={goToNextStep}
                onBack={goToPrevStep}
              />
            )}

            {currentStep === 3 && (
              <CreateMenu
                restaurantData={restaurantData}
                updateRestaurantData={updateRestaurantData}
                onBack={goToPrevStep}
                onSubmit={handleSubmit}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRestaurantPage;