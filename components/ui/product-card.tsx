"use client";

import type { Product } from "@/lib/products";
import Link from "next/link";
import { Eye, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  formatPrice: (price: number) => string;
}

export default function ProductCard({
  product,
  addToCart,
  formatPrice,
}: ProductCardProps) {
  const hasCategory = product.category.trim().length > 0;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.03] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.05]">
      {/* Image Section */}
      <Link href={`/shop/${product.slug}`} className="block relative aspect-square w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Hover Overlay Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black shadow-xl translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
            <Eye className="h-4 w-4" />
          </div>
        </div>

        {product.tag ? (
          <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
            {product.tag}
          </span>
        ) : null}
      </Link>

      {/* Info Section */}
      <div className="p-5">
        <div className="flex flex-col gap-1.5">
          <p
            className={`text-[9px] uppercase tracking-[0.3em] text-white/30 transition-colors group-hover:text-white/50 ${hasCategory ? "" : "select-none opacity-0"
              }`}
            aria-hidden={!hasCategory}
          >
            {hasCategory ? product.category : "Category"}
          </p>

          <div className="flex items-start justify-between gap-3">
            <Link href={`/shop/${product.slug}`} className="hover:text-white/80 transition-colors">
              <h4 className="text-base font-medium tracking-tight">{product.name}</h4>
            </Link>
            <p className="text-sm font-semibold text-white/90">
              {formatPrice(product.price)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/[0.05] border border-white/10 px-4 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-black active:scale-95"
        >
          <ShoppingBag className="h-4 w-4" />
          Quick Add
        </button>
      </div>
    </div>
  );
}
