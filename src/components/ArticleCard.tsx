import Link from 'next/link';
import React from 'react';
import { Post } from '@/lib/notion';
import Image from 'next/image';

interface ArticleCardProps {
  post: Post;
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="group relative flex flex-col md:flex-row gap-0 border-2 border-white bg-[#181b21] shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all-custom">
      <div className="md:w-5/12 shrink-0 relative border-b-2 md:border-b-0 md:border-r-2 border-white overflow-hidden aspect-video md:aspect-auto">
        {post.cover ? (
           <Image 
             src={post.cover} 
             alt={post.title}
             fill
             className="object-cover"
           />
        ) : (
             <div className="bg-gray-800 w-full h-full flex items-center justify-center text-gray-500">
                No Image
             </div>
        )}
        <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs font-bold uppercase border border-white">
          {post.category}
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 flex-1">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-gray-500">
            <span className="material-symbols-outlined text-sm">schedule</span>
            <span>{post.date}</span>
          </div>
          <h4 className="text-2xl font-bold leading-tight group-hover:text-primary transition-colors">
            <Link href={`/${post.slug}`} className="before:absolute before:inset-0">
              {post.title}
            </Link>
          </h4>
          <p className="text-gray-400 font-body text-sm line-clamp-2">
            {post.summary}
          </p>
        </div>
      </div>
    </article>
  );
}
