"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  BadgeInfo,
  CheckCircle2,
  CreditCard,
  Mail,
  MapPin,
  Minus,
  PackageCheck,
  Phone,
  Plus,
  ShoppingBag,
  TicketPercent,
  User,
} from "lucide-react";
import { useAppContext } from "@/context/app-context";
import { calculatePromoDiscount, normalizePromoCode } from "@/lib/checkout";
import { getDiscountedPrice, hasProductDiscount } from "@/lib/products";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function CheckoutPage() {
  const {
    cart,
    checkoutForm,
    handleCheckoutInput,
    handleCheckoutSave,
    isReady,
    placeOrder,
    setIsCartOpen,
    subtotal,
    updateCartQuantity,
  } = useAppContext();
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState<{
    orderId: string;
    total: number;
    paymentMethod: string;
    promoCode: string;
    discount: number;
    bkashSenderLast4: string;
    bkashTransactionId: string;
    nagadSenderLast4: string;
    nagadTransactionId: string;
  } | null>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);
  const deliveryCharge = subtotal > 0 ? 80 : 0;
  const promo = calculatePromoDiscount(subtotal, checkoutForm.promoCode);
  const total = Math.max(subtotal + deliveryCharge - promo.discount, 0);
  const orderId = useMemo(() => `LIQ-${Date.now().toString().slice(-6)}`, []);
  const paymentMethods = ["Cash on Delivery", "bKash", "Nagad"];
  const paymentMethodLogos: Record<string, { src: string; alt: string; width: number; height: number }> = {
    bKash: { src: "/bkash-logo.webp", alt: "bKash", width: 60, height: 22 },
    Nagad: { src: "/nagad-logo.png", alt: "Nagad", width: 62, height: 22 },
  };
  const merchantBkashNumber = "01XXXXXXXXX";
  const merchantNagadNumber = "01XXXXXXXXX";
  const isBkashSelected = checkoutForm.paymentMethod === "bKash";
  const isNagadSelected = checkoutForm.paymentMethod === "Nagad";
  const trimmedEmail = checkoutForm.email.trim();
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);
  const normalizedPromoCode = normalizePromoCode(checkoutForm.promoCode);
  const hasPromoCode = normalizedPromoCode.length > 0;
  const isPromoApplied = hasPromoCode && promo.discount > 0;
  const showInvalidPromo = hasPromoCode && !isPromoApplied;

  useEffect(() => {
    setIsCartOpen(false);
  }, [setIsCartOpen]);

  useEffect(() => {
    if (!orderSuccess || typeof window === "undefined") return;

    const isMobileViewport = window.matchMedia("(max-width: 767px)").matches;
    if (!isMobileViewport) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    const timer = window.setTimeout(() => {
      successSectionRef.current?.focus();
      successSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);

    return () => window.clearTimeout(timer);
  }, [orderSuccess]);

  const onPlaceOrder = () => {
    setError("");

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    if (!checkoutForm.name.trim() || !trimmedEmail || !checkoutForm.phone.trim() || !checkoutForm.address.trim()) {
      setError("Please fill in your name, email, phone number, and delivery address.");
      return;
    }

    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!checkoutForm.paymentMethod) {
      setError("Please select a payment method.");
      return;
    }

    if (isBkashSelected) {
      if (!checkoutForm.bkashSenderLast4.trim() || checkoutForm.bkashSenderLast4.trim().length !== 4) {
        setError("Please enter the last 4 digits of the bKash number you paid from.");
        return;
      }

      if (!checkoutForm.bkashTransactionId.trim()) {
        setError("Please enter your bKash transaction ID.");
        return;
      }
    }

    if (isNagadSelected) {
      if (!checkoutForm.nagadSenderLast4.trim() || checkoutForm.nagadSenderLast4.trim().length !== 4) {
        setError("Please enter the last 4 digits of the Nagad number you paid from.");
        return;
      }

      if (!checkoutForm.nagadTransactionId.trim()) {
        setError("Please enter your Nagad transaction ID.");
        return;
      }
    }

    handleCheckoutSave();
    const placedTotal = placeOrder(orderId);
    setOrderSuccess({
      orderId,
      total: placedTotal,
      paymentMethod: checkoutForm.paymentMethod,
      promoCode: promo.appliedPromoCode,
      discount: promo.discount,
      bkashSenderLast4: checkoutForm.bkashSenderLast4,
      bkashTransactionId: checkoutForm.bkashTransactionId,
      nagadSenderLast4: checkoutForm.nagadSenderLast4,
      nagadTransactionId: checkoutForm.nagadTransactionId,
    });
    // Clear the promo code after order is placed
    handleCheckoutInput("promoCode", "");
  };

  return (
    <section className="py-8 md:py-12">
      <div className="site-shell">
        {!orderSuccess && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-white/45">Checkout</p>
              <h1 className="mt-3 text-3xl font-semibold text-white md:text-4xl">Complete your order</h1>
            </div>

            <Link
              href="/shop"
              className="inline-flex items-center gap-2 self-start rounded-full bg-[#2f7ea1] px-5 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(47,126,161,0.28)] transition hover:scale-[1.01] hover:bg-[#286d8b] hover:shadow-[0_18px_38px_rgba(47,126,161,0.38)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        )}

        {!isReady ? (
          <div className="rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.3em] text-white/35">Loading checkout</p>
            <p className="mt-3 text-sm text-white/55">Bringing your saved cart and delivery info into place.</p>
          </div>
        ) : orderSuccess ? (
          <div
            ref={successSectionRef}
            tabIndex={-1}
            className="mx-auto max-w-2xl focus:outline-none"
          >
            <div className="px-6 py-8 text-center md:px-8 md:py-10">
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-400/10 text-emerald-300 shadow-[0_18px_40px_rgba(16,185,129,0.12)] ring-1 ring-emerald-200/10">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h2 className="relative mt-5 text-3xl font-semibold tracking-tight text-white">Order placed successfully</h2>
              <p className="relative mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65">
                Thank you. Your order ID is <span className="font-semibold text-white">{orderSuccess.orderId}</span>.
                We will contact you soon to confirm delivery.
              </p>

              <div className="relative mx-auto mt-6 max-w-md rounded-lg border border-white/10 bg-black/25 px-5 py-4 text-left backdrop-blur-sm">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">Payment Summary</p>
                <div className="mt-3 space-y-3 border-t border-white/10 pt-3 text-sm text-white/65">
                  <div className="flex items-center justify-between">
                    <span>Payment method</span>
                    <span className="font-medium text-white">{orderSuccess.paymentMethod}</span>
                  </div>
                  {orderSuccess.paymentMethod === "bKash" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Paid from</span>
                        <span className="font-medium text-white">XXXX{orderSuccess.bkashSenderLast4}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Transaction ID</span>
                        <span className="font-medium uppercase text-white">{orderSuccess.bkashTransactionId}</span>
                      </div>
                    </>
                  )}
                  {orderSuccess.paymentMethod === "Nagad" && (
                    <>
                      <div className="flex items-center justify-between">
                        <span>Paid from</span>
                        <span className="font-medium text-white">XXXX{orderSuccess.nagadSenderLast4}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Transaction ID</span>
                        <span className="font-medium uppercase text-white">{orderSuccess.nagadTransactionId}</span>
                      </div>
                    </>
                  )}
                  <div className="flex items-center justify-between">
                    <span>Total paid on order</span>
                    <span className="text-lg font-semibold text-white">{formatPrice(orderSuccess.total)}</span>
                  </div>
                  {orderSuccess.discount > 0 && (
                    <div className="flex items-center justify-between">
                      <span>Promo applied</span>
                      <span className="font-medium text-emerald-300">
                        {orderSuccess.promoCode} (-{formatPrice(orderSuccess.discount)})
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="relative mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/shop"
                  className="inline-flex min-w-[170px] items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Shop More
                </Link>
                <Link
                  href="/"
                  className="inline-flex min-w-[170px] items-center justify-center rounded-full border border-white/10 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white/75 transition hover:border-white/25 hover:bg-white/[0.04] hover:text-white"
                >
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-lg border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl shadow-black/20">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/20 text-white/75">
              <ShoppingBag className="h-7 w-7" />
            </div>
            <h2 className="mt-5 text-2xl font-semibold text-white">Your cart is empty</h2>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Add a few products first, then come back here to finish your checkout.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-5">
              <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 md:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-white/55" />
                  <h3 className="font-semibold text-white">Delivery information</h3>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Full name</span>
                    <span className="relative block">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        value={checkoutForm.name}
                        onChange={(e) => handleCheckoutInput("name", e.target.value)}
                        placeholder="Full name"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                      />
                    </span>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Email address</span>
                    <span className="relative block">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="email"
                        value={checkoutForm.email}
                        onChange={(e) => handleCheckoutInput("email", e.target.value)}
                        placeholder="hello@example.com"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                      />
                    </span>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Phone number</span>
                    <span className="relative block">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        value={checkoutForm.phone}
                        onChange={(e) => handleCheckoutInput("phone", e.target.value)}
                        placeholder="+880 1XXX XXXXXX"
                        className="h-12 w-full rounded-xl border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                      />
                    </span>
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Delivery address</span>
                    <textarea
                      value={checkoutForm.address}
                      onChange={(e) => handleCheckoutInput("address", e.target.value)}
                      placeholder="House, road, area, city"
                      rows={4}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                    />
                  </label>
                </div>

                <div className="mt-6 border-t border-white/10 pt-6">
                  <div className="mb-4 flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-white/55" />
                    <h3 className="font-semibold text-white">Payment method</h3>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method}
                        onClick={() => {
                          setError("");
                          handleCheckoutInput("paymentMethod", method);
                        }}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                          checkoutForm.paymentMethod === method
                            ? "border-white bg-white text-black"
                            : "border-white/10 bg-black/20 text-white/70 hover:border-white/25 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="font-medium">{method}</span>
                          {paymentMethodLogos[method] && (
                            <span className="inline-flex rounded-md bg-white px-2 py-1">
                              <Image
                                src={paymentMethodLogos[method].src}
                                alt={paymentMethodLogos[method].alt}
                                width={paymentMethodLogos[method].width}
                                height={paymentMethodLogos[method].height}
                                className="h-5 w-auto object-contain"
                              />
                            </span>
                          )}
                        </span>
                      </button>
                    ))}
                  </div>

                  {isBkashSelected && (
                    <div className="mt-4 rounded-lg border border-[#E2136E]/20 bg-[#E2136E]/[0.06] p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="mt-0.5 rounded-full border border-[#E2136E]/20 bg-[#E2136E]/10 p-2 text-[#ff7db3]">
                          <BadgeInfo className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">Complete your bKash payment</p>
                          <p className="mt-1 text-sm leading-6 text-white/65">
                            Send the full amount to our bKash number, then enter the last 4 digits of your sending number and the transaction ID below.
                          </p>
                        </div>
                        <div className="hidden rounded-lg bg-white px-3 py-2 sm:block">
                          <Image
                            src="/bkash-logo.webp"
                            alt="bKash"
                            width={72}
                            height={26}
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/40">bKash Number</p>
                        <p className="mt-2 text-xl font-semibold tracking-wide text-white">{merchantBkashNumber}</p>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-widest text-white/35">
                            Last 4 digits of your bKash number
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={checkoutForm.bkashSenderLast4}
                            onChange={(e) =>
                              handleCheckoutInput(
                                "bkashSenderLast4",
                                e.target.value.replace(/\D/g, "").slice(0, 4)
                              )
                            }
                            placeholder="1234"
                            className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </label>

                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-widest text-white/35">Transaction ID</span>
                          <input
                            type="text"
                            value={checkoutForm.bkashTransactionId}
                            onChange={(e) => handleCheckoutInput("bkashTransactionId", e.target.value.toUpperCase())}
                            placeholder="8N7A6B5C"
                            className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm uppercase text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  {isNagadSelected && (
                    <div className="mt-4 rounded-lg border border-[#F58220]/20 bg-[#F58220]/[0.08] p-4 md:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="mt-0.5 rounded-full border border-[#F58220]/20 bg-[#F58220]/10 p-2 text-[#ffb067]">
                          <BadgeInfo className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-white">Complete your Nagad payment</p>
                          <p className="mt-1 text-sm leading-6 text-white/65">
                            Send the full amount to our Nagad number, then enter the last 4 digits of your sending number and the transaction ID below.
                          </p>
                        </div>
                        <div className="hidden rounded-lg bg-white px-3 py-2 sm:block">
                          <Image
                            src="/nagad-logo.png"
                            alt="Nagad"
                            width={74}
                            height={26}
                            className="h-6 w-auto object-contain"
                          />
                        </div>
                      </div>

                      <div className="mt-4 rounded-lg border border-white/10 bg-black/25 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.24em] text-white/40">Nagad Number</p>
                        <p className="mt-2 text-xl font-semibold tracking-wide text-white">{merchantNagadNumber}</p>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-widest text-white/35">
                            Last 4 digits of your Nagad number
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            value={checkoutForm.nagadSenderLast4}
                            onChange={(e) =>
                              handleCheckoutInput(
                                "nagadSenderLast4",
                                e.target.value.replace(/\D/g, "").slice(0, 4)
                              )
                            }
                            placeholder="1234"
                            className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </label>

                        <label className="space-y-2">
                          <span className="text-xs uppercase tracking-widest text-white/35">Transaction ID</span>
                          <input
                            type="text"
                            value={checkoutForm.nagadTransactionId}
                            onChange={(e) => handleCheckoutInput("nagadTransactionId", e.target.value.toUpperCase())}
                            placeholder="8N7A6B5C"
                            className="h-12 w-full rounded-xl border border-white/10 bg-black/20 px-4 text-sm uppercase text-white placeholder:text-white/35 outline-none transition focus:border-white/25"
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 md:p-6">
              <div className="mb-4 flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-white/55" />
                <h3 className="font-semibold text-white">Order summary</h3>
              </div>

              <div className="max-h-[30rem] space-y-3 overflow-y-auto pr-1">
                {cart.map((item) => {
                  const discountedPrice = getDiscountedPrice(item);
                  const hasDiscount = hasProductDiscount(item);

                  return (
                  <div key={item.cartItemId} className="rounded-lg border border-white/10 bg-black/20 p-3">
                    <div className="flex gap-3">
                      <img src={item.image} alt={item.name} className="h-16 w-14 rounded-lg object-cover" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-white">{item.name}</p>
                        <p className="mt-1 text-xs text-white/45">
                          Qty {item.quantity}
                          {item.selectedSize ? ` | ${item.selectedSize}` : ""}
                          {item.selectedColor ? ` | ${item.selectedColor}` : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-white/85">{formatPrice(discountedPrice * item.quantity)}</p>
                        {hasDiscount ? (
                          <p className="text-xs text-white/35 line-through">{formatPrice(item.price * item.quantity)}</p>
                        ) : null}
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-white/10 bg-black/30">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, -1)}
                          className="inline-flex h-9 w-9 items-center justify-center text-white/75 transition hover:text-white"
                          aria-label={`Decrease quantity for ${item.name}`}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="min-w-9 text-center text-sm text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, 1)}
                          className="inline-flex h-9 w-9 items-center justify-center text-white/75 transition hover:text-white"
                          aria-label={`Increase quantity for ${item.name}`}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
                })}
              </div>

              <div className="mt-5 space-y-3 border-t border-white/10 pt-5 text-sm">
                <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                  <div className="flex items-center gap-2">
                    <TicketPercent className="h-4 w-4 text-white/55" />
                    <p className="text-sm font-medium text-white">Promo code</p>
                  </div>
                  <div className="mt-3 flex gap-3">
                    <input
                      type="text"
                      value={checkoutForm.promoCode}
                      onChange={(e) => handleCheckoutInput("promoCode", e.target.value.toUpperCase())}
                      placeholder="Enter promo code"
                      className="h-11 flex-1 rounded-xl border border-white/10 bg-black/30 px-4 text-sm uppercase tracking-[0.12em] text-white placeholder:normal-case placeholder:tracking-normal placeholder:text-white/30 outline-none transition focus:border-white/25"
                    />
                    {checkoutForm.promoCode && (
                      <button
                        onClick={() => handleCheckoutInput("promoCode", "")}
                        className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-xs font-medium text-white/60 transition hover:border-white/25 hover:text-white"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-white/40">Use `LIQUID10` for 10% off on your subtotal.</p>
                  {isPromoApplied && (
                    <p className="mt-2 text-xs text-emerald-300">
                      {promo.appliedPromoCode} applied. You saved {formatPrice(promo.discount)}.
                    </p>
                  )}
                  {showInvalidPromo && (
                    <p className="mt-2 text-xs text-amber-300">
                      This promo code is not valid right now.
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-white/60">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-white/60">
                  <span>Delivery</span>
                  <span>{formatPrice(deliveryCharge)}</span>
                </div>
                {promo.discount > 0 && (
                  <div className="flex items-center justify-between text-emerald-300">
                    <span>Promo discount</span>
                    <span>-{formatPrice(promo.discount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-lg font-semibold text-white">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </div>
              )}

              <button
                onClick={onPlaceOrder}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-4 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Place Order
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
