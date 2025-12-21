import Link from 'next/link';
import React from 'react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-white bg-[#0f1115]/95 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex size-10 items-center justify-center bg-primary text-white border-2 border-white transition-transform group-hover:rotate-6 group-hover:shadow-neo-white">
              <span className="material-symbols-outlined font-bold">terminal</span>
            </div>
            <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic group-hover:text-primary transition-colors">
              RUANGGULIK
            </h1>
          </Link>
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors relative group"
            >
              Beranda
            </Link>
            <Link
              href="#"
              className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors relative group"
            >
              Kategori
            </Link>
          </nav>
          <div className="lg:hidden">Menu</div>
        </div>
      </div>
    </header>
  );
}
