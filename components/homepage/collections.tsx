"use client";

import Image from "next/image";

const collections = [
  {
    title: "Ganna Series",
    subtitle: "Traditional Patterns & Arts",
    button: "Ganna",
    image: "/ha.a_ganna.jpg",
  },
  {
    title: "Mythological Series",
    subtitle: "Inspired from Folk Tales & Mythological Creatures",
    button: "Mythology",
    image: "/mythologi.jpg",
  },
  {
    title: "Collaboration Series",
    subtitle: "with Artists, Bands & Others",
    button: "Collaboration",
    image: "/collab.jpg",
  },
];

interface CollectionsProps {
  onSelectCategory?: (category: string) => void;
}

export default function Collections({ onSelectCategory }: CollectionsProps) {
  return (
    <section
      id="collections"
      className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10 lg:py-16"
    >
      {/* Header Section */}
      <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-white/40">
            Collections
          </p>
          <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
            Explore Our Signature Series
          </h3>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-white/50 md:text-base">
          Discover cultural storytelling, mythological inspiration, and unique
          artistic collaborations through premium wearable art.
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-all duration-500"
          >
            {/* Optimized Image Height for Mobile */}
            <div className="relative h-[420px] w-full xs:h-[480px] md:h-[500px] lg:h-[530px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

              {/* Content Overlay */}
              <div className="absolute inset-x-6 bottom-8 md:inset-x-8 md:bottom-10">
                <h4 className="text-2xl font-bold text-white md:text-3xl">
                  {item.title}
                </h4>
                <p className="mt-2 line-clamp-2 max-w-xs text-sm text-white/70 md:text-base">
                  {item.subtitle}
                </p>

                {/* Updated Button: Less Rounded & Original Color */}
                <button
                  onClick={() => onSelectCategory?.(item.button)}
                  className="mt-6 rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-500 active:scale-95 sm:w-auto"
                >
                  Explore {item.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}