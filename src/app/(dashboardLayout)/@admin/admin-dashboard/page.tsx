import React from "react";
import {
    FileText,
    Eye,
    Star,
    Tag,
    TrendingUp,
    Clock,
    MessageSquare,
    Sparkles,
    ArrowRight,
    BarChart3,
} from "lucide-react";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";
import Link from "next/link";

// ── Stat card ───────────────────────────────────────────────────
function StatCard({
    icon: Icon,
    label,
    value,
    sub,
    color,
    bg,
    border,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
    sub?: string;
    color: string;
    bg: string;
    border: string;
}) {
    return (
        <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:bg-white/[0.08] hover:shadow-lg">
            <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl opacity-30 transition-all duration-300 group-hover:scale-110 ${bg}`} />
            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={`flex h-11 w-11 items-center justify-center rounded-xl border ${bg} ${border} ${color}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </div>
            <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500 mb-1">{label}</p>
                <h3 className="text-3xl font-extrabold text-white tabular-nums">{value}</h3>
                {sub && <p className="text-xs text-neutral-500 mt-1">{sub}</p>}
            </div>
        </div>
    );
}

// ── Page ────────────────────────────────────────────────────────
export default async function AdminDashboard() {
    // Fetch data in parallel
    const [postsRes, sessionRes] = await Promise.all([
        blogService.getBlogPosts({ limit: "100" }, { cache: "no-store" }),
        userService.getSession(),
    ]);

    const allPosts: BlogPost[] = postsRes.data?.data ?? [];
    const adminName: string = sessionRes.data?.user?.name ?? "Admin";

    // ── Computed metrics ──────────────────────────────────────────
    const totalPosts = allPosts.length;
    const totalViews = allPosts.reduce((sum, p) => sum + (p.views ?? 0), 0);
    const totalComments = allPosts.reduce((sum, p) => sum + (p._count?.comments ?? 0), 0);
    const featuredCount = allPosts.filter((p) => p.isFeatured).length;
    const uniqueTags = new Set(allPosts.flatMap((p) => p.tags ?? [])).size;
    const avgViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;

    // Top 5 by views for the table
    const topPosts = [...allPosts]
        .sort((a, b) => (b.views ?? 0) - (a.views ?? 0))
        .slice(0, 5);

    // Recent 5
    const recentPosts = allPosts.slice(0, 5);

    // Views bar chart: group by relative height from topPosts
    const maxViews = topPosts[0]?.views ?? 1;

    const stats = [
        {
            icon: FileText,
            label: "Total Articles",
            value: totalPosts,
            sub: `${featuredCount} featured`,
            color: "text-cyan-400",
            bg: "bg-cyan-500/20",
            border: "border-cyan-500/20",
        },
        {
            icon: Eye,
            label: "Total Views",
            value: totalViews.toLocaleString(),
            sub: `Avg ${avgViews.toLocaleString()} per article`,
            color: "text-violet-400",
            bg: "bg-violet-500/20",
            border: "border-violet-500/20",
        },
        {
            icon: MessageSquare,
            label: "Total Comments",
            value: totalComments.toLocaleString(),
            sub: "Across all articles",
            color: "text-indigo-400",
            bg: "bg-indigo-500/20",
            border: "border-indigo-500/20",
        },
        {
            icon: Tag,
            label: "Unique Tags",
            value: uniqueTags,
            sub: "Topics covered",
            color: "text-emerald-400",
            bg: "bg-emerald-500/20",
            border: "border-emerald-500/20",
        },
    ];

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* ── Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles className="h-4 w-4 text-cyan-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-cyan-500">Admin</span>
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Welcome, {adminName}
                    </h1>
                    <p className="text-neutral-400 text-sm">
                        Live overview of all platform content and engagement.
                    </p>
                </div>
                <Link
                    href="/dashboard/history"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
                >
                    <BarChart3 className="h-4 w-4" />
                    View All Articles
                </Link>
            </div>

            {/* ── Stat cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {stats.map((s) => (
                    <StatCard key={s.label} {...s} />
                ))}
            </div>

            {/* ── Main grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Top articles by views — bar chart */}
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-cyan-400" />
                            Top Articles by Views
                        </h2>
                        <Link
                            href="/dashboard/history"
                            className="flex items-center gap-1 text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            All articles <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {topPosts.length > 0 ? (
                        <div className="space-y-3">
                            {topPosts.map((post, idx) => {
                                const barPct = maxViews > 0 ? Math.round(((post.views ?? 0) / maxViews) * 100) : 0;
                                return (
                                    <div key={post.id} className="group">
                                        <div className="flex items-center gap-3 mb-1">
                                            <span className="text-xs font-bold text-neutral-600 w-4 shrink-0">
                                                #{idx + 1}
                                            </span>
                                            <p className="text-sm font-medium text-white truncate flex-1">
                                                {post.title}
                                            </p>
                                            <div className="flex items-center gap-3 shrink-0">
                                                <span className="flex items-center gap-1 text-xs text-neutral-400">
                                                    <Eye className="h-3 w-3" />
                                                    {(post.views ?? 0).toLocaleString()}
                                                </span>
                                                {post.isFeatured && (
                                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {/* View bar */}
                                        <div className="ml-7 h-1.5 w-full rounded-full bg-white/[0.05]">
                                            <div
                                                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all"
                                                style={{ width: `${barPct}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <FileText className="h-10 w-10 text-neutral-700 mb-3" />
                            <p className="text-sm text-neutral-500">No articles published yet.</p>
                        </div>
                    )}
                </div>

                {/* Recent articles */}
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                            <Clock className="h-4 w-4 text-violet-400" />
                            Recent Articles
                        </h2>
                    </div>

                    {recentPosts.length > 0 ? (
                        <div className="space-y-3">
                            {recentPosts.map((post) => (
                                <div
                                    key={post.id}
                                    className="flex items-start gap-3 rounded-xl p-3 hover:bg-white/[0.05] transition-colors border border-transparent hover:border-white/[0.07]"
                                >
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mt-0.5">
                                        <FileText className="h-3.5 w-3.5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-sm font-semibold text-white truncate leading-snug">
                                            {post.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="flex items-center gap-1 text-[11px] text-neutral-500">
                                                <Eye className="h-3 w-3" />
                                                {(post.views ?? 0).toLocaleString()}
                                            </span>
                                            {post.isFeatured && (
                                                <span className="text-[10px] font-bold text-amber-400">★ Featured</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center py-8">
                            <p className="text-sm text-neutral-600">No articles yet.</p>
                        </div>
                    )}

                    {/* Summary strip */}
                    {totalPosts > 0 && (
                        <div className="mt-5 pt-4 border-t border-white/[0.07] grid grid-cols-2 gap-3">
                            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 text-center">
                                <p className="text-lg font-extrabold text-white">{totalPosts}</p>
                                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Articles</p>
                            </div>
                            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-3 py-2.5 text-center">
                                <p className="text-lg font-extrabold text-white">{featuredCount}</p>
                                <p className="text-[10px] text-neutral-500 font-medium uppercase tracking-wider">Featured</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Tags overview ── */}
            {uniqueTags > 0 && (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
                    <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-emerald-400" />
                        All Tags in Use
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {Array.from(new Set(allPosts.flatMap((p) => p.tags ?? []))).map((tag) => {
                            const count = allPosts.filter((p) => (p.tags ?? []).includes(tag)).length;
                            return (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.05] border border-white/[0.08] text-neutral-300 hover:bg-emerald-500/10 hover:border-emerald-500/20 hover:text-emerald-300 transition-all"
                                >
                                    #{tag}
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/10 text-[9px] font-bold text-neutral-400">
                                        {count}
                                    </span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}