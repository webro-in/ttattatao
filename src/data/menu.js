
export const menuCategories = [
  {
    id: "small-plates",
    label: "Asian Small Plates & Dumplings",
    shortLabel: "Small Plates & Dumplings",
    subtitle: "Little bites. Big flavour.",
  },
  {
    id: "asian-mains",
    label: "Asian Mains & Thai Curries",
    shortLabel: "Asian Mains & Curries",
    subtitle: "Wok-fired favourites and rich Thai curries.",
  },
];

const makeDish = (
  id,
  name,
  description,
  price,
  category,
  group,
  isNew = false
) => ({
  id,
  name,
  description,
  price,
  category,
  group,
  isNew,
  image: `/images/dishes/${id}.webp`,
});

export const menuItems = [
  // ASIAN SMALL PLATES & DUMPLINGS
  makeDish(
    "vegetable-steamed-dim-sum",
    "Vegetable Steamed Dim Sum",
    "Classic steamed vegetable dumplings with chilli-soy dip",
    215,
    "small-plates",
    "Dumplings"
  ),
  makeDish(
    "vegetable-pan-fried-gyoza",
    "Vegetable Pan-Fried Gyoza",
    "Pan-seared vegetable dumplings with Asian dipping sauce",
    235,
    "small-plates",
    "Dumplings"
  ),
  makeDish(
    "edamame-truffle-dumplings",
    "Edamame & Truffle Dumplings",
    "Delicate dumplings filled with edamame and truffle-seasoned vegetables",
    315,
    "small-plates",
    "Dumplings"
  ),
  makeDish(
    "cheese-breast-dumpling",
    "Cheese Breast Dumpling",
    "Steamed dumplings with a molten cheese centre and chilli-soy dip",
    245,
    "small-plates",
    "Dumplings",
    true
  ),
  makeDish(
    "chefs-dumpling-basket",
    "Chef's Dumpling Basket",
    "Selection of four dumplings, steamed and pan-fried",
    465,
    "small-plates",
    "Dumplings"
  ),
  makeDish(
    "crispy-chilli-lotus-stem",
    "Crispy Chilli Lotus Stem",
    "Crisp lotus stem tossed in a sweet-spicy chilli glaze",
    225,
    "small-plates",
    "Wok Small Plates"
  ),
  makeDish(
    "asian-chilli-mushroom",
    "Asian Chilli Mushroom",
    "Wok-tossed mushrooms with chilli, garlic and Asian herbs",
    245,
    "small-plates",
    "Wok Small Plates"
  ),
  makeDish(
    "crispy-corn-asian-chilli",
    "Crispy Corn, Asian Chilli",
    "Crispy corn with chilli, spring onion and Asian seasoning",
    205,
    "small-plates",
    "Wok Small Plates"
  ),
  makeDish(
    "chilli-potato",
    "Chilli Potato",
    "Crisp potato tossed in a hot garlic-chilli sauce with peppers and onion",
    225,
    "small-plates",
    "Wok Small Plates",
    true
  ),
  makeDish(
    "honey-chilli-potato",
    "Honey Chilli Potato",
    "Crisp potato batons in a honey, chilli and sesame glaze",
    195,
    "small-plates",
    "Wok Small Plates"
  ),
  makeDish(
    "house-special-spring-roll",
    "House Special Spring Roll",
    "Crisp rolls filled with vegetables and glass noodles, with sweet chilli dip",
    205,
    "small-plates",
    "Wok Small Plates",
    true
  ),
  makeDish(
    "crispy-chilli-baby-corn",
    "Crispy Chilli Baby Corn",
    "Baby corn in a tangy chilli and garlic toss",
    215,
    "small-plates",
    "Wok Small Plates"
  ),

  // ASIAN MAINS & THAI CURRIES
  makeDish(
    "thai-green-curry",
    "Thai Green Curry",
    "Fragrant green curry with vegetables and coconut, with steamed rice",
    295,
    "asian-mains",
    "Thai Curries"
  ),
  makeDish(
    "thai-red-curry",
    "Thai Red Curry",
    "Rich red curry with vegetables, coconut and Thai basil, with steamed rice",
    295,
    "asian-mains",
    "Thai Curries"
  ),
  makeDish(
    "asian-chilli-basil-noodles",
    "Asian Chilli Basil Noodles",
    "Wok noodles with vegetables, chilli, basil and Asian sauces",
    245,
    "asian-mains",
    "Noodles"
  ),
  makeDish(
    "hakka-vegetable-noodles",
    "Hakka Vegetable Noodles",
    "Classic wok-tossed noodles with vegetables and soy seasoning",
    225,
    "asian-mains",
    "Noodles"
  ),
  makeDish(
    "burnt-garlic-noodles",
    "Burnt Garlic Noodles",
    "Wok noodles with roasted garlic, vegetables and chilli",
    235,
    "asian-mains",
    "Noodles"
  ),
  makeDish(
    "singapore-noodles",
    "Singapore Noodles",
    "Rice noodles wok-tossed with curry spice, peppers and spring onion",
    245,
    "asian-mains",
    "Noodles",
    true
  ),
  makeDish(
    "vegetable-fried-rice",
    "Vegetable Fried Rice",
    "Wok-fried rice with vegetables and Asian seasoning",
    205,
    "asian-mains",
    "Fried Rice"
  ),
  makeDish(
    "chilli-basil-fried-rice",
    "Chilli Basil Fried Rice",
    "Fried rice with basil, chilli and aromatic wok seasoning",
    225,
    "asian-mains",
    "Fried Rice"
  ),
  makeDish(
    "burnt-garlic-fried-rice",
    "Burnt Garlic Fried Rice",
    "Fried rice with roasted garlic, chilli and spring onion",
    225,
    "asian-mains",
    "Fried Rice"
  ),
  makeDish(
    "asian-wok-vegetables",
    "Asian Wok Vegetables",
    "Seasonal vegetables tossed in signature Asian sauce",
    245,
    "asian-mains",
    "Wok & Bowls"
  ),
  makeDish(
    "kung-pao-vegetables",
    "Kung Pao Vegetables",
    "Wok vegetables with dried chilli, peanut and Sichuan pepper",
    255,
    "asian-mains",
    "Wok & Bowls"
  ),
  makeDish(
    "water-chestnut-vegetable-stir-fry",
    "Water Chestnut & Vegetable Stir Fry",
    "Water chestnut, mushroom and greens in a light garlic sauce",
    245,
    "asian-mains",
    "Wok & Bowls"
  ),
  makeDish(
    "chilli-paneer",
    "Chilli Paneer",
    "Crisp paneer with peppers, onion and chilli-soy glaze",
    265,
    "asian-mains",
    "Wok & Bowls"
  ),
  makeDish(
    "vegetable-manchurian",
    "Vegetable Manchurian",
    "Fried vegetable dumplings in a glossy garlic-soy Manchurian sauce",
    245,
    "asian-mains",
    "Wok & Bowls"
  ),
];

export const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
