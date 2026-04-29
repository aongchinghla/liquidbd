import { Minus, Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { getDiscountedPrice, hasProductDiscount } from "@/lib/products";

export interface CartItem {
  id: number;
  cartItemId: string;
  name: string;
  price: number;
  discountPercentage?: number;
  tag?: string;
  productType: string;
  category: string;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
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
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  setIsCartOpen: (open: boolean) => void;
}

export default function CartDrawer({
  cart,
  subtotal,
  removeFromCart,
  updateCartQuantity,
  setIsCartOpen,
}: CartDrawerProps) {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/60 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-4 shadow-2xl shadow-black/50 sm:px-6 sm:pb-6 sm:pt-6">
        <div className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Shopping Cart</p>
            <h4 className="mt-2 text-xl font-semibold sm:text-2xl">Your bag</h4>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6 flex-1 space-y-3 overflow-y-auto pr-1 sm:mt-8 sm:space-y-4">
          {cart.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-white/60">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => {
              const discountedPrice = getDiscountedPrice(item);
              const hasDiscount = hasProductDiscount(item);

              return (
                <div
                  key={item.cartItemId}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:rounded-2xl"
                >
                  <div className="flex gap-3 sm:gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-16 rounded-lg object-cover sm:h-24 sm:w-20 sm:rounded-xl"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-white/45 sm:text-sm">
                            {item.productType}
                            {item.category ? ` Â· ${item.category}` : ""}
                          </p>
                          <h5 className="mt-1 text-sm font-medium sm:text-base">{item.name}</h5>
                          <div className="mt-1 flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-white/40">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedColor && (
                              <div className="flex items-center gap-1">
                                <span>Color: {item.selectedColor}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-2">
                            <p className="text-sm text-white/70">{formatPrice(discountedPrice)}</p>
                            {hasDiscount ? (
                              <p className="text-xs text-white/35 line-through">
                                {formatPrice(item.price)}
                              </p>
                            ) : null}
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/70 sm:h-9 sm:w-9"
                        >
                          <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        </button>
                      </div>
                      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="inline-flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-9 text-center text-sm sm:min-w-10">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="inline-flex h-9 w-9 items-center justify-center sm:h-10 sm:w-10"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-white/90 sm:text-right">
                          {formatPrice(discountedPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-6 shrink-0 rounded-[1.35rem] border border-white/10 bg-white/[0.03] p-4 sm:mt-8 sm:rounded-[1.5rem] sm:p-5">
          <div className="mb-2 flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mb-4 flex items-center justify-between gap-4 text-sm text-white/50 sm:mb-5">
            <span>Payment</span>
            <span className="text-right">bKash / Nagad / COD</span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              router.push("/checkout");
            }}
            className="mt-4 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black sm:mt-5"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
