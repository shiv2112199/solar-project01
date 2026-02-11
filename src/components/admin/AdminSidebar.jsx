import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Users,
  FileText,
  Sun,
  IndianRupee,
  Menu,
  X,
  Settings,
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Enquiries", path: "/admin/enquiries", icon: <MessageSquare size={20} /> },
    { name: "Contacts", path: "/admin/contacts", icon: <Users size={20} /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FileText size={20} /> },
    { name: "Solar Prices", path: "/admin/solar-prices", icon: <IndianRupee size={20} /> },
    { name: "Settings", path: "/admin/change-password", icon: <Settings size={20} /> },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  /* 🔒 Lock body scroll when sidebar open (mobile) */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isOpen]);

  return (
    <>
      {/* ================= MOBILE HEADER ================= */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white flex items-center justify-between px-4 h-14 shadow">
        <div className="flex items-center gap-2">
          <Sun size={22} className="text-yellow-400" />
          <span className="font-semibold">Solar Admin</span>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-slate-800 active:scale-95 transition"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ================= OVERLAY ================= */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`
          fixed lg:static top-0 left-0 z-50
          w-64 h-screen lg:h-auto
          bg-slate-900 text-slate-300
          flex flex-col border-r border-slate-800
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Desktop Logo */}
        <div className="hidden lg:flex p-6 items-center gap-3 border-b border-slate-800">
          <div className="bg-yellow-500 p-2 rounded-lg text-slate-900">
            <Sun size={22} fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-white">Solar Admin</span>
        </div>

        {/* Mobile space adjust */}
        <div className="lg:hidden h-14" />

        {/* ================= MENU ================= */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "hover:bg-slate-800 hover:text-white"
                }`}
              >
                <span className={`${isActive ? "text-white" : "text-slate-400"}`}>
                  {item.icon}
                </span>
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default AdminSidebar;
