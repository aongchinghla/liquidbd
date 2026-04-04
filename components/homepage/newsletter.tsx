export default function Newsletter() {
  return (
    <section id="newsletter" className="relative mx-auto max-w-[1600px] px-6 pt-12 pb-0 lg:px-10 lg:pt-20 overflow-hidden">

      <img
        src="/liquid-logo.png"
        alt="logo background"
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] md:w-[700px] opacity-15 blur-[1px] object-contain"
      />

      <div className="relative z-10 card-fade rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-center md:px-10 md:py-14 backdrop-blur-sm mb-10 md:mb-16">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Join The Liquid Family
        </p>

        <h3 className="mx-auto mt-4 max-w-2xl text-2xl font-semibold leading-tight md:text-4xl">
          Get early access to new drops and private release notes.
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60 md:text-base">
          Join the list for launch alerts, limited capsule updates, and curated editorials from the brand.
        </p>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 rounded-2xl border border-white/10 bg-black/40 p-2 sm:flex-row sm:items-center sm:rounded-full sm:gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-10 flex-1 rounded-xl bg-transparent px-5 text-sm text-white placeholder:text-white/35 outline-none sm:h-11 sm:rounded-full"
          />
          <button className="h-10 rounded-xl bg-white px-6 text-[10px] font-bold uppercase tracking-wider text-black transition-transform active:scale-95 sm:h-11 sm:px-8 sm:rounded-full sm:text-xs">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}