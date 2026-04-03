export default function Newsletter() {
  return (
    <section id="newsletter" className="relative mx-auto max-w-[1600px] px-6 py-12 lg:px-10 lg:py-20">

      <img
        src="/liquid-logo.png"
        alt="logo background"
        className="pointer-events-none absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[700px] opacity-15 blur-sm object-contain"
      />

      <div className="relative z-10 card-fade rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-10 text-center md:px-10 md:py-14">
        <p className="text-xs uppercase tracking-[0.35em] text-white/45">
          Join The Liquid Family
        </p>

        <h3 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold md:text-4xl">
          Get early access to new drops and private release notes.
        </h3>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-white/60 md:text-base">
          Join the list for launch alerts, limited capsule updates, and curated editorials from the brand.
        </p>

        <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3 rounded-full border border-white/10 bg-black/40 p-2 sm:flex-row">
          <input
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-full bg-transparent px-5 text-sm text-white placeholder:text-white/35 outline-none"
          />
          <button className="h-12 rounded-full bg-white px-6 text-sm font-semibold text-black">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}