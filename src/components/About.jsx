import { ShieldCheck, Calendar, UserCheck, ArrowRight } from "lucide-react";
import aboutImages from '../assets/images/about/about.jpg';

export default function About() {
  const features = [
    {
      icon: <ShieldCheck className="text-white" size={24} />,
      title: "Government Subsidy",
      desc: "Full assistance in subsidy paperwork.",
      color: "bg-green-500",
    },
    {
      icon: <Calendar className="text-white" size={24} />,
      title: "25-Year Warranty",
      desc: "Long-term peace of mind for your investment.",
      color: "bg-blue-500",
    },
    {
      icon: <UserCheck className="text-white" size={24} />,
      title: "Local Experts",
      desc: "Quick installation & local support team.",
      color: "bg-orange-500",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-16 lg:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-16 gap-y-12 lg:grid-cols-2">
          
          {/* LEFT: IMAGE SECTION WITH DECORATION */}
          <div className="relative group">
            {/* Decorative Back-Box */}
            <div className="absolute -bottom-6 -right-6 h-full w-full rounded-2xl bg-green-100 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 lg:block hidden"></div>
            
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={aboutImages}
                alt="Solar Installation Team"
                className="h-[500px] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur px-6 py-4 rounded-xl shadow-lg border-l-4 border-green-500">
                <p className="text-3xl font-black text-slate-900">10+</p>
                <p className="text-sm font-medium text-slate-500">Years of Excellence</p>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTENT SECTION */}
          <div className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-1.5 text-sm font-bold uppercase tracking-wider text-green-600">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              About Our Mission
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:leading-tight">
              Powering Your Life with <span className="text-green-600">Clean Energy</span>
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              We provide end-to-end rooftop solar solutions for homes and businesses. 
              From site survey to installation and subsidy support, we manage everything so you can focus on savings.
            </p>

            {/* FEATURES LIST - CARD STYLE */}
            <div className="mt-10 space-y-6">
              {features.map((item, idx) => (
                <div key={idx} className="group flex gap-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.color} shadow-lg shadow-${item.color.split('-')[1]}-200`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl transition-all hover:bg-green-600 hover:shadow-green-200"
              >
                Explore More <ArrowRight size={18} />
              </a>
              
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                  <img
                    key={i}
                    className="inline-block h-10 w-10 rounded-full border-2 border-white"
                    src={`https://i.pravatar.cc/100?img=${i+10}`}
                    alt="customer"
                  />
                ))}
                <div className="flex h-10 items-center justify-center rounded-full bg-slate-100 px-3 text-xs font-bold text-slate-500 border-2 border-white">
                  +500 Happy Clients
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}