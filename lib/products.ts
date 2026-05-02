export interface Color {
  name: string;
  hex: string;
}

export const PRODUCT_TYPES = ["T-Shirt", "Shirt", "Pants"] as const;
export type ProductType = (typeof PRODUCT_TYPES)[number];
export const CULTURES = ["Garo", "Marma", "Tripura"] as const;
export type ProductCulture = (typeof CULTURES)[number];

export interface Product {
  id: number;
  slug: string;
  name: string;
  price: number;
  discountPercentage?: number;
  tag?: string;
  productType: ProductType;
  category: string;
  culture: ProductCulture | "";
  image: string;
  images: string[];
  colors: Color[];
  sizes: string[];
  details: string[];
  reviews: ProductReview[];
}

export interface ProductReview {
  author: string;
  location: string;
  quote: string;
  rating: number;
}

export interface ProductTabContent {
  details: string[];
  reviews: ProductReview[];
}

const COLOR_BLACK = { name: "Black", hex: "#000000" };
const COLOR_WHITE = { name: "White", hex: "#FFFFFF" };
const COLOR_BLUE = { name: "Blue", hex: "#0000FF" };
const COLOR_GREEN = { name: "Green", hex: "#008000" };
const COLOR_MAROON = { name: "Maroon", hex: "#800000" };
const COLOR_PURPLE = { name: "Purple", hex: "#800080" };
const COLOR_RED = { name: "Red", hex: "#FF0000" };
const COLOR_YELLOW = { name: "Yellow", hex: "#FFFF00" };

const ALL_PRODUCT_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
function normalizeDiscountPercentage(discountPercentage?: number) {
  if (typeof discountPercentage !== "number" || Number.isNaN(discountPercentage)) {
    return 0;
  }

  return Math.min(Math.max(discountPercentage, 0), 100);
}

export function hasProductDiscount(product: Pick<Product, "discountPercentage">) {
  return normalizeDiscountPercentage(product.discountPercentage) > 0;
}

export function getDiscountedPrice(product: Pick<Product, "price" | "discountPercentage">) {
  const discountPercentage = normalizeDiscountPercentage(product.discountPercentage);

  if (discountPercentage === 0) {
    return product.price;
  }

  return Math.round(product.price * (1 - discountPercentage / 100));
}

export function getProductTabContent(product: Product): ProductTabContent {
  return {
    details: product.details,
    reviews: product.reviews,
  };
}

export function getProductMetaParts(
  product: Pick<Product, "productType" | "category" | "culture">
) {
  return [product.productType, product.category.trim(), product.culture.trim()].filter(
    (value): value is string => value.length > 0
  );
}

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");

export const products: Product[] = [
  {
    id: 1,
    slug: "hojagiri-boishabi",
    name: "Hojagiri-Boishabi",
    price: 500,
    tag: "",
    productType: "T-Shirt",
    category: "",
    culture: "Tripura",
    image: "/product/hojagiri.jpg",
    images: [
      "/product/hojagiri.jpg",
      "/product/hojagiri.jpg",
      "/product/hojagiri.jpg",
      "/product/hojagiri.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_WHITE, COLOR_MAROON, COLOR_GREEN],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Hojagiri-Boishabi brings a movement-inspired print into an easy everyday tee, keeping the mood expressive but wearable.",
      "It is designed for people who want a cultural reference piece that still feels sharp, minimal, and comfortable on a daily fit.",
    ],
    reviews: [
      {
        author: "Nafis",
        location: "Khagrachari",
        quote: "The Hojagiri print feels unique and the tee stays comfortable even after a long day outside.",
        rating: 5,
      },
      {
        author: "Sadia",
        location: "Dhaka",
        quote: "Loved how wearable the design is. It has a cultural mood without feeling too heavy.",
        rating: 4,
      },
    ],
  },
  {
    id: 2,
    slug: "ajau",
    name: "Ajau",
    price: 500,
    tag: "Best Seller",
    productType: "T-Shirt",
    category: "",
    culture: "Marma",
    image: "/product/ajau.jpg",
    images: [
      "/product/ajau.jpg",
      "/product/ajau.jpg",
      "/product/ajau.jpg",
      "/product/ajau.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_BLUE, COLOR_RED],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Ajau centers its visual identity around a bold front graphic that feels mysterious, fluid, and instantly eye-catching.",
      "The piece is made for standout streetwear styling, especially when you want the artwork to carry the full look on its own.",
    ],
    reviews: [
      {
        author: "Nabil",
        location: "Dhaka",
        quote: "Ajau has a bold print and the black base makes the artwork stand out perfectly.",
        rating: 5,
      },
      {
        author: "Mou",
        location: "Sylhet",
        quote: "The fit is comfortable for everyday wear and the design gets noticed instantly.",
        rating: 5,
      },
      {
        author: "Sami",
        location: "Rajshahi",
        quote: "One of the cleanest drops from the collection. The fabric and print both feel solid.",
        rating: 4,
      },
    ],
  },
  {
    id: 3,
    slug: "bitchi-the-rabuga",
    name: "Bitchi - The Rabuga",
    price: 500,
    discountPercentage: 10,
    tag: "",
    productType: "T-Shirt",
    category: "Collaboration",
    culture: "",
    image: "/product/rabuga_bitchi.jpg",
    images: [
      "/product/rabuga_bitchi.jpg",
      "/product/rabuga_bitchi.jpg",
      "/product/rabuga_bitchi.jpg",
      "/product/rabuga_bitchi.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_PURPLE, COLOR_GREEN, COLOR_YELLOW],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Bitchi - The Rabuga leans into a darker collaboration mood with artwork that feels layered, intense, and collectible.",
      "This tee works best as a statement piece, giving the print room to stand out while keeping the overall silhouette clean.",
    ],
    reviews: [
      {
        author: "Ratul",
        location: "Dhaka",
        quote: "The collaboration artwork feels premium and the piece really looks like a limited drop.",
        rating: 5,
      },
      {
        author: "Pritha",
        location: "Cumilla",
        quote: "Very striking design. It stands out best with simple styling just like I wanted.",
        rating: 4,
      },
    ],
  },
  {
    id: 4,
    slug: "buga-rani",
    name: "Buga Rani",
    price: 500,
    tag: "Limited",
    productType: "T-Shirt",
    category: "Mythology",
    culture: "",
    image: "/product/buga_rani.jpg",
    images: [
      "/product/buga_rani.jpg",
      "/product/buga_rani.jpg",
      "/product/buga_rani.jpg",
      "/product/buga_rani.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_PURPLE, COLOR_BLUE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Buga Rani is shaped around a mythology-inspired graphic direction that gives the tee a strong character-led presence.",
      "It balances storytelling and wearability, making it a good pick for anyone who likes cultural motifs in a modern fit.",
    ],
    reviews: [
      {
        author: "Tanha",
        location: "Mymensingh",
        quote: "Buga Rani feels artistic and the front graphic has a strong presence in person.",
        rating: 5,
      },
      {
        author: "Raiyan",
        location: "Dhaka",
        quote: "Nice print balance and the fit works well for casual everyday outfits.",
        rating: 4,
      },
    ],
  },
  {
    id: 5,
    slug: "ganna",
    name: "Ganna",
    price: 500,
    discountPercentage: 15,
    tag: "Premium",
    productType: "T-Shirt",
    category: "Ganna",
    culture: "Garo",
    image: "/product/ganna.jpg",
    images: [
      "/product/ganna.jpg",
      "/product/ganna.jpg",
      "/product/ganna.jpg",
      "/product/ganna.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_RED, COLOR_YELLOW],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Ganna carries a rooted visual language with a stronger folk-inspired energy translated into a clean t-shirt format.",
      "The design feels expressive without being too loud, so it can work both as a daily essential and a feature piece.",
    ],
    reviews: [
      {
        author: "Ibrahim",
        location: "Gazipur",
        quote: "Ganna has a clean graphic story and the shirt feels easy to style every day.",
        rating: 5,
      },
      {
        author: "Mehjabin",
        location: "Rangpur",
        quote: "The print quality is solid and the design has a nice rooted feel.",
        rating: 4,
      },
    ],
  },
  {
    id: 6,
    slug: "garo-king",
    name: "Garo King",
    price: 500,
    tag: "",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/garo_king.jpg",
    images: [
      "/product/garo_king.jpg",
      "/product/garo_king.jpg",
      "/product/garo_king.jpg",
      "/product/garo_king.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Garo King presents a more direct, emblem-like attitude with a graphic that feels proud, grounded, and bold.",
      "It is built for a confident everyday look where the artwork adds identity without making the outfit hard to style.",
    ],
    reviews: [
      {
        author: "Arian",
        location: "Sherpur",
        quote: "The Garo King design feels proud and bold without being overdone.",
        rating: 5,
      },
      {
        author: "Shawon",
        location: "Dhaka",
        quote: "Very comfortable tee and the print still feels sharp after washing.",
        rating: 4,
      },
    ],
  },
  {
    id: 7,
    slug: "garo-queen",
    name: "Garo Queen",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/garo_queen.jpg",
    images: [
      "/product/garo_queen.jpg",
      "/product/garo_queen.jpg",
      "/product/garo_queen.jpg",
      "/product/garo_queen.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Garo Queen brings a softer but still confident visual rhythm, giving the tee a balanced and polished statement.",
      "It works well when you want a design-led piece that still feels versatile across casual day-to-day outfits.",
    ],
    reviews: [
      {
        author: "Nusrat",
        location: "Sylhet",
        quote: "Garo Queen has a beautiful balanced look and feels very easy to wear.",
        rating: 5,
      },
      {
        author: "Jerin",
        location: "Dhaka",
        quote: "The artwork is clean and the tee feels polished without losing comfort.",
        rating: 4,
      },
    ],
  },
  {
    id: 8,
    slug: "haa-ganna",
    name: "Ha.a Ganna",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "Ganna",
    culture: "Garo",
    image: "/ha.a_ganna.jpg",
    images: [
      "/ha.a_ganna.jpg",
      "/ha.a_ganna.jpg",
      "/ha.a_ganna.jpg",
      "/ha.a_ganna.jpg"
    ],
    colors: [COLOR_MAROON, COLOR_YELLOW, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Ha.a Ganna pushes a more rhythmic and vibrant design language while keeping the silhouette familiar and easy to wear.",
      "The result is a tee that feels rooted in theme but modern in presentation, especially for relaxed styling.",
    ],
    reviews: [
      {
        author: "Rakib",
        location: "Netrokona",
        quote: "Ha.a Ganna feels lively and the print has a really nice energy to it.",
        rating: 5,
      },
      {
        author: "Mitu",
        location: "Dhaka",
        quote: "Great relaxed look. I liked how the theme still feels modern.",
        rating: 4,
      },
    ],
  },
  {
    id: 9,
    slug: "jangki-ganna",
    name: "Jang.ki Ganna",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "Ganna",
    culture: "Garo",
    image: "/product/jang.ki_ganna.jpg",
    images: [
      "/product/jang.ki_ganna.jpg",
      "/product/jang.ki_ganna.jpg",
      "/product/jang.ki_ganna.jpg",
      "/product/jang.ki_ganna.jpg"
    ],
    colors: [COLOR_MAROON, COLOR_YELLOW, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Jang.ki Ganna translates the Ganna line into a sharper graphic expression with a slightly more energetic visual tone.",
      "It is a strong option for anyone who wants heritage-inspired artwork with a more contemporary everyday finish.",
    ],
    reviews: [
      {
        author: "Tahmid",
        location: "Rajshahi",
        quote: "This one has a stronger graphic punch than the regular Ganna and I really liked that.",
        rating: 5,
      },
      {
        author: "Faria",
        location: "Bogura",
        quote: "The artwork feels energetic and the tee fits nicely with jeans or cargos.",
        rating: 4,
      },
    ],
  },
  {
    id: 10,
    slug: "kha-marak",
    name: "Kha Marak",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/kha_marak.jpg",
    images: [
      "/product/kha_marak.jpg",
      "/product/kha_marak.jpg",
      "/product/kha_marak.jpg",
      "/product/kha_marak.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_RED, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Kha Marak is driven by a punchier visual identity that gives the front print a more assertive presence.",
      "The tee is ideal for simple outfits where one graphic piece is enough to define the overall mood.",
    ],
    reviews: [
      {
        author: "Rashed",
        location: "Dhaka",
        quote: "Kha Marak looks strongest with simple styling. The print does all the work.",
        rating: 5,
      },
      {
        author: "Lamia",
        location: "Khulna",
        quote: "Bold visual but still easy to wear. The fabric also feels soft.",
        rating: 4,
      },
    ],
  },
  {
    id: 11,
    slug: "kha-sangma",
    name: "Kha Sangma",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/kha_sangma.jpg",
    images: [
      "/product/kha_sangma.jpg",
      "/product/kha_sangma.jpg",
      "/product/kha_sangma.jpg",
      "/product/kha_sangma.jpg"
    ],
    colors: [COLOR_WHITE, COLOR_BLUE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Kha Sangma keeps the look crisp and graphic-forward, letting the artwork add personality without crowding the silhouette.",
      "It is an easy match for denim, cargos, or layered outerwear when you want something expressive but clean.",
    ],
    reviews: [
      {
        author: "Ashik",
        location: "Dhaka",
        quote: "Kha Sangma feels clean and versatile. It works with almost everything in my wardrobe.",
        rating: 5,
      },
      {
        author: "Maria",
        location: "Chattogram",
        quote: "Nice crisp graphic and good fit overall. Very easy to style.",
        rating: 4,
      },
    ],
  },
  {
    id: 12,
    slug: "liquid",
    name: "Liquid",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "",
    culture: "",
    image: "/product/liquid_tee.jpg",
    images: [
      "/product/liquid_tee.jpg",
      "/product/liquid_tee.jpg",
      "/product/liquid_tee.jpg",
      "/product/liquid_tee.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Liquid captures the brand's own core mood through a minimal but confident graphic treatment on an everyday-ready tee.",
      "It is the kind of piece that fits naturally into repeat wear because it feels sharp, simple, and easy to style.",
    ],
    reviews: [
      {
        author: "Ovi",
        location: "Dhaka",
        quote: "Liquid feels like the cleanest everyday option in the lineup. Super wearable.",
        rating: 5,
      },
      {
        author: "Sumaiya",
        location: "Barishal",
        quote: "Minimal but still interesting. I keep reaching for this one a lot.",
        rating: 4,
      },
    ],
  },
  {
    id: 13,
    slug: "misi-saljong",
    name: "Misi Saljong",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/misi_saljong.jpg",
    images: [
      "/product/misi_saljong.jpg",
      "/product/misi_saljong.jpg",
      "/product/misi_saljong.jpg",
      "/product/misi_saljong.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_YELLOW, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Misi Saljong is built around a more symbolic visual direction that gives the front print a strong sense of identity.",
      "The overall piece feels artistic and grounded at the same time, making it suitable for both casual and styled looks.",
    ],
    reviews: [
      {
        author: "Farhan",
        location: "Dhaka",
        quote: "Misi Saljong feels artistic and the design has a really thoughtful look.",
        rating: 5,
      },
      {
        author: "Nabila",
        location: "Moulvibazar",
        quote: "A strong identity piece that still works casually. Really nice balance.",
        rating: 4,
      },
    ],
  },
  {
    id: 14,
    slug: "nokna",
    name: "Nokna",
    price: 500,
    tag: "Capsule",
    productType: "T-Shirt",
    category: "Nokna",
    culture: "Garo",
    image: "/product/nokna.jpg",
    images: [
      "/product/nokna.jpg",
      "/product/nokna.jpg",
      "/product/nokna.jpg",
      "/product/nokna.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_PURPLE, COLOR_YELLOW, COLOR_RED],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Nokna carries a bolder personality through its artwork, giving the tee a more distinct and memorable first impression.",
      "It is designed for wearers who want something visually expressive while still staying comfortable for everyday use.",
    ],
    reviews: [
      {
        author: "Shihab",
        location: "Dhaka",
        quote: "Nokna has a memorable front graphic and definitely stands out in the best way.",
        rating: 5,
      },
      {
        author: "Ananya",
        location: "Rajbari",
        quote: "Looks expressive but still feels comfortable enough for regular wear.",
        rating: 4,
      },
    ],
  },
  {
    id: 15,
    slug: "red-ganna",
    name: "Red Ganna",
    price: 500,
    tag: "",
    productType: "T-Shirt",
    category: "Ganna",
    culture: "Garo",
    image: "/product/red_ganna.jpg",
    images: [
      "/product/red_ganna.jpg",
      "/product/red_ganna.jpg",
      "/product/red_ganna.jpg",
      "/product/red_ganna.jpg"
    ],
    colors: [COLOR_RED, COLOR_WHITE, COLOR_BLACK],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Red Ganna intensifies the Ganna line with a warmer, stronger visual character that feels energetic and direct.",
      "This design is especially effective when paired with simple pieces so the front artwork remains the center of attention.",
    ],
    reviews: [
      {
        author: "Hasib",
        location: "Dhaka",
        quote: "Red Ganna has a stronger visual kick and feels great as a statement tee.",
        rating: 5,
      },
      {
        author: "Sanjida",
        location: "Jashore",
        quote: "The warmer tone in the artwork really helps it stand out. Very solid piece.",
        rating: 4,
      },
    ],
  },
  {
    id: 16,
    slug: "sacrament",
    name: "Sacrament",
    price: 500,
    tag: "",
    productType: "T-Shirt",
    category: "Collaboration",
    culture: "",
    image: "/product/sacrament.jpg",
    images: [
      "/product/sacrament.jpg",
      "/product/sacrament.jpg",
      "/product/sacrament.jpg",
      "/product/sacrament.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_PURPLE, COLOR_BLUE,],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Sacrament approaches the graphic direction with a darker collaboration mood, making the tee feel more limited and art-driven.",
      "It is suited for people who like a collectible design language without sacrificing the practicality of a daily-wear fit.",
    ],
    reviews: [
      {
        author: "Imran",
        location: "Dhaka",
        quote: "Sacrament feels like a collector piece. The darker graphic mood is excellent.",
        rating: 5,
      },
      {
        author: "Tania",
        location: "Narsingdi",
        quote: "Really liked the collaboration feel here. It looks premium and different.",
        rating: 4,
      },
    ],
  },
  {
    id: 17,
    slug: "wangala",
    name: "Wangala",
    price: 500,
    tag: "",
    productType: "T-Shirt",
    category: "",
    culture: "Garo",
    image: "/product/wangala.jpg",
    images: [
      "/product/wangala.jpg",
      "/product/wangala.jpg",
      "/product/wangala.jpg",
      "/product/wangala.jpg"
    ],
    colors: [COLOR_BLACK, COLOR_BLUE, COLOR_RED, COLOR_YELLOW, COLOR_WHITE],
    sizes: ALL_PRODUCT_SIZES,
    details: [
      "Wangala channels a celebratory cultural tone into a graphic-led t-shirt that feels expressive, lively, and easy to wear.",
      "The piece stands out best in simple styling setups where the artwork can speak clearly and carry the full look.",
    ],
    reviews: [
      {
        author: "Adib",
        location: "Mymensingh",
        quote: "Wangala feels lively and expressive. The graphic has a strong festive energy.",
        rating: 5,
      },
      {
        author: "Rupa",
        location: "Dhaka",
        quote: "Very easy to wear and the artwork immediately catches attention.",
        rating: 4,
      },
    ],
  },
];
