export interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  district: string;
  address: string;
  promoCode: string;
  paymentMethod: string;
  bkashSenderLast4: string;
  bkashTransactionId: string;
  nagadSenderLast4: string;
  nagadTransactionId: string;
}

export const BANGLADESH_DISTRICTS = [
  "Bagerhat",
  "Bandarban",
  "Barguna",
  "Barishal",
  "Bhola",
  "Bogura",
  "Brahmanbaria",
  "Chandpur",
  "Chattogram",
  "Chuadanga",
  "Cox's Bazar",
  "Cumilla",
  "Dhaka",
  "Dinajpur",
  "Faridpur",
  "Feni",
  "Gaibandha",
  "Gazipur",
  "Gopalganj",
  "Habiganj",
  "Jamalpur",
  "Jashore",
  "Jhalokathi",
  "Jhenaidah",
  "Joypurhat",
  "Khagrachhari",
  "Khulna",
  "Kishoreganj",
  "Kurigram",
  "Kushtia",
  "Lakshmipur",
  "Lalmonirhat",
  "Madaripur",
  "Magura",
  "Manikganj",
  "Meherpur",
  "Moulvibazar",
  "Munshiganj",
  "Mymensingh",
  "Naogaon",
  "Narail",
  "Narayanganj",
  "Narsingdi",
  "Natore",
  "Netrokona",
  "Nilphamari",
  "Noakhali",
  "Pabna",
  "Panchagarh",
  "Patuakhali",
  "Pirojpur",
  "Rajbari",
  "Rajshahi",
  "Rangamati",
  "Rangpur",
  "Satkhira",
  "Shariatpur",
  "Sherpur",
  "Sirajganj",
  "Sunamganj",
  "Sylhet",
  "Tangail",
  "Thakurgaon",
] as const;

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

export function normalizeDistrict(district: string) {
  return district.trim().toLowerCase();
}

export function getBangladeshDistrictValue(district: string) {
  const normalizedDistrict = normalizeDistrict(district);

  if (!normalizedDistrict) {
    return "";
  }

  return (
    BANGLADESH_DISTRICTS.find(
      (districtName) => normalizeDistrict(districtName) === normalizedDistrict
    ) ?? ""
  );
}

export function getDeliveryCharge(subtotal: number, district: string) {
  if (subtotal <= 0) {
    return 0;
  }

  if (!normalizeDistrict(district)) {
    return 0;
  }

  return normalizeDistrict(district) === "dhaka" ? 80 : 120;
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
