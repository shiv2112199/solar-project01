import { useState } from "react";
import api from "../services/api";
import quoteImage from "../assets/images/quote/image.avif";
import { Calculator, Zap, Info } from "lucide-react";

export default function Quote() {
  const [solarSize, setSolarSize] = useState("");
  const [type, setType] = useState("with");
  const [price, setPrice] = useState(null);
  const [perKw, setPerKw] = useState(null);
  const [slab, setSlab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuote = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/solar-quote", {
        solar_size: Number(solarSize),
        type: type,
      });
      setPrice(res.data.total_price);
      setPerKw(res.data.price_per_kw);
      setSlab(res.data.applied_slab);
    } catch (err) {
      setPrice(null);
      setPerKw(null);
      setSlab(null);
      setError(err?.response?.data?.message || "Price not available");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/60">
        
        {/* --- IMAGE SECTION WITH HOVER --- */}
        <div className="relative min-h-[450px] overflow-hidden group">
          {/* Main Image with Zoom Effect */}
          <img
            src={quoteImage}
            alt="Solar Panel Installation Quote"
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          />
          
          {/* Dark Overlay that fades on hover */}
          <div className="absolute inset-0 bg-slate-900/20 transition-opacity duration-500 group-hover:opacity-0"></div>

          {/* Floating Badge on Image */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <Zap size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-bold text-slate-800 tracking-tight">Instant Estimate</span>
          </div>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="px-8 py-12 lg:px-12 lg:py-16">
          <div className="mb-2 flex items-center gap-2 text-green-600">
            <Calculator size={20} />
            <span className="font-bold uppercase tracking-widest text-xs">Price Calculator</span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 md:text-4xl">
            Check Your <span className="text-green-600">Solar Cost</span>
          </h2>

          <p className="mt-4 text-slate-500 leading-relaxed">
            Enter your rooftop capacity and get an instant quote based on current market rates and material types.
          </p>

          <form onSubmit={handleQuote} className="mt-8 space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">System Size (KW)</label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                className="w-full h-14 rounded-xl bg-slate-50 px-5 outline-none border border-slate-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 transition-all text-slate-800 font-medium"
                placeholder="e.g. 3.0"
                value={solarSize}
                onChange={(e) => setSolarSize(e.target.value)}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700 ml-1">Installation Type</label>
              <select
                className="w-full h-14 rounded-xl bg-slate-50 px-5 outline-none border border-slate-200 focus:border-green-500 transition-all appearance-none cursor-pointer text-slate-800 font-medium"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="with">Full Project (With Material)</option>
                <option value="without">Installation Only (Labour)</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-xl bg-slate-900 text-white font-bold hover:bg-green-600 shadow-lg shadow-slate-900/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Calculate Estimate"
              )}
            </button>
          </form>

          {/* ERROR BOX */}
          {error && (
            <div className="mt-6 flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100 text-sm font-medium animate-shake">
              <Info size={16} /> {error}
            </div>
          )}

          {/* --- RESULT CARD WITH ANIMATION --- */}
          {price !== null && (
            <div className="mt-8 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 p-6 text-green-900 shadow-inner transform animate-in fade-in zoom-in duration-500">
              <p className="text-sm font-bold uppercase tracking-wider text-green-600/70">Estimated Investment</p>
              <div className="text-4xl font-black text-green-800 mt-1">
                ₹ {price.toLocaleString()}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 border-t border-green-200/50 pt-4">
                {perKw && (
                  <div>
                    <p className="text-[10px] uppercase font-bold text-green-600/60">Rate per KW</p>
                    <p className="text-sm font-bold">₹ {perKw.toLocaleString()}</p>
                  </div>
                )}
                {slab && (
                  <div>
                    <p className="text-[10px] uppercase font-bold text-green-600/60">System Slab</p>
                    <p className="text-sm font-bold">{slab}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}