import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { MenuItem } from "@/data/menuData";
import { ShoppingCart, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useRestaurantHours } from "@/hooks/use-restaurant-hours";
import { Alert, AlertDescription } from "@/components/ui/alert";


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
import chilichiken from "@/assets/chilichiken.jpeg";
import chikenchap from "@/assets/chikenchap.jpg";
import chikenmanchurian from "@/assets/chikenmanchurian.jpg";
import chikenkosha from "@/assets/chikenkosha.jpeg";
import chikenmasla from "@/assets/chikenmasla.jpeg";
import eggtadka from "@/assets/eggtadka.jpg";
import chilipanner from "@/assets/chilipanner.jpg";
import maslapanner from "@/assets/maslapanner.avif";
import matarpanner from "@/assets/matarpanner.jpg";
import chanamasla from "@/assets/chanamasla.webp";
import chanadal from "@/assets/chanadal.jpg";
import blackchana from "@/assets/blackchana.webp";
import vegmanchurian from "@/assets/vegmanchurian.jpg";
import chilisoyabin from "@/assets/chilisoyabin.jpg";
import vegtadka from "@/assets/vegtadka.jpg";
import mixveg from "@/assets/mixveg.jpg";
import alusoyabin from "@/assets/alusoyabin.jpg";
import govialu from "@/assets/govi alu.jpg";
import aludam from "@/assets/aludam.jpg";
import begunbharta from "@/assets/begunbharta.webp";
import alubegun from "@/assets/alubegun.webp";
import chikenbriyani from "@/assets/chikenbriyani.webp";
import vegfriedrice from "@/assets/vegfriedrice.jpg";
import eggfriedrice from "@/assets/eggfriedrice.jpg";
import chikenfriedrice from "@/assets/chikenfriedrice.jpg";
import plainroti from "@/assets/plain-roti.jpg";
import plainparatha from "@/assets/plain-paratha.jpg";
import aluparatha from "@/assets/aluparatha.jpg";
import sattuparatha from "@/assets/sattuparatha.jpg";
import lachhaparatha from "@/assets/lachhaparatha.webp";
import plainpuri from "@/assets/plainpuri.jpg";
import palakpuri from "@/assets/palakpuri.jpg";
import plainnun from "@/assets/plainnun.jpg";
import butternun from "@/assets/butternun.jpg";
import luchisobji from "@/assets/luchisobji.webp";
import breadtost from "@/assets/breadtost.jpg";
import eggtost from "@/assets/eggtost.jpg";
import samosa from "@/assets/samosa.jpg";
import chikenlolipop from "@/assets/chikenlolipop.jpg";
import chikenpokora from "@/assets/chikenpokora.jpg";
import vegpokora from "@/assets/vegpokora.jpg";
import vegchowmin from "@/assets/vegchowmin.jpg";
import chikenchowmin from "@/assets/chikenchowmin.jpg";
import eggchikenchowmin from "@/assets/eggchikenchow.jpg";
import specialchikenchowmin from "@/assets/specialchikenchowmin.webp";
import eggroll from "@/assets/eggroll.jpg";
import chikenroll from "@/assets/chikenroll.jpg";
import eggchikenroll from "@/assets/eggchikenroll.jpg";
import pannerroll from "@/assets/pannerroll.jpg";
import sabjibhat from "@/assets/sabjibhat.jpg";
import paneerthali from "@/assets/paneerthali.jpeg";
import chickenthali from "@/assets/chickenthali.jpg";
import eggcurrythali from "@/assets/eggcurry.jpg";
import fishthali from "@/assets/fishthali.jpg";
import eggchowmin from "@/assets/eggchowmin.jpg";


interface MenuItemDialogProps {
  item: MenuItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  "chilichiken":chilichiken,
  "chiken-chap":chikenchap,
  "chiken-manchurian":chikenmanchurian,
  "chiken-kosha":chikenkosha,
  "chiken-masla":chikenmasla,
  "egg-tadka":eggtadka,
  "chili-panner":chilipanner,
  "masla-panner":maslapanner,
  "matar-panner":matarpanner,
  "chanamasla":chanamasla,
  "chanadal":chanadal,
  "black-chana":blackchana,
  "veg-manchurian":vegmanchurian,
  "chili-soyabin":chilisoyabin,
  "vegtadka":vegtadka,
  "mix-veg":mixveg,
  "alu-soyabin":alusoyabin,
  "govi-alu":govialu,
  "alu-dam":aludam,
  "begun-bharta":begunbharta,
  "alu-begun":alubegun,
  "chiken-briyani":chikenbriyani,
  "veg-fried-rice":vegfriedrice,
  "egg-fried-rice":eggfriedrice,
  "chiken-fried-rice":chikenfriedrice,
   "plain-roti":plainroti,
  "plain-paratha":plainparatha,
  "alu-paratha":aluparatha,
  "sattu-paratha":sattuparatha,
  "lachha-paratha":lachhaparatha,
  "plain-puri":plainpuri,
  "palak-puri":palakpuri,
  "plain-nun":plainnun,
  "butter-nun":butternun,
  "luchi-sobji":luchisobji,
  "bread-tost":breadtost,
  "egg-tost":eggtost,
  "samosa":samosa,
  "chiken-lolipop":chikenlolipop,
  "chiken-pokora":chikenpokora,
  "veg-pokora":vegpokora,
  "veg-chowmin":vegchowmin,
  "chiken-chowmin":chikenchowmin,
  "egg-chiken-chowmin":eggchikenchowmin,
  "special-chiken-chowmin":specialchikenchowmin,
  "egg-roll":eggroll,
  "chiken-roll":chikenroll,
  "egg-chiken-roll":eggchikenroll,
  "panner-roll":pannerroll,
  "sabjibhat":sabjibhat,
  "paneerthali":paneerthali,
  "chickenthali":chickenthali,
  "eggcurrythali":eggcurrythali,
  "fishthali":fishthali,
  "eggchowmin":eggchowmin,
};

const MenuItemDialog = ({ item, open, onOpenChange }: MenuItemDialogProps) => {
  const [quantity, setQuantity] = useState(1);
  const [portion, setPortion] = useState<"full" | "half">("full");
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { isOpen: isRestaurantOpen, nextOpenTime, openingHours } = useRestaurantHours();

  if (!item) return null;

  const handleAddToCart = () => {
    addToCart(item, quantity, portion);
    toast({
      title: "Added to cart",
      description: `${item.name} ${item.half ? `(${portion})` : ''} × ${quantity}`,
    });
    onOpenChange(false);
    setQuantity(1);
    setPortion("full");
  };

  const imageSrc = imageMap[item.image] || chickenCurry;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      onOpenChange(isOpen);
      if (!isOpen) {
        setQuantity(1);
        setPortion("full");
      }
    }}>
      <DialogContent className="w-full h-full md:max-w-2xl md:h-auto md:max-h-[90vh] overflow-hidden p-0 gap-0 flex flex-col">
        {/* Mobile: Full screen layout */}
        <div className="flex flex-col h-full md:hidden">
          {/* Hero Image with Quantity Controls */}
          <div className="relative w-full h-[45vh] flex-shrink-0">
            <img
              src={imageSrc} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
            
            {/* Quantity Controls - Positioned on image */}
            <div className="absolute bottom-4 right-4 flex flex-col gap-2 bg-white rounded-full shadow-lg p-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!isRestaurantOpen}
                className="h-10 w-10 p-0 rounded-full bg-white hover:bg-gray-100"
              >
                <span className="text-xl font-bold text-[hsl(var(--footer-bg))]">+</span>
              </Button>
              <span className="text-lg font-bold text-gray-900 text-center px-2">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || !isRestaurantOpen}
                className="h-10 w-10 p-0 rounded-full bg-white hover:bg-gray-100"
              >
                <span className="text-xl font-bold text-[hsl(var(--footer-bg))]">−</span>
              </Button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-900 rounded-t-3xl -mt-6 relative z-10 overflow-y-auto">
            <div className="p-6 space-y-4">
              {/* Title and Price */}
              <div className="flex justify-between items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {item.name}
                </h2>
              </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-[hsl(var(--footer-bg))]">
                    ₹{(portion === "half" && item.half ? item.half : item.price) * quantity}
                  </span>
                </div>
              </div>


              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {item.description}
              </p>

              {/* Portion Selection */}
              {item.half && (
                <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <Label className="text-sm font-semibold text-gray-900 dark:text-white">Select Portion Size</Label>
                  <RadioGroup 
                    value={portion} 
                    onValueChange={(value) => setPortion(value as "full" | "half")} 
                    className="flex gap-3"
                    disabled={!isRestaurantOpen}
                  >
                    <div className="flex items-center space-x-2 flex-1 bg-white dark:bg-gray-900 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                      <RadioGroupItem value="full" id="full" disabled={!isRestaurantOpen} />
                      <Label htmlFor="full" className={`cursor-pointer flex-1 text-sm ${!isRestaurantOpen ? 'opacity-50' : ''}`}>
                        Full - ₹{item.price}
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 flex-1 bg-white dark:bg-gray-900 p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700">
                      <RadioGroupItem value="half" id="half" disabled={!isRestaurantOpen} />
                      <Label htmlFor="half" className={`cursor-pointer flex-1 text-sm ${!isRestaurantOpen ? 'opacity-50' : ''}`}>
                        Half - ₹{item.half}
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              )}

              {/* Closed Alert */}
              {!isRestaurantOpen && (
                <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                  <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertDescription className="text-red-800 dark:text-red-200 font-medium text-sm">
                    Restaurant is currently closed. We open at {nextOpenTime}. Regular hours: {openingHours}
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Fixed Bottom Button */}
            <div className="sticky bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
              <Button
                onClick={handleAddToCart}
                disabled={!isRestaurantOpen}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRestaurantOpen ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Order Now
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Closed
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop: Original layout */}
        <div className="hidden md:flex md:flex-col md:max-h-[90vh]">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl font-bold text-foreground">
              {item.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            <div className="relative w-full h-80 rounded-xl overflow-hidden shadow-lg">
              <img
                src={imageSrc} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            <DialogDescription className="text-base text-foreground/80 leading-relaxed">
              {item.description}
            </DialogDescription>

            {!isRestaurantOpen && (
              <Alert className="bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800">
                <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
                <AlertDescription className="text-red-800 dark:text-red-200 font-medium">
                  Restaurant is currently closed. We open at {nextOpenTime}. Regular hours: {openingHours}
                </AlertDescription>
              </Alert>
            )}

            {item.half && (
              <div className="space-y-3 p-4 bg-muted/30 rounded-xl border-2 border-primary/10">
                <Label className="text-sm font-semibold text-foreground">Select Portion Size</Label>
                <RadioGroup 
                  value={portion} 
                  onValueChange={(value) => setPortion(value as "full" | "half")} 
                  className="flex gap-4"
                  disabled={!isRestaurantOpen}
                >
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="full" id="full-desktop" disabled={!isRestaurantOpen} />
                    <Label htmlFor="full-desktop" className={`cursor-pointer flex-1 text-sm ${!isRestaurantOpen ? 'opacity-50' : ''}`}>
                      Full - ₹{item.price}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 flex-1">
                    <RadioGroupItem value="half" id="half-desktop" disabled={!isRestaurantOpen} />
                    <Label htmlFor="half-desktop" className={`cursor-pointer flex-1 text-sm ${!isRestaurantOpen ? 'opacity-50' : ''}`}>
                      Half - ₹{item.half}
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>

          {/* Desktop Bottom Section */}
          <div className="px-6 pb-6 space-y-4 border-t border-border pt-4">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[hsl(var(--footer-bg))]">
                ₹{(portion === "half" && item.half ? item.half : item.price) * quantity}
              </span>
            </div>

            <div className="flex gap-3 items-center">
              <div className={`inline-flex items-center gap-2 border-2 border-[hsl(var(--footer-bg))]/20 rounded-xl px-2 py-2 bg-muted/30 ${!isRestaurantOpen ? 'opacity-50' : ''}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1 || !isRestaurantOpen}
                  className="h-8 w-8 p-0 hover:bg-[hsl(var(--footer-bg))]/10 rounded-lg"
                >
                  <span className="text-xl font-bold text-[hsl(var(--footer-bg))]">−</span>
                </Button>
                <span className="text-lg font-bold text-foreground min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={!isRestaurantOpen}
                  className="h-8 w-8 p-0 hover:bg-[hsl(var(--footer-bg))]/10 rounded-lg"
                >
                  <span className="text-xl font-bold text-[hsl(var(--footer-bg))]">+</span>
                </Button>
              </div>
              
              <Button
                onClick={handleAddToCart}
                disabled={!isRestaurantOpen}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-6 text-lg rounded-xl transition-all duration-300 hover:shadow-xl gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRestaurantOpen ? (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                ) : (
                  <>
                    <Clock className="w-5 h-5" />
                    Closed
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MenuItemDialog;
