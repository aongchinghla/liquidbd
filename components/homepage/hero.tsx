import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92svh] overflow-hidden">
      <Image
        src="/hero-image.jpg"
        alt="Liquid hero background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="site-shell relative z-10 flex min-h-[92svh] items-center py-16 md:py-18">
        <div className="max-w-3xl text-center md:text-left">
          <div className="hero-fade relative inline-block">
            <Image
              src="/top.png"
              alt="Liquid decoration"
              width={180}
              height={120}
              className="absolute left-1/2 top-[-44px] z-10 h-auto w-[58px] -translate-x-1/2 translate-x-4 object-contain md:top-[-66px] md:w-[90px] md:translate-x-8 lg:top-[-82px] lg:w-[110px] lg:translate-x-10"
              priority
            />

            <h1 className="text-[4.4rem] font-semibold leading-[0.9] text-white sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Liquid
            </h1>
          </div>

          <p className="hero-fade mx-auto mt-6 max-w-md text-sm leading-6 text-white sm:text-base md:mx-0 md:max-w-xl md:text-lg md:leading-7">
            Where Indigenous Traditions Flow into Fashion.
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
            <Link href="/shop" className="w-full sm:w-auto">
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] sm:w-auto">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </button>
            </Link>

            <Link href="#collections" className="w-full sm:w-auto">
              <button className="w-full rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/15 sm:w-auto">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
