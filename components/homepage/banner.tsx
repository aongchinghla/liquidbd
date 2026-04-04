import Image from "next/image";
import Link from "next/link";

export default function IndigenousBanner() {
  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative h-[350px] w-full md:h-[400px] lg:h-[520px]">
        
        <Image
          src="/liquid-bhalo.jpg" 
          alt="banner image"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/40 lg:bg-gradient-to-r lg:from-black/70 lg:via-black/30 lg:to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10">
            <div className="max-w-xl">
              {/* Heading size komano hoyeche */}
              <h2 className="text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
                Decades of Indigenous <br className="hidden md:block" /> 
                Knowledge in Every Thread
              </h2>
              
              {/* Description size-o ektu choto kora hoyeche */}
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80 md:text-base">
                Each piece carries the legacy of Indigenous traditions, 
                honoring decades of cultural knowledge and craftsmanship.
              </p>

              <div className="mt-6">
                <Link
                  href="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-[#1e6a8d] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-[#154d66] active:scale-95"
                >
                  Shop with Purpose
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}