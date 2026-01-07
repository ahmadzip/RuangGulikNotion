import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPublishedPosts } from "@/lib/notion";



import Pagination from "@/components/Pagination";

export default async function Home({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const posts = await getPublishedPosts();

  const page = Number((await searchParams).page) || 1;
  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (page - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 flex flex-col gap-10">
            <div className="flex items-center gap-4 border-b-4 border-white pb-4">
              <div className="bg-primary p-2 border-2 border-white">
                <span className="material-symbols-outlined text-white">feed</span>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tight">
                Artikel Terbaru
              </h3>
            </div>

            <div className="grid gap-8">
              {currentPosts.length > 0 ? (
                currentPosts.map((post) => <ArticleCard key={post.id} post={post} />)
              ) : (
                <div className="p-8 border-2 border-white bg-[#181b21] shadow-neo text-center">
                  <p className="text-gray-500">No posts found. Please publish some in Notion.</p>
                </div>
              )}
            </div>

            <Pagination currentPage={page} totalPages={totalPages} />
          </div>

          <Sidebar />
        </div>
      </main>
      <Footer />
    </>
  );
}
