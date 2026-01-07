'use client';

import React, { useEffect, useState } from 'react';

export default function ReadingProgressBar() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setWidth(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-[80px] left-0 w-full h-1 bg-gray-800 z-40">
      <div 
        className="h-full bg-accent shadow-[0_0_10px_#facc15] transition-all duration-100 ease-out" 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
