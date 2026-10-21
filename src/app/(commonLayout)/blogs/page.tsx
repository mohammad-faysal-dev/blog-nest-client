import { BlogCard } from "@/components/modules/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Search,
  Rss,
  ChevronRight,
  Clock,
  Sparkles,
  Star,
  Code2,
  Database,
  Globe,
  Cpu,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

/** Calculate estimated read time (words / 200 wpm) */
function calcReadTime(content: string): string {
  const words = content?.trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

/** Strip markdown syntax and return plain text for excerpts */
function stripMarkdown(text: string): string {
  return text
    // remove fenced code blocks entirely
    .replace(/```[\s\S]*?```/g, "")
    // remove inline code
    .replace(/`[^`]*`/g, "")
    // remove headings (#)
    .replace(/^#{1,6}\s+/gm, "")
    // remove bold / italic
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    // remove markdown tables
    .replace(/^\|.*\|$/gm, "")
    .replace(/^[-| :]+$/gm, "")
    // remove blockquotes
    .replace(/^>\s+/gm, "")
    // remove horizontal rules
    .replace(/^[-*_]{3,}$/gm, "")
    // remove links [text](url)
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // collapse multiple blank lines / trim
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

/** Category tag config (label + icon + backend tag key) */
const CATEGORY_CONFIG = [
  { label: "All Topics", icon: Rss, tag: null },
  { label: "Frontend", icon: Globe, tag: "frontend" },
  { label: "Backend", icon: Database, tag: "backend" },
  { label: "DevOps", icon: Cpu, tag: "devops" },
  { label: "Open Source", icon: Code2, tag: "open-source" },
];

const page = async ({ searchParams }: PageProps) => {
  const resolvedParams = await searchParams;
  const currentPage = Number(resolvedParams?.page) || 1;
  const searchTerm = resolvedParams?.search || "";
  const limit = 9;

  // ── Main posts + tag counts in parallel ──────────────────────────────
  const [mainRes, ...categoryRes] = await Promise.all([
    // Main listing
    blogService.getBlogPosts(
      {
        isFeatured: false,
        search: searchTerm,
        page: currentPage.toString(),
        limit: limit.toString(),
      },
      { revalidate: 10 },
    ),
    // One count fetch per non-null tag (limit=1 to minimise payload)
    ...CATEGORY_CONFIG.filter((c) => c.tag !== null).map((c) =>
      blogService.getBlogPosts(
        { tag: c.tag!, limit: "1" },
        { revalidate: 60 },
      ),
    ),
  ]);

  const posts: BlogPost[] = mainRes.data?.data || [];
  const totalPosts =
    mainRes.data?.meta?.total ||
    (posts.length === limit
      ? currentPage * limit + 1
      : (currentPage - 1) * limit + posts.length);
  const totalPages =
    mainRes.data?.meta?.totalPages || Math.ceil(totalPosts / limit) || 1;

  // Build dynamic category counts
  const taggedCounts = CATEGORY_CONFIG.filter((c) => c.tag !== null).map(
    (c, idx) => categoryRes[idx]?.data?.meta?.total ?? 0,
  );

  const CATEGORIES = CATEGORY_CONFIG.map((c, idx) => ({
    ...c,
    count: c.tag === null ? totalPosts : taggedCounts[idx - 1] ?? 0,
  }));

  const hasNextPage = currentPage < totalPages;
  const hasPrevPage = currentPage > 1;

  const heroPost = posts[0] || null;
  const gridPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">

      {/* ── Ambient background glows ── */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-[rgba(139,92,246,0.10)] blur-[130px]" />
        <div className="absolute top-[30%] right-0 w-[400px] h-[400px] rounded-full bg-[rgba(236,72,153,0.07)] blur-[120px]" />
        <div className="absolute bottom-[10%] left-0 w-[500px] h-[400px] rounded-full bg-[rgba(192,132,252,0.06)] blur-[140px]" />
      </div>

      {/* ── TOP STRIP ── */}
      <div className="border-b border-border/30 bg-muted/20 backdrop-blur-sm">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
              Live Updates
            </span>
            <span>
              <strong className="text-foreground">{totalPosts}</strong> articles published
            </span>
          </div>
          <span className="font-mono tracking-wide hidden sm:block font-semibold">
            DEVNEXUS · TECH JOURNAL
          </span>
        </div>
      </div>

      {/* ── MASTHEAD ── */}
      <div className="border-b border-border/30">
        <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              {/* Section pill */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/25 bg-primary/8 text-primary text-sm font-bold tracking-widest uppercase mb-5">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                Discover Limitless Knowledge
              </div>

              <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-4">
                <span className="text-foreground">Explore Our Latest</span>
                <br />
                <span
                  className="text-transparent bg-clip-text"
                  style={{ backgroundImage: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)" }}
                >
                  Articles &amp; Blogs
                </span>
              </h1>

              <p className="text-muted-foreground text-lg max-w-xl leading-relaxed font-medium">
                Immerse yourself in expert tutorials, cutting-edge industry insights, and
                deep-dive engineering articles crafted specifically for passionate developers.
              </p>
            </div>

            {/* Search */}
            <form method="GET" className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50" />
                <input
                  name="search"
                  type="text"
                  defaultValue={searchTerm}
                  placeholder="Search articles..."
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-card border border-border/60 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/10 transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="h-11 px-6 rounded-xl font-bold text-sm transition-all flex-shrink-0 text-white hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)",
                  boxShadow: "0 0 20px rgba(139,92,246,0.25)",
                }}
              >
                Search
              </button>
            </form>
          </div>

          {/* ── Category Pills (dynamic counts) ── */}
          <div className="flex items-center gap-2 mt-8 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.label}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border",
                    idx === 0
                      ? "text-white border-transparent"
                      : "border-border/60 text-muted-foreground hover:border-primary/40 hover:text-primary bg-card/60",
                  )}
                  style={idx === 0 ? { background: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)" } : {}}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.label}
                  {/* Dynamic count */}
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                    idx === 0
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className="max-w-[1400px] mx-auto px-6 py-12">

        {posts.length > 0 ? (
          <>
            {/* ── HERO POST ── */}
            {heroPost && (
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-6">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                      style={{ backgroundColor: "#8B5CF6" }}
                    />
                    <span
                      className="relative inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: "#8B5CF6" }}
                    />
                  </span>
                  <span
                    className="text-xs font-black tracking-[0.3em] uppercase"
                    style={{ color: "#C084FC" }}
                  >
                    Editor&apos;s Pick
                  </span>
                  <div
                    className="h-px flex-1"
                    style={{ background: "linear-gradient(to right, #8B5CF640, #C084FC20, transparent)" }}
                  />
                  <span className="text-xs font-bold text-muted-foreground/40 tracking-widest uppercase hidden sm:block">
                    Curated for You
                  </span>
                </div>

                <Link href={`/blogs/${heroPost.id}`} className="group block">
                  <div className="hero-card relative rounded-[2rem] overflow-hidden border border-border/50 bg-card grid md:grid-cols-[1fr_1.1fr] min-h-[380px] transition-all duration-700 hover:-translate-y-1.5">

                    {/* Image Side */}
                    <div className="relative overflow-hidden min-h-[240px] md:min-h-full order-last md:order-last">
                      <img
                        src={heroPost.thumbnail}
                        alt={heroPost.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="hidden md:block absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-card to-transparent z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      {/* Dynamic read time pill */}
                      <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white/80 text-[11px] font-bold">
                        <Clock className="h-3 w-3" />
                        {calcReadTime(heroPost.content)}
                      </div>

                      {/* Corner accent */}
                      <div className="absolute bottom-5 left-5 z-20 flex items-center gap-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{
                            background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                            boxShadow: "0 0 16px rgba(139,92,246,0.5)",
                          }}
                        >
                          <ArrowUpRight className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-white/70 text-xs font-bold tracking-wide">
                          Open article
                        </span>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="relative flex flex-col justify-between p-9 md:p-12">
                      {/* Left accent bar */}
                      <div
                        className="absolute top-0 left-0 bottom-0 w-1 rounded-l-[2rem]"
                        style={{ background: "linear-gradient(to bottom, #8B5CF6, #C084FC, #EC489940)" }}
                      />

                      {/* Watermark */}
                      <div className="absolute bottom-6 right-6 text-[8rem] font-black text-foreground/[0.04] leading-none select-none pointer-events-none">
                        01
                      </div>

                      <div className="relative z-10 flex flex-col gap-6">
                        {/* Badges */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {heroPost.tags?.[0] && (
                            <span
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase"
                              style={{ background: "#8B5CF615", border: "1px solid #8B5CF640", color: "#C084FC" }}
                            >
                              {heroPost.tags[0]}
                            </span>
                          )}
                          {heroPost.isFeatured && (
                            <span
                              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase"
                              style={{ background: "#EC489915", border: "1px solid #EC489940", color: "#EC4899" }}
                            >
                              <Sparkles className="h-3 w-3" />
                              Featured
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                          {heroPost.title}
                        </h2>

                        {/* Divider */}
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-[3px] rounded-full group-hover:w-16 transition-all duration-500"
                            style={{ background: "linear-gradient(to right, #8B5CF6, #C084FC, #EC4899)" }}
                          />
                          <div className="w-2 h-[3px] rounded-full" style={{ background: "#EC489940" }} />
                        </div>

                        <p className="text-muted-foreground leading-relaxed line-clamp-3 text-sm md:text-base font-medium max-w-sm">
                          {stripMarkdown(heroPost.content)}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="relative z-10 flex items-center justify-between pt-7 mt-7 border-t border-border/40">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground font-semibold">
                          <span className="flex items-center gap-1.5">
                            <Star className="h-3.5 w-3.5 opacity-60" />
                            {heroPost.views.toLocaleString()} views
                          </span>
                          <span className="w-px h-3 bg-border" />
                          <span className="flex items-center gap-1.5">
                            <BookOpen className="h-3.5 w-3.5 opacity-60" />
                            {calcReadTime(heroPost.content)}
                          </span>
                        </div>

                        <button
                          className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-full overflow-hidden text-white text-sm font-black transition-all duration-300 hover:scale-105"
                          style={{
                            background: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)",
                            boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                          }}
                        >
                          <span className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <span className="relative">Read Story</span>
                          <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* ── SECTION HEADER ── */}
            <div className="flex items-center gap-3 mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/8 text-primary text-xs font-bold tracking-widest uppercase">
                <Rss className="h-3.5 w-3.5" />
                All Publications
              </div>
              <div className="h-px flex-1 bg-border/40" />
              <span className="text-xs text-muted-foreground font-mono">
                <strong className="text-foreground">{totalPosts}</strong> total
              </span>
            </div>

            {/* ── GRID ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gridPosts.map((post: BlogPost) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </>
        ) : (
          /* ── EMPTY STATE ── */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-primary/20 to-purple-500/20 border border-primary/20 flex items-center justify-center mb-6">
              <BookOpen className="h-9 w-9 text-primary opacity-70" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">No Articles Found</h3>
            <p className="text-muted-foreground max-w-sm mb-8">
              {searchTerm
                ? `No results for "${searchTerm}". Try a different keyword.`
                : "No articles available at the moment. Check back soon."}
            </p>
            {searchTerm && (
              <Link
                href="?"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "rounded-xl h-11 px-8 font-semibold border-border/60 hover:bg-primary/5 hover:text-primary transition-colors",
                )}
              >
                Clear Search
              </Link>
            )}
          </div>
        )}

        {/* ── PAGINATION ── */}
        {totalPages > 1 && (
          <div className="mt-16 flex flex-col items-center gap-4">
            <Pagination>
              <PaginationContent className="bg-card/60 backdrop-blur-md p-2 rounded-[2rem] border border-border/50 shadow-lg gap-1.5">
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      hasPrevPage
                        ? `?page=${currentPage - 1}${searchTerm ? `&search=${searchTerm}` : ""}`
                        : "#"
                    }
                    className={cn(
                      "h-11 rounded-full border border-border/50 shadow-sm transition-all sm:px-5 hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                      !hasPrevPage && "pointer-events-none opacity-40 bg-muted/50",
                    )}
                  />
                </PaginationItem>

                <div className="flex items-center gap-1.5 px-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`?page=${pageNum}${searchTerm ? `&search=${searchTerm}` : ""}`}
                        className={cn(
                          "h-11 w-11 rounded-full text-sm font-bold transition-all",
                          currentPage === pageNum
                            ? "text-white scale-105 shadow-lg"
                            : "border border-border/50 hover:border-primary/40 hover:bg-primary/5 hover:text-primary bg-transparent",
                        )}
                        style={
                          currentPage === pageNum
                            ? {
                              background: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)",
                              boxShadow: "0 0 20px rgba(139,92,246,0.4)",
                            }
                            : {}
                        }
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                </div>

                <PaginationItem>
                  <PaginationNext
                    href={
                      hasNextPage
                        ? `?page=${currentPage + 1}${searchTerm ? `&search=${searchTerm}` : ""}`
                        : "#"
                    }
                    className={cn(
                      "h-11 rounded-full border border-border/50 shadow-sm transition-all sm:px-5 hover:bg-primary/10 hover:text-primary hover:border-primary/30",
                      !hasNextPage && "pointer-events-none opacity-40 bg-muted/50",
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest font-mono">
              Page <span className="text-foreground">{currentPage}</span> of{" "}
              <span className="text-foreground">{totalPages}</span>
            </p>
          </div>
        )}
      </div>

      {/* ── NEWSLETTER STRIP ── */}
      <div className="border-t border-border/40 mt-8 bg-muted/20">
        <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-base font-bold text-foreground mb-1 tracking-wide">Stay in the loop</p>
            <p className="text-muted-foreground text-sm">Get the latest articles delivered to your inbox.</p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              className="px-4 py-2.5 rounded-xl bg-card border border-border/60 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary/50 text-sm w-64 transition-all"
            />
            <button
              className="px-5 py-2.5 rounded-xl text-white font-bold text-sm transition-all flex items-center gap-2 hover:opacity-90 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899)" }}
            >
              Subscribe <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;