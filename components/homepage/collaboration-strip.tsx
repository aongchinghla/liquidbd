"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const collaborators = [
  { name: "Liquid", src: "/liquid-logo.png", width: 100, height: 60 },
  { name: "collab", src: "/x.png", width: 90, height: 70 },
  { name: "The Rabuga", src: "/the_rabuga.png", width: 110, height: 40 },
  { name: "Sacrament", src: "/srcrament.png", width: 140, height: 160 },
];

export default function Collaborations() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = Array.from(containerRef.current?.querySelectorAll<HTMLElement>(".collab-item") ?? []);

      if (items.length > 0 && containerRef.current) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="collaborations" ref={containerRef} className="border-y border-white/10 py-6 lg:py-6">
      <div className="site-shell">
        <div className="grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-4 lg:gap-12">
          {collaborators.map((brand) => (
            <div key={brand.name} className="collab-item flex w-full items-center justify-center py-2">
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-auto max-h-[40px] w-auto object-contain opacity-70 transition-opacity hover:opacity-100 md:max-h-[56px]"
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
