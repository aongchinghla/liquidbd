import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, ShoppingBag } from "lucide-react";

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
  { label: "Contact", href: "/contact" },
];

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
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 sm:flex-col sm:gap-x-0">
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
              <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 sm:flex-col sm:gap-x-0">
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
                  +880 1XXX XXXXXX
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 text-white/35" />
                  hello@liquidbd.com
                </p>
                <p className="flex items-center gap-3">
                  <ShoppingBag className="h-4 w-4 shrink-0 text-white/35" />
                  bKash, Nagad, COD
                </p>
              </div>

              <div className="mt-5 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/Liquidzzz"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/25 hover:text-white"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="https://www.instagram.com/liquid_teees/"
                  aria-label="Instagram"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/60 transition hover:border-white/25 hover:text-white"
                >
                  <Instagram className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-white/38 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <p>© 2026 Liquid. All rights reserved.</p>
          </div>
          <div className="flex flex-wrap gap-5 md:justify-end">
            <a href="#" className="transition hover:text-white/80">
              Privacy
            </a>
            <a href="#" className="transition hover:text-white/80">
              Shipping
            </a>
            <a href="#" className="transition hover:text-white/80">
              Returns
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
