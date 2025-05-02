
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { toast } from "sonner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would authenticate with your backend
    console.log("Login attempted:", formData);
    toast.success("Login successful!");
    // Redirect to dashboard or home
  };

  const handleReset = () => {
    toast.info("Password reset link sent to your email");
  };

  return (
    <AuthLayout>
      <div className="text-center text-gray-400 mb-2">Welcome</div>
      <h1 className="auth-title">Login to SupaMenu</h1>
      <p className="text-center text-gray-400 mb-6">Enter your email and password below</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-500 mb-1">
            EMAIL
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className="supamenu-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm text-gray-500">
              PASSWORD
            </label>
            <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-supamenu-orange">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="w-full supamenu-button">
          Log in
        </button>

        <div className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-supamenu-orange hover:underline">
            Sign up
          </Link>
        </div>

        <div className="text-center text-xs text-gray-400">
          <span>Forgot your password/login? </span>
          <button 
            type="button"
            onClick={handleReset}
            className="text-blue-500 hover:underline"
          >
            RESET
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
