import Link from 'next/link';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl = '/' }: PaginationProps) {
    const prevPage = currentPage > 1 ? currentPage - 1 : null;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    const getUrl = (page: number) => {
        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}page=${page}`;
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8 font-display">
            {prevPage ? (
                <Link
                    href={getUrl(prevPage)}
                    className="px-4 py-2 border-2 border-white bg-[#181b21] text-white hover:bg-primary hover:text-white transition-all-custom shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase font-bold text-sm flex items-center gap-2"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Prev
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-600 cursor-not-allowed uppercase font-bold text-sm flex items-center gap-2 opacity-50"
                >
                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                    Prev
                </button>
            )}

            <div className="px-4 py-2 border-2 border-white bg-white text-black font-black">
                {currentPage} / {totalPages}
            </div>

            {nextPage ? (
                <Link
                    href={getUrl(nextPage)}
                    className="px-4 py-2 border-2 border-white bg-[#181b21] text-white hover:bg-primary hover:text-white transition-all-custom shadow-neo hover:shadow-none hover:translate-x-1 hover:translate-y-1 uppercase font-bold text-sm flex items-center gap-2"
                >
                    Next
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            ) : (
                <button
                    disabled
                    className="px-4 py-2 border-2 border-gray-700 bg-gray-900 text-gray-600 cursor-not-allowed uppercase font-bold text-sm flex items-center gap-2 opacity-50"
                >
                    Next
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
            )}
        </div>
    );
}
