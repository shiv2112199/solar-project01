import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Navbar from "../components/Navbar";
import HeroCarousel from "../components/HeroCarousel";
import About from "../components/About";
import Services from "../components/Services";
import Quote from "../components/Quote";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import WhyChooseUs from "../components/WhyChooseUs";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    // Loader delay
    const t = setTimeout(() => setLoading(false), 250);

    // Scroll listener for sticky navbar & back-to-top
    const onScroll = () => {
      const y = window.scrollY || 0;
      setIsSticky(y > 300);
      setShowTop(y > 300);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="font-sans text-slate-700">
      {/* Loader */}
      <Spinner loading={loading} />

      {/* Navbar */}
      <Navbar isSticky={isSticky} />

      {/* Sections */}
      <section id="home">
        <HeroCarousel />
      </section>

      <section id="about">
        <About />
      </section>

      <section>
        <WhyChooseUs />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="quote">
        <Quote />
      </section>

      <section id="contact">
        <Contact />
      </section>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop show={showTop} />
    </div>
  );
}
