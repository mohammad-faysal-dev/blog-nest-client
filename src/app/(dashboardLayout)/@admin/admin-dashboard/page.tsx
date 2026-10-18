import React from "react";
import {
    FileText, Eye, Tag, TrendingUp, Clock,
    MessageSquare, ArrowRight, BarChart3,
    Shield, Users, Activity, AlertCircle,
    CheckCircle2, Hash,
} from "lucide-react";
import { blogService } from "@/services/blog.service";
import { userService } from "@/services/user.service";
import { BlogPost } from "@/types";
import Link from "next/link";

export default async function AdminDashboard() {
    const [postsRes, sessionRes] = await Promise.all([
        blogService.getBlogPosts({ limit: "100" }, { cache: "no-store" }),
        userService.getSession(),
    ]);

    const allPosts: BlogPost[] = postsRes.data?.data ?? [];
    const adminName: string = sessionRes.data?.user?.name ?? "Admin";

    const totalPosts = allPosts.length;
    const totalViews = allPosts.reduce((sum, p) => sum + (p.views ?? 0), 0);
    const totalComments = allPosts.reduce((sum, p) => sum + (p._count?.comments ?? 0), 0);
    const featuredCount = allPosts.filter((p) => p.isFeatured).length;
    const uniqueTags = new Set(allPosts.flatMap((p) => p.tags ?? [])).size;
    const avgViews = totalPosts > 0 ? Math.round(totalViews / totalPosts) : 0;

    const topPosts = [...allPosts].sort((a, b) => (b.views ?? 0) - (a.views ?? 0)).slice(0, 5);
    const recentPosts = allPosts.slice(0, 5);
    const maxViews = topPosts[0]?.views ?? 1;
    const allTagsList = Array.from(new Set(allPosts.flatMap((p) => p.tags ?? [])));

    return (
        <div className="space-y-7 animate-in fade-in slide-in-from-bottom-4 duration-500">

            {/* ── Admin Control Header ── */}
            <div className="relative overflow-hidden rounded-2xl border border-red-500/15 bg-gradient-to-br from-red-500/8 via-orange-500/5 to-transparent p-7">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-orange-500/10 blur-3xl rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-20 w-32 h-32 bg-red-500/8 blur-2xl rounded-full pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="flex items-center gap-1.5 h-6 px-3 rounded-full bg-red-500/20 border border-red-500/30 text-[11px] font-bold uppercase tracking-widest text-red-300">
                                <Shield className="h-3 w-3" />
                                Admin
                            </span>
                            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                                <CheckCircle2 className="h-3 w-3" /> System Online
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
                            Control Panel
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1.5">
                            Welcome back, <span className="text-white font-semibold">{adminName}</span> — overseeing{" "}
                            <span className="text-orange-300 font-semibold">{totalPosts} articles</span> across the platform.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/dashboard/create-blog"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm font-semibold hover:bg-white/[0.10] transition-all"
                        >
                            <FileText className="h-4 w-4" />
                            New Article
                        </Link>
                        <Link
                            href="/dashboard/history"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold hover:from-orange-400 hover:to-red-400 shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all hover:-translate-y-0.5"
                        >
                            <BarChart3 className="h-4 w-4" />
                            All Articles
                        </Link>
                    </div>
                </div>
            </div>

            {/* ── Platform Metrics ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { icon: FileText, label: "Total Articles", value: totalPosts, sub: `${featuredCount} featured`, color: "text-orange-400", border: "border-orange-500/20", glow: "from-orange-500/15 to-orange-500/5" },
                    { icon: Eye, label: "Platform Views", value: totalViews.toLocaleString(), sub: `Avg ${avgViews}/article`, color: "text-sky-400", border: "border-sky-500/20", glow: "from-sky-500/15 to-sky-500/5" },
                    { icon: MessageSquare, label: "Comments", value: totalComments.toLocaleString(), sub: "User engagement", color: "text-rose-400", border: "border-rose-500/20", glow: "from-rose-500/15 to-rose-500/5" },
                    { icon: Tag, label: "Unique Tags", value: uniqueTags, sub: "Topics covered", color: "text-teal-400", border: "border-teal-500/20", glow: "from-teal-500/15 to-teal-500/5" },
                ].map((s) => (
                    <div key={s.label} className={`relative overflow-hidden rounded-2xl border ${s.border} bg-gradient-to-br ${s.glow} p-5`}>
                        <div className="flex items-center justify-between mb-3">
                            <s.icon className={`h-4 w-4 ${s.color}`} />
                            <Activity className="h-3.5 w-3.5 text-neutral-700" />
                        </div>
                        <p className={`text-2xl font-extrabold ${s.color} tabular-nums`}>{s.value}</p>
                        <p className="text-xs font-semibold text-white mt-0.5">{s.label}</p>
                        <p className="text-[11px] text-neutral-500 mt-0.5">{s.sub}</p>
                    </div>
                ))}
            </div>

            {/* ── Main Grid ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                {/* Top Articles Bar Chart */}
                <div className="lg:col-span-2 rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-base font-bold text-white flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-orange-400" />
                            Top Articles by Views
                        </h2>
                        <Link href="/dashboard/history" className="flex items-center gap-1 text-xs font-medium text-orange-400 hover:text-orange-300 transition-colors">
                            All articles <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {topPosts.length > 0 ? (
                        <div className="space-y-4">
                            {topPosts.map((post, idx) => {
                                const barPct = maxViews > 0 ? Math.round(((post.views ?? 0) / maxViews) * 100) : 0;
                                const barColor = idx === 0 ? "from-orange-500 to-red-500" : idx === 1 ? "from-sky-500 to-blue-500" : "from-teal-500 to-cyan-500";
                                return (
                                    <div key={post.id}>
                                        <div className="flex items-center gap-3 mb-1.5">
                                            <span className={`text-xs font-bold w-4 shrink-0 ${idx === 0 ? "text-orange-400" : "text-neutral-600"}`}>#{idx + 1}</span>
                                            <p className="text-sm font-medium text-white truncate flex-1">{post.title}</p>
                                            <div className="flex items-center gap-2 shrink-0">
                                                <span className="flex items-center gap-1 text-xs text-neutral-500">
                                                    <Eye className="h-3 w-3" />{(post.views ?? 0).toLocaleString()}
                                                </span>
                                                {post.isFeatured && (
                                                    <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/15 text-amber-400 border border-amber-500/20">★</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="ml-7 h-1.5 w-full rounded-full bg-white/[0.05]">
                                            <div className={`h-full rounded-full bg-gradient-to-r ${barColor} transition-all`} style={{ width: `${barPct}%` }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <AlertCircle className="h-10 w-10 text-neutral-700 mb-3" />
                            <p className="text-sm text-neutral-500">No articles published yet.</p>
                        </div>
                    )}
                </div>

                {/* Right Panel */}
                <div className="flex flex-col gap-4">

                    {/* Recent Articles */}
                    <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-5 flex-1">
                        <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-4 w-4 text-sky-400" />
                            <h2 className="text-sm font-bold text-white">Recent Articles</h2>
                        </div>
                        {recentPosts.length > 0 ? (
                            <div className="space-y-1">
                                {recentPosts.map((post) => (
                                    <div key={post.id} className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.04] transition-colors group">
                                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 mt-0.5">
                                            <FileText className="h-3.5 w-3.5" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="text-xs font-semibold text-white truncate group-hover:text-sky-300 transition-colors">{post.title}</p>
                                            <span className="flex items-center gap-1 text-[10px] text-neutral-600 mt-0.5">
                                                <Eye className="h-2.5 w-2.5" />{(post.views ?? 0).toLocaleString()} views
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-6">
                                <p className="text-xs text-neutral-600">No articles yet.</p>
                            </div>
                        )}
                    </div>

                    {/* Platform Health */}
                    <div className="rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/8 to-transparent p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <Activity className="h-4 w-4 text-emerald-400" />
                            <p className="text-sm font-bold text-white">Platform Health</p>
                        </div>
                        <div className="space-y-2.5">
                            {[
                                { label: "Content Published", value: `${totalPosts}`, ok: totalPosts > 0 },
                                { label: "Engagement Rate", value: totalPosts > 0 ? `${avgViews} avg views` : "N/A", ok: avgViews > 0 },
                                { label: "Featured Content", value: `${featuredCount} articles`, ok: featuredCount > 0 },
                                { label: "Tag Coverage", value: `${uniqueTags} unique`, ok: uniqueTags > 0 },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center justify-between">
                                    <span className="text-xs text-neutral-500">{item.label}</span>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-xs font-semibold text-white">{item.value}</span>
                                        <span className={`h-2 w-2 rounded-full ${item.ok ? "bg-emerald-400" : "bg-neutral-600"}`} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Tags Overview ── */}
            {allTagsList.length > 0 && (
                <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <Hash className="h-4 w-4 text-teal-400" />
                        <h2 className="text-sm font-bold text-white">All Tags on Platform</h2>
                        <span className="ml-1 text-[11px] text-neutral-600">({allTagsList.length} unique)</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {allTagsList.map((tag) => {
                            const count = allPosts.filter((p) => (p.tags ?? []).includes(tag)).length;
                            return (
                                <span
                                    key={tag}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white/[0.04] border border-white/[0.07] text-neutral-400 hover:bg-teal-500/10 hover:border-teal-500/20 hover:text-teal-300 transition-all cursor-default"
                                >
                                    #{tag}
                                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-white/8 text-[9px] font-bold text-neutral-500">{count}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* ── User Management strip ── */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-orange-400" />
                        <h2 className="text-sm font-bold text-white">Management Actions</h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                        { href: "/dashboard/create-blog", label: "Create Article", desc: "Publish new content", icon: FileText, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
                        { href: "/dashboard/history", label: "Manage Articles", desc: `${totalPosts} total articles`, icon: BarChart3, color: "text-sky-400", bg: "bg-sky-500/10", border: "border-sky-500/20" },
                        { href: "/settings", label: "Platform Settings", desc: "Configure system", icon: Activity, color: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/20" },
                    ].map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="group flex items-center gap-3 p-4 rounded-xl border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.10] transition-all"
                        >
                            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${action.bg} border ${action.border}`}>
                                <action.icon className={`h-5 w-5 ${action.color}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white">{action.label}</p>
                                <p className="text-[11px] text-neutral-500">{action.desc}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-neutral-700 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}