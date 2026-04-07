"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { CartItem } from "@/components/modals/cart-drawer";
import { CheckoutForm } from "@/components/modals/checkout-modal";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CartDrawer from "@/components/modals/cart-drawer";
import CheckoutModal from "@/components/modals/checkout-modal";

interface AppContextType {
  cart: CartItem[];
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  currentUser: string;
  setCurrentUser: (name: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  handleLogout: () => void;
  checkoutForm: CheckoutForm;
  handleCheckoutInput: (field: keyof CheckoutForm, value: string) => void;
  handleCheckoutSave: () => void;
  subtotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function mergeCartItem(prev: CartItem[], product: Product, color?: string, size?: string) {
  const cartItemId = `${product.id}-${color || ""}-${size || ""}`;
  const existing = prev.find((item) => item.cartItemId === cartItemId);

  if (existing) {
    return prev.map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
    );
  }

  return [
    ...prev,
    {
      ...product,
      cartItemId,
      quantity: 1,
      selectedColor: color,
      selectedSize: size,
    },
  ];
}

function changeQuantity(prev: CartItem[], cartItemId: string, delta: number) {
  return prev
    .map((item) =>
      item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);
}

function RootShell({ children }: { children: React.ReactNode }) {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  const {
    isMenuOpen,
    setIsMenuOpen,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    removeFromCart,
    updateCartQuantity,
    checkoutForm,
    handleCheckoutInput,
    handleCheckoutSave,
    handleLogout,
  } = context;

  return (
    <div className="min-h-screen bg-neutral-950 font-sans text-white selection:bg-white selection:text-black">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_22%)]" />

      <Navbar
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        handleLogout={handleLogout}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        setIsCartOpen={setIsCartOpen}
      />

      <main className="relative z-10">{children}</main>

      <Footer />

      {isCartOpen && (
        <CartDrawer
          cart={cart}
          subtotal={subtotal}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          setIsCartOpen={setIsCartOpen}
          setIsCheckoutOpen={setIsCheckoutOpen}
        />
      )}

      {isCheckoutOpen && (
        <CheckoutModal
          checkoutForm={checkoutForm}
          handleCheckoutInput={handleCheckoutInput}
          subtotal={subtotal}
          handleCheckoutSave={handleCheckoutSave}
          setIsCheckoutOpen={setIsCheckoutOpen}
        />
      )}
    </div>
  );
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Guest");
  const [checkoutForm, setCheckoutForm] = useState<CheckoutForm>({
    name: "",
    phone: "",
    address: "",
  });
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("liquid-cart");
      const savedUser = localStorage.getItem("liquid-user");
      const savedCheckout = localStorage.getItem("liquid-checkout");

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedCheckout) setCheckoutForm(JSON.parse(savedCheckout));

      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        setIsLoggedIn(Boolean(parsed?.isLoggedIn));
        setCurrentUser(parsed?.name || "Guest");
      }
    } catch (error) {
      console.error("localStorage load error", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("liquid-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("liquid-checkout", JSON.stringify(checkoutForm));
  }, [checkoutForm]);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product: Product, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => mergeCartItem(prev, product, selectedColor, selectedSize));
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => changeQuantity(prev, cartItemId, delta));
  };

  const handleCheckoutInput = (field: keyof CheckoutForm, value: string) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogout = () => {
    localStorage.removeItem("liquid-user");
    setIsLoggedIn(false);
    setCurrentUser("Guest");
  };

  const handleCheckoutSave = () => {
    localStorage.setItem("liquid-checkout", JSON.stringify(checkoutForm));
    setIsCheckoutOpen(false);
  };

  const value: AppContextType = {
    cart,
    isLoggedIn,
    setIsLoggedIn,
    currentUser,
    setCurrentUser,
    isCartOpen,
    setIsCartOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isMenuOpen,
    setIsMenuOpen,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    handleLogout,
    checkoutForm,
    handleCheckoutInput,
    handleCheckoutSave,
    subtotal,
  };

  return (
    <AppContext.Provider value={value}>
      <RootShell>{children}</RootShell>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}