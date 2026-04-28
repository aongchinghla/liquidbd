"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, MapPinned, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About Us", href: "/about" },
];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const nextResults = products
      .filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.productType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tag && product.tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .slice(0, 5);

    setSearchResults(nextResults);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shellRef.current && !shellRef.current.contains(event.target as Node)) {
        setSearchQuery("");
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsMenuOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSearchQuery("");
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [setIsMenuOpen]);

  const closeAll = () => {
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  const getIsActive = (href: string) =>
    href === "/shop" ? pathname === "/shop" || pathname.startsWith("/shop/") : pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#242424]/95 backdrop-blur-2xl">
      <div ref={shellRef} className="site-shell relative px-2.5 py-2 sm:px-3 md:px-5 lg:px-6">
        <div className="grid gap-2">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2.5 lg:grid-cols-[auto_minmax(360px,620px)_auto] lg:justify-between">
            <Link href="/" onClick={closeAll} className="flex items-center justify-center px-1 py-1">
              <Image
                src="/liquid-logo.png"
                alt="Liquid T-Shirt Logo"
                width={100}
                height={32}
                className="h-auto w-[74px] object-contain md:w-[92px]"
                priority
              />
            </Link>

            <div className="relative mx-auto hidden w-full lg:block">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                <input
                  type="text"
                  placeholder="Search products, type, or category..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="h-10 w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-11 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-white/20"
                />
                {searchQuery.trim().length > 0 && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {searchQuery.trim().length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[70]">
                  <SearchResults
                    results={searchResults}
                    searchQuery={searchQuery}
                    closeAll={closeAll}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-self-end gap-2">
              <nav className="hidden items-center gap-2 lg:flex">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-full px-3 py-1.5 text-sm transition ${
                      getIsActive(link.href)
                        ? "bg-sky-600 text-white"
                        : "text-white/70 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {isLoggedIn ? (
                <Link
                  href="/login?view=profile"
                  className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white/85 transition hover:border-white/20 hover:text-white md:inline-flex"
                >
                  <User className="h-4 w-4" />
                  <span className="max-w-[120px] truncate">{currentUser}</span>
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="hidden items-center gap-2 rounded-full border border-[#2f7ea1]/60 bg-white/[0.03] px-3 py-2 text-sm text-white/85 transition hover:border-[#2f7ea1] hover:text-white md:inline-flex"
                >
                  <User className="h-4 w-4" />
                  Login
                </Link>
              )}

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white text-black transition hover:opacity-90"
                aria-label="Open cart"
              >
                <ShoppingBag className="h-4 w-4" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full border border-[#242424] bg-red-500 px-1 text-[9px] font-bold leading-none text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="-mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition hover:border-white/20 hover:bg-white/[0.05] lg:hidden"
                aria-label="Toggle menu"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="relative lg:hidden">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-10 w-full rounded-full border border-white/10 bg-white/[0.03] pl-11 pr-11 text-sm text-white placeholder:text-white/28 outline-none transition focus:border-white/20"
              />
              {searchQuery.trim().length > 0 && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/35 transition hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-[70]">
                <SearchResults
                  results={searchResults}
                  searchQuery={searchQuery}
                  closeAll={closeAll}
                />
              </div>
            )}
          </div>

          {isLoggedIn && (
            <div className="hidden items-center justify-end gap-2 border-t border-white/10 pt-2 md:flex lg:hidden">
              <Link
                href="/login?view=address"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/55 transition hover:border-white/20 hover:text-white"
              >
                <MapPinned className="h-3.5 w-3.5" />
                Address
              </Link>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-red-300 transition hover:border-white/20 hover:text-red-200"
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </button>
            </div>
          )}

          {isMenuOpen && (
            <div
              className="absolute left-2.5 right-2.5 top-full z-[80] mt-2 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#151515] shadow-[0_24px_60px_rgba(0,0,0,0.45)] lg:hidden"
              aria-label="Navigation menu"
              role="dialog"
              aria-modal="true"
            >
              <div className="grid gap-1 p-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeAll}
                    className={`flex items-center rounded-xl px-4 py-3 text-sm transition ${
                      getIsActive(link.href)
                        ? "bg-sky-600 text-white"
                        : "text-white/75 hover:bg-white/[0.05] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="my-2 border-t border-white/[0.07]" />

                {isLoggedIn ? (
                  <>
                    <Link
                      href="/login?view=profile"
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <User className="h-4 w-4 shrink-0" />
                      <span className="truncate">{currentUser}</span>
                    </Link>
                    <Link
                      href="/login?view=address"
                      onClick={closeAll}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-white/75 transition hover:bg-white/[0.05] hover:text-white"
                    >
                      <MapPinned className="h-4 w-4 shrink-0" />
                      Address
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeAll();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm text-red-300 transition hover:bg-white/[0.05] hover:text-red-200"
                    >
                      <LogOut className="h-4 w-4 shrink-0" />
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeAll}
                    className="flex items-center gap-3 rounded-xl border border-[#2f7ea1]/45 px-4 py-3 text-sm text-white/75 transition hover:border-[#2f7ea1] hover:bg-white/[0.05] hover:text-white"
                  >
                    <User className="h-4 w-4 shrink-0" />
                    Login
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

function SearchResults({
  results,
  searchQuery,
  closeAll,
}: {
  results: Product[];
  searchQuery: string;
  closeAll: () => void;
}) {
  if (results.length === 0) {
    return (
      <p className="rounded-[1.25rem] border border-white/10 bg-[#151515] px-4 py-5 text-sm text-white/40 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        No products found for &ldquo;{searchQuery}&rdquo;.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#151515] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
      {results.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.slug}`}
          onClick={closeAll}
          className="flex items-center gap-4 border-b border-white/[0.06] p-4 transition hover:bg-white/[0.04] last:border-b-0"
        >
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{product.name}</p>
            <p className="mt-1 text-xs text-white/40">
              {product.productType}
              {product.category ? ` · ${product.category}` : ""}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
