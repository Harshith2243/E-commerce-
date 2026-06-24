import { useEffect, useState } from "react";

export default function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[75vh] sm:min-h-[85vh] lg:h-[90vh] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1800')",
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Tag */}
        <span
          className={`inline-block bg-orange-600 text-white text-[10px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-[0.2em] px-3 sm:px-4 py-1.5 rounded-full mb-5 sm:mb-6 transition-all duration-700 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          PREMIUM SUPPLEMENTS & GEAR
        </span>

        {/* Heading */}
        <h1
          className={`font-black text-white leading-[0.95] transition-all duration-700 delay-100 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            fontSize: "clamp(2.2rem, 9vw, 6.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          BUILD YOUR
          <br />
          <span className="text-orange-500">BODY</span>
        </h1>

        {/* Description */}
        <p
          className={`text-gray-300 text-sm sm:text-base md:text-lg lg:text-xl mt-4 sm:mt-6 max-w-xs sm:max-w-lg lg:max-w-2xl transition-all duration-700 delay-200 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Everything you need to train harder, recover faster, and look the part.
        </p>

        {/* Button */}
        <div
          className={`flex gap-4 mt-8 sm:mt-10 transition-all duration-700 delay-300 ${
            loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <button
            onClick={() =>
              document
                .getElementById("featured-products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-orange-600 hover:bg-orange-500 text-white px-6 sm:px-8 lg:px-9 py-3 sm:py-4 rounded-xl text-sm sm:text-base lg:text-lg font-bold transition-all hover:scale-105 active:scale-95"
          >
            Shop Now
          </button>
        </div>

        {/* Scroll Indicator - hide on very small screens */}
        <div
          className={`hidden sm:block absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-700 delay-500 ${
            loaded ? "opacity-70" : "opacity-0"
          }`}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}