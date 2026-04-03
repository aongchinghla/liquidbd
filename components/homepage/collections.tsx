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
      className="mx-auto max-w-[1600px] px-6 py-10 lg:px-10 lg:py-14"
    >
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="card-fade text-xs uppercase tracking-[0.35em] text-white/45">
            Collections
          </p>
          <h3 className="card-fade mt-3 text-3xl font-semibold md:text-4xl">
            Explore Our Signature Series
          </h3>
        </div>
        <p className="card-fade max-w-md text-sm leading-6 text-white/55">
          Discover cultural storytelling, mythological inspiration, and unique
          artistic collaborations through premium wearable art.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {collections.map((item) => (
          <div
            key={item.title}
            className="card-fade group relative overflow-hidden rounded-[1.75rem] border border-white/30 bg-black"
          >
            <div className="relative h-[530px] w-full">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div className="absolute inset-x-6 bottom-6">
                <h4 className="text-2xl font-semibold text-white md:text-3xl">
                  {item.title}
                </h4>
                <p className="mt-2 max-w-xs text-sm text-white/80 md:text-base">
                  {item.subtitle}
                </p>

                <button
                  onClick={() => onSelectCategory?.(item.button)}
                  className="mt-5 rounded-xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
                >
                  {item.button}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}