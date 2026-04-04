import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="overflow-hidden">
      <div className="mx-auto grid max-w-[1600px] items-center gap-14 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
        <div className="md:-translate-y-6 lg:-translate-y-20">
          <div className="hero-fade relative inline-block">
            <Image
              src="/top.png"
              alt="Liquid decoration"
              width={180}
              height={120}
              className="absolute left-1/2 top-[-58px] z-10 h-auto w-[70px] -translate-x-1/2 translate-x-6 object-contain md:top-[-72px] md:w-[90px] md:translate-x-8 lg:top-[-88px] lg:w-[110px] lg:translate-x-10"
              priority
            />

            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.95] md:text-7xl lg:text-[7.5rem]">
              Liquid
            </h1>
          </div>

          <p className="hero-fade mt-6 max-w-xl text-base leading-7 text-white/62 md:text-lg">
            Where Indigenous Traditions Flow into Fashion.
          </p>

          <div className="hero-fade mt-8 flex flex-wrap gap-4">
            <Link href="/shop">
              <button className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02]">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>
            <Link href="#collections">
              <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>

        <div className="hero-fade relative">
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-12 -right-8 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 shadow-2xl shadow-black/40">
            <img
              src="/hero-image.jpg"
              alt="Premium dark fashion t-shirt"
              className="h-[620px] w-full rounded-[1.5rem] object-cover"
            />
            {/* Card Overlay - "Featured Drop" Text Removed */}
            <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-white">Culture Meets Craft</h3>
                  <p className="mt-2 max-w-md text-sm text-white/65">
                    Rooted in Tradition Crafted with Purpose Woven with Heritage
                  </p>
                </div>
                <button className="rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200">
                  Our Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}