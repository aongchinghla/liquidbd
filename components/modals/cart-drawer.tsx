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
      <div className="flex h-full w-full max-w-md flex-col border-l border-white/10 bg-neutral-950 px-3.5 pb-[calc(env(safe-area-inset-bottom)+0.9rem)] pt-3.5 shadow-2xl shadow-black/50 sm:px-5 sm:pb-5 sm:pt-5">
        <div className="flex shrink-0 items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/45">Shopping Cart</p>
            <h4 className="mt-1.5 text-lg font-semibold sm:text-xl">Your bag</h4>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 sm:h-10 sm:w-10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex-1 space-y-2.5 overflow-y-auto pr-1 sm:mt-6 sm:space-y-3">
          {cart.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60 sm:p-5">
              Your cart is empty.
            </div>
          ) : (
            cart.map((item) => {
              const discountedPrice = getDiscountedPrice(item);
              const hasDiscount = hasProductDiscount(item);

              return (
                <div
                  key={item.cartItemId}
                  className="rounded-lg border border-white/10 bg-white/[0.03] p-2.5 sm:p-3"
                >
                  <div className="flex gap-2.5 sm:gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-[72px] w-14 rounded-lg object-cover sm:h-20 sm:w-16"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs text-white/45 sm:text-sm">
                            {item.productType}
                            {item.category ? ` | ${item.category}` : ""}
                          </p>
                          <h5 className="mt-0.5 text-sm font-medium leading-5 sm:text-[15px]">{item.name}</h5>
                          <div className="mt-1 flex flex-wrap gap-2 text-[9px] uppercase tracking-wider text-white/40">
                            {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                            {item.selectedColor && (
                              <div className="flex items-center gap-1">
                                <span>Color: {item.selectedColor}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-1.5">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-white/85">
                                {formatPrice(discountedPrice)}
                              </p>
                              {hasDiscount ? (
                                <p className="text-[11px] text-white/35 line-through">
                                  {formatPrice(item.price)}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-white/70 sm:h-8 sm:w-8"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30">
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, -1)}
                            className="inline-flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="min-w-8 text-center text-sm sm:min-w-9">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.cartItemId, 1)}
                            className="inline-flex h-8 w-8 items-center justify-center sm:h-9 sm:w-9"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
              </div>
              );
            })
          )}
        </div>

        <div className="mt-5 shrink-0 rounded-lg border border-white/10 bg-white/[0.03] p-3.5 sm:mt-6 sm:p-4">
          <div className="mb-2 flex items-center justify-between text-sm text-white/70">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="mb-3 flex items-center justify-between gap-4 text-sm text-white/50 sm:mb-4">
            <span>Payment</span>
            <span className="text-right">bKash / Nagad / COD</span>
          </div>
          <button
            onClick={() => {
              setIsCartOpen(false);
              router.push("/checkout");
            }}
            className="mt-3 w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-black sm:mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
