"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Menu, Search, ShoppingBag, User } from "lucide-react";

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
      <div className="relative z-[60] border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-2 px-6 py-3 text-xs text-white/60 md:flex-row md:items-center md:justify-between lg:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh
            </span>
            <span>Delivery all over Bangladesh</span>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <span>bKash</span>
            <span>Nagad</span>
            <span>Cash on Delivery</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4 lg:px-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/liquid-logo.png"
                alt="Liquid T-Shirt Logo"
                width={90}
                height={30}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          <div className="flex items-center justify-self-end">
            <nav className="hidden items-center gap-8 pr-8 text-base text-white/70 md:flex">
              <Link
                href="/#home"
                className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Home
              </Link>

              <Link
                href="/shop"
                className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Shop
              </Link>

              <Link
                href="/about"
                className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                About Us
              </Link>

              <Link
                href="/"
                className="relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
                Journal
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition hover:text-white">
                <Search className="h-5 w-5" />
              </button>

              {isLoggedIn ? (
                <div className="hidden items-center gap-3 md:flex">
                  <div className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white/80">
                    Hi, {currentUser}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <button
                    onClick={() => openAuth("login")}
                    className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openAuth("signup")}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 transition hover:bg-white/[0.08]"
                  >
                    <User className="h-4 w-4" />
                    Sign Up
                  </button>
                </div>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90"
              >
                <ShoppingBag className="h-4 w-4" />
                Cart ({cartCount})
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="border-t border-white/10 bg-black/90 px-6 py-4 md:hidden">
            <div className="flex flex-col gap-4 text-sm text-white/75">
              <Link
                href="/#home"
                className="transition hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="transition hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                href="/#about"
                className="transition hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/#newsletter"
                className="transition hover:text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Journal
              </Link>

              {!isLoggedIn ? (
                <>
                  <button onClick={() => openAuth("login")} className="text-left">
                    Login
                  </button>
                  <button onClick={() => openAuth("signup")} className="text-left">
                    Sign Up
                  </button>
                </>
              ) : (
                <button onClick={handleLogout} className="text-left">
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}