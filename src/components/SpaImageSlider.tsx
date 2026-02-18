"use client";

import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface SpaImageSliderProps {
  images: { src: string; alt: string }[];
}

export default function SpaImageSlider({ images }: SpaImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  if (!images || images.length === 0) {
    return <div className="h-full w-full bg-gray-200 animate-pulse rounded-2xl"></div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Main Slider */}
      <div className="relative group w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl mb-6">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover transition-all duration-700 ease-in-out"
          priority
        />
        
        {/* Left Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
          <FaChevronLeft onClick={prevSlide} size={30} />
        </div>
        
        {/* Right Arrow */}
        <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer hover:bg-black/40 transition-colors">
          <FaChevronRight onClick={nextSlide} size={30} />
        </div>

        {/* Slide Counter/Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
            {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex justify-center gap-4 overflow-x-auto pb-4 px-2 scrollbar-hide">
        {images.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`relative min-w-[80px] h-[80px] md:min-w-[100px] md:h-[100px] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
              currentIndex === slideIndex
                ? "border-purple-600 scale-105 shadow-lg opacity-100"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={slide.src}
              alt={`Thumbnail ${slideIndex + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
