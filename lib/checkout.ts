export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  promoCode: string;
  paymentMethod: string;
  bkashSenderLast4: string;
  bkashTransactionId: string;
  nagadSenderLast4: string;
  nagadTransactionId: string;
}

const PROMO_RULES = {
  LIQUID10: {
    type: "percent",
    value: 10,
    label: "10% off",
  },
} as const;

export function normalizePromoCode(code: string) {
  return code.trim().toUpperCase();
}

export function calculatePromoDiscount(subtotal: number, promoCode: string) {
  const normalizedCode = normalizePromoCode(promoCode);
  const promo = PROMO_RULES[normalizedCode as keyof typeof PROMO_RULES];

  if (!promo || subtotal <= 0) {
    return {
      appliedPromoCode: "",
      discount: 0,
      label: "",
    };
  }

  if (promo.type === "percent") {
    return {
      appliedPromoCode: normalizedCode,
      discount: Math.round((subtotal * promo.value) / 100),
      label: promo.label,
    };
  }

  return {
    appliedPromoCode: "",
    discount: 0,
    label: "",
  };
}
