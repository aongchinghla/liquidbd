export interface CheckoutForm {
  name: string;
  phone: string;
  address: string;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

interface CheckoutModalProps {
  checkoutForm: CheckoutForm;
  handleCheckoutInput: (field: keyof CheckoutForm, value: string) => void;
  subtotal: number;
  handleCheckoutSave: () => void;
  setIsCheckoutOpen: (open: boolean) => void;
}

export default function CheckoutModal({
  checkoutForm,
  handleCheckoutInput,
  subtotal,
  handleCheckoutSave,
  setIsCheckoutOpen,
}: CheckoutModalProps) {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[2rem] border border-white/10 bg-neutral-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Checkout</p>
            <h4 className="mt-2 text-2xl font-semibold">Delivery information</h4>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
          >
            ✕
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <input
            value={checkoutForm.name}
            onChange={(e) => handleCheckoutInput("name", e.target.value)}
            placeholder="Full name"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
          />
          <input
            value={checkoutForm.phone}
            onChange={(e) => handleCheckoutInput("phone", e.target.value)}
            placeholder="Phone number"
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-white/35 outline-none"
          />
          <textarea
            value={checkoutForm.address}
            onChange={(e) => handleCheckoutInput("address", e.target.value)}
            placeholder="Delivery address"
            rows={4}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none"
          />
        </div>

        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="flex items-center justify-between text-sm text-white/70">
            <span>Current subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-2 text-sm text-white/50">This form is saved automatically in localStorage.</p>
        </div>

        <button
          onClick={handleCheckoutSave}
          className="mt-6 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
        >
          Save checkout info
        </button>
      </div>
    </div>
  );
}
