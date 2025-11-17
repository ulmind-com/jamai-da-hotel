import { useState } from "react";
import { MenuItem } from "@/data/menuData";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Import all images
import chickenCurry from "@/assets/chicken-curry.jpg";
import chickenPakora from "@/assets/chicken-pakora.jpg";
import vegetarian from "@/assets/vegetarian.jpg";
import biryani from "@/assets/biryani.jpg";
import bread from "@/assets/bread.jpg";
import rolls from "@/assets/rolls.jpg";
import vegRice from "@/assets/veg-rice.jpg";
import nonVegRice from "@/assets/non-veg-rice.jpg";
import chowmein from "@/assets/chowmein.jpg";

interface ThaliCarouselProps {
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  isOrderingDisabled?: boolean;
}

const imageMap: Record<string, string> = {
  "chicken-curry": chickenCurry,
  "chicken-pakora": chickenPakora,
  "vegetarian": vegetarian,
  "biryani": biryani,
  "bread": bread,
  "rolls": rolls,
  "veg-rice": vegRice,
  "non-veg-rice": nonVegRice,
  "chowmein": chowmein,
};

const ThaliCarousel = ({ items, onItemClick, isOrderingDisabled = false }: ThaliCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handlePrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    }
    if (isRightSwipe) {
      handlePrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  if (!items || items.length === 0) return null;

  // Get previous, current, and next items for the carousel view
  const getPrevIndex = () => (currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  const getNextIndex = () => (currentIndex === items.length - 1 ? 0 : currentIndex + 1);

  const prevItem = items[getPrevIndex()];
  const currentItem = items[currentIndex];
  const nextItem = items[getNextIndex()];

  const getImageSrc = (item: MenuItem) => imageMap[item.image] || chickenCurry;

  return (
    <div className="relative max-w-7xl mx-auto py-8 overflow-hidden">
      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-2 md:left-8 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm hover:bg-background border-2 border-border rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Previous thali"
      >
        <ChevronLeft className="w-6 h-6 text-foreground" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 md:right-8 top-1/2 -translate-y-1/2 z-20 bg-background/90 backdrop-blur-sm hover:bg-background border-2 border-border rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        aria-label="Next thali"
      >
        <ChevronRight className="w-6 h-6 text-foreground" />
      </button>

      {/* Carousel Display - Shows 3 items with 3D perspective */}
      <div 
        className="flex items-center justify-center gap-4 md:gap-8 px-4"
        style={{ perspective: '1200px' }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Previous Item (Left) - Smaller with 3D effect */}
        <div 
          onClick={handlePrevious}
          className="cursor-pointer flex-shrink-0"
          style={{
            opacity: 0.6,
            transform: direction === 'right' 
              ? 'translateX(-30px) translateZ(-100px) rotateY(25deg) scale(0.75)' 
              : 'translateX(-50px) translateZ(-150px) rotateY(30deg) scale(0.7)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden transition-shadow duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.1)',
            }}
          >
            <img
              src={getImageSrc(prevItem)}
              alt={prevItem.name}
              className={`w-full h-full object-cover ${isOrderingDisabled ? 'grayscale' : ''}`}
            />
          </div>
        </div>

        {/* Current Item (Center) - Large with golden glow */}
        <div 
          onClick={() => onItemClick(currentItem)}
          className="cursor-pointer flex-shrink-0"
          style={{
            opacity: 1,
            transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="w-56 h-56 md:w-80 md:h-80 lg:w-96 lg:h-96 mx-auto rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
            style={{
              boxShadow: '0 20px 60px rgba(255, 215, 0, 0.3), 0 0 40px rgba(255, 215, 0, 0.2), 0 0 80px rgba(255, 215, 0, 0.1)',
            }}
          >
            <img
              src={getImageSrc(currentItem)}
              alt={currentItem.name}
              className={`w-full h-full object-cover ${isOrderingDisabled ? 'grayscale' : ''}`}
            />
          </div>

          {/* Name and Price */}
          <div 
            className="text-center mt-4 md:mt-6"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.5s ease-out 0.2s',
            }}
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
              {currentItem.name}
            </h3>
            <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[hsl(var(--footer-bg))]">
              ₹{currentItem.price}
            </div>
          </div>
        </div>

        {/* Next Item (Right) - Smaller with 3D effect */}
        <div 
          onClick={handleNext}
          className="cursor-pointer flex-shrink-0"
          style={{
            opacity: 0.6,
            transform: direction === 'left' 
              ? 'translateX(30px) translateZ(-100px) rotateY(-25deg) scale(0.75)' 
              : 'translateX(50px) translateZ(-150px) rotateY(-30deg) scale(0.7)',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div 
            className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden transition-shadow duration-300"
            style={{
              boxShadow: '0 8px 32px rgba(255, 215, 0, 0.15), 0 0 20px rgba(255, 215, 0, 0.1)',
            }}
          >
            <img
              src={getImageSrc(nextItem)}
              alt={nextItem.name}
              className={`w-full h-full object-cover ${isOrderingDisabled ? 'grayscale' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Indicator Dots */}
      <div className="flex justify-center gap-2 mt-8">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 'right' : 'left');
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-primary"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThaliCarousel;
