import { MenuItem } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";
import ThaliCarousel from "./ThaliCarousel";
import { useIsMobile } from "@/hooks/use-mobile";
import { TiffinPeriod } from "@/hooks/use-tiffin-time";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  isThaliTime?: boolean;
  tiffinPeriod?: TiffinPeriod;
}

const MenuSection = ({ category, items, onItemClick, isThaliTime = false, tiffinPeriod = 'none' }: MenuSectionProps) => {
  const isAllItems = category === "All Items";
  const isThali = category === "Thali";
  const isTiffin = category === "Tiffin";
  const isMobile = useIsMobile();
  
  // Don't filter Tiffin items - show all items but disable ordering based on time
  const filteredItems = items;
  
  // During thali time (12:00 PM - 3:30 PM), disable ordering for non-thali items
  const isOrderingDisabled = isThaliTime && !isThali;
  // During regular time, disable ordering for thali items
  const isThaliDisabled = !isThaliTime && isThali;
  // For Tiffin items, disable ordering when it's not tiffin time at all
  const isTiffinDisabled = isTiffin && tiffinPeriod === 'none';
  // During morning tiffin time (7:00 AM - 11:59 AM), disable ordering for non-tiffin items
  const isMorningTiffinDisabled = tiffinPeriod === 'morning' && !isTiffin;
  // During evening tiffin time (5:00 PM - 7:30 PM), disable ordering for thali items only
  const isEveningThaliDisabled = tiffinPeriod === 'evening' && isThali;
  
  // For "All Items", mix circular and card layouts
  // 8 items on mobile (2 rows of 4), 16 on larger screens (2 rows of 8)
  const circularCount = isMobile ? 8 : 16;
  const circularItems = isAllItems ? filteredItems.slice(0, circularCount) : [];
  const cardItems = isAllItems ? filteredItems.slice(circularCount) : filteredItems;

  return (
    <section className="py-8">
      <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
        {category}
      </h2>
      
      {isOrderingDisabled && (
        <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-semibold">
            ⏰ Thali Time! (12:00 PM - 3:30 PM) - Regular menu items are not available during this time. Please check our special Thali section.
          </p>
        </div>
      )}
      
      {isThaliDisabled && (
        <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-semibold">
            ⏰ Thali items are only available from 12:00 PM - 3:30 PM.
          </p>
        </div>
      )}
      
      {isMorningTiffinDisabled && (
        <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-semibold">
            🌅 Morning Tiffin Time! (7:00 AM - 11:59 AM) - Only Tiffin items are available during this time. Please check our Tiffin section.
          </p>
        </div>
      )}
      
      {isEveningThaliDisabled && (
        <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-semibold">
            🌆 Evening Tiffin Time! (5:00 PM - 7:30 PM) - Thali items are not available during this time. Please enjoy our Tiffin and other menu items.
          </p>
        </div>
      )}
      
      {isTiffinDisabled && (
        <div className="bg-amber-100 dark:bg-amber-900/30 border-2 border-amber-500 rounded-lg p-4 mb-8 text-center">
          <p className="text-amber-800 dark:text-amber-200 font-semibold">
            ⏰ Tiffin items are only available during Morning (7:00 AM - 11:59 AM) and Evening (5:00 PM - 7:30 PM) Tiffin times.
          </p>
        </div>
      )}
      
      {isThali && (
        <ThaliCarousel items={items} onItemClick={onItemClick} isOrderingDisabled={isThaliDisabled} />
      )}
      
      {!isThali && (
        <>
          {isAllItems && circularItems.length > 0 && (
            <>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">
                What's On Your Mind?
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-12">
                {circularItems.map((item, index) => (
                  <MenuItemCard 
                    key={`circle-${item.name}-${index}`} 
                    item={item}
                    onClick={() => isOrderingDisabled ? {} : onItemClick(item)}
                    variant="circle"
                  />
                ))}
              </div>
              
              <div className="border-t border-border my-8" />
              
              <h3 className="text-2xl font-bold text-foreground mb-6">
                All Dishes
              </h3>
            </>
          )}
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${(isOrderingDisabled || isTiffinDisabled) ? 'opacity-50 pointer-events-none' : ''}`}>
            {cardItems.map((item, index) => (
              <MenuItemCard 
                key={`${item.name}-${index}`} 
                item={item}
                onClick={() => (isOrderingDisabled || isTiffinDisabled) ? {} : onItemClick(item)}
                variant="card"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default MenuSection;