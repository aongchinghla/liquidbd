import type { Product } from "@/lib/products";
import ProductCard from "@/components/ui/product-card";
import Link from "next/link";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

const TAG_PRIORITY = ["Best Seller", "Limited", "Premium", "Capsule"];

function getFeaturedProducts(allProducts: Product[], limit: number) {
  const tagged = allProducts.filter((p) => (p.tag ?? "").trim().length > 0);

  const scored = tagged
    .map((p) => {
      const idx = TAG_PRIORITY.indexOf((p.tag ?? "").trim());
      return { product: p, score: idx === -1 ? TAG_PRIORITY.length : idx };
    })
    .sort((a, b) => a.score - b.score || a.product.id - b.product.id)
    .map(({ product }) => product);

  return scored.slice(0, limit);
}

interface FeaturedProductsProps {
  products: Product[];
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  limit?: number;
}

export default function FeaturedProducts({
  products,
  addToCart,
  limit = 4,
}: FeaturedProductsProps) {
  const featured = getFeaturedProducts(products, limit);
  if (featured.length === 0) return null;

  return (
    <section className="site-shell py-12 lg:py-16">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Featured
          </p>
          <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
            Liquid Storefront
          </h3>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="max-w-md text-sm leading-6 text-white/55">
            A curated selection of our best sellers and limited drops.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            Shop All
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {featured.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            formatPrice={formatPrice}
          />
        ))}
      </div>
    </section>
  );
}

