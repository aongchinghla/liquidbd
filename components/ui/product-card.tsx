"use client";

import type { Product } from "@/lib/products";

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
    <div className="card-fade group flex h-full flex-col overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.05]">
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />

        {product.tag ? (
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/90 backdrop-blur-md">
            {product.tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p
              className={`min-h-[1rem] text-[10px] uppercase tracking-[0.25em] text-white/40 ${
                hasCategory ? "" : "select-none opacity-0"
              }`}
              aria-hidden={!hasCategory}
            >
              {hasCategory ? product.category : "Category"}
            </p>

            <h4 className="mt-2 line-clamp-2 text-base font-medium leading-snug tracking-wide text-white/95">
              {product.name}
            </h4>
          </div>

          <p className="mt-1 shrink-0 text-sm font-medium text-white/80">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-auto pt-6"
        >
          <div className="flex w-full items-center justify-center rounded-full bg-white/90 px-4 py-2.5 text-[13px] font-semibold tracking-wide text-black transition-all hover:bg-white active:scale-[0.98]">
            Add to Cart
          </div>
        </button>
      </div>
    </div>
  );
}