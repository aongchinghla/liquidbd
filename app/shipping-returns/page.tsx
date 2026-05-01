import Link from "next/link";

const shippingSteps = [
  "Orders are reviewed and confirmed after checkout information is submitted.",
  "Delivery timelines can vary depending on stock availability and destination.",
  "Customers receive shipping communication using the contact details shared at checkout.",
  "For urgent delivery questions, customers can reach out to Liquid directly before or after placing an order.",
];

const returnNotes = [
  "If an item arrives damaged or incorrect, customers should contact Liquid as soon as possible.",
  "Return and exchange eligibility may depend on product condition and the time since delivery.",
  "Customers should keep order details available when requesting support for returns.",
  "Each return request can be reviewed individually to make sure the best solution is offered.",
];

export default function ShippingReturnsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950 text-white">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[8%] top-0 h-[34%] w-[34%] rounded-full bg-[#2f7ea1]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[28%] w-[28%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div className="site-shell relative z-10 py-14 md:py-18">
        <p className="text-xs font-bold uppercase tracking-[0.32em] text-white/35">
          Shipping & Returns
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-6xl">
          Delivery, exchanges, and return support in one place.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-7 text-white/58 md:text-lg">
          Everything customers need to know about order fulfillment, delivery updates,
          exchanges, and return-related support.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#2f7ea1]">
              Shipping
            </p>
            <div className="mt-5 grid gap-4">
              {shippingSteps.map((step, index) => (
                <article
                  key={step}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl"
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#2f7ea1]">
                    Step {index + 1}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-white/70">{step}</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#2f7ea1]">
              Returns
            </p>
            <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
              <div className="space-y-4">
                {returnNotes.map((note) => (
                  <div
                    key={note}
                    className="rounded-lg border border-white/8 bg-black/20 px-4 py-4 text-sm leading-7 text-white/70"
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/checkout"
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
          >
            Go To Checkout
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
          >
            Back To Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
