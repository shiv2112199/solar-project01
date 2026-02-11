import { FaArrowUpLong } from "react-icons/fa6";

export default function BackToTop({ show }) {
  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-10 right-10 z-40 grid h-12 w-12 place-items-center rounded-full bg-green-400 text-white shadow-lg hover:opacity-90"
    >
      <FaArrowUpLong />
    </button>
  );
}
