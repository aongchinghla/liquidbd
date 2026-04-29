"use client";

import { useEffect, useRef, useState } from "react";
import { getDiscountedPrice, hasProductDiscount, type Product } from "@/lib/products";
import Link from "next/link";
import { Eye, ShoppingBag, X } from "lucide-react";
import gsap from "gsap";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  formatPrice: (price: number) => string;
}

export default function ProductCard({
  product,
  addToCart,
  formatPrice,
}: ProductCardProps) {
  const hasCategory = product.category.trim().length > 0;
  const metaLabel = hasCategory ? `${product.productType} | ${product.category}` : product.productType;
  const discountedPrice = getDiscountedPrice(product);
  const hasDiscount = hasProductDiscount(product);
  const defaultColor = product.colors[0]?.name || "";
  const defaultSize = product.sizes[0] || "";
  const requiresVariantSelection = product.colors.length > 1 || product.sizes.length > 1;
  const [isVariantSelectorOpen, setIsVariantSelectorOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(defaultColor);
  const [selectedSize, setSelectedSize] = useState(defaultSize);
  const selectorRef = useRef<HTMLDivElement | null>(null);
  const selectorItemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!isVariantSelectorOpen || !selectorRef.current) {
      return;
    }

    const selectorItems = selectorItemsRef.current.filter(
      (item): item is HTMLDivElement => item !== null
    );

    const timeline = gsap.timeline();

    timeline.fromTo(
      selectorRef.current,
      {
        autoAlpha: 0,
        y: 14,
        scale: 0.96,
        transformOrigin: "center bottom",
      },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.42,
        ease: "power3.out",
      }
    );

    if (selectorItems.length > 0) {
      timeline.fromTo(
        selectorItems,
        {
          autoAlpha: 0,
          y: 10,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        },
        "-=0.24"
      );
    }

    return () => {
      timeline.kill();
    };
  }, [isVariantSelectorOpen]);

  const handleQuickAdd = () => {
    if (requiresVariantSelection) {
      setSelectedColor(defaultColor);
      setSelectedSize(defaultSize);
      setIsVariantSelectorOpen(true);
      return;
    }

    addToCart(product, defaultColor, defaultSize);
  };

  const handleVariantAdd = () => {
    addToCart(product, selectedColor, selectedSize);
    setIsVariantSelectorOpen(false);
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
            <Eye className="h-4 w-4" />
          </div>
        </div>

        {product.tag ? (
          <span className="absolute left-5 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {product.tag}
          </span>
        ) : null}

        {hasDiscount ? (
          <span className="absolute right-5 top-3 rounded-full bg-red-500 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
            -{product.discountPercentage}%
          </span>
        ) : null}
      </Link>

      <div className="p-5">
        <div className="flex flex-col gap-1.5">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white/50">
            {metaLabel}
          </p>

          <div className="flex items-start justify-between gap-3">
            <Link href={`/shop/${product.slug}`} className="hover:text-white/80 transition-colors">
              <h4 className="text-base font-medium tracking-tight">{product.name}</h4>
            </Link>
            <div className="flex items-center gap-2 text-right">
              <p className="text-sm font-semibold text-white/90">{formatPrice(discountedPrice)}</p>
              {hasDiscount ? (
                <p className="text-xs text-white/35 line-through">{formatPrice(product.price)}</p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative mt-4 min-h-[48px]">
          {!isVariantSelectorOpen ? (
            <button
              type="button"
              onClick={handleQuickAdd}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2f7ea1]/60 bg-white/[0.05] px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:border-[#2f7ea1] hover:bg-white hover:text-black active:scale-95"
            >
              <ShoppingBag className="h-4 w-4" />
              Quick Add
            </button>
          ) : null}
          {isVariantSelectorOpen ? (
          <div
            ref={selectorRef}
            className="absolute inset-x-0 bottom-0 z-20 rounded-xl border border-white/10 bg-[#111111] p-3.5 shadow-2xl shadow-black/50"
          >
            <div
              ref={(node) => {
                selectorItemsRef.current[0] = node;
              }}
              className="flex items-start justify-between gap-4"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/35">Quick Add</p>
                <p className="mt-1.5 text-xs font-medium text-white/90">Choose color and size</p>
              </div>
              <button
                type="button"
                onClick={() => setIsVariantSelectorOpen(false)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/75 transition hover:border-white/20 hover:text-white"
                aria-label="Close quick add"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {product.colors.length > 0 ? (
              <div
                ref={(node) => {
                  selectorItemsRef.current[1] = node;
                }}
                className="mt-3.5"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/35">
                  <span>Color</span>
                  <span className="text-white/70">{selectedColor}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${
                        selectedColor === color.name ? "border-white" : "border-white/10 hover:border-white/30"
                      }`}
                      aria-label={`Select ${color.name}`}
                    >
                      <span
                        className="h-6 w-6 rounded-full"
                        style={{
                          backgroundColor: color.hex,
                          border: color.hex === "#FFFFFF" ? "1px solid #d4d4d4" : "none",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {product.sizes.length > 0 ? (
              <div
                ref={(node) => {
                  selectorItemsRef.current[2] = node;
                }}
                className="mt-3.5"
              >
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.22em] text-white/35">
                  <span>Size</span>
                  <span className="text-white/70">{selectedSize}</span>
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`flex h-9 min-w-[44px] items-center justify-center rounded-lg border px-2.5 text-[10px] font-medium transition ${
                        selectedSize === size
                          ? "border-white bg-white text-black"
                          : "border-white/10 bg-white/[0.03] text-white/65 hover:border-white/30 hover:text-white"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div
              ref={(node) => {
                selectorItemsRef.current[3] = node;
              }}
              className="mt-4"
            >
              <button
                type="button"
                onClick={handleVariantAdd}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-white px-4 text-[10px] font-bold uppercase tracking-widest text-black transition hover:bg-neutral-200"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>
          </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
