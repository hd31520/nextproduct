"use client";

import { useState } from "react";

const slides = [
  {
    id: 1,
    image: "https://i.ibb.co.com/GQGZKnfT/smart-tv-jpg.jpg",
    title: "Welcome to Our Shop",
    description: "Discover the best deals and exclusive collections, just for you.",
    button: "Shop Now",
  },
  {
    id: 2,
    image: "https://i.ibb.co.com/sdcdJBSz/gaming-keyboard-jpgw.jpg",
    title: "Trendy Fashion",
    description: "Stay stylish with our latest fashion collection.",
    button: "Explore",
  },
  {
    id: 3,
    image: "https://i.ibb.co.com/0V6t8Dgp/gameing-mouse.jpg",
    title: "Latest Gadgets",
    description: "Upgrade your lifestyle with top-rated electronics.",
    button: "Buy Now",
  },
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-[500px] overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Background Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Content Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center text-white px-6">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{slide.title}</h2>
            <p className="text-lg mb-6">{slide.description}</p>
            <button className="btn btn-primary">{slide.button}</button>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-full"
      >
        ❮
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--foreground)] text-[var(--background)] px-4 py-2 rounded-full"
      >
        ❯
      </button>
    </section>
  );
}
