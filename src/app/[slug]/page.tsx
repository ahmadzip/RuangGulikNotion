import { getPostBySlug, getPostBlocks, getPublishedPosts } from "@/lib/notion";
import NotionRenderer from "@/components/NotionRenderer";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getPublishedPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recordMap = await getPostBlocks(post.id);

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <div className="mb-8 flex items-center gap-2 text-sm font-bold uppercase text-gray-500">
          <Link href="/">Home</Link> {'>'} <Link href="#">{post.category}</Link> {'>'}{" "}
          <span className="text-white">{post.slug}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8 flex flex-col gap-8">
            <header className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <span className="bg-primary text-white border border-white px-3 py-1 text-xs font-bold uppercase">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight leading-none text-white">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 border-y-2 border-dashed border-gray-700 py-4">
                <div>
                  <p className="font-bold uppercase text-sm text-white">
                    Ditulis oleh <span className="text-accent">{post.authors.join(", ")}</span>
                  </p>
                  <p className="text-xs text-gray-400 font-mono">
                    {post.date}
                  </p>
                </div>
              </div>
            </header>

            <div className="aspect-video w-full border-2 border-white bg-[#181b21] relative shadow-neo overflow-hidden">
                {post.cover ? (
                     <Image
                     src={post.cover}
                     alt={post.title}
                     fill
                     className="object-cover"
                   />
                ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                        No Cover Image
                    </div>
                )}
            </div>

            <div className="border-2 border-white bg-[#181b21] p-6 md:p-10 shadow-neo">
                 <NotionRenderer recordMap={recordMap} />
            </div>
          </article>

          <aside className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 h-fit">
            <div className="border-2 border-white bg-[#181b21] p-6 shadow-neo text-center">
              <div className="size-20 mx-auto bg-accent border-2 border-white mb-4"></div>
              <h3 className="text-xl font-black uppercase">
                {post.authors[0] || "Author"}
              </h3>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
