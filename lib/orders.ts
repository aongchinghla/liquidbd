export interface OrderHistoryLineItem {
  id: number;
  cartItemId: string;
  name: string;
  price: number;
  discountPercentage?: number;
  productType: string;
  category: string;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface OrderHistoryCheckoutSnapshot {
  name: string;
  email: string;
  phone: string;
  district: string;
  address: string;
}

export interface OrderHistoryItem {
  orderId: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
  discount: number;
  promoCode: string;
  paymentMethod: string;
  bkashSenderLast4: string;
  bkashTransactionId: string;
  nagadSenderLast4: string;
  nagadTransactionId: string;
  customerName: string;
  customerEmail: string;
  items: OrderHistoryLineItem[];
  checkout: OrderHistoryCheckoutSnapshot;
  placedAt: string;
}

const ORDER_STORAGE_KEY = "liquid-orders";

function normalizeLookupValue(value?: string) {
  return value?.trim().toLowerCase() ?? "";
}

export function readStoredOrders() {
  if (typeof window === "undefined") {
    return [] as OrderHistoryItem[];
  }

  try {
    const savedOrders = localStorage.getItem(ORDER_STORAGE_KEY);

    if (!savedOrders) {
      return [];
    }

    const parsedOrders = JSON.parse(savedOrders) as OrderHistoryItem[];
    return Array.isArray(parsedOrders) ? parsedOrders : [];
  } catch (error) {
    console.error("order history load error", error);
    return [];
  }
}

export function saveOrderToHistory(order: OrderHistoryItem) {
  if (typeof window === "undefined") {
    return;
  }

  const existingOrders = readStoredOrders();
  localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify([order, ...existingOrders]));
}

export function getUserOrderHistory(user: { name?: string; email?: string }) {
  const normalizedName = normalizeLookupValue(user.name);
  const normalizedEmail = normalizeLookupValue(user.email);

  return readStoredOrders().filter((order) => {
    const orderCustomerName = normalizeLookupValue(order.customerName);
    const orderCustomerEmail = normalizeLookupValue(order.customerEmail);
    const checkoutEmail = normalizeLookupValue(order.checkout.email);

    if (normalizedEmail && (orderCustomerEmail === normalizedEmail || checkoutEmail === normalizedEmail)) {
      return true;
    }

    if (normalizedName && orderCustomerName === normalizedName) {
      return true;
    }

    return false;
  });
}
