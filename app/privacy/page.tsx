import Link from "next/link";

const privacyPoints = [
  "We collect the details needed to confirm orders, support customers, and improve the shopping experience.",
  "Your name, email, phone number, and delivery address are used for communication and order fulfillment.",
  "Liquid does not sell customer personal information to third parties.",
  "Customers can contact Liquid if they want stored account details updated or removed.",
];

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[8%] top-0 h-[34%] w-[34%] rounded-full bg-[#2f7ea1]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28%] w-[28%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="site-shell relative z-10 py-14 md:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/35">Privacy</p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          How Liquid handles customer information.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
          A simple overview of what information we collect and how we use it to serve customers.
        </p>

        <div className="mt-10 rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
          <div className="grid gap-4">
            {privacyPoints.map((point) => (
              <div
                key={point}
                className="rounded-lg border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-white/70"
              >
                {point}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Continue Shopping
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              Learn About Liquid
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
