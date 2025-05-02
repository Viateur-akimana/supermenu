
import { ReactNode } from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="auth-form-container">
      <div className="flex w-full max-w-5xl">
        <div className="hidden md:flex md:w-1/2 items-center justify-center">
          <Logo className="text-5xl" />
        </div>
        <div className="w-full md:w-1/2">
          <div className="auth-form">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
