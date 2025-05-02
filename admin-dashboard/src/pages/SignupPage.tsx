import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { toast } from "sonner";
import { RootState } from "@/redux/store";
import { signupFailure, signupStart, signupSuccess } from "@/redux/slices/authSlice";
import { signup } from "@/api/services/authService";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    nationalId: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(signupStart());
    try {
      const response = await signup(formData);
      dispatch(signupSuccess(response.user));
      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Signup failed";
      dispatch(signupFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Signup</h1>
      {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="firstName" className="block text-sm text-gray-500 mb-1">
            FIRST NAME
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            className="supamenu-input"
            value={formData.firstName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="lastName" className="block text-sm text-gray-500 mb-1">
            LAST NAME
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            className="supamenu-input"
            value={formData.lastName}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-gray-500 mb-1">
            PHONE
          </label>
          <input
            type="text"
            id="phone"
            placeholder="Phone number"
            className="supamenu-input"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        <div>
          <label htmlFor="nationalId" className="block text-sm text-gray-500 mb-1">
            NATIONAL ID
          </label>
          <input
            type="text"
            id="nationalId"
            placeholder="National Id"
            className="supamenu-input"
            value={formData.nationalId}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

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
          <label htmlFor="password" className="block text-sm text-gray-500 mb-1">
            PASSWORD
          </label>
          <PasswordInput
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="w-full supamenu-button" disabled={loading}>
          {loading ? "Signing up..." : "Sign up"}
        </button>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link to="/login" className="text-supamenu-orange hover:underline">
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;