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

const HistoryPagination = ({ meta }: PaginationControlProps) => {
  const { page: currentPage, totalPages } = meta;

  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page.toString());

    router.push(`?${params.toString()}`);
  };

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (currentPage > 1) {
                navigateToPage(currentPage - 1);
              }
            }}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage(page);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (currentPage < totalPages) {
                navigateToPage(currentPage + 1);
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default HistoryPagination;
