'use client';

import Link from 'next/link';
import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-bold uppercase tracking-wide hover:text-primary transition-colors relative group"
            >
              Beranda
            </Link>
            <form action="/search" method="GET" className="relative">
              <input
                type="text"
                name="q"
                placeholder="Cari artikel..."
                className="bg-[#181b21] border-2 border-white px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary w-64 font-mono"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary">
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </form>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="material-symbols-outlined">
              {isOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-[#0f1115] border-b-2 border-white p-4 shadow-neo">
          <nav className="flex flex-col gap-4">
            <form action="/search" method="GET" className="relative w-full">
              <input
                type="text"
                name="q"
                placeholder="Cari artikel..."
                className="w-full bg-[#181b21] border-2 border-white px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary font-mono"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary">
                <span className="material-symbols-outlined text-lg">search</span>
              </button>
            </form>
            <Link
              href="/"
              className="block w-full border-2 border-white bg-[#181b21] p-3 text-center font-bold uppercase hover:bg-primary hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Beranda
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
