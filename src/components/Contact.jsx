import { useState } from "react";
import api from "../services/api";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    contact_number: "",
    city: "",
    monthly_electricity_bill: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // INPUT CHANGE
 const handleChange = (e) => {
  let { name, value } = e.target;

  // Name & City → only letters + space
  if (name === "name" || name === "city") {
    value = value.replace(/[^A-Za-z\s]/g, "");
  }

  // Phone → only number, max 10
  if (name === "contact_number") {
    value = value.replace(/\D/g, "").slice(0, 10);
  }

  // Bill → only number, no negative
  if (name === "monthly_electricity_bill") {
    value = value.replace(/\D/g, "");
  }

  // Message → max 300 chars
  if (name === "message") {
    value = value.slice(0, 300);
  }

  setFormData({ ...formData, [name]: value });
  setErrors({ ...errors, [name]: "" });
};


  // VALIDATION
 const validate = () => {
  let newErrors = {};

  if (!formData.name.trim() || formData.name.trim().length < 3 || formData.name.trim().length > 50)
    newErrors.name = "Name must be between 3 and 50 characters";

  if (!formData.contact_number.match(/^[0-9]{10}$/))
    newErrors.contact_number = "Phone must be 10 digits";

  if (!formData.city.trim() || formData.city.trim().length < 3)
    newErrors.city = "Minimum 3 characters required";

  if (
    formData.monthly_electricity_bill &&
    Number(formData.monthly_electricity_bill) < 0
  )
    newErrors.monthly_electricity_bill = "Bill cannot be negative";

  if (formData.message.length > 300)
    newErrors.message = "Message too long (max 300 chars)";

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    try {
      const res = await api.post("/contact", formData);

      alert(res.data.message || "Message sent successfully");

      // CLEAR ONLY ON SUCCESS
      setFormData({
        name: "",
        contact_number: "",
        city: "",
        monthly_electricity_bill: "",
        message: "",
      });
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Server / Internet error. Data safe hai."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-light py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-8">

        {/* LEFT – FORM */}
        <div className="px-6 py-12">
          <p className="font-bold text-green-400">Contact Us</p>
          <h2 className="mt-2 text-3xl font-extrabold text-dark">
            Feel Free To Contact Us
          </h2>

          <form
            onSubmit={handleSubmit}
            className="mt-8 border-2 border-green-200 p-5 rounded-2xl grid gap-4 md:grid-cols-2"
          >

            {/* NAME */}
            <div>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="h-[55px] w-full rounded-md px-4 bg-gray-200 focus:ring-2 outline-none focus:ring-green-400"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* PHONE */}
            <div>
              <input
                name="contact_number"
                value={formData.contact_number}
                onChange={handleChange}
                className="h-[55px] w-full rounded-md px-4 bg-gray-200 focus:ring-2 outline-none focus:ring-green-400"
                placeholder="Phone Number"
              />
              {errors.contact_number && (
                <p className="text-red-500 text-sm">
                  {errors.contact_number}
                </p>
              )}
            </div>

            {/* CITY */}
            <div className="md:col-span-2">
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="h-[55px] w-full rounded-md px-4 bg-gray-200 focus:ring-2 outline-none focus:ring-green-400"
                placeholder="City / Area"
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city}</p>
              )}
            </div>

            {/* BILL */}
            <div className="md:col-span-2">
              <input
                type="number"
                name="monthly_electricity_bill"
                value={formData.monthly_electricity_bill}
                onChange={handleChange}
                className="h-[55px] w-full rounded-md px-4 bg-gray-200 focus:ring-2 outline-none focus:ring-green-400"
                placeholder="Monthly Electricity Bill (Optional)"
              />
              {errors.monthly_electricity_bill && (
                <p className="text-red-500 text-sm">
                  {errors.monthly_electricity_bill}
                </p>
              )}
            </div>

            {/* MESSAGE */}
            <div className="md:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="min-h-[120px] w-full rounded-md px-4 py-3 bg-gray-200 focus:ring-2 outline-none focus:ring-green-400"
                placeholder="Message"
              />
              {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
              )}
            </div>

            <button
              disabled={loading}
              className="rounded-full bg-green-500 px-8 py-3 text-white md:col-span-2 w-fit disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* RIGHT – MAP */}
        <div className="min-h-[400px] w-full">
          <iframe
            className="h-full w-full rounded-xl"
            src="https://maps.google.com/maps?q=bhopal&t=&z=13&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            allowFullScreen
            title="Map"
          />
        </div>
      </div>
    </section>
  );
}
