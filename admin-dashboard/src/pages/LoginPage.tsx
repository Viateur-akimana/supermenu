import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { login } from "@/api/services/authService";
import { loginFailure, loginStart, loginSuccess } from "@/redux/slices/authSlice";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error, token } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      dispatch(loginFailure('Please enter both email and password'));
      toast.error('Please enter both email and password');
      return;
    }

    dispatch(loginStart());
    try {
      console.log('Attempting login with:', formData);
      const response = await login(formData);
      console.log('Login service response:', response);

      dispatch(loginSuccess({
        user: response.user,
        token: response.token
      }));

      localStorage.setItem("token", response.token);
      toast.success("Login successful!");
      navigate("/create-restaurant");
    } catch (error: any) {
      console.error('Login page error:', error);
      const errorMessage = error.message || "Login failed";
      dispatch(loginFailure(errorMessage));
      toast.error(errorMessage);
    }
  };


  const handleReset = () => {
    toast.info("Password reset link sent to your email");
  };

  return (
    <AuthLayout>
      <div className="text-center text-gray-400 mb-2">Welcome</div>
      <h1 className="auth-title">Login to SupaMenu</h1>
      <p className="text-center text-gray-400 mb-6">Enter your email and password below</p>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
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
            disabled={loading}
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

        <button type="submit" className="w-full supamenu-button" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
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
            disabled={loading}
          >
            RESET
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;