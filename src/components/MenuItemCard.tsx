import { MenuItem } from "@/data/menuData";
import { Eye } from "lucide-react";

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

interface MenuItemCardProps {
  item: MenuItem;
  onClick: () => void;
  variant?: "card" | "circle";
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

const MenuItemCard = ({ item, onClick, variant = "card" }: MenuItemCardProps) => {
  const imageSrc = imageMap[item.image] || chickenCurry;

  const handleBuyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  if (variant === "circle") {
    return (
      <button
        onClick={onClick}
        className="group flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-all duration-300 cursor-pointer"
      >
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
          <img
            src={imageSrc}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="text-center">
          <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-1">
            {item.name}
          </h3>
          <div className="flex items-center justify-center gap-0.5 text-[hsl(var(--footer-bg))] font-bold text-sm sm:text-base mt-1">
            <span>₹{item.price}</span>
            {item.half && (
              <span className="text-xs text-muted-foreground ml-1">
                / ₹{item.half}
              </span>
            )}
          </div>
        </div>
      </button>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="bg-card rounded-3xl p-6 pt-24 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 animate-fade-in cursor-pointer group relative mt-20"
    >
      {/* Circular Image Overlapping Top Edge */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-xl border-4 border-card group-hover:scale-105 transition-transform duration-300">
          <img 
            src={imageSrc} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="text-center">
        <h3 className="text-xl font-bold text-card-foreground mb-2">
          {item.name}
        </h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[40px]">
          {item.description}
        </p>

        {/* Price and Buy Button Side by Side */}
        <div className="flex items-center justify-center gap-3">
          <div className="flex items-center justify-center gap-1 border-2 border-border rounded-full px-4 py-2 min-w-[100px]">
            <span className="text-lg font-bold text-card-foreground">₹{item.price}</span>
            {item.half && (
              <span className="text-xs text-muted-foreground">
                / ₹{item.half}
              </span>
            )}
          </div>
          
          <button
            onClick={handleBuyClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2 px-6 rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
