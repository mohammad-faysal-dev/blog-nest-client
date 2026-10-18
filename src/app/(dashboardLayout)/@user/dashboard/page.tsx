import React from "react";
import {
  FileText, Eye, Star, PenSquare, Clock,
  TrendingUp, ArrowRight, Sparkles, Zap,
  BookOpen, Target, Flame,
} from "lucide-react";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";
import Link from "next/link";

export default async function UserDashboard() {
  const [postsRes, sessionRes] = await Promise.all([
    blogService.getBlogPosts({ limit: "100" }, { cache: "no-store" }),
    userService.getSession(),
  ]);

  const allPosts: BlogPost[] = postsRes.data?.data ?? [];
  const userName: string = sessionRes.data?.user?.name ?? "there";

  const totalPosts = allPosts.length;
  const totalViews = allPosts.reduce((sum, p) => sum + (p.views ?? 0), 0);
  const featuredCount = allPosts.filter((p) => p.isFeatured).length;
  const recentPosts = allPosts.slice(0, 5);
  const topPost = allPosts.reduce<BlogPost | null>((best, p) => {
    if (!best) return p;
    return (p.views ?? 0) > (best.views ?? 0) ? p : best;
  }, null);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* ── Hero Header ── */}
      <div className="relative overflow-hidden rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-indigo-500/5 to-transparent p-7">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-violet-500/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 px-3 items-center rounded-full bg-violet-500/20 border border-violet-500/30 text-[11px] font-bold uppercase tracking-widest text-violet-300">
                ✦ Writer
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {greeting}, {userName}! 👋
            </h1>
            <p className="text-neutral-400 text-sm mt-1.5">
              You have <span className="text-white font-semibold">{totalPosts} article{totalPosts !== 1 ? "s" : ""}</span> published
              {totalViews > 0 && <> with <span className="text-violet-300 font-semibold">{totalViews.toLocaleString()} total views</span></>}.
            </p>
          </div>
          <Link
            href="/dashboard/create-blog"
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold hover:from-violet-500 hover:to-indigo-500 shadow-[0_0_24px_rgba(139,92,246,0.4)] hover:shadow-[0_0_32px_rgba(139,92,246,0.6)] transition-all hover:-translate-y-0.5 shrink-0"
          >
            <PenSquare className="h-4 w-4" />
            Write New Article
          </Link>
        </div>
      </div>

      {/* ── Personal Stats ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: "My Articles", value: totalPosts, sub: "published", color: "text-cyan-400", glow: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20" },
          { icon: Eye, label: "Total Views", value: totalViews.toLocaleString(), sub: "across all posts", color: "text-violet-400", glow: "from-violet-500/20 to-violet-500/5", border: "border-violet-500/20" },
          { icon: Star, label: "Featured", value: featuredCount, sub: featuredCount === 0 ? "keep writing!" : "articles featured", color: "text-amber-400", glow: "from-amber-500/20 to-amber-500/5", border: "border-amber-500/20" },
          { icon: Flame, label: "Avg. Views", value: totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0, sub: "per article", color: "text-emerald-400", glow: "from-emerald-500/20 to-emerald-500/5", border: "border-emerald-500/20" },
        ].map((s) => (
          <div key={s.label} className={`relative overflow-hidden rounded-2xl border ${s.border} bg-gradient-to-br ${s.glow} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <s.icon className={`h-4 w-4 ${s.color}`} />
            </div>
            <p className={`text-2xl font-extrabold ${s.color} tabular-nums`}>{s.value}</p>
            <p className="text-xs font-semibold text-white mt-0.5">{s.label}</p>
            <p className="text-[11px] text-neutral-500 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Content Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* Recent Articles */}
        <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" />
              My Recent Articles
            </h2>
            <Link href="/dashboard/history" className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              View all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {recentPosts.length > 0 ? (
            <div className="space-y-2">
              {recentPosts.map((post) => (
                <div key={post.id} className="group flex items-center gap-4 rounded-xl p-3.5 hover:bg-white/[0.04] transition-colors border border-transparent hover:border-white/[0.07]">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate group-hover:text-violet-200 transition-colors">{post.title}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      {(post.tags ?? []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] text-neutral-600">#{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="shrink-0 flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                      <Eye className="h-3 w-3" />{(post.views ?? 0).toLocaleString()}
                    </span>
                    {post.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">★</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/10 border border-violet-500/20 mb-4">
                <BookOpen className="h-6 w-6 text-violet-400" />
              </div>
              <p className="text-sm font-semibold text-neutral-300">No articles yet</p>
              <p className="text-xs text-neutral-600 mt-1 mb-4">Share your knowledge with the world</p>
              <Link href="/dashboard/create-blog" className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:opacity-90 transition-all">
                <PenSquare className="h-3.5 w-3.5" />
                Write your first article
              </Link>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="flex flex-col gap-4">

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-5">
            <h2 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-400" />
              Quick Actions
            </h2>
            <div className="space-y-2">
              <Link href="/dashboard/create-blog" className="group flex items-center gap-3 p-3 rounded-xl bg-violet-500/8 border border-violet-500/20 hover:bg-violet-500/15 transition-all">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/20 text-violet-400">
                  <PenSquare className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">Write Article</p>
                  <p className="text-[11px] text-neutral-500">Publish a new post</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-600 group-hover:text-violet-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
              <Link href="/dashboard/history" className="group flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] transition-all">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white">My History</p>
                  <p className="text-[11px] text-neutral-500">{totalPosts} article{totalPosts !== 1 ? "s" : ""}</p>
                </div>
                <ArrowRight className="h-3.5 w-3.5 text-neutral-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
              </Link>
            </div>
          </div>

          {/* Top Article */}
          {topPost ? (
            <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/8 to-transparent p-5">
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-amber-500/15 blur-2xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp className="h-4 w-4 text-amber-400" />
                  <p className="text-xs font-bold uppercase tracking-widest text-amber-400/80">Top Article</p>
                </div>
                <p className="text-sm font-bold text-white leading-snug line-clamp-2 mb-3">{topPost.title}</p>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                    <Eye className="h-3 w-3 text-amber-400" />
                    {(topPost.views ?? 0).toLocaleString()} views
                  </span>
                  {topPost.isFeatured && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/20">Featured</span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.02] p-5 text-center">
              <Target className="h-7 w-7 text-neutral-700 mx-auto mb-2" />
              <p className="text-xs text-neutral-600 leading-relaxed">
                Your best performing article will appear here once you start publishing.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
