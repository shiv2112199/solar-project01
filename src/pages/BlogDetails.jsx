import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Spinner from "../components/Spinner";



export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const IMAGE_BASE_URL = import.meta.env.VITE_STORAGE_URL;

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/blogs/${slug}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Blog detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) return <Spinner loading={true} />;

  if (!blog) return <div className="text-center py-20">Blog not found</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-12 bg-white shadow rounded-xl mt-8">
        <img
          src={
            blog.image
              ? `${IMAGE_BASE_URL}${blog.image}`
              : "https://via.placeholder.com/800x400"
          }
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />

        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        <p className="text-gray-600 mb-6">
          {new Date(blog.created_at).toLocaleDateString("en-IN")}
        </p>

        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
          {blog.description}
        </div>
      </div>

      <Footer />
    </div>
  );
}
