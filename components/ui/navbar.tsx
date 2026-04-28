"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, LogOut, MapPin, MapPinned, Menu, Search, ShoppingBag, User, X } from "lucide-react";
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
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tag && product.tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).slice(0, 5); // Limit to top 5 results

    setSearchResults(filtered);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsAccountOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const onLogout = () => {
    handleLogout();
    setIsAccountOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <div className="relative z-[60] border-b border-white/10 bg-black/70 backdrop-blur-xl">
        <div className="site-shell flex flex-row items-center justify-between py-3 text-[10px] text-white/60 md:text-xs">
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

      <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-2xl">
        <div className="site-shell flex items-center justify-between py-4">
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
            </nav>

            <div className="flex items-center gap-2 md:gap-3">
              <button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery("");
                }}
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 md:h-11 md:w-11 ${isSearchOpen ? "bg-white text-black shadow-[0_10px_30px_rgba(255,255,255,0.12)]" : "bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  }`}
              >
                {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>

              {isLoggedIn ? (
                <div ref={accountRef} className="relative hidden md:block">
                  <button
                    onClick={() => setIsAccountOpen((prev) => !prev)}
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-white/90 transition hover:bg-white/[0.08]"
                    aria-expanded={isAccountOpen}
                    aria-haspopup="menu"
                  >
                    <User className="h-4 w-4" />
                    <span className="max-w-[130px] truncate">Hi, {currentUser}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${isAccountOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isAccountOpen && (
                    <div className="absolute right-0 top-[calc(100%+0.75rem)] w-56 overflow-hidden rounded-xl border border-white/10 bg-neutral-950/95 py-2 shadow-2xl backdrop-blur-xl">
                      <div className="border-b border-white/10 px-4 py-3">
                        <p className="text-xs uppercase tracking-widest text-white/35">Signed in as</p>
                        <p className="mt-1 truncate text-sm font-medium text-white">{currentUser}</p>
                      </div>
                      <Link
                        href="/login?view=profile"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                        role="menuitem"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/login?view=address"
                        onClick={() => setIsAccountOpen(false)}
                        className="flex items-center gap-2 px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.06] hover:text-white"
                        role="menuitem"
                      >
                        <MapPinned className="h-4 w-4" />
                        Address
                      </Link>
                      <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-300 transition hover:bg-white/[0.06] hover:text-red-200"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden items-center gap-2 md:flex">
                  <Link href="/login" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white/90 transition hover:bg-white/[0.08]">
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                </div>
              )}

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

        <div
          ref={searchRef}
          className={`absolute left-0 top-full w-full border-b border-white/10 bg-neutral-950/92 px-4 py-6 backdrop-blur-3xl transition-all duration-300 ease-in-out md:px-5 lg:px-6 ${isSearchOpen
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
                className="w-full rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.04))] py-4 pl-14 pr-6 text-lg text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] placeholder:text-white/28 transition-all duration-300 focus:border-white/25 focus:bg-white/[0.08] focus:outline-none"
              />
              <Search className="absolute left-5 top-1/2 h-6 w-6 -translate-y-1/2 text-white/35 transition-all duration-300 group-focus-within:text-white/80" />
            </div>

            {searchResults.length > 0 && (
              <div className="absolute left-0 top-full z-[110] mt-3 w-full overflow-hidden rounded-[1.5rem] border border-white/10 bg-neutral-900/95 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/shop/${product.slug}`}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="group flex items-center gap-4 border-b border-white/[0.06] p-4 transition-colors hover:bg-white/[0.05] last:border-0"
                  >
                    <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-white/8 bg-white/[0.04]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="truncate font-medium text-white transition-colors group-hover:text-white/90">{product.name}</h4>
                      <p className="text-sm text-white/40">
                        {product.productType}
                        {product.category ? ` · ${product.category}` : ""}
                      </p>
                    </div>
                    <div className="font-semibold text-white/85 transition-colors group-hover:text-white">
                      ৳{product.price}
                    </div>
                  </Link>
                ))}
                <Link
                  href="/shop"
                  onClick={() => setIsSearchOpen(false)}
                  className="block py-3 text-center text-sm text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
                >
                  View all products
                </Link>
              </div>
            )}

            {searchQuery.trim().length > 0 && searchResults.length === 0 && (
              <div className="absolute left-0 top-full mt-3 w-full rounded-[1.5rem] border border-white/10 bg-neutral-900/95 p-8 text-center text-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                No products found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>

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

              <div className="h-[1px] w-full bg-white/10" />

              {!isLoggedIn ? (
                <div className="flex flex-col gap-5 pt-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center gap-2 text-left text-white/75 transition hover:text-white"
                  >
                    <User className="h-4 w-4" />
                    Login
                  </Link>
                </div>
              ) : (
                <div className="rounded-xl border border-white/10 bg-white/[0.03]">
                  <button
                    onClick={() => setIsAccountOpen((prev) => !prev)}
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-white/85"
                    aria-expanded={isAccountOpen}
                    aria-haspopup="menu"
                  >
                    <span className="inline-flex min-w-0 items-center gap-2">
                      <User className="h-4 w-4 shrink-0" />
                      <span className="truncate">Hi, {currentUser}</span>
                    </span>
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${isAccountOpen ? "rotate-180" : ""}`} />
                  </button>

                  {isAccountOpen && (
                    <div className="border-t border-white/10 py-1">
                      <Link
                        href="/login?view=profile"
                        onClick={() => {
                          setIsAccountOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-3 text-left text-white/75"
                        role="menuitem"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        href="/login?view=address"
                        onClick={() => {
                          setIsAccountOpen(false);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-3 text-left text-white/75"
                        role="menuitem"
                      >
                        <MapPinned className="h-4 w-4" />
                        Address
                      </Link>
                      <button
                        onClick={onLogout}
                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-red-300"
                        role="menuitem"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
