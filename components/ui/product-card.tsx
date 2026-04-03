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
    <div className="card-fade group overflow-hidden rounded-[1rem] border border-white/10 bg-white/[0.03]">
      <div className="relative aspect-square w-full overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-70" />

        {product.tag ? (
          <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/55 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
            {product.tag}
          </span>
        ) : null}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p
              className={`min-h-[1rem] text-xs uppercase tracking-[0.28em] text-white/40 ${
                hasCategory ? "" : "select-none opacity-0"
              }`}
              aria-hidden={!hasCategory}
            >
              {hasCategory ? product.category : "Category"}
            </p>

            <h4 className="mt-2 text-lg font-medium">{product.name}</h4>
          </div>

          <p className="text-sm font-semibold text-white/90">
            {formatPrice(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-medium text-black transition hover:opacity-90"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}