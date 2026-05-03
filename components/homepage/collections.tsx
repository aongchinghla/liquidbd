"use client";

import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Ganna Series",
    subtitle: "Traditional Patterns & Arts",
    button: "Ganna",
    image: "/ha.a_ganna.jpg",
  },
  {
    title: "Mythological Series",
    subtitle: "Folk Tales & Mythic Creatures",
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

const heritageCards = [
  {
    title: "Garo",
    description:
      "Rooted motifs, proud identity, and modern silhouettes shaped through stories from the Garo community.",
    image: "/wangala_festival.jpg",
    button: "Explore Garo",
    href: "/shop?culture=garo",
  },
  {
    title: "Marma",
    description:
      "Calm visual rhythm and crafted cultural references brought into a clean, wearable direction.",
    image: "/marma.jpg",
    button: "Explore Marma",
    href: "/shop?culture=marma",
  },
  {
    title: "Tripura",
    description:
      "Movement, celebration, and hill heritage reflected through expressive details and bold presence.",
    image: "/tripura.jpg",
    button: "Explore Tripura",
    href: "/shop?culture=tripura",
  },
] as const;

interface CollectionsProps {
  onSelectCategory?: (category: string) => void;
}

export default function Collections({ onSelectCategory }: CollectionsProps) {
  return (
    <section id="collections" className="site-shell py-10 lg:py-16">
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

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((item) => (
          <div
            key={item.title}
            className="group relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900 transition-all duration-500"
          >
            <div className="relative h-[420px] w-full xs:h-[480px] md:h-[500px] lg:h-[530px]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-x-6 bottom-8 md:inset-x-8 md:bottom-10">
                <h4 className="text-2xl font-bold text-white md:text-3xl">
                  {item.title}
                </h4>
                <p className="mt-2 max-w-full truncate text-sm text-white/70 md:text-base">
                  {item.subtitle}
                </p>

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

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="group relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900">
          <div className="relative h-[360px] w-full md:h-[420px] lg:h-full lg:min-h-[680px]">
            <Image
              src={heritageCards[0].image}
              alt={heritageCards[0].title}
              fill
              className="object-cover object-center transition duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
            <div className="absolute inset-x-6 bottom-8 md:inset-x-8 md:bottom-10">
              <h4 className="text-3xl font-bold text-white md:text-4xl">
                {heritageCards[0].title}
              </h4>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/72 md:text-base">
                {heritageCards[0].description}
              </p>
              <Link
                href={heritageCards[0].href}
                className="mt-6 inline-flex items-center justify-center rounded-lg bg-sky-600 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sky-500 active:scale-95"
              >
                {heritageCards[0].button}
              </Link>
            </div>
          </div>
        </article>

        <div className="grid gap-6">
          {heritageCards.slice(1).map((item) => (
            <article
              key={item.title}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-neutral-900"
            >
              <div className="relative h-[260px] w-full md:h-[300px] lg:h-[327px]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover object-center transition duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />
                <div className="absolute inset-x-6 bottom-7 md:inset-x-8 md:bottom-8">
                  <h4 className="text-2xl font-bold text-white md:text-3xl">
                    {item.title}
                  </h4>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/72">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-5 inline-flex items-center justify-center rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-sky-500 active:scale-95"
                  >
                    {item.button}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
