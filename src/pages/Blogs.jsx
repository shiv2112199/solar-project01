import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../services/api";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import HeroImage from "../assets/hero-solar.jpg"; 


const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

 const IMAGE_BASE_URL = import.meta.env.VITE_STORAGE_URL;


  useEffect(() => {
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
    fetchBlogs();

    const onScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (loading) return <Spinner loading={loading} />;

  return (
    <div className="font-sans text-slate-800 bg-[#fbfcfd] min-h-screen">
      <Navbar isSticky={isSticky} />

      {/* ================= MODERN HERO SECTION ================= */}
      <section className="relative h-[450px] md:h-[550px] w-full flex items-center justify-center">
        {/* Background Image with Zoom Effect */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={HeroImage}
            alt="Solar Energy"
            className="w-full h-full object-cover scale-105 animate-soft-zoom"
          />
          {/* Gradient Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest text-green-400 uppercase bg-green-400/10 backdrop-blur-md rounded-full">
            Our Knowledge Hub
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Insights for a <span className="text-green-400">Greener</span> Tomorrow
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            Everything you need to know about solar installation, cost savings, and sustainable living.
          </p>
        </div>
      </section>

      {/* ================= BLOG GRID SECTION ================= */}
      <main className="max-w-7xl mx-auto px-6 -mt-16 relative z-20 pb-20">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Featured Articles</h2>
            <p className="text-gray-500 mt-1">Handpicked stories from our experts</p>
          </div>
          <div className="h-1 w-20 bg-green-500 rounded-full md:hidden"></div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all duration-500 flex flex-col border border-gray-50"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={blog.image ? `${IMAGE_BASE_URL}${blog.image}` : "https://via.placeholder.com/600x400"}
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-green-700 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">
                      Solar Tech
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors line-clamp-2 leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                    {blog.description?.replace(/<[^>]*>?/gm, '').substring(0, 120)}...
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      to={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-sm font-bold text-gray-900 hover:text-green-600 transition-colors group/link"
                    >
                      Read Full Article 
                      <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center bg-white rounded-3xl border-2 border-dashed border-gray-200">
               <p className="text-gray-400 italic">Writing some amazing stories... Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Custom Styles for Zoom Animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes softZoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .animate-soft-zoom {
          animation: softZoom 20s infinite alternate linear;
        }
      `}} />
    </div>
  );
};

export default Blogs;