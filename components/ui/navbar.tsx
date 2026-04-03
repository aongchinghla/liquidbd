"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu, Search, ShoppingBag, User, X } from "lucide-react";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  isLoggedIn: boolean;
  currentUser: string;
  openAuth: (mode: "login" | "signup") => void;
  handleLogout: () => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  currentUser,
  openAuth,
  handleLogout,
  cartCount,
  setIsCartOpen,
}: NavbarProps) {
  return (
    <>
      {/* 1. Top Bar - Updated */}
      <div className="relative z-[60] border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-row items-center justify-between px-4 py-3 text-[10px] text-white/60 md:px-6 md:text-xs lg:px-10">
          <div className="flex items-center">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>bKash</span>
            <span>Nagad</span>
            <span className="font-medium text-white/80">COD</span>
          </div>
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-4 md:px-6 lg:px-10">
          
          {/* Mobile: Menu & Logo Section */}
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
            </button>

            <Link href="/" className="flex items-center">
              <Image
                src="/liquid-logo.png"
                alt="Liquid T-Shirt Logo"
                width={85}
                height={28}
                className="w-[70px] object-contain md:w-[90px]" 
                priority
              />
            </Link>
          </div>

          <div className="flex items-center justify-self-end">
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 pr-8 text-base text-white/70 md:flex">
              <Link href="/#home" className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Home
              </Link>
              <Link href="/shop" className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Shop
              </Link>
              <Link href="/about" className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                About Us
              </Link>
              <Link href="/" className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
                Journal
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Button - Visible on both Mobile & Desktop */}
              <button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:text-white md:h-11 md:w-11">
                <Search className="h-5 w-5" />
              </button>

              {/* Desktop Auth Section */}
              {isLoggedIn ? (
                <div className="hidden items-center gap-3 md:flex">
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80">
                    Hi, {currentUser}
                  </div>
                  <button onClick={handleLogout} className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/25 hover:text-white">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <button onClick={() => openAuth("login")} className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/25 hover:text-white">
                    Login
                  </button>
                  <button onClick={() => openAuth("signup")} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 transition hover:bg-white/[0.08]">
                    <User className="h-4 w-4" /> Sign Up
                  </button>
                </div>
              )}

              {/* Cart Button - Mobile Optimized */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 md:px-4 md:py-2.5 text-sm font-bold text-black transition hover:opacity-90 active:scale-95"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden md:inline">Cart</span>
                <span>({cartCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Dropdown - Absolute position (Does not push content) */}
        {isMenuOpen && (
          <div className="absolute left-0 top-full z-[100] w-full border-b border-white/10 bg-neutral-950/95 px-6 py-6 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-6 text-base font-medium text-white/75">
              <Link href="/#home" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link>
              <Link href="/" onClick={() => setIsMenuOpen(false)}>Journal</Link>

              <div className="h-[1px] w-full bg-white/10" />

              {!isLoggedIn ? (
                <div className="flex flex-col gap-5 pt-2">
                  <button onClick={() => { openAuth("login"); setIsMenuOpen(false); }} className="text-left">Login</button>
                  <button onClick={() => { openAuth("signup"); setIsMenuOpen(false); }} className="text-left text-white font-bold">Sign Up</button>
                </div>
              ) : (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-left text-red-400">Logout ({currentUser})</button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}