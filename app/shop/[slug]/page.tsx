"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getDiscountedPrice, getProductTabContent, hasProductDiscount, products, Product, ProductReview } from "@/lib/products";
import { useAppContext } from "@/context/app-context";
import { ChevronRight, Minus, Plus, ShoppingBag, Star, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import ProductCard from "@/components/ui/product-card";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

const PRODUCT_INFO_TABS = [
  { id: "details", label: "Product Details" },
  { id: "reviews", label: "Reviews" },
] as const;
const REVIEW_STARS = [1, 2, 3, 4, 5] as const;
const PRODUCT_REVIEW_STORAGE_KEY = "liquid-product-reviews";
const CLIENT_GALLERY_IMAGES = [
  { src: "/gallery/model.jpg", alt: "Client wearing Liquid BD t-shirt" },
  { src: "/gallery/model_2.jpg", alt: "Customer styling a Liquid BD tee" },
  { src: "/gallery/model_3.jpg", alt: "Streetwear client look in Liquid BD apparel" },
  { src: "/gallery/model_4.jpg", alt: "Lifestyle photo of a client in Liquid BD shirt" },
  { src: "/gallery/model_5.jpg", alt: "Client portrait featuring a Liquid BD t-shirt" },
  { src: "/gallery/model_9.jpg", alt: "Liquid BD community gallery photo" },
] as const;

type ProductInfoTabKey = (typeof PRODUCT_INFO_TABS)[number]["id"];

function readStoredReviews(slug: string): ProductReview[] {
  try {
    const saved = localStorage.getItem(PRODUCT_REVIEW_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved) as Record<string, ProductReview[]>;
    return Array.isArray(parsed?.[slug]) ? parsed[slug] : [];
  } catch (error) {
    console.error("review load error", error);
    return [];
  }
}

function writeStoredReviews(slug: string, reviews: ProductReview[]) {
  try {
    const saved = localStorage.getItem(PRODUCT_REVIEW_STORAGE_KEY);
    const parsed = saved ? (JSON.parse(saved) as Record<string, ProductReview[]>) : {};

    localStorage.setItem(
      PRODUCT_REVIEW_STORAGE_KEY,
      JSON.stringify({
        ...parsed,
        [slug]: reviews,
      })
    );
  } catch (error) {
    console.error("review save error", error);
  }
}

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const { addToCart, currentUser } = useAppContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<ProductInfoTabKey>("details");
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [reviewForm, setReviewForm] = useState({
    author: "",
    location: "",
    quote: "",
    rating: 5,
  });
  const [reviewFeedback, setReviewFeedback] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ transformOrigin: "center" });
  const [isZooming, setIsZooming] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedIndex(0);
      if (foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0].name);
      }
      if (foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      setActiveInfoTab("details");
    }
  }, [slug]);

  useEffect(() => {
    if (!product) {
      return;
    }

    const baseReviews = getProductTabContent(product).reviews;
    const savedReviews = readStoredReviews(product.slug);

    setReviews([...savedReviews, ...baseReviews]);
    setReviewFeedback("");
    setReviewForm({
      author: currentUser !== "Guest" ? currentUser : "",
      location: "",
      quote: "",
      rating: 5,
    });
  }, [product, currentUser]);

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-white/40">Product not found</h2>
        <Link href="/shop" className="rounded-full bg-white px-6 py-2 text-sm font-semibold text-black transition hover:bg-neutral-200">
          Back to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, selectedColor, selectedSize);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomStyle({ transformOrigin: `${x}% ${y}%` });
  };

  const relatedProducts = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.productType === product.productType &&
        p.category === product.category
    )
    .slice(0, 4);

  const finalRelatedProducts = relatedProducts.length > 0 
    ? relatedProducts 
    : products.filter((p) => p.slug !== product.slug && p.productType === product.productType).slice(0, 4);
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = hasProductDiscount(product);
  const productTabContent = getProductTabContent(product);
  const displayedReviews = reviews.length > 0 ? reviews : productTabContent.reviews;
  const averageRating =
    displayedReviews.length > 0
      ? displayedReviews.reduce((sum, review) => sum + review.rating, 0) / displayedReviews.length
      : 5;

  const handleReviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const author = reviewForm.author.trim();
    const location = reviewForm.location.trim();
    const quote = reviewForm.quote.trim();

    if (!author || !location || !quote) {
      setReviewFeedback("Please fill in your name, location, and review.");
      return;
    }

    const nextReview: ProductReview = {
      author,
      location,
      quote,
      rating: reviewForm.rating,
    };

    const savedReviews = readStoredReviews(product.slug);
    const nextSavedReviews = [nextReview, ...savedReviews];

    writeStoredReviews(product.slug, nextSavedReviews);
    setReviews([...nextSavedReviews, ...productTabContent.reviews]);
    setReviewFeedback("Your review has been added.");
    setReviewForm({
      author: currentUser !== "Guest" ? currentUser : "",
      location: "",
      quote: "",
      rating: 5,
    });
  };

  return (
    <div className="site-shell max-w-[1500px] py-8 lg:py-10">

      <nav className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/40">
        <Link href="/" className="hover:text-white transition">Home</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <Link href="/shop" className="hover:text-white transition">Shop</Link>
        <ChevronRight className="h-2.5 w-2.5" />
        <span className="text-white/80">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-10 justify-items-center lg:justify-items-start">

        <div className="space-y-4 w-full lg:max-w-[520px] lg:ml-auto">
          <div 
            ref={imageContainerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] cursor-zoom-in"
          >
            <Image
              src={product.images[selectedIndex] || product.image}
              alt={product.name}
              fill
              style={isZooming ? { transform: 'scale(1.8)', ...zoomStyle } : {}}
              className="object-cover transition-transform duration-200 ease-out"
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
            />
            {product.tag && (
              <span className="absolute left-6 top-4 z-10 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
                {product.tag}
              </span>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto py-3 px-3 scrollbar-none">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`relative aspect-square h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border-2 transition-all duration-300 ${selectedIndex === idx 
                    ? "border-white grayscale-0 opacity-100 scale-110 z-10" 
                    : "border-transparent grayscale opacity-50 hover:grayscale-0 hover:opacity-100"
                    }`}
                >
                  <Image src={img} alt={`${product.name} ${idx}`} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col w-full lg:max-w-[500px] lg:mr-auto">
          <div className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40">
            {product.productType}
            {product.category ? ` | ${product.category}` : ""}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          
          <div className="mt-4 flex items-center gap-5">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold tracking-tight text-white/90">
                {formatPrice(discountedPrice)}
              </span>
              {hasDiscount ? (
                <>
                  <span className="text-sm text-white/35 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <span className="rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
                    -{product.discountPercentage}%
                  </span>
                </>
              ) : null}
            </div>
            <div className="flex items-center gap-1">
              {REVIEW_STARS.map((s) => (
                <Star
                  key={s}
                  className={`h-3 w-3 ${s <= Math.round(averageRating) ? "fill-white text-white" : "text-white/20"}`}
                />
              ))}
              <span className="ml-2 text-[10px] text-white/40">
                ({displayedReviews.length} Review{displayedReviews.length === 1 ? "" : "s"})
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-8">

            {product.colors.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                  <span className="text-white/40">Color</span>
                  <span className="text-white/80">{selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`group relative flex h-8 w-8 items-center justify-center rounded-full border transition-all ${selectedColor === color.name ? "border-white" : "border-white/10 hover:border-white/30"
                        }`}
                      title={color.name}
                    >
                      <span
                        className="h-7 w-7 rounded-full shadow-inner"
                        style={{ backgroundColor: color.hex, border: color.hex === '#FFFFFF' ? '1px solid #e5e5e5' : 'none' }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.sizes.length > 0 && (
              <div className="space-y-3">
                <div className="flex justify-between text-[11px] uppercase tracking-widest">
                  <span className="text-white/40">Size</span>
                  <button className="text-[9px] text-white/30 hover:text-white transition underline underline-offset-4">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-9 w-12 items-center justify-center rounded-lg border text-[11px] font-medium transition-all ${selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/60 hover:border-white/30 hover:text-white"
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2 sm:gap-4">
              <div className="flex h-11 w-[124px] shrink-0 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-2 sm:w-32">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 active:scale-90"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/5 active:scale-90"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`group relative flex h-11 min-w-0 flex-1 items-center justify-center overflow-hidden rounded-xl px-4 font-bold transition-all active:scale-[0.98] ${isAdding ? "bg-white/10 text-white/40 cursor-wait" : "bg-white text-black hover:bg-neutral-200"
                  }`}
              >
                <div className="relative z-10 flex items-center gap-2 text-xs uppercase tracking-widest">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {isAdding ? "Adding..." : "Add to Cart"}
                </div>
                {!isAdding && (
                  <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full -translate-x-full" />
                )}
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 pt-8 sm:grid-cols-3">
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] border border-white/10">
                <Truck className="h-3.5 w-3.5 text-white/60" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Fast Shipping</h4>
                <p className="mt-1 text-[9px] text-white/40">2-3 days delivery</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-white/60" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Secure Checkout</h4>
                <p className="mt-1 text-[9px] text-white/40">100% security</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.03] border border-white/10">
                <RotateCcw className="h-3.5 w-3.5 text-white/60" />
              </div>
              <div className="text-left">
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/80">Easy Returns</h4>
                <p className="mt-1 text-[9px] text-white/40">7-day policy</p>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-white px-4 py-4">
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-black/60">
                Available Payment Methods
              </p>
              <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6">
                <div className="relative h-9 w-[92px]">
                  <Image
                    src="/cod.png"
                    alt="Cash on delivery"
                    fill
                    className="object-contain"
                    sizes="92px"
                  />
                </div>
                <div className="relative h-8 w-[84px]">
                  <Image
                    src="/bkash-logo.webp"
                    alt="bKash"
                    fill
                    className="object-contain"
                    sizes="84px"
                  />
                </div>
                <div className="relative h-8 w-[84px]">
                  <Image
                    src="/nagad-logo.png"
                    alt="Nagad"
                    fill
                    className="object-contain"
                    sizes="84px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-16 overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="flex overflow-x-auto bg-white/[0.02] px-4 sm:px-6">
          {PRODUCT_INFO_TABS.map((tab) => {
            const isActive = activeInfoTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveInfoTab(tab.id)}
                className={`relative shrink-0 border-b px-2 py-4 text-sm transition sm:px-4 ${
                  isActive
                    ? "border-white text-white"
                    : "border-transparent text-white/45 hover:text-white/75"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          {activeInfoTab === "details" ? (
            <div className="space-y-4">
              <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Product Story</p>
              {productTabContent.details.map((detail) => (
                <p key={detail} className="max-w-3xl text-sm leading-7 text-white/70">
                  {detail}
                </p>
              ))}
            </div>
          ) : null}

          {activeInfoTab === "reviews" ? (
            <div className="grid gap-6 lg:grid-cols-[340px_minmax(0,1fr)]">
              <form
                onSubmit={handleReviewSubmit}
                className="rounded-xl border border-white/10 bg-black/20 p-5"
              >
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Add Review</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em] text-white/35">Your Name</label>
                    <input
                      type="text"
                      value={reviewForm.author}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, author: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em] text-white/35">Location</label>
                    <input
                      type="text"
                      value={reviewForm.location}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, location: e.target.value }))}
                      className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                      placeholder="Dhaka"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em] text-white/35">Rating</label>
                    <div className="mt-2 flex gap-2">
                      {REVIEW_STARS.map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                          className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition hover:border-white/30"
                        >
                          <Star
                            className={`h-4 w-4 ${star <= reviewForm.rating ? "fill-white text-white" : "text-white/25"}`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em] text-white/35">Review</label>
                    <textarea
                      value={reviewForm.quote}
                      onChange={(e) => setReviewForm((prev) => ({ ...prev, quote: e.target.value }))}
                      rows={5}
                      className="mt-2 w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-white/30"
                      placeholder="Share how the fabric, fit, or print feels."
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex h-11 w-full items-center justify-center rounded-lg bg-white px-4 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-neutral-200"
                  >
                    Submit Review
                  </button>

                  {reviewFeedback ? (
                    <p className="text-sm text-white/55">{reviewFeedback}</p>
                  ) : null}
                </div>
              </form>

              <div>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/35">Product Reviews</p>
                    <p className="mt-2 text-sm text-white/55">
                      {displayedReviews.length} review{displayedReviews.length === 1 ? "" : "s"} for {product.name}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-white/80">{averageRating.toFixed(1)}/5</p>
                </div>

                <div className="space-y-4">
                  {displayedReviews.map((review, index) => (
                    <article
                      key={`${review.author}-${review.location}-${index}`}
                      className="rounded-xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex items-center gap-1 text-white">
                        {REVIEW_STARS.map((star) => (
                          <Star
                            key={star}
                            className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-white text-white" : "text-white/20"}`}
                          />
                        ))}
                      </div>
                      <p className="mt-4 text-sm leading-7 text-white/70">"{review.quote}"</p>
                      <div className="mt-5 flex items-center justify-between gap-4 pt-4">
                        <p className="text-sm font-semibold text-white/90">{review.author}</p>
                        <p className="mt-1 text-[11px] uppercase tracking-[0.24em] text-white/35">
                          {review.location}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="mt-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">
              Client Gallery
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
              Our Clients In Liquid
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/45">
            Real looks from our community wearing Liquid BD pieces in their own everyday styling.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
          {CLIENT_GALLERY_IMAGES.map((photo, index) => (
            <div
              key={`${photo.src}-${index}`}
              className={`group relative overflow-hidden border border-white/10 bg-white/[0.03] ${
                index === 0 ? "col-span-2 row-span-2 aspect-[1.45/1] md:col-span-1 md:row-span-1 md:aspect-square" : "aspect-square"
              }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-90"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent px-4 py-4 opacity-0 transition duration-500 group-hover:opacity-100">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/70">
                  Liquid Community
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-24 pt-16">
        <div className="mb-10 flex items-end justify-between">
          <div className="space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/40">You Might Also Like</span>
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Related Products</h2>
          </div>
          <Link href="/shop" className="text-xs font-semibold uppercase tracking-widest text-white/60 hover:text-white transition decoration-white/20 underline underline-offset-8">
            View All Shop
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6 lg:gap-8">
          {finalRelatedProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
