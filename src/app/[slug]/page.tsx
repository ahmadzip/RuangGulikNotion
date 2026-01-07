import { getPostBySlug, getPostBlocks, getPublishedPosts } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";



export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;

  // Optimization: Fetch all posts once. 
  // Since getPublishedPosts is cached, getPostBySlug (which calls it) won't re-fetch if we call it here.
  // However, to be explicit and avoid any potential overhead, we can just fetch allPosts and find the post.
  const allPosts = await getPublishedPosts();
  const post = allPosts.find(p => p.slug === slug);

  if (!post) {
    notFound();
  }

  const recordMap = await getPostBlocks(post.id);
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  const authorName = post.authors[0] || "Admin Gulik";
  const authorImage = `https://ui-avatars.com/api/?name=${encodeURIComponent(authorName)}&background=facc15&color=000`;

  return (
    <>
      <Navbar />
      <ReadingProgressBar />

      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="mb-8 flex items-center gap-2 text-sm font-bold uppercase text-gray-500 font-display">
          <Link href="/" className="hover:text-primary hover:underline">Beranda</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="#" className="hover:text-primary hover:underline">{post.category}</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-white">{post.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
          <article className="lg:col-span-8 flex flex-col gap-8">
            <header className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="bg-primary text-white border border-white px-3 py-1 text-xs font-bold uppercase shadow-neo-sm font-display">
                  {post.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white font-display">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 border-y-2 border-dashed border-gray-700 py-4">
                <img src={authorImage} alt={authorName} className="size-12 border-2 border-white" />
                <div>
                  <p className="font-bold uppercase text-sm text-white font-display">
                    Ditulis oleh <span className="text-accent">{authorName}</span>
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {post.date}
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button className="p-2 border border-white hover:bg-white hover:text-black transition-colors"><span className="material-symbols-outlined text-sm">share</span></button>
                  <button className="p-2 border border-white hover:bg-white hover:text-black transition-colors"><span className="material-symbols-outlined text-sm">bookmark</span></button>
                </div>
              </div>
            </header>

            <div className="aspect-video w-full border-2 border-white bg-[#181b21] relative shadow-neo overflow-hidden group hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              {post.cover ? (
                <Image
                  src={post.cover}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500 font-mono">
                  No Cover Image
                </div>
              )}
              <div className="absolute bottom-0 left-0 bg-black/80 backdrop-blur-sm px-4 py-2 border-t-2 border-r-2 border-white">
                <p className="text-xs font-mono text-gray-300">Featured Image</p>
              </div>
            </div>

            <div className="border-2 border-white bg-[#181b21] p-6 md:p-10 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              {recordMap ? (
                <NotionRenderer blocks={recordMap} />
              ) : (
                <div className="text-center py-10 text-gray-500 font-mono">
                  <p>Content unavailable or could not be loaded.</p>
                </div>
              )}
            </div>

            <div className="border-2 border-white bg-[#181b21] p-6 shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2 font-display text-white">
                <span className="material-symbols-outlined">forum</span> Diskusi (Dummy)
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 bg-primary border border-white shrink-0"></div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white uppercase font-display">Pengunjung</h5>
                      <span className="text-xs text-gray-500 font-mono">Baru saja</span>
                    </div>
                    <p className="text-gray-400 text-sm font-body">Artikel yang sangat bermanfaat! Ditunggu tulisan selanjutnya.</p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <label className="block text-sm font-bold uppercase mb-2 text-white font-display">Tulis Komentar</label>
                  <textarea className="w-full bg-[#0f1115] border-2 border-[#333] p-3 text-white focus:border-primary focus:outline-none focus:shadow-neo-sm h-24 mb-3 placeholder-gray-600 font-body" placeholder="Tanya sesuatu..."></textarea>
                  <button className="bg-white text-black font-bold uppercase px-6 py-2 border-2 border-transparent hover:bg-primary hover:text-white hover:border-white transition-colors font-display">
                    Kirim
                  </button>
                </div>
              </div>
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit">
            <div className="border-2 border-white bg-[#181b21] shadow-neo hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
              <div className="bg-[#181b21] text-white p-4 border-b-2 border-white">
                <h3 className="text-xl font-black uppercase flex items-center gap-2 font-display">
                  <span className="material-symbols-outlined text-primary">auto_stories</span> Baca Juga
                </h3>
              </div>
              <div className="flex flex-col">
                {relatedPosts.map((related) => (
                  <Link key={related.id} href={`/${related.slug}`} className="flex gap-3 p-4 border-b border-[#333] hover:bg-[#0f1115] group transition-colors">
                    <div className="size-16 bg-gray-700 shrink-0 border border-white overflow-hidden relative">
                      {related.cover && <Image src={related.cover} alt={related.title} fill className="object-cover group-hover:scale-110 transition-transform" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm leading-tight group-hover:text-primary mb-1 text-white font-display">{related.title}</h4>
                      <span className="text-xs text-gray-500 font-mono">{related.category}</span>
                    </div>
                  </Link>
                ))}
                {relatedPosts.length === 0 && <p className="p-4 text-gray-500 text-sm italic font-body">Belum ada artikel lain.</p>}
              </div>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
