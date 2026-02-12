import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { CiMenuKebab } from "react-icons/ci";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Home", id: "home", route: "/" },
  { label: "About", id: "about", route: "/" },
  { label: "Service", id: "services", route: "/" },
  { label: "Quote", id: "quote", route: "/" },
  { label: "Blogs", route: "/blogs" },
  { label: "Contact", id: "contact", route: "/" },
];

export default function Navbar({ isSticky }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [renderMenu, setRenderMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Mobile menu animation mount/unmount
  useEffect(() => {
    if (menuOpen) setRenderMenu(true);
    else setTimeout(() => setRenderMenu(false), 300);
  }, [menuOpen]);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  // Scroll function
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();

    // If direct route page (blogs etc)
    if (item.route !== "/") {
      navigate(item.route);
      setMenuOpen(false);
      return;
    }

    // If already on home → scroll
    if (location.pathname === "/") {
      scrollToSection(item.id);
    } else {
      // Go home then scroll
      navigate("/");
      setTimeout(() => scrollToSection(item.id), 200);
    }

    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        isSticky ? "shadow-md" : ""
      }`}
    >
      <div className="mx-auto flex h-[75px] max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <button
          onClick={(e) => handleNavClick(e, { id: "home", route: "/" })}
          className="flex items-center gap-3 border-r pr-6"
        >
          <h2 className="text-3xl font-extrabold text-orange-600">Solartec</h2>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-12">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={(e) => handleNavClick(e, item)}
              className="text-base font-medium uppercase tracking-wide text-gray-800 hover:text-orange-500 transition"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden rounded-md border px-3 py-2 text-lg transition active:scale-95"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <RxCross2 /> : <CiMenuKebab />}
        </button>
      </div>

      {/* Mobile Menu */}
      {renderMenu && (
        <div
          className={`lg:hidden fixed inset-x-0 top-[75px] z-40 transform transition-transform duration-300 ${
            menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 pointer-events-none"
          }`}
        >
          <div className="mx-auto max-w-7xl border-t bg-white shadow-lg max-h-[calc(100vh-75px)] overflow-auto px-6 py-4">
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className="py-1 text-sm font-medium uppercase tracking-wide text-gray-800 hover:text-orange-500 text-left"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
