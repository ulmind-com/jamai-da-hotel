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

const NotificationsWrapper = ({ children }: { children: React.ReactNode }) => {
  useNotifications();
  return <>{children}</>;
};

const Index = () => {
  const { isThaliTime } = useThaliTime();
  
  // Reorder categories based on thali time
  const orderedCategories = useMemo(() => {
    if (isThaliTime) {
      // During thali time (12:00 PM - 3:30 PM): Show Thali first
      return ["Thali", ...categories.filter(cat => cat !== "Thali")];
    } else {
      // After thali time: Show All Items first, Thali last
      const filtered = categories.filter(cat => cat !== "Thali");
      return [...filtered, "Thali"];
    }
  }, [isThaliTime]);

  const [activeCategory, setActiveCategory] = useState(orderedCategories[0]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Update active category when time changes
  useMemo(() => {
    setActiveCategory(orderedCategories[0]);
  }, [isThaliTime]);

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
