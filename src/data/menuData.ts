export interface MenuItem {
  name: string;
  price: number;
  half?: number;
  description: string;
  image: string;
  tiffinPeriod?: 'morning' | 'evening'; // For tiffin items
}

export interface MenuCategory {
  [category: string]: MenuItem[];
}

export const menuData: MenuCategory = {
  "All Items": [], // Will be populated below
  "Thali": [
    { name: "Veg Thali", price: 45, description: "Rice, 2 sabji, alu bhaja/chokha, daal, papor. Complete vegetarian meal.", image: "vegetarian" },
    { name: "Egg Thali", price: 60, description: "Rice, 2 sabji, alu bhaja/chokha, daal, papor. Nutritious meal with egg curry.", image: "chicken-curry" },
    { name: "Fish Thali", price: 75, description: "Rice, 2 sabji, alu bhaja/chokha, daal, papor. Bengali style fish curry meal.", image: "chicken-curry" },
    { name: "Chicken Thali", price: 95, description: "Rice, 2 sabji, alu bhaja/chokha, daal, papor. Hearty chicken curry meal.", image: "chicken-curry" },
    { name: "Paneer Thali", price: 95, description: "Rice, 2 sabji, alu bhaja/chokha, daal, papor. Delicious paneer curry meal.", image: "vegetarian" },
    { name: "Only Rice and Chicken Curry", price: 70, description: "Rice, alu bhaja/chokha, daal, papor with chicken curry.", image: "chicken-curry" },
    { name: "Only Rice Fish Curry", price: 55, description: "Rice, alu bhaja/chokha, daal, papor with fish curry.", image: "chicken-curry" },
    { name: "Only Rice Egg Curry", price: 45, description: "Rice, alu bhaja/chokha, daal, papor with egg curry.", image: "chicken-curry" },
    { name: "Only Rice Paneer Curry", price: 70, description: "Rice, alu bhaja/chokha, daal, papor with paneer curry.", image: "vegetarian" }
  ],
  "Tiffin": [
    // Morning Tiffin (7:00 AM - 11:59 AM)
    { name: "Luchi Sabji", price: 30, description: "3 pieces of fluffy deep-fried puffed bread served with delicious spiced potato curry. Traditional Bengali breakfast favorite.", image: "bread", tiffinPeriod: 'morning' },
    { name: "Bread Toast", price: 25, description: "Crispy golden brown toasted bread slices, lightly buttered. Simple and satisfying breakfast option.", image: "bread", tiffinPeriod: 'morning' },
    { name: "Egg Toast", price: 25, description: "Toasted bread topped with spiced scrambled eggs. Perfect protein-packed breakfast to start your day.", image: "bread", tiffinPeriod: 'morning' },
    
    // Evening Tiffin (5:00 PM - 7:30 PM)
    { name: "Samosa", price: 7, description: "Crispy triangular pastry filled with spiced potatoes and peas. Classic Indian snack perfect with chai.", image: "vegetarian", tiffinPeriod: 'evening' },
    { name: "Chicken Lollipop", price: 25, description: "Indo-Chinese style chicken drumettes marinated in spicy batter, deep-fried until golden and crispy. A perfect appetizer.", image: "chicken-pakora", tiffinPeriod: 'evening' },
    { name: "Chicken Pokora", price: 15, description: "Crispy deep-fried chicken fritters marinated with aromatic spices. Served hot with mint chutney.", image: "chicken-pakora", tiffinPeriod: 'evening' },
    { name: "Veg Pakora", price: 10, description: "Mixed vegetable fritters coated in spiced gram flour batter and deep-fried. Crispy and delicious.", image: "vegetarian", tiffinPeriod: 'evening' },
    { name: "Veg Chowmein", price: 40, description: "Classic Hakka noodles stir-fried with fresh vegetables, garlic, and savory sauces. Light and tasty evening snack.", image: "chowmein", tiffinPeriod: 'evening' },
    { name: "Chicken Chowmein", price: 50, description: "Delicious noodles stir-fried with tender chicken pieces, crunchy vegetables, and aromatic sauces.", image: "chowmein", tiffinPeriod: 'evening' },
    { name: "Egg Chicken Chowmein", price: 80, description: "Best of both worlds - noodles with chicken and eggs, vegetables, and flavorful sauces.", image: "chowmein", tiffinPeriod: 'evening' },
    { name: "Chicken Chowmein Special", price: 75, description: "Premium chicken chowmein with extra chicken, special spices, and chef's signature sauce.", image: "chowmein", tiffinPeriod: 'evening' },
    { name: "Egg Roll", price: 35, description: "Soft paratha wrapped around spiced egg omelet with onions, green chilies, and sauces. Quick and tasty.", image: "rolls", tiffinPeriod: 'evening' },
    { name: "Chicken Roll", price: 70, description: "Succulent chicken tikka pieces wrapped in soft paratha with onions, mint chutney, and spicy sauces.", image: "rolls", tiffinPeriod: 'evening' },
    { name: "Egg Chicken Roll", price: 75, description: "Delicious combination of egg and chicken tikka wrapped in paratha with veggies and tangy sauces.", image: "rolls", tiffinPeriod: 'evening' },
    { name: "Paneer Roll", price: 70, description: "Grilled paneer cubes with onions, bell peppers, and sauces wrapped in soft paratha. Perfect vegetarian option.", image: "rolls", tiffinPeriod: 'evening' }
  ],
  "Non Veg": [
    { name: "Chili Chicken", price: 50, half: 30, description: "Spicy Indo-Chinese chicken pieces tossed with green chilies, onions, and bell peppers. 4 pcs full, 2 pcs half.", image: "chicken-curry" },
    { name: "Chicken Chaap", price: 60, description: "Tender chicken pieces marinated in yogurt and spices, slow-cooked in a rich, flavorful gravy.", image: "chicken-curry" },
    { name: "Chicken Manchurian", price: 60, half: 30, description: "Crispy chicken balls in tangy, spicy Indo-Chinese sauce with soy, vinegar, and garlic. 4 pcs full, 2 pcs half.", image: "chicken-curry" },
    { name: "Chicken Kosha", price: 100, half: 50, description: "Traditional Bengali-style dry chicken curry with whole spices, slow-cooked to perfection. 4 pcs full, 2 pcs half.", image: "chicken-curry" },
    { name: "Chicken Masala", price: 100, half: 50, description: "Classic chicken curry in rich onion-tomato gravy with aromatic spices. 4 pcs full, 2 pcs half.", image: "chicken-curry" },
    { name: "Egg Tadka", price: 80, half: 45, description: "Boiled eggs cooked in spicy onion-tomato tadka gravy with aromatic tempering.", image: "chicken-curry" }
  ],
  "Veg": [
    { name: "Chili Paneer", price: 100, half: 50, description: "Crispy paneer cubes stir-fried with bell peppers, onions, and green chilies in a spicy Indo-Chinese sauce.", image: "vegetarian" },
    { name: "Masala Paneer", price: 100, half: 50, description: "Soft paneer cubes in a rich, creamy tomato-based masala gravy with aromatic spices. A classic favorite.", image: "vegetarian" },
    { name: "Matar Paneer", price: 100, half: 50, description: "Paneer and green peas cooked in a flavorful tomato-onion gravy with aromatic spices.", image: "vegetarian" },
    { name: "Chana Masala", price: 50, half: 30, description: "Chickpeas simmered in a tangy tomato-onion gravy with aromatic spices. Healthy and delicious.", image: "vegetarian" },
    { name: "Chana Dal", price: 50, half: 30, description: "Split chickpeas slow-cooked with onions, tomatoes, and aromatic spices. Nutritious and flavorful.", image: "vegetarian" },
    { name: "Black Chana", price: 50, half: 30, description: "Black chickpeas cooked in a spiced gravy with onions and tomatoes. Rich in protein and taste.", image: "vegetarian" },
    { name: "Veg Manchurian", price: 60, half: 35, description: "Crispy vegetable balls tossed in tangy Indo-Chinese sauce with garlic, ginger, and soy.", image: "vegetarian" },
    { name: "Chili Soyabean", price: 50, half: 30, description: "Crispy soyabean chunks stir-fried with bell peppers, onions, and green chilies in spicy sauce.", image: "vegetarian" },
    { name: "Tadka Veg", price: 50, half: 30, description: "Mixed vegetables cooked with aromatic tadka of cumin, garlic, and dried red chilies.", image: "vegetarian" },
    { name: "Mix Veg", price: 50, half: 30, description: "Colorful medley of fresh seasonal vegetables cooked in a mildly spiced gravy with tomatoes and onions.", image: "vegetarian" },
    { name: "Alu Soyabean", price: 50, half: 30, description: "Potatoes and soyabean cooked together in a spiced gravy. Protein-rich and delicious.", image: "vegetarian" },
    { name: "Govi Alu", price: 50, half: 30, description: "Classic combination of cauliflower and potatoes cooked with turmeric, cumin, and traditional spices.", image: "vegetarian" },
    { name: "Alu Daam", price: 50, half: 30, description: "Potatoes cooked in a flavorful lentil gravy with aromatic spices. Comforting and wholesome.", image: "vegetarian" },
    { name: "Begun Bharta", price: 50, half: 30, description: "Roasted eggplant mashed and cooked with onions, tomatoes, and spices. Traditional Bengali delicacy.", image: "vegetarian" },
    { name: "Alu Begun", price: 50, half: 30, description: "Potatoes and eggplant cooked together in a spiced gravy. Simple yet flavorful.", image: "vegetarian" }
  ],
  "Rice": [
    { name: "Chicken Biryani", price: 110, description: "Fragrant basmati rice layered with tender chicken pieces, aromatic spices, saffron, and fried onions. Served with raita.", image: "biryani" },
    { name: "Veg Fried Rice", price: 60, half: 35, description: "Colorful fried rice with mixed vegetables, aromatic spices, and savory sauces. Full plate or half plate available.", image: "veg-rice" },
    { name: "Egg Fried Rice", price: 75, half: 40, description: "Tasty fried rice with scrambled eggs, vegetables, and flavorful sauces. Protein-rich and delicious.", image: "non-veg-rice" },
    { name: "Chicken Fried Rice", price: 95, half: 50, description: "Delicious fried rice with tender chicken pieces, vegetables, and aromatic spices. Full plate or half plate available.", image: "non-veg-rice" }
  ],
  "Roti": [
    { name: "Plain Roti", price: 4, description: "Soft, thin whole wheat flatbread cooked on a tawa. Perfect accompaniment to any curry.", image: "bread" },
    { name: "Plain Paratha", price: 6, description: "Layered whole wheat flatbread cooked on a griddle with ghee. Flaky and delicious.", image: "bread" },
    { name: "Alu Paratha", price: 14, description: "Stuffed whole wheat flatbread filled with spiced mashed potatoes. Served hot with butter.", image: "bread" },
    { name: "Sattu Paratha", price: 14, description: "Traditional flatbread stuffed with roasted gram flour mixture and spices. Nutritious and filling.", image: "bread" },
    { name: "Lachha Paratha", price: 15, description: "Multi-layered flaky flatbread with visible layers. Crispy outside, soft inside. Brushed with ghee.", image: "bread" },
    { name: "Plain Puri", price: 5, description: "Deep-fried whole wheat puffed bread. Light, crispy, and golden brown. Great with any curry.", image: "bread" },
    { name: "Palak Puri", price: 6, description: "Healthy deep-fried puffed bread made with spinach and whole wheat. Nutritious and tasty.", image: "bread" },
    { name: "Tandoori Roti", price: 7, description: "Whole wheat flatbread baked in a traditional clay tandoor oven. Slightly smoky and crispy.", image: "bread" },
    { name: "Plain Naan", price: 15, description: "Soft, fluffy leavened bread baked in a tandoor. Classic accompaniment to rich curries.", image: "bread" },
    { name: "Butter Naan", price: 20, description: "Soft, fluffy leavened bread baked in a tandoor and brushed with generous butter. A favorite.", image: "bread" }
  ]
};

// Populate "All Items" with all menu items from other categories (excluding Thali and Tiffin)
menuData["All Items"] = Object.entries(menuData)
  .filter(([category]) => category !== "All Items" && category !== "Thali" && category !== "Tiffin")
  .flatMap(([_, items]) => items);

export const categories = Object.keys(menuData);