import service1 from '../assets/images/services/service1.jpg'
import service2 from '../assets/images/services/service-2.jpg'
import service3 from '../assets/images/services/service-3.jpg'
import service4 from '../assets/images/services/service-3.webp'
import service5 from '../assets/images/services/service-4.jpg'

import { PanelsTopLeft, Building2, PlugZap, FileCheck2, Wrench, ArrowUpRight } from "lucide-react";

export default function Services() {
  const services = [
    {
      img: service1,
      icon: <PanelsTopLeft size={32} />,
      title: "Residential Rooftop",
      description: "Get expert residential rooftop solar installation with high-efficiency panels, neat wiring, and safe mounting."
    },
    {
      img: service2,
      icon: <Building2 size={32} />,
      title: "Commercial Systems",
      description: "Power your business with scalable commercial solar systems designed for offices, factories, and warehouses."
    },
    {
      img: service4,
      icon: <PlugZap size={32} />,
      title: "Hybrid Solar Solutions",
      description: "Choose the right solar setup: on-grid for maximum savings, off-grid for independence, or hybrid with battery backup."
    },
    {
      img: service3,
      icon: <FileCheck2 size={32} />,
      title: "Subsidy & Net Metering",
      description: "Complete government solar subsidy assistance and net metering support, including documentation and coordination."
    },
    {
      img: service5,
      icon: <Wrench size={32} />,
      title: "Maintenance & Support",
      description: "Keep your system running at peak performance with inspections, troubleshooting, and professional cleaning."
    },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* HEADER SECTION */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="inline-block rounded-full bg-green-100 px-4 py-1.5 text-sm font-bold text-green-600 mb-4">
            WHAT WE OFFER
          </div>
          <h2 className="text-4xl font-black text-slate-900 md:text-5xl leading-tight">
            Pioneers In The World Of <br />
            <span className="text-green-600">Renewable Energy</span>
          </h2>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, idx) => (
            <div 
              key={idx} 
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-200/40"
            >
              {/* IMAGE WITH ZOOM HOVER */}
              <div className="relative h-60 w-full overflow-hidden">
                <img
                  src={s.img}
                  alt={s.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* ICON SECTION (Floating & Hover Animated) */}
              <div className="relative px-8 pb-10">
                <div className="relative -mt-10 mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-green-600 shadow-xl transition-all duration-500 group-hover:bg-green-600 group-hover:text-white group-hover:rotate-[360deg]">
                  {s.icon}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-green-600">
                  {s.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed">
                  {s.description}
                </p>

                {/* LEARN MORE HOVER LINK */}
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-green-600 opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  Learn More <ArrowRightUp size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ArrowRightUp({ size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7V17" />
    </svg>
  );
}