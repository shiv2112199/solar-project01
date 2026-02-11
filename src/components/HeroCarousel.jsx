import React, { useState, useEffect } from "react";
import api from "../services/api";
import solar1 from "../assets/images/about/about.jpg";
import solar2 from "../assets/images/carousel/hero-1.png";
import solar3 from "../assets/images/carousel/hero-2.jpg";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Hash,
  ReceiptText,
  CheckCircle,
} from "lucide-react";

const slides = [solar1, solar2, solar3];

const SolarLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    city: "",
    pin_code: "",
    monthly_electricity_bill: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 Auto Slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name" || name === "city") {
      value = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "mobile_number") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    if (name === "pin_code") {
      value = value.replace(/\D/g, "").slice(0, 6);
    }

    if (name === "monthly_electricity_bill") {
      value = value.replace(/\D/g, "");
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 3 || formData.name.trim().length > 50)
      newErrors.name = "Name must be between 3 and 50 characters";

    if (!formData.email.match(/^\S+@\S+\.\S+$/))
      newErrors.email = "Enter valid email";

    if (!formData.mobile_number.match(/^[0-9]{10}$/))
      newErrors.mobile_number = "10-digit mobile required";

    if (!formData.city.trim() || formData.city.trim().length < 3)
      newErrors.city = "Minimum 3 characters required";

    if (!formData.pin_code.match(/^[0-9]{6}$/))
      newErrors.pin_code = "6-digit Pin required";

    if (!formData.monthly_electricity_bill || Number(formData.monthly_electricity_bill) <= 0)
      newErrors.monthly_electricity_bill = "Enter valid bill amount";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await api.post("/enquiry", formData);
      alert("Success! Our expert will call you soon.");
      setFormData({
        name: "",
        email: "",
        mobile_number: "",
        city: "",
        pin_code: "",
        monthly_electricity_bill: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white">

      {/* 🔥 Background Slider */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide}
            alt="Solar Background"
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-16 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="lg:w-2.5/5 space-y-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full text-cyan-400 text-sm font-semibold">
            Go Green, Save Money
          </div>

          <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight">
            Power Your Future with Clean Solar Energy <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400">
              Up to 100%
            </span>
          </h1>

          <p className="text-gray-200 text-lg max-w-xl leading-relaxed">
            Join the solar revolution. Get a free consultation and customized quote today.
          </p>

          <div className="flex flex-wrap gap-6 mt-8">
            {["Zero Maintenance", "25 Years Warranty", "Government Subsidy"].map((text, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium">
                <CheckCircle className="text-green-400 w-5 h-5" /> {text}
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="w-full lg:w-2.5/5">
          <div className="bg-white text-slate-900 rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Get Free Quote</h3>
            <p className="text-gray-500 mb-6 text-sm">
              Fill in the details for a free solar site audit.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <InputGroup icon={<User size={18} />} name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={<Mail size={18} />} name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} error={errors.email} />
                <InputGroup icon={<Phone size={18} />} name="mobile_number" placeholder="Mobile" value={formData.mobile_number} onChange={handleChange} error={errors.mobile_number} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup icon={<MapPin size={18} />} name="city" placeholder="City" value={formData.city} onChange={handleChange} error={errors.city} />
                <InputGroup icon={<Hash size={18} />} name="pin_code" placeholder="Pin Code" value={formData.pin_code} onChange={handleChange} error={errors.pin_code} />
              </div>

              <InputGroup icon={<ReceiptText size={18} />} name="monthly_electricity_bill" type="number" placeholder="Avg Monthly Bill (₹)" value={formData.monthly_electricity_bill} onChange={handleChange} error={errors.monthly_electricity_bill} />

              <button
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-bold py-4 rounded-xl shadow-lg transition disabled:opacity-70 mt-4"
              >
                {loading ? "Processing..." : "Get Started Now"}
              </button>

              <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
                Your data is safe with us
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition ${
              currentSlide === index ? "bg-cyan-400 scale-110" : "bg-white/50"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

const InputGroup = ({ icon, error, ...props }) => (
  <div className="space-y-1">
    <div className={`flex items-center border rounded-xl px-3 py-2.5 transition-all focus-within:ring-2 focus-within:ring-blue-500 ${error ? "border-red-500 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
      <span className="text-gray-400 mr-2">{icon}</span>
      <input {...props} className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400" />
    </div>
    {error && <p className="text-red-500 text-[11px] font-medium ml-1">{error}</p>}
  </div>
);

export default SolarLandingPage;
