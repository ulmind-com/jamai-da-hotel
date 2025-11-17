import { MenuItem } from "@/data/menuData";
import MenuItemCard from "./MenuItemCard";
import ThaliCarousel from "./ThaliCarousel";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuSectionProps {
  category: string;
  items: MenuItem[];
  onItemClick: (item: MenuItem) => void;
  isThaliTime?: boolean;
}

const MenuSection = ({ category, items, onItemClick, isThaliTime = false }: MenuSectionProps) => {
  const isAllItems = category === "All Items";
  const isThali = category === "Thali";
  const isMobile = useIsMobile();
  
  // During thali time (12:00 PM - 3:30 PM), disable ordering for non-thali items
  const isOrderingDisabled = isThaliTime && !isThali;
  // During regular time, disable ordering for thali items
  const isThaliDisabled = !isThaliTime && isThali;
  
  // For "All Items", mix circular and card layouts
  // 8 items on mobile (2 rows of 4), 16 on larger screens (2 rows of 8)
  const circularCount = isMobile ? 8 : 16;
  const circularItems = isAllItems ? items.slice(0, circularCount) : [];
  const cardItems = isAllItems ? items.slice(circularCount) : items;

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
            ⏰ Regular Menu Time - Thali items are only available from 12:00 PM - 3:30 PM. Please check our regular menu items.
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
          
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isOrderingDisabled ? 'opacity-50 pointer-events-none' : ''}`}>
            {cardItems.map((item, index) => (
              <MenuItemCard 
                key={`${item.name}-${index}`} 
                item={item}
                onClick={() => isOrderingDisabled ? {} : onItemClick(item)}
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
