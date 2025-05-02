
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { Search, Bell, User } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black">
      <header className="bg-black py-4 px-6 flex justify-between items-center">
        <Logo />
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
      <div className="bg-black text-white py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Register your restaurant on SupaMenu
          </h1>
          <p className="text-lg mb-8">for free and get more revenue!</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/create-restaurant" className="supamenu-button">
              Register your Restaurant
            </Link>
            <Link to="/login" className="border border-white text-white py-3 px-6 rounded-md hover:bg-white hover:text-black transition-colors">
              Restaurant already registered? Signin
            </Link>
          </div>
        </div>
      </div>
      <section className="py-12 px-6 bg-gray-100">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">How it works</h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-supamenu-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-supamenu-orange" size={24} />
            </div>
            <h3 className="text-xl font-bold mb-2">Step 1</h3>
            <p className="text-gray-600">Register your restaurant</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-supamenu-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="text-supamenu-orange" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <path d="M14 2v6h6"></path>
                <path d="M16 13H8"></path>
                <path d="M16 17H8"></path>
                <path d="M10 9H8"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Step 2</h3>
            <p className="text-gray-600">Create your restaurant profile and create menu items</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="w-16 h-16 bg-supamenu-orange/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="text-supamenu-orange" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Step 3</h3>
            <p className="text-gray-600">Start receiving orders</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
