import { useEffect, useState } from "react";
import api from "../../services/api";
import AdminLayout from "../../components/admin/AdminLayout";
import { Plus, Trash2, X, Calendar, FileText, Image as ImageIcon, UploadCloud } from "lucide-react";

const AdminBlogs = () => {
  
  const IMAGE_BASE_URL = import.meta.env.VITE_STORAGE_URL;

  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    publish_date: "",
    image: null,
  });

  const fetchBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (id) => {
    if (!window.confirm("Delete this blog permanently?")) return;
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs(blogs.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const title = formData.title.trim();
  const desc = formData.description.trim();
  const date = formData.publish_date;

  // 🔴 Custom Validation
  if (!title) {
    alert("Blog title is required");
    return;
  }
  if (title.length < 3) {
    alert("Title must be at least 3 characters");
    return;
  }
  if (!date) {
    alert("Publish date is required");
    return;
  }
  if (!desc) {
    alert("Description is required");
    return;
  }
  if (desc.length < 20) {
    alert("Description must be at least 20 characters");
    return;
  }

  const data = new FormData();
  data.append("title", title);
  data.append("description", desc);
  data.append("publish_date", date);
  if (formData.image) data.append("image", formData.image);

  try {
    const res = await api.post("/admin/blogs", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setBlogs([res.data.data, ...blogs]);
    setShowForm(false);
    setFormData({ title: "", description: "", publish_date: "", image: null });

    alert("Blog added successfully ✅");
  } catch (err) {
    alert("Blog addition failed ❌");
  }
};

  useEffect(() => { fetchBlogs(); }, []);

  return (
    <AdminLayout>
      <div className="p-4 md:p-8 bg-slate-50 min-h-screen">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800">Content Management</h2>
            <p className="text-sm text-slate-500">Create and manage your solar articles</p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all ${
              showForm ? "bg-slate-200 text-slate-700" : "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700"
            }`}
          >
            {showForm ? <><X size={18} /> Close</> : <><Plus size={18} /> Add Blog</>}
          </button>
        </div>

        {/* Add Blog Form Section */}
        {showForm && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FileText className="text-blue-600" size={20} /> Write New Post
            </h3>
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Blog Title</label>
      <input
        type="text"
        name="title"
        placeholder="Enter catchy title..."
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
        value={formData.title}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Publish Date</label>
      <input
        type="date"
        name="publish_date"
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
        value={formData.publish_date}
        onChange={handleChange}
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Featured Image</label>
      <input
        type="file"
        name="image"
        onChange={handleChange}
        className="w-full text-sm text-slate-500"
      />
    </div>
  </div>

  <div className="space-y-4">
    <div>
      <label className="block text-sm font-semibold text-slate-700 mb-1">Content / Description</label>
      <textarea
        name="description"
        rows="6"
        placeholder="Write your blog content here..."
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        value={formData.description}
        onChange={handleChange}
      />
    </div>

    <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 rounded-xl hover:bg-green-700">
      Publish Article
    </button>
  </div>

</form>

          </div>
        )}

        {/* Blog Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Thumbnail</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Blog Title</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-slate-400">
                    {loading ? "Loading articles..." : "No blogs available. Create your first post!"}
                  </td>
                </tr>
              ) : (
                blogs.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4">
                      {b.image ? (
                        <img
                         src={`${IMAGE_BASE_URL}${b.image}`}
                         alt={b.title}
                        className="w-20 h-14 object-cover rounded-lg shadow-sm"
                        />
                      ) : (
                        <div className="w-20 h-14 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 line-clamp-1">{b.title}</div>
                      <div className="text-xs text-slate-400 mt-1 line-clamp-1">{b.description.substring(0, 60)}...</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Calendar size={14} className="text-slate-400" />
                        {new Date(b.publish_date).toLocaleDateString('en-GB')}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => deleteBlog(b.id)}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
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
      </div>
    </AdminLayout>
  );
};

export default AdminBlogs;