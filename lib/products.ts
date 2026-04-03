export interface Color {
  name: string;
  hex: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  tag?: string;
  category: string;
  image: string;
  images: string[];
  colors: Color[];
  sizes: string[];
}

// Utility to generate slug from name
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export const products: Product[] = [
  {
    id: 0,
    slug: "hojagiri-boishabi",
    name: "Hojagiri-Boishabi",
    price: 500,
    tag: "CHT",
    category: "Cht",
    image: "/product/hojagiri.jpg",
    images: ["/product/hojagiri.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Maroon", hex: "#800000" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 1,
    slug: "ajau",
    name: "Ajau",
    price: 500,
    tag: "Best Seller",
    category: "",
    image: "/product/ajau.jpg",
    images: ["/product/ajau.jpg"],
    colors: [
      { name: "Off White", hex: "#F5F5F5" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 2,
    slug: "bitchi-the-rabuga",
    name: "Bitchi – The Rabuga",
    price: 500,
    tag: "",
    category: "Collaboration",
    image: "/product/rabuga_bitch.jpg",
    images: ["/product/rabuga_bitch.jpg"],
    colors: [
      { name: "Charcoal", hex: "#333333" },
      { name: "Navy", hex: "#000080" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    slug: "buga-rani",
    name: "Buga Rani",
    price: 500,
    tag: "Limited",
    category: "Mythology",
    image: "/product/buga_rani.jpg",
    images: ["/product/buga_rani.jpg"],
    colors: [
      { name: "Deep Red", hex: "#8B0000" },
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 4,
    slug: "ganna",
    name: "Ganna",
    price: 500,
    tag: "Premium",
    category: "Ganna",
    image: "/product/ganna.jpg",
    images: ["/product/ganna.jpg"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 5,
    slug: "garo-king",
    name: "Garo King",
    price: 500,
    tag: "",
    category: "",
    image: "/product/garo_king.jpg",
    images: ["/product/garo_king.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["L", "XL", "XXL"],
  },
  {
    id: 6,
    slug: "garo-queen",
    name: "Garo Queen",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/garo_queen.jpg",
    images: ["/product/garo_queen.jpg"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L"],
  },
  {
    id: 7,
    slug: "haa-ganna",
    name: "Ha.a Ganna",
    price: 500,
    tag: "Capsule",
    category: "Ganna",
    image: "/ha.a_ganna.jpg",
    images: ["/ha.a_ganna.jpg"],
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Earth", hex: "#A0522D" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 8,
    slug: "jangki-ganna",
    name: "Jang.ki Ganna",
    price: 500,
    tag: "Capsule",
    category: "Ganna",
    image: "/product/jang.ki_ganna.jpg",
    images: ["/product/jang.ki_ganna.jpg"],
    colors: [
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 9,
    slug: "kha-marak",
    name: "Kha Marak",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/kha_marak.jpg",
    images: ["/product/kha_marak.jpg"],
    colors: [
      { name: "Navy", hex: "#000080" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 10,
    slug: "kha-sangma",
    name: "Kha Sangma",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/kha_sangma.jpg",
    images: ["/product/kha_sangma.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 11,
    slug: "liquid",
    name: "Liquid",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/liquid_tee.jpg",
    images: ["/product/liquid_tee.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: 12,
    slug: "misi-saljong",
    name: "Misi Saljong",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/misi_saljong.jpg",
    images: ["/product/misi_saljong.jpg"],
    colors: [
      { name: "Orange", hex: "#FFA500" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 13,
    slug: "nokna",
    name: "Nokna",
    price: 500,
    tag: "Capsule",
    category: "Nokna",
    image: "/product/nokna.jpg",
    images: ["/product/nokna.jpg"],
    colors: [
      { name: "Maroon", hex: "#800000" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 14,
    slug: "red-ganna",
    name: "Red Ganna",
    price: 500,
    tag: "",
    category: "Ganna",
    image: "/product/red_ganna.jpg",
    images: ["/product/red_ganna.jpg"],
    colors: [
      { name: "Red", hex: "#FF0000" },
    ],
    sizes: ["M", "L", "XL"],
  },
  {
    id: 15,
    slug: "sacrament",
    name: "Sacrament",
    price: 500,
    tag: "",
    category: "Collaboration",
    image: "/product/sacrament.jpg",
    images: ["/product/sacrament.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
    ],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 16,
    slug: "wangala",
    name: "Wangala",
    price: 500,
    tag: "",
    category: "",
    image: "/product/wangala.jpg",
    images: ["/product/wangala.jpg"],
    colors: [
      { name: "Mustard", hex: "#FFDB58" },
      { name: "Black", hex: "#1A1A1A" },
    ],
    sizes: ["M", "L", "XL", "XXL"],
  },
];
