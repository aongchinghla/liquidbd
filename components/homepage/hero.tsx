import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[92svh] w-full overflow-hidden">
      <Image
        src="/hero-image.jpg"
        alt="Liquid hero background"
        fill
        priority
        className="object-cover object-center"
      />

      <div className="absolute inset-0 bg-black/20 z-0" />

      <div className="site-shell relative z-10 flex min-h-[92svh] items-center px-4 py-12 md:py-18">
        <div className="w-full max-w-3xl text-left">
          
          <div className="hero-fade relative inline-block">
            <Image
              src="/top.png"
              alt="Liquid decoration"
              width={180}
              height={120}
              className="absolute left-1/2 top-[-35px] z-10 h-auto w-[45px] -translate-x-1/2 translate-x-3 object-contain md:top-[-66px] md:w-[90px] md:translate-x-8 lg:top-[-82px] lg:w-[110px] lg:translate-x-10"
              priority
            />

            <h1 className="text-[3.5rem] font-semibold leading-[1] text-white xs:text-[4.5rem] sm:text-7xl md:text-8xl lg:text-[7.5rem]">
              Liquid
            </h1>
          </div>

          <p className="hero-fade mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base md:max-w-xl md:text-lg">
            Where Indigenous Traditions Flow into Fashion.
          </p>

          <div className="hero-fade mt-8 flex flex-col gap-4 sm:flex-row md:justify-start">
            <Link href="/shop" className="self-start">
              <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-sky-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-sky-500 active:scale-95">
                Shop Now
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white">
                  <ShoppingBag className="h-3.5 w-3.5 text-sky-600" />
                </span>
              </button>
            </Link>

            <Link href="#collections" className="w-full sm:w-auto">
              <button className="w-full rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95 sm:w-auto">
                Explore Collection
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
