// import { useEffect, useState } from "react";
// import AdminLayout from "../../components/admin/AdminLayout";
// import api from "../../services/api";
// import toast from "react-hot-toast";

// const SolarPriceAdmin = () => {
//   const [prices, setPrices] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editId, setEditId] = useState(null);

//   const [form, setForm] = useState({
//     solar_size: "",
//     with_material_price: "",
//     without_material_price: "",
//   });

//   // 🔹 Fetch Prices
//   const fetchPrices = async () => {
//     try {
//       setLoading(true);
//       const res = await api.get("/admin/solar-prices");
//       setPrices(Array.isArray(res.data) ? res.data : []);
//     } catch (error) {
//       toast.error("Failed to load prices");
//       setPrices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPrices();
//   }, []);

//   // 🔹 Handle input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // 🔹 Custom Validation
//   const validateForm = () => {
//     const solar = form.solar_size.trim();
//     const withMat = form.with_material_price.trim();
//     const withoutMat = form.without_material_price.trim();

//     if (!solar) {
//       toast.error("Solar size is required");
//       return false;
//     }
//     if (Number(solar) <= 0) {
//       toast.error("Solar size must be greater than 0");
//       return false;
//     }

//     if (!withMat) {
//       toast.error("With material price is required");
//       return false;
//     }
//     if (Number(withMat) < 0) {
//       toast.error("With material price cannot be negative");
//       return false;
//     }

//     if (!withoutMat) {
//       toast.error("Without material price is required");
//       return false;
//     }
//     if (Number(withoutMat) < 0) {
//       toast.error("Without material price cannot be negative");
//       return false;
//     }

//     return true;
//   };

//   // 🔹 ADD or UPDATE
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     try {
//       const payload = {
//         solar_size: Number(form.solar_size),
//         with_material_price: Number(form.with_material_price),
//         without_material_price: Number(form.without_material_price),
//       };

//       if (editId) {
//         await api.put(`/admin/solar-prices/${editId}`, payload);
//         toast.success("Price updated ✅");
//       } else {
//         await api.post("/admin/solar-prices", payload);
//         toast.success("Price added ✅");
//       }

//       setForm({
//         solar_size: "",
//         with_material_price: "",
//         without_material_price: "",
//       });

//       setEditId(null);
//       fetchPrices();
//     } catch (err) {
//       toast.error("Save failed ❌");
//     }
//   };

//   // 🔹 Edit
//   const editPrice = (price) => {
//     setForm({
//       solar_size: String(price.solar_size),
//       with_material_price: String(price.with_material_price),
//       without_material_price: String(price.without_material_price),
//     });

//     setEditId(price.id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   // 🔹 Delete
//   const deletePrice = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await api.delete(`/admin/solar-prices/${id}`);
//       toast.success("Price deleted 🗑️");
//       fetchPrices();
//     } catch {
//       toast.error("Delete failed ❌");
//     }
//   };

//   return (
//     <AdminLayout>
//       <div className="p-6">
//         <h1 className="text-2xl font-bold mb-4">
//           Solar Price Management
//         </h1>

//         {/* 🔹 FORM */}
//       <form onSubmit={handleSubmit} noValidate className="grid grid-cols-4 gap-4 mb-6">

//   <input
//     type="text"
//     inputMode="numeric"
//     name="solar_size"
//     placeholder="Solar Size (KW)"
//     value={form.solar_size}
//     onChange={handleChange}
//     className="border p-2 rounded"
//   />

//   <input
//     type="text"
//     inputMode="numeric"
//     name="with_material_price"
//     placeholder="With Material Price"
//     value={form.with_material_price}
//     onChange={handleChange}
//     className="border p-2 rounded"
//   />

//   <input
//     type="text"
//     inputMode="numeric"
//     name="without_material_price"
//     placeholder="Without Material Price"
//     value={form.without_material_price}
//     onChange={handleChange}
//     className="border p-2 rounded"
//   />

//   <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
//     {editId ? "Update Price" : "Add Price"}
//   </button>

// </form>



      

//         {/* 🔹 TABLE */}
//         <div className="overflow-x-auto">
//           <table className="w-full border">
//             <thead>
//               <tr className="bg-gray-100">
//                 <th className="border p-2">KW</th>
//                 <th className="border p-2">With Material</th>
//                 <th className="border p-2">Without Material</th>
//                 <th className="border p-2">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {loading ? (
//                 <tr>
//                   <td colSpan="4" className="text-center p-4">
//                     Loading...
//                   </td>
//                 </tr>
//               ) : prices.length > 0 ? (
//                 prices.map((p) => (
//                   <tr key={p.id}>
//                     <td className="border p-2">{p.solar_size}</td>
//                     <td className="border p-2">₹ {p.with_material_price}</td>
//                     <td className="border p-2">₹ {p.without_material_price}</td>
//                     <td className="border p-2 text-center space-x-2">
//                       <button
//                         onClick={() => editPrice(p)}
//                         className="bg-yellow-500 text-white px-3 py-1 rounded"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() => deletePrice(p.id)}
//                         className="bg-red-600 text-white px-3 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-4 text-gray-500">
//                     No prices found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default SolarPriceAdmin;
