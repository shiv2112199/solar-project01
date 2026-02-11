const AdminFooter = () => {
  return (
    <div style={{ background: "#f9fafb", padding: "10px", textAlign: "center", borderTop: "1px solid #ddd" }}>
      © {new Date().getFullYear()} Solar Project Admin
    </div>
  );
};

export default AdminFooter;
