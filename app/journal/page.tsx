import Link from "next/link";

const journalHighlights = [
  {
    title: "Collection Stories",
    description: "Design notes, symbolism, and the stories carried inside each drop.",
  },
  {
    title: "Behind The Scenes",
    description: "A closer look at the people, process, and cultural references shaping Liquid.",
  },
  {
    title: "Community Notes",
    description: "Updates from collaborations, events, and the conversations that move us forward.",
  },
];

export default function JournalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[8%] top-8 h-[34%] w-[34%] rounded-full bg-[#2f7ea1]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[30%] w-[30%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <section className="relative z-10 border-b border-white/8">
        <div className="site-shell py-16 md:py-20 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className="max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/35">Journal</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
                Thoughts, process, and culture shaping every Liquid release.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
                This space will hold collection notes, behind-the-scenes stories, and reflections
                from the journey of building Liquid through fashion and identity.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/shop"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Explore Shop
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  Read About Us
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {journalHighlights.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl"
                >
                  <h2 className="text-lg font-semibold text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/55">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        <div className="site-shell py-12 md:py-14">
          <div className="rounded-lg border border-dashed border-white/12 bg-white/[0.02] px-6 py-10 text-center md:px-10 md:py-14">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/35">Coming Soon</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-4xl">
              The first Journal entries are on the way.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/55 md:text-base">
              We kept the page width aligned with the rest of the project, so when articles are
              added later this section can expand naturally inside the same layout system.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
