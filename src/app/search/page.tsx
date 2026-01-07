import ArticleCard from "@/components/ArticleCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { getPostsBySearch } from "@/lib/notion";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q: string }> }) {
    const query = (await searchParams).q || "";
    const posts = query ? await getPostsBySearch(query) : [];

    return (
        <>
            <Navbar />
            <main className="flex-grow container mx-auto px-4 lg:px-8 py-12 max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-8 flex flex-col gap-10">
                        <div className="flex items-center gap-4 border-b-4 border-white pb-4">
                            <div className="bg-white p-2 border-2 border-white">
                                <span className="material-symbols-outlined text-black">search</span>
                            </div>
                            <h3 className="text-3xl font-black uppercase tracking-tight">
                                Hasil Pencarian: "{query}"
                            </h3>
                        </div>

                        <div className="grid gap-8">
                            {posts.length > 0 ? (
                                posts.map((post) => <ArticleCard key={post.id} post={post} />)
                            ) : (
                                <div className="p-8 border-2 border-white bg-[#181b21] shadow-neo text-center">
                                    <p className="text-gray-500">
                                        {query ? "Tidak ada artikel yang ditemukan." : "Silakan masukkan kata kunci pencarian."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <Sidebar />
                </div>
            </main>
            <Footer />
        </>
    );
}
