"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "@/lib/products";
import { CartItem } from "@/components/modals/cart-drawer";
import { AuthForm } from "@/components/modals/auth-modal";
import { CheckoutForm } from "@/components/modals/checkout-modal";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CartDrawer from "@/components/modals/cart-drawer";
import CheckoutModal from "@/components/modals/checkout-modal";
import AuthModal from "@/components/modals/auth-modal";

interface AppContextType {
  cart: CartItem[];
  isLoggedIn: boolean;
  currentUser: string;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, delta: number) => void;
  handleLogout: () => void;
  authMode: "login" | "signup";
  setAuthMode: (mode: "login" | "signup") => void;
  authError: string;
  authForm: AuthForm;
  handleAuthInput: (field: keyof AuthForm, value: string) => void;
  handleAuthSubmit: () => void;
  checkoutForm: CheckoutForm;
  handleCheckoutInput: (field: keyof CheckoutForm, value: string) => void;
  handleCheckoutSave: () => void;
  subtotal: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

function mergeCartItem(prev: CartItem[], product: Product) {
  const existing = prev.find((item) => item.id === product.id);
  if (existing) {
    return prev.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
  }
  return [...prev, { ...product, quantity: 1 }];
}

function changeQuantity(prev: CartItem[], productId: number, delta: number) {
  return prev
    .map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + delta } : item
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
    currentUser,
    isCartOpen,
    setIsCartOpen,
    isAuthOpen,
    setIsAuthOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    removeFromCart,
    updateCartQuantity,
    checkoutForm,
    handleCheckoutInput,
    handleCheckoutSave,
    authMode,
    setAuthMode,
    authForm,
    authError,
    handleAuthInput,
    handleAuthSubmit,
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
        openAuth={(mode) => {
          setAuthMode(mode);
          setIsAuthOpen(true);
        }}
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

      {isAuthOpen && (
        <AuthModal
          authMode={authMode}
          setAuthMode={setAuthMode}
          authForm={authForm}
          authError={authError}
          handleAuthInput={handleAuthInput}
          handleAuthSubmit={handleAuthSubmit}
          setIsAuthOpen={setIsAuthOpen}
        />
      )}
    </div>
  );
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("Guest");
  const [authError, setAuthError] = useState("");
  const [authForm, setAuthForm] = useState<AuthForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
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

  const addToCart = (product: Product) => {
    setCart((prev) => mergeCartItem(prev, product));
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateCartQuantity = (productId: number, delta: number) => {
    setCart((prev) => changeQuantity(prev, productId, delta));
  };


  const handleAuthInput = (field: keyof AuthForm, value: string) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckoutInput = (field: keyof CheckoutForm, value: string) => {
    setCheckoutForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetAuthForm = () => {
    setAuthForm({ name: "", email: "", password: "", phone: "" });
  };

  const handleAuthSubmit = () => {
    setAuthError("");

    if (!authForm.email || !authForm.password) {
      setAuthError("Email and password are required.");
      return;
    }

    if (authMode === "signup") {
      if (!authForm.name || !authForm.phone) {
        setAuthError("Name and phone number are required for sign up.");
        return;
      }

      if (authForm.password.length < 6) {
        setAuthError("Password must be at least 6 characters.");
        return;
      }

      const user = { isLoggedIn: true, name: authForm.name };
      localStorage.setItem("liquid-user", JSON.stringify(user));
      setCurrentUser(authForm.name);
      setIsLoggedIn(true);
      setIsAuthOpen(false);
      resetAuthForm();
      return;
    }

    const user = {
      isLoggedIn: true,
      name: authForm.email.split("@")[0] || "Customer",
    };

    localStorage.setItem("liquid-user", JSON.stringify(user));
    setCurrentUser(user.name);
    setIsLoggedIn(true);
    setIsAuthOpen(false);
    resetAuthForm();
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

  const value = {
    cart,
    isLoggedIn,
    currentUser,
    isCartOpen,
    setIsCartOpen,
    isAuthOpen,
    setIsAuthOpen,
    isCheckoutOpen,
    setIsCheckoutOpen,
    isMenuOpen,
    setIsMenuOpen,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    handleLogout,
    authMode,
    setAuthMode,
    authError,
    authForm,
    handleAuthInput,
    handleAuthSubmit,
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
