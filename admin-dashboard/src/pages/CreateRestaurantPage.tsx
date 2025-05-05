import { useEffect, useState } from "react";
import Logo from "../components/Logo";
import { Search, Bell, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import RestaurantInformation from "../components/restaurant/RestaurantInformation";
import RestaurantTypeTimings from "../components/restaurant/RestaurantTypeTimings";
import CreateMenu from "../components/restaurant/CreateMenu";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { createRestaurantStart, createRestaurantSuccess, createRestaurantFailure, clearError } from "@/redux/slices/restaurantSlice";
import { createRestaurant } from "@/api/services/restaurantService";
import { RootState } from "@/redux/store";
import { jwtDecode } from 'jwt-decode';

enum MenuCategory {
  DRINK = "DRINK",
  STARTER = "STARTER",
  APPETIZER = "APPETIZER",
  DESSERT = "DESSERT",
  MAIN = "MAIN",
}

enum RestaurantType {
  RESTAURANT = "RESTAURANT",
  PUB = "PUB",
  HOTEL = "HOTEL",
  COFFEE_SHOP = "COFFEE_SHOP",
  OTHER = "OTHER",
}

enum RestaurantCuisineType {
  AFRICAN = "AFRICAN",
  EUROPEAN = "EUROPEAN",
  ASIAN = "ASIAN",
  MEDITERRANEAN = "MEDITERRANEAN",
  MIDDLE_EASTERN = "MIDDLE_EASTERN",
  OTHER = "OTHER",
}

interface OpeningHours {
  from: string;
  to: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: MenuCategory;
  image?: File;
}

interface RestaurantData {
  name: string;
  location: string;
  contactNumber: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  restaurantType: RestaurantType;
  cuisineType: RestaurantCuisineType;
  openingHours: OpeningHours;
  images: File[];
  menuItems: MenuItem[];
}

interface JwtPayload {
  exp: number;
}

const CreateRestaurantPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [restaurantData, setRestaurantData] = useState<RestaurantData>({
    name: "",
    location: "",
    contactNumber: "",
    ownerName: "",
    ownerEmail: "",
    ownerPhone: "",
    restaurantType: RestaurantType.RESTAURANT,
    cuisineType: RestaurantCuisineType.AFRICAN,
    openingHours: {
      from: "14:00",
      to: "02:00",
    },
    images: [],
    menuItems: [],
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.restaurant);
  const { token } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!token) {
      toast.error("Please login first");
      localStorage.removeItem('accessToken');
      navigate("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem('accessToken');
        dispatch({ type: 'auth/logout' });
        navigate("/login");
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error("Invalid token. Please login again.");
      localStorage.removeItem('accessToken');
      dispatch({ type: 'auth/logout' });
      navigate("/login");
    }

    // Ensure HTTPS
    if (window.location.protocol !== 'https:') {
      console.warn('This page is served over HTTP, which is insecure.');
      toast.error('Insecure connection detected. Please use HTTPS.');
    }
  }, [token, navigate, dispatch]);

  const updateRestaurantData = (data: Partial<RestaurantData>) => {
    setRestaurantData((prev) => ({ ...prev, ...data }));
    if (error) {
      dispatch(clearError());
    }
  };

  const validateStep = (): boolean => {
    if (currentStep === 1) {
      if (!restaurantData.name.trim() || !restaurantData.location.trim() || !restaurantData.contactNumber.trim() ||
        !restaurantData.ownerName.trim() || !restaurantData.ownerEmail.trim() || !restaurantData.ownerPhone.trim()) {
        toast.error("All fields in Restaurant Information are required");
        return false;
      }
      if (restaurantData.location.length < 5 || restaurantData.location.length > 20) {
        toast.error("Location must be between 5 and 20 characters");
        return false;
      }
      if (!restaurantData.ownerName.trim() || restaurantData.ownerName.length < 3 || restaurantData.ownerName.length > 50) {
        toast.error("Owner name must be between 3 and 50 characters");
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(restaurantData.ownerEmail)) {
        toast.error("Invalid email format");
        return false;
      }
      const phoneRegex = /^(?:\+250|0)?[7-9][0-9]{8}$/;
      if (!phoneRegex.test(restaurantData.contactNumber) || !phoneRegex.test(restaurantData.ownerPhone)) {
        toast.error("Invalid Rwandan phone number format");
        return false;
      }
    }
    if (currentStep === 2) {
      if (!restaurantData.restaurantType || !restaurantData.cuisineType || !restaurantData.openingHours.from || !restaurantData.openingHours.to) {
        toast.error("All fields in Restaurant Type & Timings are required");
        return false;
      }
    }
    return true;
  };

  const goToNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
      if (error) {
        dispatch(clearError());
      }
    }
  };

  const goToPrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    if (error) {
      dispatch(clearError());
    }
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    if (!token) {
      toast.error("No access token found. Please login again.");
      localStorage.removeItem('accessToken');
      dispatch({ type: 'auth/logout' });
      navigate("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);
      if (decoded.exp < currentTime) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem('accessToken');
        dispatch({ type: 'auth/logout' });
        navigate("/login");
        return;
      }
    } catch (error) {
      console.error('Error decoding token:', error);
      toast.error("Invalid token. Please login again.");
      localStorage.removeItem('accessToken');
      dispatch({ type: 'auth/logout' });
      navigate("/login");
      return;
    }

    dispatch(createRestaurantStart());
    try {
      console.log('Submitting restaurant data:', restaurantData);
      const response = await createRestaurant(restaurantData);
      console.log('Navigating to /restaurant-dashboard');
      dispatch(createRestaurantSuccess(response));
      toast.success("Restaurant created successfully");
      navigate("/restaurant-dashboard");
    } catch (error: any) {
      console.error('Error creating restaurant:', error.response || error.message);
      const errorMessage = error.message || "Failed to create restaurant";
      const errorDetails = error.response?.data || {};
      dispatch(createRestaurantFailure(errorMessage));
      toast.error(`${errorMessage}${Object.keys(errorDetails).length ? `: ${JSON.stringify(errorDetails)}` : ''}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-black py-4 px-6 flex justify-between items-center">
        <Link to="/">
          <Logo variant="sidebar" />
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
              className={`flex items-start mb-4 ${currentStep === 1 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 1 ? "bg-supamenu-orange text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <div>
                <h3 className="font-medium">Restaurant Information</h3>
                <p className="text-sm text-gray-500">Restaurant name, address, Details, owner details</p>
              </div>
            </div>

            <div
              className={`flex items-start mb-4 ${currentStep === 2 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 2 ? "bg-supamenu-orange text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <div>
                <h3 className="font-medium">Restaurant Type & Timings</h3>
                <p className="text-sm text-gray-500">Establishment & cuisine type, opening hours</p>
              </div>
            </div>

            <div
              className={`flex items-start ${currentStep === 3 ? "border-l-4 border-supamenu-orange pl-4" : "pl-[20px]"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 ${currentStep === 3 ? "bg-supamenu-orange text-white" : "bg-gray-200"}`}
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