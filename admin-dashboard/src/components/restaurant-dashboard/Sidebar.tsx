
import { Link } from "react-router-dom";
import Logo from "../Logo";
import {
  LayoutDashboard,
  Settings,
  Users,
  User,
  MenuSquare,
  FileText,
} from "lucide-react";

type SidebarProps = {
  activeSection: string;
  onSectionChange: (section: any) => void;
};

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const navItems = [
    {
      id: "overview",
      name: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      name: "Clients",
      icon: Users,
    },
    {
      id: "Users",
      name: "Users",
      icon: User,
    },
    {
      id: "orders",
      name: "Orders",
      icon: FileText,
    },
    {
      id: "menu",
      name: "Menu",
      icon: MenuSquare,
    },
  ];

  const bottomNavItems = [
    {
      id: "settings",
      name: "Settings",
      icon: Settings,
    },
    {
      id: "account",
      name: "My Account",
      icon: User,
    },
  ];

  return (
    <div className="w-64 bg-black text-white min-h-screen flex flex-col">
      <div className="p-6">
        <Logo variant="sidebar" />
      </div>

      <nav className="flex-1">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${activeSection === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <ul className="space-y-2">
          {bottomNavItems.map((item) => (
            <li key={item.id}>
              <button
                className={`flex items-center w-full px-4 py-3 rounded-md transition-colors ${activeSection === item.id
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
                  }`}
                onClick={() => onSectionChange(item.id)}
              >
                <item.icon size={20} className="mr-3" />
                <span>{item.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="h-24 bg-supamenu-orange"></div>
    </div>
  );
};

export default Sidebar;
