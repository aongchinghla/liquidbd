export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-8 text-sm text-white/45 md:flex-row md:items-center md:justify-between lg:px-10">
        <p>© 2026 Liquid. All Rights Reserved.</p>
        <div className="flex flex-wrap gap-6">
          <a href="#" className="transition hover:text-white">Facebook</a>
          <a href="#" className="transition hover:text-white">Instagram</a>
          <a href="#" className="transition hover:text-white">Support</a>
          <a href="#" className="transition hover:text-white">Shipping</a>
        </div>
      </div>
    </footer>
  );
}
