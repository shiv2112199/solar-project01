import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { FaInstagram, FaLocationDot, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMdArrowDropright } from "react-icons/io";

const NAV_ITEMS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Service", id: "services" },
  { label: "Quote", id: "quote" },
  { label: "Blogs", route: "/blogs" }, // if separate page
  { label: "Contact", id: "contact" },
];

export default function Footer() {

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (item.route) {
      window.location.href = item.route; // go to blogs page
      return;
    }

    scrollToSection(item.id);
  };

  return (
    <footer className="bg-gray-800 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Address */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Address</h4>
            <p className="mb-2 flex gap-1 items-center"><FaLocationDot /> 123 Street, New York, USA</p>
            <p className="mb-2 flex gap-1 items-center"><FaPhone /> +012 345 67890</p>
            <p className="mb-2 flex gap-1 items-center"><MdEmail /> info@example.com</p>

            <div className="flex gap-3 py-3">
              {[FaFacebookF, FaLinkedinIn, FaInstagram, IoLogoWhatsapp].map((Icon, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center text-white/90 border border-white text-xl
                             w-10 h-10 rounded-full hover:text-green-400 hover:bg-white cursor-pointer"
                >
                  <Icon />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-bold text-white">Quick Links</h4>

            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={(e) => handleNavClick(e, item)}
                className="flex gap-1 items-center hover:text-white py-1"
              >
                <IoMdArrowDropright /> {item.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 md:flex-row md:items-center md:justify-between">
          <p>© Your Site Name, All Right Reserved.</p>
          <p>
          
            <a className="text-white hover:text-green-400" href="https://htmlcodex.com">
              
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
