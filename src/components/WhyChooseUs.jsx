import React from "react";
import { Users, ShieldCheck, IndianRupee, Headphones, ArrowRight } from "lucide-react";

const whyChooseUs = [
    {
        icon: <Users size={32} />,
        title: "Experienced Solar Team",
        description: "Precise planning and safe installation with years of expertise tailored to your specific needs.",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "MNRE-Approved Panels",
        description: "High-quality panels that comply with govt standards for maximum output and subsidy eligibility.",
    },
    {
        icon: <IndianRupee size={32} />,
        title: "Transparent Pricing",
        description: "No hidden costs. Clear breakdowns and competitive pricing that fits your budget perfectly.",
    },
    {
        icon: <Headphones size={32} />,
        title: "Reliable Support",
        description: "Regular maintenance and quick issue resolution to ensure long-term efficiency and peace of mind.",
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-16 bg-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6">
                
                {/* Header */}
                <div className="mx-auto mb-20 max-w-2xl text-center">
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-green-500">Why Choose Us</span>
                    <h2 className="mt-4 text-4xl font-black text-slate-900 md:text-5xl leading-tight">
                        Expert Solar Solutions <br /> 
                        <span className="text-green-600 font-medium italic">In Indore.</span>
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 mt-10">
                    {whyChooseUs.map((item, idx) => (
                        <div
                            key={idx}
                            className="group relative rounded-3xl bg-white p-8 pt-12 text-center transition-all duration-500 border border-slate-100 hover:border-green-500 hover:shadow-2xl hover:shadow-green-100"
                        >
                            {/* FLOATING ICON BOX */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:-translate-y-2/3">
                                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white shadow-xl border border-slate-50 transition-all duration-500 group-hover:bg-green-600 group-hover:text-white group-hover:shadow-green-200">
                                    <span className="transition-transform duration-500 group-hover:scale-110">
                                        {item.icon}
                                    </span>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="space-y-4">
                                <h3 className="text-xl font-extrabold text-slate-900 transition-colors duration-300 group-hover:text-green-600">
                                    {item.title}
                                </h3>
                                <p className="text-slate-500 leading-relaxed text-sm group-hover:text-slate-600 transition-colors">
                                    {item.description}
                                </p>

                                {/* LEARN MORE LINK */}
                                <div className="pt-4 overflow-hidden">
                                    <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-green-600 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-green-600 after:transition-all group-hover:after:w-full">
                                        Read More 
                                        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </a>
                                </div>
                            </div>

                            {/* DECORATIVE NUMBER */}
                            <span className="absolute bottom-4 right-6 text-6xl font-black text-slate-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none">
                                0{idx + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;