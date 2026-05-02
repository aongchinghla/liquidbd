"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Home, ChevronRight } from "lucide-react"; 
import ProductCard from "@/components/ui/product-card";
import { useAppContext } from "@/context/app-context";
import { CULTURES, PRODUCT_TYPES, products } from "@/lib/products";

const filters = ["All", "Ganna", "Mythology", "Collaboration"] as const;
const filterMap = new Map(filters.map((filter) => [filter.toLowerCase(), filter] as const));
const typeFilters = ["All Types", ...PRODUCT_TYPES] as const;
const typeFilterMap = new Map(typeFilters.map((filter) => [filter.toLowerCase(), filter] as const));
const cultureFilters = ["All Cultures", ...CULTURES] as const;
const cultureFilterMap = new Map(cultureFilters.map((filter) => [filter.toLowerCase(), filter] as const));

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="w-full" />}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const { addToCart } = useAppContext();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<"category" | "type" | "culture" | null>(null);
  const activeFilter =
    filterMap.get(searchParams.get("category")?.toLowerCase() ?? "all") ?? "All";
  const activeTypeFilter =
    typeFilterMap.get(searchParams.get("type")?.toLowerCase() ?? "all types") ?? "All Types";
  const activeCultureFilter =
    cultureFilterMap.get(searchParams.get("culture")?.toLowerCase() ?? "all cultures") ?? "All Cultures";

  const updateFilter = (filter: (typeof filters)[number]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "All") {
      params.delete("category");
    } else {
      params.set("category", filter.toLowerCase());
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const updateTypeFilter = (filter: (typeof typeFilters)[number]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "All Types") {
      params.delete("type");
    } else {
      params.set("type", filter.toLowerCase());
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const updateCultureFilter = (filter: (typeof cultureFilters)[number]) => {
    const params = new URLSearchParams(searchParams.toString());

    if (filter === "All Cultures") {
      params.delete("culture");
    } else {
      params.set("culture", filter.toLowerCase());
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeFilter === "All" || product.category === activeFilter;
      const matchesType = activeTypeFilter === "All Types" || product.productType === activeTypeFilter;
      const matchesCulture = activeCultureFilter === "All Cultures" || product.culture === activeCultureFilter;

      return matchesCategory && matchesType && matchesCulture;
    });
  }, [activeCultureFilter, activeFilter, activeTypeFilter]);

  const selectedLabels = [
    activeCultureFilter !== "All Cultures" ? activeCultureFilter : "",
    activeTypeFilter !== "All Types" ? activeTypeFilter : "",
    activeFilter !== "All" ? activeFilter : "",
  ].filter(Boolean);
  const pageTitle = selectedLabels.length > 0 ? selectedLabels.join(" | ") : "All Products";

  return (
    <div className="w-full">
      <div className="relative mb-16 h-[220px] w-full overflow-hidden">
        <Image
          src="/pattern.jpg" 
          alt="Shop Header"
          fill
          className="object-cover opacity-40" 
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />

        <div className="site-shell relative z-10 flex h-full flex-col items-center justify-center">

          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md lg:left-10">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
              <Home size={12} />
              <span>Home</span>
            </Link>
            
            <ChevronRight size={10} className="text-white/30" />
            
            <span className="text-white/40">Shop</span>
            
            {activeCultureFilter !== "All Cultures" && (
              <>
                <ChevronRight size={10} className="text-white/30" />
                <span className="text-emerald-300">{activeCultureFilter}</span>
              </>
            )}

            {activeTypeFilter !== "All Types" && (
              <>
                <ChevronRight size={10} className="text-white/30" />
                <span className="text-sky-300">{activeTypeFilter}</span>
              </>
            )}

            {activeFilter !== "All" && (
              <>
                <ChevronRight size={10} className="text-white/30" />
                <span className="text-sky-400">{activeFilter}</span>
              </>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Collection</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl text-white">{pageTitle}</h1>
          </div>
        </div>
      </div>

      <div className="site-shell pb-10 lg:pb-14">
        <section id="shop-products">
          <div className="mb-10 flex flex-col justify-center gap-4 md:flex-row">
            <div className="relative w-full md:w-64">
              <button
                onClick={() => {
                  setOpenDropdown((current) => (current === "culture" ? null : "culture"));
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20"
              >
                <span>Culture: <span className="text-emerald-300">{activeCultureFilter}</span></span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openDropdown === "culture" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "culture" && (
                <div className="absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl backdrop-blur-xl">
                  {cultureFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        updateCultureFilter(filter);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm transition hover:bg-white/5 ${
                        activeCultureFilter === filter ? "bg-white/10 text-emerald-300" : "text-white/70"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full md:w-64">
              <button
                onClick={() => {
                  setOpenDropdown((current) => (current === "type" ? null : "type"));
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20"
              >
                <span>Type: <span className="text-sky-400">{activeTypeFilter}</span></span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openDropdown === "type" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "type" && (
                <div className="absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl backdrop-blur-xl">
                  {typeFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        updateTypeFilter(filter);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm transition hover:bg-white/5 ${
                        activeTypeFilter === filter ? "bg-white/10 text-sky-400" : "text-white/70"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative w-full md:w-64">
              <button
                onClick={() => {
                  setOpenDropdown((current) => (current === "category" ? null : "category"));
                }}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20"
              >
                <span>Category: <span className="text-sky-400">{activeFilter}</span></span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${openDropdown === "category" ? "rotate-180" : ""}`} />
              </button>

              {openDropdown === "category" && (
                <div className="absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl backdrop-blur-xl">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        updateFilter(filter);
                        setOpenDropdown(null);
                      }}
                      className={`w-full px-5 py-3 text-left text-sm transition hover:bg-white/5 ${
                        activeFilter === filter ? "bg-white/10 text-sky-400" : "text-white/70"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
                formatPrice={formatPrice}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-white/40">No products found for the selected category, type, and culture.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
