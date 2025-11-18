import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserGroupIcon,
  ArrowLeftOnRectangleIcon,
  FolderIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";

// eslint-disable-next-line no-unused-vars
const SidebarLink = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
          isActive
            ? "bg-blue-500 text-white"
            : "text-gray-700 hover:bg-blue-100"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
    </NavLink>
  );
};

const DashboardLayout = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("token");

    if (!access) {
      navigation("/login");
    }
  }, [navigation]);

  const handleLogOut = () => {
    localStorage.clear();

    navigation("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        {/* Logo / Title */}
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          MyDashboard
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 flex flex-col gap-2">
          <SidebarLink to="/dashboard" icon={HomeIcon} label="Overview" />
          <SidebarLink to="/dashboard/team" icon={UserGroupIcon} label="Team" />
          <SidebarLink
            to="/dashboard/project"
            icon={FolderIcon}
            label="Projects"
          />
        </nav>

        {/* Logout */}
        <div className="p-6 border-t" onClick={handleLogOut}>
          <SidebarLink
            to="/logout"
            icon={ArrowLeftOnRectangleIcon}
            label="Logout"
          />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
