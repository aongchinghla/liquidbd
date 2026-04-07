"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { products, Product } from "@/lib/products";

interface NavbarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
  isLoggedIn: boolean;
  currentUser: string;
  handleLogout: () => void;
  cartCount: number;
  setIsCartOpen: (open: boolean) => void;
}

export default function Navbar({
  isMenuOpen,
  setIsMenuOpen,
  isLoggedIn,
  currentUser,
  handleLogout,
  cartCount,
  setIsCartOpen,
}: NavbarProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter products as user types
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tag && product.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5); // Limit to top 5 results

    setSearchResults(filtered);
  }, [searchQuery]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close search on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsSearchOpen(false);
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

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
              <Link
                href="/"
                className={`relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${pathname === "/" ? "text-white after:w-full" : "after:w-0"
                  }`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                className={`relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${pathname === "/shop" || pathname.startsWith("/shop/") ? "text-white after:w-full" : "after:w-0"
                  }`}
              >
                Shop
              </Link>
              <Link
                href="/about"
                className={`relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${pathname === "/about" ? "text-white after:w-full" : "after:w-0"
                  }`}
              >
                About Us
              </Link>
              <Link
                href="/journal"
                className={`relative pb-1 transition duration-300 hover:text-white after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${pathname === "/journal" ? "text-white after:w-full" : "after:w-0"
                  }`}
              >
                Journal
              </Link>
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery(""); // Clear when closing
                }}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition md:h-11 md:w-11 ${isSearchOpen ? "bg-white text-black" : "bg-white/[0.03] text-white/70 hover:text-white"
                  }`}
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
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
                  <Link href="/login" className="rounded-full border border-white/10 px-4 py-2.5 text-sm text-white/75 transition hover:border-white/25 hover:text-white">
                    Login
                  </Link>
                  <Link href="/login?mode=signup" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 transition hover:bg-white/[0.08]">
                    <User className="h-4 w-4" /> Sign Up
                  </Link>
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

        {/* 3. Search Bar Expansion */}
        <div
          ref={searchRef}
          className={`absolute left-0 top-full w-full border-b border-white/10 bg-black/90 backdrop-blur-3xl transition-all duration-300 ease-in-out px-4 py-6 md:px-10 ${isSearchOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="mx-auto max-w-[800px] relative">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search products, brands, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus={isSearchOpen}
                className="w-full bg-white/[0.05] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-lg text-white placeholder-white/30 focus:outline-none focus:border-white/30 focus:bg-white/[0.08] transition-all"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-white/40 group-focus-within:text-white transition-colors" />
            </div>

            {/* Live Search Results */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 w-full mt-4 bg-neutral-900/95 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl z-[110]">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors border-b border-white/[0.05] last:border-0"
                  >
                    <div className="h-12 w-12 rounded-lg overflow-hidden bg-white/5 relative flex-shrink-0">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate">{product.name}</h4>
                      <p className="text-white/40 text-sm">{product.category || "General"}</p>
                    </div>
                    <div className="text-white font-semibold">
                      ৳{product.price}
                    </div>
                  </Link>
                ))}
                <Link
                  href="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="block text-center py-3 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                >
                  View all products
                </Link>
              </div>
            )}

            {searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <div className="absolute top-full left-0 w-full mt-4 bg-neutral-900/95 border border-white/10 rounded-2xl p-8 text-center text-white/40 backdrop-blur-xl">
                No products found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

        {/* 4. Mobile Dropdown - Absolute position (Does not push content) */}
        {isMenuOpen && (
          <div className="absolute left-0 top-full z-[100] w-full border-b border-white/10 bg-neutral-950/95 px-6 py-6 shadow-2xl backdrop-blur-xl md:hidden">
            <div className="flex flex-col gap-6 text-base font-medium text-white/75">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors ${pathname === "/" ? "text-white font-bold" : "text-white/60"}`}
              >
                Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors ${pathname === "/shop" || pathname.startsWith("/shop/") ? "text-white font-bold" : "text-white/60"}`}
              >
                Shop
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors ${pathname === "/about" ? "text-white font-bold" : "text-white/60"}`}
              >
                About Us
              </Link>
              <Link
                href="/journal"
                onClick={() => setIsMenuOpen(false)}
                className={`transition-colors ${pathname === "/journal" ? "text-white font-bold" : "text-white/60"}`}
              >
                Journal
              </Link>

              <div className="h-[1px] w-full bg-white/10" />

              {!isLoggedIn ? (
                <div className="flex flex-col gap-5 pt-2">
                  <Link href="/login" onClick={() => setIsMenuOpen(false)} className="text-left text-white/60 transition hover:text-white">Login</Link>
                  <Link href="/login?mode=signup" onClick={() => setIsMenuOpen(false)} className="text-left font-bold text-white transition hover:opacity-80">Sign Up</Link>
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