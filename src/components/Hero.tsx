import React from 'react';

export default function Hero() {
  return (
    <section className="mb-20">
      <div className="border-2 border-white bg-[#0f1115] shadow-neo flex flex-col hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
        <div className="border-b-2 border-white bg-[#181b21] p-3 flex items-center justify-between">
          <div className="flex gap-2">
            <div className="size-4 bg-red-500 border border-white rounded-full"></div>
            <div className="size-4 bg-yellow-500 border border-white rounded-full"></div>
            <div className="size-4 bg-green-500 border border-white rounded-full"></div>
          </div>
          <div className="text-xs font-mono font-bold uppercase text-gray-400">
            user@ruanggulik:~
          </div>
        </div>
        <div className="p-8 md:p-16 font-mono relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h2 className="text-5xl md:text-7xl font-black uppercase text-white tracking-tighter">
              WELCOME TO <span className="text-primary">RUANGGULIK</span>_
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 font-bold border-l-4 border-accent pl-4 py-2 bg-white/5 max-w-3xl">
              "Exploring the depths of technology, one pixel at a time."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
