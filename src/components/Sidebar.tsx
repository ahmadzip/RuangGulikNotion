import React from 'react';

export default function Sidebar() {
  return (
    <aside className="lg:col-span-4 space-y-10 h-fit">
      <div className="border-2 border-white bg-[#181b21] shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
        <div className="bg-[#181b21] text-white p-4 border-b-2 border-white">
          <h3 className="text-xl font-black uppercase">Kategori</h3>
        </div>
        <ul className="divide-y-2 divide-[#333]">
          <li>
            <a
              className="flex justify-between p-4 hover:bg-primary hover:text-white transition-colors"
              href="#"
            >
              <span>Hardware</span>
              <span>(0)</span>
            </a>
          </li>
          <li>
             <a
              className="flex justify-between p-4 hover:bg-primary hover:text-white transition-colors"
              href="#"
            >
              <span>Tutorial</span>
              <span>(0)</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="border-2 border-white bg-[#181b21] shadow-neo p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
        <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-gray-700 pb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            className="px-3 py-1 bg-[#282e39] border border-white hover:bg-accent hover:text-black text-sm font-bold uppercase"
            href="#"
          >
            #gaming
          </a>
           <a
            className="px-3 py-1 bg-[#282e39] border border-white hover:bg-accent hover:text-black text-sm font-bold uppercase"
            href="#"
          >
            #linux
          </a>
        </div>
      </div>
    </aside>
  );
}
