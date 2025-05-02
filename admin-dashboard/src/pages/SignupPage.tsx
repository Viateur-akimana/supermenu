
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import PasswordInput from "../components/PasswordInput";
import { toast } from "sonner";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    natinalId: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created successfully!");
  };

  return (
    <AuthLayout>
      <h1 className="auth-title">Signup</h1>
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
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm text-gray-500 mb-1">
            NATIONAL ID
          </label>
          <input
            type="number"
            id="nationalId"
            placeholder="National Id"
            className="supamenu-input"
            value={formData.natinalId}
            onChange={handleChange}
            required
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

        <button type="submit" className="w-full supamenu-button">
          Sign up
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
