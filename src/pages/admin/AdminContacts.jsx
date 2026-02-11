import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { 
  Trash2, 
  User, 
  Phone, 
  MapPin, 
  MessageSquareText, 
  Wallet, 
  Loader2,
  Inbox
} from "lucide-react";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    try {
      const res = await api.get("/admin/contacts");
      setContacts(res.data.data || []);
    } catch (err) {
      console.error(err);
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await api.delete(`/admin/contacts/${id}`);
      setContacts((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 flex items-center gap-2">
              <MessageSquareText className="text-blue-600" />
              Contact Requests
            </h2>
            <p className="text-slate-500 text-sm mt-1">Direct inquiries from your website's contact form.</p>
          </div>
          <span className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 shadow-sm">
            Total Requests: {contacts.length}
          </span>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-24">
              <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
              <p className="text-slate-500 animate-pulse">Loading contact data...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">#</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User Info</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Location & Bill</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Message</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-20 text-center">
                        <div className="flex flex-col items-center opacity-40">
                          <Inbox size={48} />
                          <p className="mt-2 font-medium text-lg">No requests found</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    contacts.map((c, index) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors group">
                        <td className="px-6 py-4 text-slate-400 font-mono text-sm">
                          {(index + 1).toString().padStart(2, '0')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                              {c.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-slate-800">{c.name}</div>
                              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                                <Phone size={12} /> {c.contact_number}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1.5 text-sm text-slate-700 font-medium">
                            <MapPin size={14} className="text-red-400" /> {c.city}
                          </div>
                          {c.monthly_electricity_bill && (
                            <div className="flex items-center gap-1.5 text-xs text-green-600 mt-1 font-semibold">
                              <Wallet size={14} /> ₹{c.monthly_electricity_bill}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="max-w-xs text-sm text-slate-600 truncate italic" title={c.message}>
                            "{c.message || "No message provided"}"
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => deleteContact(c.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete Request"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminContacts;