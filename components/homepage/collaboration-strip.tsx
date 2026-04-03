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
      gsap.fromTo(
        ".collab-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="collaborations"
      ref={containerRef}
      className="border-y border-white/20 py-10 lg:py-6"
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-8">
          {collaborators.map((brand) => (
            <div
              key={brand.name}
              className="collab-item flex flex-8 basis-[220px] items-center justify-center py-2"
            >
              <Image
                src={brand.src}
                alt={brand.name}
                width={brand.width}
                height={brand.height}
                className="h-auto max-h-[56px] w-auto object-contain opacity-80"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}