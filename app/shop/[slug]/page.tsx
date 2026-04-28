"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { products, Product } from "@/lib/products";
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

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { addToCart } = useAppContext();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
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
    }
  }, [slug]);

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
              <span className="absolute left-6 top-6 z-10 rounded-full bg-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md border border-white/10">
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
            {product.category ? ` · ${product.category}` : ""}
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">
            {product.name}
          </h1>
          
          <div className="mt-4 flex items-center gap-5">
            <span className="text-xl font-bold tracking-tight text-white/90">
              {formatPrice(product.price)}
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3 w-3 fill-white text-white" />
              ))}
              <span className="ml-2 text-[10px] text-white/40">(48 Reviews)</span>
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

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center pt-2">
              <div className="flex h-11 items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-2 sm:w-32">
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
                className={`group relative flex h-11 flex-1 items-center justify-center overflow-hidden rounded-xl font-bold transition-all active:scale-[0.98] ${isAdding ? "bg-white/10 text-white/40 cursor-wait" : "bg-white text-black hover:bg-neutral-200"
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

          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
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
        </div>
      </div>

      <div className="mt-24 border-t border-white/10 pt-16">
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
              addToCart={() => addToCart(p, p.colors[0]?.name || "", p.sizes[0] || "")}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
