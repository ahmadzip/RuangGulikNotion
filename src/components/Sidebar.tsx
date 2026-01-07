import React from 'react';
import { getPublishedPosts } from '@/lib/notion';
import Link from 'next/link';

export default async function Sidebar() {
  const posts = await getPublishedPosts();

  // Aggregate Categories
  const categoryCounts: Record<string, number> = {};
  posts.forEach((post) => {
    const category = post.category;
    if (category) {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  });

  // Aggregate Tags
  const allTags = new Set<string>();
  posts.forEach((post) => {
    post.tags.forEach((tag) => allTags.add(tag));
  });
  const uniqueTags = Array.from(allTags);

  return (
    <aside className="lg:col-span-4 space-y-10 h-fit sticky top-24">
      <div className="border-2 border-white bg-[#181b21] shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
        <div className="bg-[#181b21] text-white p-4 border-b-2 border-white">
          <h3 className="text-xl font-black uppercase">Kategori</h3>
        </div>
        <ul className="divide-y-2 divide-[#333]">
          {Object.entries(categoryCounts).map(([category, count]) => (
            <li key={category}>
              <Link
                className="flex justify-between p-4 hover:bg-primary hover:text-white transition-colors"
                href={`/category/${category}`}
              >
                <span>{category}</span>
                <span>({count})</span>
              </Link>
            </li>
          ))}
          {Object.keys(categoryCounts).length === 0 && (
            <li className="p-4 text-gray-500 italic">Belum ada kategori.</li>
          )}
        </ul>
      </div>
      <div className="border-2 border-white bg-[#181b21] shadow-neo p-6 hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
        <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-gray-700 pb-2">
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {uniqueTags.map((tag) => (
            <Link
              key={tag}
              className="px-3 py-1 bg-[#282e39] border border-white hover:bg-accent hover:text-black text-sm font-bold uppercase"
              href={`/tag/${tag}`}
            >
              #{tag}
            </Link>
          ))}
          {uniqueTags.length === 0 && (
            <span className="text-gray-500 italic">Belum ada tags.</span>
          )}
        </div>
      </div>
    </aside>
  );
}
