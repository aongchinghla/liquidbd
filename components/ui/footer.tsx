import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "Ganna Series", href: "/shop?category=ganna" },
  { label: "Mythology", href: "/shop?category=mythology" },
  { label: "Collaborations", href: "/shop?category=collaboration" },
];

const companyLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Journal", href: "/journal" },
  { label: "Privacy", href: "/privacy" },
  { label: "Shipping & Returns", href: "/shipping-returns" },
  { label: "Contact", href: "/contact" },
];

function FacebookLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.03 4.39 11.03 10.13 11.93v-8.43H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.5h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5A3.95 3.95 0 0 0 16.25 3.8h-8.5Zm8.95 1.35a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8A3.2 3.2 0 1 0 12 15.2 3.2 3.2 0 0 0 12 8.8Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-white/10 bg-[#070707]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(255,255,255,0.12),transparent_24%),linear-gradient(180deg,rgba(10,10,10,0.72),rgba(7,7,7,0.98))]" />

      <div className="site-shell relative py-10">
        <div className="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div className="max-w-sm shrink-0">
            <Link href="/" className="inline-flex items-center">
              <Image
                src="/liquid-logo.png"
                alt="Liquid"
                width={120}
                height={40}
                className="h-auto w-[96px] object-contain md:w-[116px]"
              />
            </Link>

            <p className="mt-5 text-xl font-semibold leading-tight text-white md:text-2xl">
              Indigenous stories, shaped into modern everyday wear.
            </p>
            <p className="mt-3 text-sm leading-7 text-white/50">
              Premium graphic tees and shirts from Bangladesh, made for culture, comfort, and expression.
            </p>
          </div>

          <div className="grid flex-1 gap-8 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.35fr] xl:max-w-4xl">
            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">
                Shop
              </h3>
              <div className="mt-5 flex flex-col gap-3">
                {shopLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/58 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">
                Company
              </h3>
              <div className="mt-5 flex flex-col gap-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-white/58 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">
                Contact
              </h3>
              <div className="mt-5 grid gap-3 text-sm text-white/58">
                <p className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 text-white/35" />
                  Dhaka, Bangladesh
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="h-4 w-4 shrink-0 text-white/35" />
                  +880 1891995306
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/35" />
                  liquidteees@gmail.com
                </p>
              </div>

              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-white/35">
                  Follow On
                </p>
              </div>

              <div className="mt-3 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/Liquidzzz"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#1877F2]/35 bg-[#1877F2]/12 text-[#1877F2] transition hover:border-[#1877F2] hover:bg-[#1877F2]/18"
                >
                  <FacebookLogo />
                </a>
                <a
                  href="https://www.instagram.com/liquid_teees/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E1306C]/35 bg-[#E1306C]/12 text-[#E1306C] transition hover:border-[#E1306C] hover:bg-[#E1306C]/18"
                >
                  <InstagramLogo />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>©2026 Liquid. All rights reserved.</p>
          </div>
        </div>
      </div>

    </footer>
  );
}
