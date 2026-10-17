import React from "react";
import {
  FileText,
  Eye,
  Star,
  PenSquare,
  Clock,
  TrendingUp,
  Tag,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";
import Link from "next/link";

// ── helpers ───────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  glow,
  iconBg,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  glow: string;
  iconBg: string;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.08] hover:${glow}`}
    >
      <div
        className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-all duration-300 group-hover:scale-110 ${iconBg} opacity-40`}
      />
      <div className="relative z-10 flex items-start justify-between mb-4">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 ${iconBg} bg-opacity-20`}
        >
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="relative z-10">
        <p className="text-xs font-medium text-neutral-500 uppercase tracking-widest mb-1">
          {label}
        </p>
        <h3 className="text-3xl font-extrabold text-white tabular-nums">{value}</h3>
        {sub && <p className="text-xs text-neutral-500 mt-1">{sub}</p>}
      </div>
    </div>
  );
}

// ── page ─────────────────────────────────────────────────────────
export default async function UserDashboard() {
  // Fetch all posts + session in parallel
  const [postsRes, sessionRes] = await Promise.all([
    blogService.getBlogPosts({ limit: "100" }, { cache: "no-store" }),
    userService.getSession(),
  ]);

  const allPosts: BlogPost[] = postsRes.data?.data ?? [];
  const userName: string = sessionRes.data?.user?.name ?? "there";

  // ── computed stats ────────────────────────────────────────────
  const totalPosts = allPosts.length;
  const totalViews = allPosts.reduce((sum, p) => sum + (p.views ?? 0), 0);
  const featuredCount = allPosts.filter((p) => p.isFeatured).length;
  const totalComments = allPosts.reduce(
    (sum, p) => sum + (p._count?.comments ?? 0),
    0
  );

  // Last 5 posts for "Recent Articles"
  const recentPosts = allPosts.slice(0, 5);

  // Top post by views
  const topPost = allPosts.reduce<BlogPost | null>((best, p) => {
    if (!best) return p;
    return (p.views ?? 0) > (best.views ?? 0) ? p : best;
  }, null);

  // Unique tags count
  const uniqueTags = new Set(allPosts.flatMap((p) => p.tags ?? [])).size;

  const stats = [
    {
      icon: FileText,
      label: "Total Articles",
      value: totalPosts,
      sub: totalPosts === 1 ? "1 article published" : `${totalPosts} articles published`,
      glow: "shadow-[0_8px_32px_rgba(6,182,212,0.15)]",
      iconBg: "bg-cyan-500/20",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: totalViews.toLocaleString(),
      sub: `Across all your articles`,
      glow: "shadow-[0_8px_32px_rgba(139,92,246,0.15)]",
      iconBg: "bg-violet-500/20",
    },
    {
      icon: Star,
      label: "Featured",
      value: featuredCount,
      sub: featuredCount === 0 ? "None featured yet" : `${featuredCount} article${featuredCount > 1 ? "s" : ""} featured`,
      glow: "shadow-[0_8px_32px_rgba(251,191,36,0.15)]",
      iconBg: "bg-amber-500/20",
    },
    {
      icon: Tag,
      label: "Unique Tags",
      value: uniqueTags,
      sub: "Topics you've written about",
      glow: "shadow-[0_8px_32px_rgba(52,211,153,0.15)]",
      iconBg: "bg-emerald-500/20",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Header ── */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-cyan-400" />
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">
            Dashboard
          </span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Welcome back, {userName}!
        </h1>
        <p className="text-neutral-400 text-sm mt-1">
          Here&apos;s a live overview of everything you&apos;ve published on DevNexus.
        </p>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── Main grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent articles */}
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              Recent Articles
            </h2>
            <Link
              href="/dashboard/history"
              className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="group flex items-center gap-4 rounded-xl p-3.5 hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/[0.07] cursor-default"
                >
                  {/* Icon */}
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    <FileText className="h-4 w-4" />
                  </div>

                  {/* Title + tags */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-cyan-200 transition-colors">
                      {post.title}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      {(post.tags ?? []).slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-medium text-neutral-500"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Views + featured badge */}
                  <div className="shrink-0 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Eye className="h-3.5 w-3.5" />
                      {(post.views ?? 0).toLocaleString()}
                    </span>
                    {post.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mb-4">
                <FileText className="h-7 w-7 text-neutral-600" />
              </div>
              <p className="text-sm font-semibold text-neutral-400">No articles yet</p>
              <p className="text-xs text-neutral-600 mt-1">
                Start writing your first article to see it here.
              </p>
              <Link
                href="/dashboard/create-blog"
                className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 transition-all"
              >
                <PenSquare className="h-3.5 w-3.5" />
                Write your first article
              </Link>
            </div>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-5">

          {/* Quick actions */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <h2 className="text-base font-bold text-white mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link
                href="/dashboard/create-blog"
                className="group flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-600/10 border border-cyan-500/20 hover:from-cyan-500/20 hover:to-blue-600/20 transition-all"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
                  <PenSquare className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Write Article</p>
                  <p className="text-[11px] text-neutral-500">Publish a new post</p>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </Link>

              <Link
                href="/dashboard/history"
                className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">View History</p>
                  <p className="text-[11px] text-neutral-500">{totalPosts} article{totalPosts !== 1 ? "s" : ""} total</p>
                </div>
                <ArrowRight className="h-4 w-4 text-neutral-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Top performing post */}
          {topPost && (
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 blur-2xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                  <h2 className="text-sm font-bold text-white">Top Article</h2>
                </div>
                <p className="text-sm font-semibold text-white leading-snug line-clamp-2 mb-3">
                  {topPost.title}
                </p>
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Eye className="h-3.5 w-3.5 text-amber-400" />
                    {(topPost.views ?? 0).toLocaleString()} views
                  </span>
                  {topPost.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      Featured
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Empty cta if no posts at all */}
          {totalPosts === 0 && (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-6 text-center">
              <Sparkles className="h-8 w-8 text-neutral-700 mx-auto mb-3" />
              <p className="text-xs font-semibold text-neutral-500">
                Your stats will appear here once you publish your first article.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
