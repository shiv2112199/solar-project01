import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import AdminFooter from "./AdminFooter";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      
      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOP NAVBAR */}
        <AdminNavbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 lg:pt-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

        {/* FOOTER */}
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
