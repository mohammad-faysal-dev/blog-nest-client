import { BlogCard } from "@/components/modules/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Sparkles,
  Search,
  Grid,
  FileText,
  SlidersHorizontal,
  TrendingUp,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const page = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const searchTerm = resolvedParams?.search || "";
  const limit = 8; // Adjust based on API preference

  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: false,
      search: searchTerm,
      page: currentPage.toString(),
      limit: limit.toString(),
    },
    {
      revalidate: 10,
    },
  );

  const posts: BlogPost[] = data?.data || [];

  // Dummy meta values in case API doesn't return them yet
  const totalPosts = data?.meta?.total || (posts.length === limit ? currentPage * limit + 1 : (currentPage - 1) * limit + posts.length);
  const totalPages = data?.meta?.totalPages || Math.ceil(totalPosts / limit) || 1;

  // Pagination Logic
  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[450px] bg-gradient-to-br from-primary/20 via-purple-500/10 to-transparent blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-pink-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* 1. Hero Header Section */}
        <div className="relative mb-16 text-center max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="mb-6 inline-flex items-center gap-2 border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary backdrop-blur-xl rounded-full shadow-[0_0_20px_rgba(var(--primary),0.2)]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Discover Limitless Knowledge</span>
          </Badge>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
            Explore Our Latest <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Articles & Blogs
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
            Immerse yourself in expert tutorials, cutting-edge industry insights, and deep-dive engineering articles crafted specifically for passionate developers.
          </p>
        </div>

        {/* 2. Search & Filter Bar Section */}
        <div className="mb-14 p-3 rounded-3xl border border-border/40 bg-card/40 backdrop-blur-2xl shadow-2xl max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4 hover:shadow-primary/5 transition-all duration-500">
          <div className="relative w-full flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              defaultValue={searchTerm}
              placeholder="Search by topic, tag, or technology..."
              className="pl-12 h-14 border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50 text-lg"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end border-t sm:border-t-0 border-border/30 pt-3 sm:pt-0 pl-0 sm:pl-3">
            <Button variant="outline" size="sm" className="h-14 px-5 rounded-2xl gap-2 text-sm font-semibold border-border/60 hover:bg-primary/5">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button size="sm" className="h-14 px-8 rounded-2xl font-semibold text-sm shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              Search
            </Button>
          </div>
        </div>

        {/* 3. Section Title & Post Counter */}
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/40">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <Grid className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">All Publications</h2>
              <p className="text-sm text-muted-foreground font-medium">Browse through our extensive collection of articles</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm text-sm font-semibold text-muted-foreground shadow-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span>Total Posts: <strong className="text-foreground">{totalPosts}</strong></span>
          </div>
        </div>

        {/* 4. Blog Cards Grid Layout */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post: BlogPost) => (
              <div
                key={post.id}
                className="group relative transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/50 to-purple-500/50 rounded-[22px] blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative h-full">
                  <BlogCard post={post} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border/60 bg-card/40 backdrop-blur-xl py-24 px-6 text-center max-w-3xl mx-auto shadow-xl transition-all duration-300">
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 text-primary border border-primary/20 shadow-inner group transition-transform duration-300 hover:scale-105">
              <FileText className="h-12 w-12 text-primary opacity-80" />
            </div>
            <h3 className="text-3xl font-bold tracking-tight mb-3">No Articles Found</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              We couldn't find any articles here right now. Try a different search term or check previous pages.
            </p>
            {searchTerm && (
              <Link
                href="?"
                className={cn(buttonVariants({ variant: "outline" }), "mt-8 rounded-xl h-12 px-8 font-semibold text-base shadow-sm hover:bg-primary/5 hover:text-primary transition-colors")}
              >
                Clear Search
              </Link>
            )}
          </div>
        )}

        {/* Pagination Controls - Now outside to ensure user can go back if they reach an empty page */}
        {totalPages > 1 && (
          <div className="mt-20 flex flex-col items-center justify-center space-y-6">
            <Pagination>
              <PaginationContent className="bg-card/40 backdrop-blur-md p-2 rounded-[2rem] border border-border/50 shadow-lg sm:gap-2">
                <PaginationItem>
                  <PaginationPrevious
                    href={hasPrevPage ? `?page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ""}` : "#"}
                    className={cn(
                      "h-12 rounded-full border border-border/50 shadow-sm transition-all sm:px-5",
                      !hasPrevPage && "pointer-events-none opacity-40 bg-muted/50"
                    )}
                  />
                </PaginationItem>

                <div className="hidden sm:flex items-center gap-1.5 px-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ""}`}
                        className={cn(
                          "h-12 w-12 rounded-full text-base font-bold transition-all flex items-center justify-center",
                          currentPage === pageNum
                            ? "shadow-lg shadow-primary/40 !bg-primary !text-primary-foreground scale-105"
                            : "border border-border/50 hover:border-primary/50 hover:bg-primary/5 bg-transparent"
                        )}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                <PaginationItem>
                  <PaginationNext
                    href={hasNextPage ? `?page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ""}` : "#"}
                    className={cn(
                      "h-12 rounded-full border border-border/50 shadow-sm transition-all sm:px-5",
                      !hasNextPage && "pointer-events-none opacity-40 bg-muted/50"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
              Page <span className="text-foreground">{currentPage}</span> of <span className="text-foreground">{totalPages}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;