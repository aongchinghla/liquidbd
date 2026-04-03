import { Minus, Plus, Trash2, X } from "lucide-react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  tag?: string;
  category: string;
  image: string;
  quantity: number;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

interface CartDrawerProps {
  cart: CartItem[];
  subtotal: number;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, delta: number) => void;
  setIsCartOpen: (open: boolean) => void;
  setIsCheckoutOpen: (open: boolean) => void;
}

export default function CartDrawer({
  cart,
  subtotal,
  removeFromCart,
  updateCartQuantity,
  setIsCartOpen,
  setIsCheckoutOpen,
}: CartDrawerProps) {
  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-neutral-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Shopping Cart</p>
            <h4 className="mt-2 text-2xl font-semibold">Your bag</h4>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8 space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                <div className="flex gap-4">
                  <img src={item.image} alt={item.name} className="h-24 w-20 rounded-xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm text-white/45">{item.category}</p>
                        <h5 className="mt-1 font-medium">{item.name}</h5>
                        <p className="mt-2 text-sm text-white/70">{formatPrice(item.price)}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/70"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30">
                        <button onClick={() => updateCartQuantity(item.id, -1)} className="inline-flex h-10 w-10 items-center justify-center">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-10 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateCartQuantity(item.id, 1)} className="inline-flex h-10 w-10 items-center justify-center">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-sm font-semibold text-white/90">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-2 flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mb-5 flex items-center justify-between text-sm text-white/50">
            <span>Payment</span>
            <span>bKash / Nagad / COD</span>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(true)}
            className="mt-5 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
