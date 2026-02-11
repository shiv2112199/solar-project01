import { useEffect, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import {
  Users,
  MessageSquare,
  FileText,
  TrendingUp,
  ArrowUpRight,
  LayoutDashboard,
  Calendar,
  Mail,
  ChevronRight
} from "lucide-react";
import api from "../../services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    enquiries: 0,
    contacts: 0,
    blogs: 0,
    conversion: "0%",
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/stats");

      setStats({
        enquiries: res.data.enquiries_count,
        contacts: res.data.contacts_count,
        blogs: res.data.blogs_count,
        conversion: res.data.conversion,
      });

      setRecentEnquiries(res.data.enquiries || []);
    } catch (err) {
      console.error("Dashboard API error:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center min-h-[80vh]">
          <div className="relative">
            <div className="h-16 w-16 rounded-full border-4 border-slate-200 border-t-blue-600 animate-spin"></div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const statsArray = [
    { label: "Total Enquiries", value: stats.enquiries, icon: <MessageSquare size={22} />, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%" },
    { label: "Contact Requests", value: stats.contacts, icon: <Users size={22} />, color: "text-purple-600", bg: "bg-purple-50", trend: "+5" },
    { label: "Live Blogs", value: stats.blogs, icon: <FileText size={22} />, color: "text-green-600", bg: "bg-green-50", trend: "Active" },
    { label: "Conversion Rate", value: stats.conversion, icon: <TrendingUp size={22} />, color: "text-orange-600", bg: "bg-orange-50", trend: "Stable" },
  ];

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                <LayoutDashboard size={24} />
              </div>
              Overview
            </h1>
            <p className="text-slate-500 mt-1 ml-12 hidden md:block">Welcome back! Here's what's happening today.</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-lg shadow-sm border border-slate-100 w-fit">
            <Calendar size={16} />
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {statsArray.map((stat, i) => (
            <div key={i} className="group bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-xl transition-colors`}>
                  {stat.icon}
                </div>
                <span className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                  <ArrowUpRight size={14} /> {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-500 font-medium text-sm mb-1">{stat.label}</h3>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Recent Enquiries Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-50 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">Recent Enquiries</h2>
            <Link to="/admin/enquiries" className="text-blue-600 text-sm font-semibold hover:underline flex items-center gap-1">
              View All <ChevronRight size={16} />
            </Link>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentEnquiries.length > 0 ? (
                  recentEnquiries.map((e) => (
                    <tr key={e.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">{e.name}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Mail size={14} /> {e.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-400 font-medium">
                        {new Date(e.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                          <ChevronRight size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-slate-400 italic text-sm">
                      No recent enquiries found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;