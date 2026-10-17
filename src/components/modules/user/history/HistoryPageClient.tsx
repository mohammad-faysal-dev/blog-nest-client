"use client";

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";

interface PaginationControlProps {
    meta: {
        limit: number;
        page: number;
        total: number;
        totalPages: number;
    };
}

const HistoryPageClient = ({ meta }: PaginationControlProps) => {
    const { page: currentPage, totalPages, total, limit } = meta;
    const searchParams = useSearchParams();
    const router = useRouter();

    const navigateToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        router.push(`?${params.toString()}`);
    };

    const startEntry = (currentPage - 1) * limit + 1;
    const endEntry = Math.min(currentPage * limit, total);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Entry info */}
            <p className="text-xs text-neutral-500">
                Showing{" "}
                <span className="font-semibold text-neutral-300">
                    {total > 0 ? startEntry : 0}–{total > 0 ? endEntry : 0}
                </span>{" "}
                of <span className="font-semibold text-neutral-300">{total}</span>{" "}
                articles
            </p>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent className="gap-1">
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) navigateToPage(currentPage - 1);
                                }}
                                className={`rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all ${currentPage <= 1 ? "pointer-events-none opacity-40" : ""
                                    }`}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, index) => {
                            const page = index + 1;
                            const isActive = page === currentPage;
                            return (
                                <PaginationItem key={page}>
                                    <PaginationLink
                                        href="#"
                                        isActive={isActive}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigateToPage(page);
                                        }}
                                        className={`rounded-xl border transition-all ${isActive
                                                ? "border-indigo-500/50 bg-indigo-500/20 text-indigo-300 font-bold shadow-[0_0_12px_rgba(99,102,241,0.3)]"
                                                : "border-white/10 bg-white/5 text-neutral-400 hover:bg-white/10 hover:text-white"
                                            }`}
                                    />
                                </PaginationItem>
                            );
                        })}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) navigateToPage(currentPage + 1);
                                }}
                                className={`rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-all ${currentPage >= totalPages
                                        ? "pointer-events-none opacity-40"
                                        : ""
                                    }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
};

export default HistoryPageClient;
