import Image from "next/image";
import Link from "next/link";

export default function IndigenousBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[360px] w-full md:h-[420px] lg:h-[520px]">
        <Image
          src="/liquid-bhalo.jpg"
          alt="banner image"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/75 lg:via-black/35 lg:to-transparent" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,23,42,0.2),transparent_55%)]" />

        <div className="absolute inset-0 flex items-center">
          <div className="site-shell">
            <div className="max-w-2xl border-l-4 border-sky-500 pl-5 md:pl-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/60">
                Indigenous Craft
              </p>

              <h2 className="mt-3 text-2xl font-black uppercase leading-[0.95] tracking-[-0.04em] text-white md:text-3xl lg:text-4xl">
                <span className="block">Decades of Indigenous</span>
                <span className="mt-1 block text-white/80">Knowledge in Every Thread</span>
              </h2>

              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Each piece carries the legacy of Indigenous traditions,
                honoring decades of cultural knowledge and craftsmanship.
              </p>

              <div className="mt-7 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center bg-[#2f7ea1] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#286d8b] active:scale-95"
                >
                  Shop with Purpose
                </Link>

                <div className="flex items-center gap-3 text-white/65">
                  <span className="h-px w-10 bg-white/30" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.25em]">
                    Woven with heritage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
