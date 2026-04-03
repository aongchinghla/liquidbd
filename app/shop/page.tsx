"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ChevronDown, Home, ChevronRight } from "lucide-react"; 
import ProductCard from "@/components/ui/product-card";
import { useAppContext } from "@/context/app-context";
import { products } from "@/lib/products";

const filters = ["All", "Ganna", "Mythology", "Collaboration"] as const;

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function ShopPage() {
  const { addToCart } = useAppContext();
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="w-full">
      {/* 1. Full-Width Header Section */}
      <div className="relative mb-16 h-[220px] w-full overflow-hidden">
        {/* Background Image - Absolute Full Width */}
        <Image
          src="/pattern.jpg" 
          alt="Shop Header"
          fill
          className="object-cover opacity-40" 
          priority
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Content Container - Constrained to 1600px */}
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col items-center justify-center px-6 lg:px-10">
          
          {/* Breadcrumb - Aligned within 1600px but positioned top-left of the container */}
          <div className="absolute left-6 top-6 flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-md lg:left-10">
            <Link href="/" className="flex items-center gap-1.5 transition hover:text-white">
              <Home size={12} />
              <span>Home</span>
            </Link>
            
            <ChevronRight size={10} className="text-white/30" />
            
            <span className="text-white/40">Shop</span>
            
            {activeFilter !== "All" && (
              <>
                <ChevronRight size={10} className="text-white/30" />
                <span className="text-sky-400">{activeFilter}</span>
              </>
            )}
          </div>

          {/* Centered Title */}
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Collection</p>
            <h1 className="mt-3 text-3xl font-semibold md:text-5xl text-white">
              {activeFilter === "All" ? "All Products" : activeFilter}
            </h1>
          </div>
        </div>
      </div>

      {/* 2. Products Content Area - Constrained to 1600px */}
      <div className="mx-auto max-w-[1600px] px-6 pb-10 lg:px-10 lg:pb-14">
        <section id="shop-products">
          {/* Centered Dropdown Filter */}
          <div className="mb-10 flex justify-center">
            <div className="relative w-full md:w-64">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-medium text-white transition hover:border-white/20"
              >
                <span>Category: <span className="text-sky-400">{activeFilter}</span></span>
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl backdrop-blur-xl">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setIsDropdownOpen(false);
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

          {/* Grid Area */}
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
              <p className="text-white/40">No products found in this category.</p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}