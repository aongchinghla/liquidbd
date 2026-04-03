export interface Product {
  id: number;
  name: string;
  price: number;
  tag?: string;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: 0,
    name: "Hojagiri-Boishabi",
    price: 500,
    tag: "CHT",
    category: "Cht",
    image: "/product/hojagiri.jpg",
  },
  {
    id: 1,
    name: "Ajau",
    price: 500,
    tag: "Best Seller",
    category: "",
    image: "/product/ajau.jpg",
  },
  {
    id: 2,
    name: "Bitchi – The Rabuga",
    price: 500,
    tag: "",
    category: "Collaboration",
    image: "/product/rabuga_bitch.jpg",
  },
  {
    id: 3,
    name: "Buga Rani",
    price: 500,
    tag: "Limited",
    category: "Mythology",
    image: "/product/buga_rani.jpg",
  },
  {
    id: 4,
    name: "Ganna",
    price: 500,
    tag: "Premium",
    category: "Ganna",
    image: "/product/ganna.jpg",
  },
  {
    id: 5,
    name: "Garo King",
    price: 500,
    tag: "",
    category: "",
    image: "/product/garo_king.jpg",
  },
  {
    id: 6,
    name: "Garo Queen",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/garo_queen.jpg",
  },
  {
    id: 7,
    name: "Ha.a Ganna",
    price: 500,
    tag: "Capsule",
    category: "Ganna",
    image: "/ha.a_ganna.jpg",
  },
  {
    id: 8,
    name: "Jang.ki Ganna",
    price: 500,
    tag: "Capsule",
    category: "Ganna",
    image: "/product/jang.ki_ganna.jpg",
  },
  {
    id: 9,
    name: "Kha Marak",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/kha_marak.jpg",
  },
  {
    id: 10,
    name: "Kha Sangma",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/kha_sangma.jpg",
  },
  {
    id: 11,
    name: "Liquid",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/liquid_tee.jpg",
  },
  {
    id: 12,
    name: "Misi Saljong",
    price: 500,
    tag: "Capsule",
    category: "",
    image: "/product/misi_saljong.jpg",
  },
  {
    id: 13,
    name: "Nokna",
    price: 500,
    tag: "Capsule",
    category: "Nokna",
    image: "/product/nokna.jpg",
  },
  {
    id: 14,
    name: "Red Ganna",
    price: 500,
    tag: "",
    category: "Ganna",
    image: "/product/red_ganna.jpg",
  },
  {
    id: 15,
    name: "Sacrament",
    price: 500,
    tag: "",
    category: "Collaboration",
    image: "/product/sacrament.jpg",
  },
  {
    id: 16,
    name: "Wangala",
    price: 500,
    tag: "",
    category: "",
    image: "/product/wangala.jpg",
  },
  
];
