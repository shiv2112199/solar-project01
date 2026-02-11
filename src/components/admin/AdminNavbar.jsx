import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import api from "../../services/api";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  // Scroll detect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside click close dropdown
  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleLogout = async () => {
    if (!window.confirm("Are you sure you want to logout?")) return;

    try {
      await api.post("/admin/logout");
    } catch (err) {
      console.log("Logout error (ignored)", err);
    }

    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled ? "#ffffff" : "#f9fafb",
        padding: "12px 20px",
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: scrolled ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* LEFT TITLE */}
      <h3 style={{ margin: 0 }}>
        {scrolled ? "Admin Panel" : "Welcome Admin 👋"}
      </h3>

      {/* RIGHT AVATAR */}
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <div
          onClick={() => setOpen(!open)}
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "#6366f1",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          A
        </div>

        {/* DROPDOWN */}
        {open && (
          <div
            style={{
              position: "absolute",
              right: 0,
              marginTop: 10,
              width: 160,
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              border: "1px solid #eee",
              overflow: "hidden",
            }}
          >
            <div
              onClick={() => navigate("/admin/change-password")}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                fontSize: 14,
                borderBottom: "1px solid #f1f1f1",
              }}
            >
              Change Password
            </div>

            <div
              onClick={handleLogout}
              style={{
                padding: "10px 14px",
                cursor: "pointer",
                fontSize: 14,
                color: "#ef4444",
                fontWeight: "bold",
              }}
            >
              Logout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNavbar;
