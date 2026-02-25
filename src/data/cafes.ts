export type PriceRange = "$" | "$$" | "$$$";

export interface MenuItem {
  name: string;
  price: number;
}

export interface Cafe {
  id: string;
  name: string;
  address: string;
  description: string;
  priceRange: PriceRange;
  studentFriendly: boolean;
  tags: string[];
  mapUrl: string;
  menu?: MenuItem[];
  hours: string;
  image?: string;
}

export const cafes: Cafe[] = [
  {
    id: "1",
    name: "Kape ni Juan",
    address: "J.P. Rizal St, Marikina City",
    description: "A cozy neighborhood cafe known for affordable local brews and study-friendly ambiance.",
    priceRange: "$",
    studentFriendly: true,
    tags: ["WiFi", "Study Spot", "Local Brews"],
    mapUrl: "https://maps.google.com/?q=Kape+ni+Juan+Marikina",
    hours: "7:00 AM – 9:00 PM",
    menu: [
      { name: "Brewed Coffee", price: 60 },
      { name: "Iced Latte", price: 90 },
      { name: "Matcha Latte", price: 110 },
      { name: "Croissant", price: 75 },
      { name: "Pandesal Sandwich", price: 65 },
    ],
  },
  {
    id: "2",
    name: "The Brewroom",
    address: "Shoe Ave, Sto. Niño, Marikina City",
    description: "Specialty coffee shop with curated single-origin beans and minimalist interiors.",
    priceRange: "$$",
    studentFriendly: false,
    tags: ["Specialty Coffee", "Aesthetic", "Pastries"],
    mapUrl: "https://maps.google.com/?q=The+Brewroom+Marikina",
    hours: "8:00 AM – 10:00 PM",
    menu: [
      { name: "Pour Over", price: 150 },
      { name: "Flat White", price: 140 },
      { name: "Spanish Latte", price: 130 },
      { name: "Cheesecake Slice", price: 180 },
    ],
  },
  {
    id: "3",
    name: "Café de Marikina",
    address: "Gil Fernando Ave, Marikina City",
    description: "A heritage-inspired cafe blending Marikina culture with great coffee and Filipino pastries.",
    priceRange: "$",
    studentFriendly: true,
    tags: ["Heritage", "Filipino Food", "WiFi"],
    mapUrl: "https://maps.google.com/?q=Cafe+de+Marikina",
    hours: "6:30 AM – 8:00 PM",
    menu: [
      { name: "Kapeng Barako", price: 45 },
      { name: "Ensaymada", price: 50 },
      { name: "Champorado", price: 70 },
      { name: "Iced Mocha", price: 85 },
    ],
  },
  {
    id: "4",
    name: "Grind & Gather",
    address: "Lilac St, Concepcion Uno, Marikina City",
    description: "Trendy co-working cafe with fast WiFi, power outlets, and all-day brunch.",
    priceRange: "$$",
    studentFriendly: true,
    tags: ["Co-Working", "WiFi", "All-Day Brunch"],
    mapUrl: "https://maps.google.com/?q=Grind+and+Gather+Marikina",
    hours: "7:00 AM – 11:00 PM",
    menu: [
      { name: "Americano", price: 100 },
      { name: "Avocado Toast", price: 160 },
      { name: "Iced Caramel Latte", price: 130 },
      { name: "Banana Pancakes", price: 140 },
    ],
  },
  {
    id: "5",
    name: "Riverside Beans",
    address: "Riverbanks Center, Marikina City",
    description: "Scenic riverside cafe perfect for evening hangouts with friends and affordable drinks.",
    priceRange: "$",
    studentFriendly: true,
    tags: ["Riverside", "Affordable", "Group-Friendly"],
    mapUrl: "https://maps.google.com/?q=Riverbanks+Center+Marikina",
    hours: "9:00 AM – 10:00 PM",
    menu: [
      { name: "Iced Coffee", price: 55 },
      { name: "Milk Tea", price: 65 },
      { name: "Fries", price: 70 },
      { name: "Chicken Sandwich", price: 85 },
    ],
  },
  {
    id: "6",
    name: "Third Wave Coffee Lab",
    address: "Marquinton Residences, Marikina City",
    description: "Premium third-wave coffee experience with latte art workshops and bean tastings.",
    priceRange: "$$$",
    studentFriendly: false,
    tags: ["Premium", "Workshops", "Latte Art"],
    mapUrl: "https://maps.google.com/?q=Marquinton+Marikina",
    hours: "9:00 AM – 9:00 PM",
    menu: [
      { name: "Single Origin Pour Over", price: 200 },
      { name: "Cortado", price: 160 },
      { name: "Affogato", price: 180 },
      { name: "Artisan Brownie", price: 150 },
    ],
  },
  {
    id: "7",
    name: "Tambayan Cafe",
    address: "Sumulong Highway, Marikina City",
    description: "No-frills hangout spot for students. Board games available and budget-friendly menu.",
    priceRange: "$",
    studentFriendly: true,
    tags: ["Budget", "Board Games", "Student Hub"],
    mapUrl: "https://maps.google.com/?q=Sumulong+Highway+Marikina",
    hours: "10:00 AM – 12:00 AM",
    menu: [
      { name: "House Blend Coffee", price: 40 },
      { name: "Iced Tea", price: 35 },
      { name: "Nachos", price: 80 },
      { name: "Spaghetti", price: 75 },
    ],
  },
  {
    id: "8",
    name: "Bloom & Brew",
    address: "Rainbow St, Marikina Heights",
    description: "Flower-themed cafe with Instagram-worthy interiors and seasonal specialty drinks.",
    priceRange: "$$",
    studentFriendly: false,
    tags: ["Aesthetic", "Floral", "Instagram-Worthy"],
    mapUrl: "https://maps.google.com/?q=Marikina+Heights",
    hours: "8:00 AM – 8:00 PM",
    menu: [
      { name: "Rose Latte", price: 145 },
      { name: "Lavender Honey Latte", price: 155 },
      { name: "Strawberry Cake", price: 170 },
    ],
  },
];
