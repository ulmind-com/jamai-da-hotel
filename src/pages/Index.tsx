import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryTabs from "@/components/CategoryTabs";
import MenuSection from "@/components/MenuSection";
import MenuItemDialog from "@/components/MenuItemDialog";
import Footer from "@/components/Footer";
import Cart from "@/components/Cart";
import { NotificationBanner } from "@/components/NotificationBanner";
import { CartProvider } from "@/contexts/CartContext";
import { menuData, categories, MenuItem } from "@/data/menuData";
import { useNotifications } from "@/hooks/use-notifications";
import { useThaliTime } from "@/hooks/use-thali-time";
import { useTiffinTime } from "@/hooks/use-tiffin-time";

const NotificationsWrapper = ({ children }: { children: React.ReactNode }) => {
  useNotifications();
  return <>{children}</>;
};

const Index = () => {
  const { isThaliTime } = useThaliTime();
  const { tiffinPeriod, isTiffinTime } = useTiffinTime();
  
  // Reorder categories based on time - always show all, but reorder
  const orderedCategories = useMemo(() => {
    const baseCategories = categories.filter(cat => cat !== "Thali" && cat !== "Tiffin");
    
    // Morning Tiffin time (7:00 AM - 11:59 AM): Tiffin first, Thali last
    if (tiffinPeriod === 'morning') {
      return ["Tiffin", ...baseCategories, "Thali"];
    }
    
    // Thali time (12:00 PM - 3:30 PM): Thali first, Tiffin last
    if (isThaliTime) {
      return ["Thali", ...baseCategories, "Tiffin"];
    }
    
    // Evening Tiffin time (5:00 PM - 7:30 PM): Tiffin first, Thali last
    if (tiffinPeriod === 'evening') {
      return ["Tiffin", ...baseCategories, "Thali"];
    }
    
    // Regular time: All categories in normal order, Thali and Tiffin at end
    return [...baseCategories, "Tiffin", "Thali"];
  }, [isThaliTime, tiffinPeriod]);

  const [activeCategory, setActiveCategory] = useState(orderedCategories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update active category when time changes
  useMemo(() => {
    setActiveCategory(orderedCategories[0]);
  }, [isThaliTime, tiffinPeriod]);

  // Flatten all menu items for search
  const allMenuItems = useMemo(() => {
    return Object.entries(menuData).flatMap(([category, items]) =>
      items.map(item => ({ item, category }))
    );
  }, []);

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setDialogOpen(true);
  };

  return (
    <CartProvider>
      <NotificationsWrapper>
        <div className="min-h-screen bg-background">
          <Navbar allItems={allMenuItems} onItemClick={handleItemClick} />
          <NotificationBanner />
          <Hero />
        <CategoryTabs 
          categories={orderedCategories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <MenuSection 
            category={activeCategory}
            items={menuData[activeCategory]}
            onItemClick={handleItemClick}
            isThaliTime={isThaliTime}
            tiffinPeriod={tiffinPeriod}
          />
        </main>

        <MenuItemDialog 
          item={selectedItem}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />

        <Footer />
        <Cart />
        </div>
      </NotificationsWrapper>
    </CartProvider>
  );
};

export default Index;