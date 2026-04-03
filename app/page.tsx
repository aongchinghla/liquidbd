"use client";

import Hero from "@/components/homepage/hero";
import Collaborations from "@/components/homepage/collaboration-strip";
import Reviews from "@/components/homepage/reviews";
import Newsletter from "@/components/homepage/newsletter";
import Collections from "@/components/homepage/collections";
import ProductsSection from "@/components/homepage/our-products";
import Banner from "@/components/homepage/banner";
import FeaturedProducts from "@/components/homepage/featured-products";
import BandCollaboration from "@/components/homepage/collaborators";
import PhotoGallery from "@/components/homepage/photo-gallery";
import { products } from "@/lib/products";
import { useAppContext } from "@/context/app-context";
import { useMemo, useState } from "react";
import { useGsapAnimations } from "@/hooks/use-gsap-animations";

function ShopSection() {
  const { addToCart } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  const homeProducts = useMemo(() => filteredProducts.slice(0, 8), [filteredProducts]);

  const handleCategorySelect = (category: string) => {
    setActiveFilter(category);
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <FeaturedProducts products={products} addToCart={addToCart} />
      <Collections onSelectCategory={handleCategorySelect} />
      <ProductsSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filteredProducts={homeProducts}
        addToCart={addToCart}
      />
    </>
  );
}

export default function Page() {
  useGsapAnimations();

  return (
    <>
      <Hero />
      <Collaborations />
      <ShopSection />
      <Banner />
      <BandCollaboration />
      <Reviews />
      <PhotoGallery />
      <Newsletter />
    </>
  );
}
