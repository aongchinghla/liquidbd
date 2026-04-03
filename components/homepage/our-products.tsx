import { Product } from "@/lib/products";
import ProductCard from "@/components/ui/product-card";
import Link from "next/link";

const filters = ["All", "Ganna", "Mythology", "Collaboration"];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

interface ProductsSectionProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  filteredProducts: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductsSection({
  activeFilter,
  setActiveFilter,
  filteredProducts,
  addToCart,
}: ProductsSectionProps) {
  return (
    <section id="featured" className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/45">
            Our Products
          </p>
          <h3 className="mt-3 text-3xl font-semibold md:text-4xl">
            Explore Our Collections
          </h3>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white/90 transition hover:border-white/25 hover:bg-white/[0.08]"
          >
            Shop All
          </Link>

          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/70 hover:border-white/25 hover:text-white"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {filteredProducts.map((product) => (
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