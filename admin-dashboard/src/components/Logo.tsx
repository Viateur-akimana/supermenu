import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  variant?: "sidebar" | "auth";
}

const Logo = ({ className, variant = "auth" }: LogoProps) => {
  const textColor = variant === "sidebar" ? "text-supamenu-orange" : "text-supamenu-black";

  return (
    <Link to="/" className={`text-3xl font-bold ${className || ""}`}>
      <span className={textColor}>Supa</span>
      <span className="text-supamenu-white">Menu</span>
    </Link>
  );
};

export default Logo;