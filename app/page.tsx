"use client";

import Hero from "@/components/homepage/hero";
import Vedeos from "@/components/homepage/vedeos";
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

export default function Page() {
  const { addToCart } = useAppContext();
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeFilter === "All") return products;
    return products.filter(
      (product) =>
        product.category === activeFilter || product.culture === activeFilter
    );
  }, [activeFilter]);

  const homeProducts = useMemo(() => filteredProducts.slice(0, 8), [filteredProducts]);

  const handleCategorySelect = (category: string) => {
    setActiveFilter(category);
    document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const heroItems = Array.from(document.querySelectorAll<HTMLElement>(".hero-fade"));
      const cardItems = Array.from(document.querySelectorAll<HTMLElement>(".card-fade"));

      if (heroItems.length > 0) {
        gsap.fromTo(
          heroItems,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: "power3.out" }
        );
      }

      if (cardItems.length > 0) {
        gsap.fromTo(
          cardItems,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power3.out", delay: 0.15 }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <Hero />
      <Collaborations />
      <Collections onSelectCategory={handleCategorySelect} />
      <Vedeos />
      <FeaturedProducts products={products} addToCart={addToCart} />
      <ProductsSection
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        filteredProducts={homeProducts}
        addToCart={addToCart}
      />
      <Banner />
      <BandCollaboration />
      <PhotoGallery />
      <Reviews />
      {/* <Newsletter /> */}
    </>
  );
}
