"use client";

import { useEffect, useState } from "react";
import { RiImageAddFill } from "react-icons/ri";

export default function ArtGalleryClient() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smoothly to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col justify-center items-center text-center mt-8">
      <h4 className="text-primary mb-4 max-w-lg text-md md:text-lg lg:text-xl px-[20px]">
        Students of Saranda Houses can share their artworks here. Click “Add
        Post” to upload your art and inspire others!
      </h4>
      <button className="text-primary p-3 bg-secondary hover:bg-secondary-90 rounded-full transition-all duration-500 hover:opacity-90 hover:scale-110 border-b-emerald-700 border">
        <RiImageAddFill size={24} />
      </button>

      {/* Scroll to top button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-secondary text-primary p-3 rounded-full shadow-lg transition-all duration-500 hover:scale-110 border-b-emerald-700 border z-[100] ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
       <RiImageAddFill size={24} />
      </button>
    </div>
  );
}
