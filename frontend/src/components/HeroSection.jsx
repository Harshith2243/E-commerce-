import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">

      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800')",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">

        <span
          className={`inline-block bg-orange-600 text-white text-xs font-bold tracking-[0.2em] px-4 py-1.5 rounded-full mb-6 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          PREMIUM SUPPLEMENTS & GEAR
        </span>

        <h1
          className={`font-black text-white leading-[0.95] transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)", letterSpacing: "-0.02em" }}
        >
          BUILD YOUR
          <br />
          <span className="text-orange-500">BODY</span>
        </h1>

        <p
          className={`text-gray-300 text-lg md:text-xl mt-6 max-w-xl transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Everything you need to train harder, recover faster, and look the part.
        </p>

        <div
          className={`flex gap-4 mt-10 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() => document.getElementById("featured-products")?.scrollIntoView({ behavior: "smooth" })}
            className="bg-orange-600 hover:bg-orange-500 text-white px-9 py-4 rounded-xl text-lg font-bold transition-all hover:scale-105 active:scale-95"
          >
            Shop Now
          </button>
        </div>

        <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-500 ${loaded ? "opacity-70" : "opacity-0"}`}>
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}