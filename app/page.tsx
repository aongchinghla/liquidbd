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
import { useMemo, useState, useEffect } from "react";
import gsap from "gsap";

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
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
      );
      gsap.fromTo(
        ".card-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.15 }
      );
    });

    return () => ctx.revert();
  }, []);

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
