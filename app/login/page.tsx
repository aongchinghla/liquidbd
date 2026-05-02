"use client";

import React, { Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  LogOut,
  Mail,
  MapPinned,
  Package,
  Phone,
  Save,
  Shield,
  User,
} from "lucide-react";
import { gsap } from "gsap";
import { useAppContext } from "@/context/app-context";
import { BANGLADESH_DISTRICTS, getBangladeshDistrictValue } from "@/lib/checkout";
import { getUserOrderHistory, OrderHistoryItem } from "@/lib/orders";

interface AuthForm {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface SavedUser {
  isLoggedIn?: boolean;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
}

type AccountView = "profile" | "address" | "security" | "orders";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatOrderDate(date: string) {
  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

function getAccountViewParam(view: string | null): AccountView {
  if (view === "address" || view === "security" || view === "orders") {
    return view;
  }

  return "profile";
}

function getSavedUserFromStorage() {
  try {
    const savedUser = localStorage.getItem("liquid-user");
    return savedUser ? (JSON.parse(savedUser) as SavedUser) : null;
  } catch (error) {
    console.error("Saved user read error", error);
    return null;
  }
}

function LoginContent() {
  const {
    setIsLoggedIn,
    setCurrentUser,
    isLoggedIn,
    currentUser,
    checkoutForm,
    handleCheckoutInput,
    handleCheckoutSave,
    handleLogout,
  } = useAppContext();

  const [authMode, setAuthMode] = React.useState<"login" | "signup">("login");
  const [authError, setAuthError] = React.useState("");
  const [authForm, setAuthForm] = React.useState<AuthForm>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  const [showPassword, setShowPassword] = React.useState(false);
  const [showForgotPassword, setShowForgotPassword] = React.useState(false);
  const [resetLoading, setResetLoading] = React.useState(false);
  const [resetMessage, setResetMessage] = React.useState("");
  const [resetError, setResetError] = React.useState("");

  const [profileName, setProfileName] = React.useState("");
  const [profileEmail, setProfileEmail] = React.useState("");
  const [profilePhone, setProfilePhone] = React.useState("");
  const [accountMessage, setAccountMessage] = React.useState("");
  const [securityMessage, setSecurityMessage] = React.useState("");
  const [securityError, setSecurityError] = React.useState("");
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [orders, setOrders] = React.useState<OrderHistoryItem[]>([]);
  const [expandedOrderId, setExpandedOrderId] = React.useState<string | null>(null);
  const [orderLookup, setOrderLookup] = React.useState({ name: "", email: "" });
  const accountView = getAccountViewParam(searchParams.get("view"));
  const selectedDistrict = getBangladeshDistrictValue(checkoutForm.district);

  useEffect(() => {
    const mode = searchParams.get("mode");
    if (mode === "signup") {
      setAuthMode("signup");
    } else {
      setAuthMode("login");
    }
  }, [searchParams]);

  useEffect(() => {
    const card = cardRef.current;
    const elements = elementsRef.current.filter((element): element is HTMLElement => Boolean(element));

    if (!card) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([card, ...elements], { opacity: 1, y: 0 });
      return;
    }

    gsap.set(card, { opacity: 0 });
    gsap.set(elements, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(card, { opacity: 1, duration: 0.45 });

    if (elements.length > 0) {
      tl.to(
        elements,
        {
          opacity: 1,
          duration: 0.25,
          stagger: 0.03,
        },
        "-=0.2"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  useEffect(() => {
    setAccountMessage("");
    setSecurityMessage("");
    setSecurityError("");
  }, [accountView]);

  useEffect(() => {
    if (isLoggedIn) {
      const parsed = getSavedUserFromStorage();

      if (!parsed) {
        setProfileName(currentUser === "Guest" ? "" : currentUser);
        return;
      }

      setProfileName(parsed.name || "");
      setProfileEmail(parsed.email || "");
      setProfilePhone(parsed.phone || "");
      setOrderLookup({
        name: parsed.name || currentUser,
        email: parsed.email || "",
      });
      return;
    }

    setOrders([]);
  }, [currentUser, isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) {
      setOrders([]);
      setExpandedOrderId(null);
      return;
    }

    setOrders(getUserOrderHistory(orderLookup));
  }, [isLoggedIn, orderLookup]);

  const handleAuthInput = (field: keyof AuthForm, value: string) => {
    setAuthForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetAuthForm = () => {
    setAuthForm({ name: "", email: "", password: "", phone: "" });
  };

  const saveUserSession = (name: string, email = "", phone = "", password = "") => {
    const existingUser = getSavedUserFromStorage();
    const user: SavedUser = {
      isLoggedIn: true,
      name,
      email,
      phone,
      password: password || existingUser?.password || "",
    };

    localStorage.setItem("liquid-user", JSON.stringify(user));
    setCurrentUser(name);
    setIsLoggedIn(true);
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

      saveUserSession(authForm.name, authForm.email.trim(), authForm.phone.trim(), authForm.password);
      resetAuthForm();
      return;
    }

    const savedUser = getSavedUserFromStorage();
    const trimmedEmail = authForm.email.trim().toLowerCase();

    if (savedUser?.email?.trim().toLowerCase() === trimmedEmail && savedUser.password) {
      if (savedUser.password !== authForm.password) {
        setAuthError("Incorrect password. Please try again.");
        return;
      }

      saveUserSession(
        savedUser.name || (trimmedEmail.split("@")[0] || "Customer"),
        savedUser.email || trimmedEmail,
        savedUser.phone || "",
        savedUser.password
      );
      resetAuthForm();
      return;
    }

    const loginName = trimmedEmail.split("@")[0] || "Customer";
    saveUserSession(loginName, trimmedEmail);
    resetAuthForm();
  };

  const handleForgotPassword = async (email: string) => {
    setAuthError("");

    const trimmedEmail = email.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail);

    if (!trimmedEmail) {
      throw new Error("Email is required.");
    }

    if (!isValidEmail) {
      throw new Error("Please enter a valid email address.");
    }

    await new Promise((resolve) => setTimeout(resolve, 800));
    console.log(`Password reset link requested for: ${trimmedEmail}`);
  };

  const handleGoogleLogin = () => {
    setAuthError("");
    saveUserSession("Google User");
    resetAuthForm();
  };

  const handleFacebookLogin = () => {
    setAuthError("");
    saveUserSession("Facebook User");
    resetAuthForm();
  };

  const handleProfileSave = () => {
    const trimmedName = profileName.trim() || "Customer";
    const existingUser = getSavedUserFromStorage();
    const user: SavedUser = {
      isLoggedIn: true,
      name: trimmedName,
      email: profileEmail.trim(),
      phone: profilePhone.trim(),
      password: existingUser?.password || "",
    };

    localStorage.setItem("liquid-user", JSON.stringify(user));
    setCurrentUser(trimmedName);
    setOrderLookup({
      name: trimmedName,
      email: profileEmail.trim(),
    });
    setAccountMessage("Profile saved successfully.");
  };

  const handleAddressSave = () => {
    handleCheckoutSave();
    setAccountMessage("Address saved successfully.");
  };

  const handlePasswordSave = () => {
    setSecurityMessage("");
    setSecurityError("");

    const savedUser = getSavedUserFromStorage();
    const existingPassword = savedUser?.password?.trim() || "";

    if (!newPassword.trim() || !confirmPassword.trim()) {
      setSecurityError("New password and confirm password are required.");
      return;
    }

    if (newPassword.length < 6) {
      setSecurityError("Password must be at least 6 characters.");
      return;
    }

    if (existingPassword && currentPassword !== existingPassword) {
      setSecurityError("Current password did not match.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setSecurityError("New password and confirm password must match.");
      return;
    }

    const updatedUser: SavedUser = {
      isLoggedIn: true,
      name: savedUser?.name || profileName.trim() || currentUser,
      email: savedUser?.email || profileEmail.trim(),
      phone: savedUser?.phone || profilePhone.trim(),
      password: newPassword,
    };

    localStorage.setItem("liquid-user", JSON.stringify(updatedUser));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSecurityMessage(existingPassword ? "Password changed successfully." : "Password set successfully.");
  };

  const onForgotPassword = async () => {
    setResetMessage("");
    setResetError("");

    if (!authForm.email.trim()) {
      setResetError("Please enter your email address first.");
      return;
    }

    try {
      setResetLoading(true);
      await handleForgotPassword(authForm.email.trim());
      setResetMessage("Password reset link sent to your email.");
    } catch (error) {
      setResetError(error instanceof Error ? error.message : "Failed to send reset link.");
    } finally {
      setResetLoading(false);
    }
  };

  if (isLoggedIn) {
    const accountSections: Array<{
      id: AccountView;
      label: string;
      href: string;
      icon: React.ReactNode;
      note: string;
    }> = [
      {
        id: "profile",
        label: "My Profile",
        href: "/login?view=profile",
        icon: <User className="h-4 w-4" />,
        note: "Basic account details",
      },
      {
        id: "address",
        label: "Address",
        href: "/login?view=address",
        icon: <MapPinned className="h-4 w-4" />,
        note: "Delivery information",
      },
      {
        id: "orders",
        label: "My Orders",
        href: "/login?view=orders",
        icon: <Package className="h-4 w-4" />,
        note: "Purchase history",
      },
      {
        id: "security",
        label: "Security",
        href: "/login?view=security",
        icon: <Shield className="h-4 w-4" />,
        note: "Password settings",
      },
    ];

    return (
      <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 px-4 py-10 md:px-6 lg:px-10">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#2f7ea1]/10 blur-[120px]" />
          <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1180px]">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.35em] text-white/40">Account</p>
            <h1 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Dashboard
            </h1>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
            <aside className="self-start rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-6">
              <div className="rounded-lg border border-white/10 bg-black/20 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] text-lg font-semibold text-white">
                  {(profileName || currentUser || "U").slice(0, 1).toUpperCase()}
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {profileName || currentUser}
                </h2>
                <p className="mt-1 text-sm text-white/50">
                  {profileEmail || "No email saved yet"}
                </p>
              </div>

              <div className="mt-5 space-y-2">
                {accountSections.map((section) => (
                  <Link
                    key={section.id}
                    href={section.href}
                    className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 transition ${
                      accountView === section.id
                        ? "border-white bg-white text-black"
                        : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span>{section.icon}</span>
                      <div>
                        <p className="text-sm font-semibold">{section.label}</p>
                        <p
                          className={`text-[11px] ${
                            accountView === section.id ? "text-black/60" : "text-white/35"
                          }`}
                        >
                          {section.note}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-red-500/30 bg-red-500/15 px-4 py-3 text-sm font-medium text-red-200 transition hover:border-red-500/50 hover:bg-red-500/20 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </aside>

            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl md:p-7">
              <div className="mb-6 border-b border-white/10 pb-5">
                <p className="text-xs uppercase tracking-[0.3em] text-white/35">Dashboard</p>
                <h2 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                  {accountView === "profile"
                    ? "Profile Details"
                    : accountView === "address"
                      ? "Saved Address"
                      : accountView === "security"
                        ? "Security Settings"
                        : "Order History"}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
                  {accountView === "profile"
                    ? "Update your main account details so your Liquid profile stays current."
                    : accountView === "address"
                      ? "Save delivery details for a faster checkout experience."
                      : accountView === "security"
                        ? "Change or set your account password from here."
                        : "Review your latest purchases and order details."}
                </p>
              </div>

              {accountView === "profile" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Full name</span>
                    <span className="relative block">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        value={profileName}
                        onChange={(e) => setProfileName(e.target.value)}
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="Your name"
                      />
                    </span>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Email</span>
                    <span className="relative block">
                      <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="email"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="hello@example.com"
                      />
                    </span>
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Phone</span>
                    <span className="relative block">
                      <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        value={profilePhone}
                        onChange={(e) => setProfilePhone(e.target.value)}
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </span>
                  </label>
                </div>
              ) : null}

              {accountView === "address" ? (
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Receiver name</span>
                    <span className="relative block">
                      <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        value={checkoutForm.name}
                        onChange={(e) => handleCheckoutInput("name", e.target.value)}
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="Full name"
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
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="hello@example.com"
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
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-4 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </span>
                  </label>

                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">District</span>
                    <span className="relative block">
                      <MapPinned className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <select
                        value={selectedDistrict}
                        onChange={(e) => handleCheckoutInput("district", e.target.value)}
                        className={`h-12 w-full appearance-none rounded-lg border border-white/10 bg-black/20 pl-11 pr-10 text-sm outline-none transition focus:border-white/25 ${
                          selectedDistrict ? "text-white" : "text-white/45"
                        }`}
                        aria-label="District"
                      >
                        <option value="" disabled hidden className="bg-white text-black">
                          Select district
                        </option>
                        {BANGLADESH_DISTRICTS.map((district) => (
                          <option key={district} value={district} className="bg-white text-black">
                            {district}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    </span>
                  </label>

                  <label className="space-y-2 md:col-span-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Delivery address</span>
                    <span className="relative block">
                      <MapPinned className="absolute left-4 top-4 h-4 w-4 text-white/30" />
                      <textarea
                        value={checkoutForm.address}
                        onChange={(e) => handleCheckoutInput("address", e.target.value)}
                        rows={5}
                        className="w-full resize-none rounded-lg border border-white/10 bg-black/20 py-3 pl-11 pr-4 text-sm leading-6 text-white outline-none transition focus:border-white/25"
                        placeholder="House, road, area, city"
                      />
                    </span>
                  </label>
                </div>
              ) : null}

              {accountView === "security" ? (
                <div className="space-y-4">
                  <label className="space-y-2">
                    <span className="text-xs uppercase tracking-widest text-white/35">Current password</span>
                    <span className="relative block">
                      <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition focus:border-white/25"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((prev) => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/55"
                        aria-label={showCurrentPassword ? "Hide current password" : "Show current password"}
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </span>
                  </label>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-white/35">New password</span>
                      <span className="relative block">
                        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition focus:border-white/25"
                          placeholder="Minimum 6 characters"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/55"
                          aria-label={showNewPassword ? "Hide new password" : "Show new password"}
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </span>
                    </label>

                    <label className="space-y-2">
                      <span className="text-xs uppercase tracking-widest text-white/35">Confirm password</span>
                      <span className="relative block">
                        <Lock className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="h-12 w-full rounded-lg border border-white/10 bg-black/20 pl-11 pr-12 text-sm text-white outline-none transition focus:border-white/25"
                          placeholder="Retype new password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 transition hover:text-white/55"
                          aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                        >
                          {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </span>
                    </label>
                  </div>
                </div>
              ) : null}

              {accountView === "orders" ? (
                <>
                  <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-end">
                    <p className="text-sm text-white/45">
                      {orders.length} order{orders.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  {orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <article
                          key={`${order.orderId}-${order.placedAt}`}
                          className="overflow-hidden rounded-lg border border-white/10 bg-black/20"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedOrderId((prev) =>
                                prev === order.orderId ? null : order.orderId
                              )
                            }
                            className="flex w-full items-center gap-4 bg-white/[0.02] px-5 py-4 text-left transition hover:bg-white/[0.04]"
                            aria-expanded={expandedOrderId === order.orderId}
                          >
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                                <div className="min-w-0">
                                  <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Order ID</p>
                                  <h3 className="mt-1 truncate text-base font-semibold text-white">
                                    {order.orderId}
                                  </h3>
                                </div>

                                <div className="grid gap-2 text-sm text-white/55 sm:grid-cols-3 sm:gap-6 lg:text-right">
                                  <p>{formatOrderDate(order.placedAt)}</p>
                                  <p>{order.items.length} item{order.items.length === 1 ? "" : "s"}</p>
                                  <p className="font-semibold text-white">{formatPrice(order.total)}</p>
                                </div>
                              </div>
                            </div>

                            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/65">
                              <ChevronDown
                                className={`h-4 w-4 transition-transform ${
                                  expandedOrderId === order.orderId ? "rotate-180" : ""
                                }`}
                              />
                            </span>
                          </button>

                          {expandedOrderId === order.orderId ? (
                            <div className="border-t border-white/10">
                              <div className="px-5 py-4">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                                  <div>
                                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Payment Method</p>
                                    <p className="mt-1 text-sm text-white/75">{order.paymentMethod}</p>
                                  </div>

                                  <div className="flex flex-wrap gap-2 lg:justify-end">
                                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
                                      Delivery {formatPrice(order.deliveryCharge)}
                                    </span>
                                    {order.discount > 0 ? (
                                      <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-200">
                                        Saved {formatPrice(order.discount)}
                                      </span>
                                    ) : null}
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3 px-5 py-4">
                                {order.items.map((item) => (
                                  <div
                                    key={item.cartItemId}
                                    className="flex items-start gap-3 rounded-lg border border-white/8 bg-white/[0.02] p-3"
                                  >
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="h-16 w-14 rounded-lg object-cover"
                                    />

                                    <div className="min-w-0 flex-1">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0">
                                          <p className="truncate text-sm font-medium text-white">{item.name}</p>
                                          <p className="mt-1 text-xs text-white/45">
                                            {item.productType}
                                            {item.category ? ` | ${item.category}` : ""}
                                          </p>
                                          {item.selectedSize || item.selectedColor ? (
                                            <p className="mt-1 text-xs text-white/35">
                                              {item.selectedSize ? `Size: ${item.selectedSize}` : ""}
                                              {item.selectedSize && item.selectedColor ? " | " : ""}
                                              {item.selectedColor ? `Color: ${item.selectedColor}` : ""}
                                            </p>
                                          ) : null}
                                        </div>

                                        <div className="text-right">
                                          <p className="text-sm font-semibold text-white/85">x{item.quantity}</p>
                                          <p className="mt-1 text-xs text-white/45">{formatPrice(item.price)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>

                              <div className="border-t border-white/10 px-5 py-4">
                                <div className="grid gap-4 md:grid-cols-2">
                                  <div>
                                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Delivery To</p>
                                    <p className="mt-2 text-sm font-medium text-white/85">
                                      {order.checkout.name || order.customerName}
                                    </p>
                                    {order.checkout.district ? (
                                      <p className="mt-1 text-sm text-white/60">{order.checkout.district}</p>
                                    ) : null}
                                    <p className="mt-1 text-sm leading-6 text-white/50">
                                      {order.checkout.address || "Address not available"}
                                    </p>
                                  </div>

                                  <div className="md:text-right">
                                    <p className="text-[11px] uppercase tracking-[0.24em] text-white/35">Payment Summary</p>
                                    <p className="mt-2 text-sm text-white/55">
                                      Subtotal: <span className="text-white/80">{formatPrice(order.subtotal)}</span>
                                    </p>
                                    {order.promoCode ? (
                                      <p className="mt-1 text-sm text-white/55">
                                        Promo: <span className="text-white/80">{order.promoCode}</span>
                                      </p>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </article>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-white/10 bg-black/20 px-5 py-6 text-sm text-white/55">
                      You have no orders yet. After placing an order, it will appear here.
                    </div>
                  )}
                </>
              ) : null}

              {accountMessage && (
                <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {accountMessage}
                </div>
              )}

              {securityMessage && (
                <div className="mt-5 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
                  {securityMessage}
                </div>
              )}

              {securityError && (
                <div className="mt-5 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {securityError}
                </div>
              )}

              {accountView !== "orders" ? (
                <button
                  onClick={
                    accountView === "profile"
                      ? handleProfileSave
                      : accountView === "address"
                        ? handleAddressSave
                        : handlePasswordSave
                  }
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  <Save className="h-4 w-4" />
                  {accountView === "profile"
                    ? "Save Profile"
                    : accountView === "address"
                      ? "Save Address"
                      : "Update Password"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-4 py-6 lg:py-8"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-[#2f7ea1]/10 blur-[120px]" />
        <div className="absolute -right-[10%] -bottom-[10%] h-[40%] w-[40%] rounded-full bg-blue-900/10 blur-[120px]" />
      </div>

      <div
        ref={cardRef}
        className="relative z-10 w-full max-w-[500px] rounded-lg border border-white/10 bg-white/[0.03] px-6 py-7 backdrop-blur-xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] md:px-8 md:py-8"
      >
        <div className="mb-7 text-center md:mb-8">
          <div
            ref={addToRefs}
            className="mb-3 inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.05] p-3 shadow-inner"
          >
            {authMode === "login" ? (
              <LogIn className="h-6 w-6 text-[#2f7ea1]" />
            ) : (
              <User className="h-6 w-6 text-[#2f7ea1]" />
            )}
          </div>

          <h1 ref={addToRefs} className="text-3xl font-black tracking-tighter text-white">
            {authMode === "login" ? "Welcome Back" : "Join Liquid"}
          </h1>

          <p ref={addToRefs} className="mt-2 text-sm font-medium tracking-tight text-white/50">
            {authMode === "login"
              ? "Login to access your Liquid account"
              : "Create an account to start your journey"}
          </p>
        </div>

        <div
          ref={addToRefs}
          className="mb-6 flex rounded-lg border border-white/10 bg-white/[0.02] p-1"
        >
          <button
            onClick={() => {
              setAuthMode("login");
              setShowForgotPassword(false);
              setResetMessage("");
              setResetError("");
            }}
            className={`flex-1 rounded-[6px] py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              authMode === "login" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
            }`}
          >
            Login
          </button>

          <button
            onClick={() => {
              setAuthMode("signup");
              setShowForgotPassword(false);
              setResetMessage("");
              setResetError("");
            }}
            className={`flex-1 rounded-[6px] py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
              authMode === "signup" ? "bg-white text-black shadow-lg" : "text-white/40 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="space-y-4">
          {authMode === "signup" ? (
            <>
              <div ref={addToRefs} className="space-y-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-white/30">
                  Full Name
                </label>
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#2f7ea1]">
                    <User className="h-4 w-4" />
                  </div>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => handleAuthInput("name", e.target.value)}
                    placeholder="John Doe"
                    className="w-full rounded-[8px] border border-white/5 bg-white/[0.02] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/10 transition-all duration-300 focus:border-[#2f7ea1]/40 focus:bg-white/[0.04] focus:outline-none"
                  />
                </div>
              </div>

              <div ref={addToRefs} className="space-y-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-white/30">
                  Phone Number
                </label>
                <div className="group relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#2f7ea1]">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    type="tel"
                    value={authForm.phone}
                    onChange={(e) => handleAuthInput("phone", e.target.value)}
                    placeholder="+880 1XXX XXXXXX"
                    className="w-full rounded-[8px] border border-white/5 bg-white/[0.02] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/10 transition-all duration-300 focus:border-[#2f7ea1]/40 focus:bg-white/[0.04] focus:outline-none"
                  />
                </div>
              </div>
            </>
          ) : null}

          <div ref={addToRefs} className="space-y-2">
            <label className="ml-1 text-[11px] font-bold uppercase tracking-widest text-white/30">
              Email Address
            </label>
            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#2f7ea1]">
                <Mail className="h-4 w-4" />
              </div>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => handleAuthInput("email", e.target.value)}
                placeholder="hello@example.com"
                className="w-full rounded-[8px] border border-white/5 bg-white/[0.02] py-3 pl-12 pr-4 text-sm text-white placeholder:text-white/10 transition-all duration-300 focus:border-[#2f7ea1]/40 focus:bg-white/[0.04] focus:outline-none"
              />
            </div>
          </div>

          <div ref={addToRefs} className="space-y-2">
            <div className="ml-1 flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-widest text-white/30">
                Password
              </label>

              {authMode === "login" ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotPassword((prev) => !prev);
                    setResetMessage("");
                    setResetError("");
                  }}
                  className="text-[10px] font-bold text-[#2f7ea1] transition-colors hover:text-white"
                >
                  Forgot?
                </button>
              ) : null}
            </div>

            <div className="group relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 transition-colors group-focus-within:text-[#2f7ea1]">
                <Lock className="h-4 w-4" />
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={authForm.password}
                onChange={(e) => handleAuthInput("password", e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-[8px] border border-white/5 bg-white/[0.02] py-3 pl-12 pr-12 text-sm text-white placeholder:text-white/10 transition-all duration-300 focus:border-[#2f7ea1]/40 focus:bg-white/[0.04] focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 transition-colors hover:text-white/40"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {authMode === "login" && showForgotPassword ? (
            <div
              ref={addToRefs}
              className="rounded-lg border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="mb-3 text-[12px] text-white/60">
                Enter your email and we will send you a password reset link.
              </p>

              <button
                type="button"
                onClick={onForgotPassword}
                disabled={resetLoading}
                className="w-full rounded-[8px] border border-white/10 bg-white/[0.04] py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {resetLoading ? "Sending..." : "Send reset link"}
              </button>

              {resetMessage ? (
                <div className="mt-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-[12px] font-medium text-emerald-200">
                  {resetMessage}
                </div>
              ) : null}

              {resetError ? (
                <div className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] font-medium text-red-200">
                  {resetError}
                </div>
              ) : null}
            </div>
          ) : null}

          {authError ? (
            <div
              ref={addToRefs}
              className="mt-3 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-[12px] font-medium text-red-200"
            >
              {authError}
            </div>
          ) : null}

          <button
            ref={addToRefs}
            onClick={(e) => {
              e.preventDefault();
              handleAuthSubmit();
            }}
            className="group relative mt-3 w-full overflow-hidden rounded-[8px] bg-[#2f7ea1] py-3.5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-[0_10px_30px_rgba(47,126,161,0.3)] transition-all hover:scale-[1.01] hover:shadow-[0_20px_40px_rgba(47,126,161,0.4)] active:scale-[0.98]"
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>{authMode === "login" ? "Sign In" : "Create Account"}</span>
            </div>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
          </button>
        </div>

        <div className="mt-6">
          <div ref={addToRefs} className="relative flex items-center justify-center py-3">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/5" />
            </div>
            <span className="relative z-10 bg-[#0c0c0c] px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
              OR CONTINUE WITH
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              ref={addToRefs}
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-[8px] border border-white/8 bg-white/[0.02] py-3.5 text-[11px] font-bold text-white transition-all hover:border-white/15 hover:bg-white/[0.05] active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5H42V20H24v8h11.3C33.6 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.7 15 18.9 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 44c5.2 0 10-2 13.5-5.2l-6.2-5.2C29.3 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.5 16.2 44 24 44z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.7l.1-.1 6.2 5.2C37 38.4 44 33 44 24c0-1.3-.1-2.4-.4-3.5z"
                />
              </svg>
              <span className="uppercase tracking-[0.16em]">Google</span>
            </button>

            <button
              ref={addToRefs}
              type="button"
              onClick={handleFacebookLogin}
              className="flex w-full items-center justify-center gap-3 rounded-[8px] border border-white/8 bg-white/[0.02] py-3.5 text-[11px] font-bold text-white transition-all hover:border-white/15 hover:bg-white/[0.05] active:scale-[0.98]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <path
                  fill="#1877F2"
                  d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"
                />
              </svg>
              <span className="uppercase tracking-[0.16em]">Facebook</span>
            </button>
          </div>
        </div>

        <p ref={addToRefs} className="mt-7 text-center text-[12px] font-medium text-white/40">
          {authMode === "login" ? "New to Liquid?" : "Already a member?"}{" "}
          <button
            onClick={() => {
              setAuthMode(authMode === "login" ? "signup" : "login");
              setShowForgotPassword(false);
              setResetMessage("");
              setResetError("");
            }}
            className="font-bold text-[#2f7ea1] transition-all hover:text-white"
          >
            {authMode === "login" ? "Join the collective" : "Login here"}
          </button>
        </p>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-0 right-0 hidden text-center lg:block">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/10">
          Crafted for the conscious collective
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-neutral-950">
          <div className="font-bold uppercase tracking-[0.5em] text-white opacity-20">Loading...</div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
