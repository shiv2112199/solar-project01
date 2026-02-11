import { useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import api from "../../services/api";
import { Eye, EyeOff } from "lucide-react";

const AdminChangePassword = () => {
  const [form, setForm] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleShow = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await api.post("/admin/change-password", form);
      setMsg(res.data.message);
      setForm({
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
      });
    } catch (err) {
      setMsg(err.response?.data?.message || "Error changing password");
    }

    setLoading(false);
  };

  const InputField = ({ label, name, value, showKey }) => (
    <div>
      <label className="block mb-1">{label}</label>

      <div className="relative">
        <input
          type={show[showKey] ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          className="w-full border rounded-lg p-2 pr-10"
          required
        />

        <button
          type="button"
          onClick={() => toggleShow(showKey)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
        >
          {show[showKey] ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );

  return (
    <AdminLayout>
      <div className="max-w-md mx-auto bg-white shadow rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        {msg && (
          <div className="mb-4 p-2 bg-blue-100 text-blue-700 rounded">
            {msg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Current Password"
            name="current_password"
            value={form.current_password}
            showKey="current"
          />

          <InputField
            label="New Password"
            name="new_password"
            value={form.new_password}
            showKey="new"
          />

          <InputField
            label="Confirm New Password"
            name="new_password_confirmation"
            value={form.new_password_confirmation}
            showKey="confirm"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-900 text-white py-2 rounded-lg hover:bg-slate-800"
          >
            {loading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AdminChangePassword;
