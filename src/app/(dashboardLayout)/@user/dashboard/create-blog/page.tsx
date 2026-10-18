import CreateBlogFromClient from "@/components/modules/user/createBlog/CreateBlogFromClient";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import {
  PenLine,
  Lightbulb,
  TrendingUp,
  BookOpen,
  Clock,
  Flame,
  BarChart3,
  Eye,
  Layers,
  ArrowRight,
} from "lucide-react";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts();
  const allPosts: BlogPost[] = data?.data || [];
  const recentPosts = allPosts.slice(0, 4);

  const totalViews = allPosts.reduce((acc, p) => acc + (p.views || 0), 0);

  const tips = [
    {
      icon: Lightbulb,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      border: "border-amber-400/15",
      title: "Hook Your Reader",
      desc: "Your first sentence should stop the scroll. Lead with a bold claim or question.",
    },
    {
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      border: "border-emerald-400/15",
      title: "Add Subheadings",
      desc: "Break content into scannable sections for better readability.",
    },
    {
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      border: "border-blue-400/15",
      title: "Show, Don't Tell",
      desc: "Use code examples, analogies, and stories to bring ideas to life.",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">

      {/* ── Page Header ── */}
      <div className="mb-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <PenLine className="h-5 w-5 text-violet-400" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white">
              New Article
            </h1>
            <p className="text-sm text-neutral-500">
              Draft, refine, and publish your ideas to the world.
            </p>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
            <Layers className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-sm font-bold text-white">{allPosts.length}</span>
            <span className="text-xs text-neutral-500">articles</span>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-2.5">
            <Eye className="h-3.5 w-3.5 text-indigo-400" />
            <span className="text-sm font-bold text-white">{totalViews.toLocaleString()}</span>
            <span className="text-xs text-neutral-500">views</span>
          </div>
        </div>
      </div>

      {/* ── Main Layout: Editor + Sidebar ── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5">

        {/* ── Left: Editor ── */}
        <CreateBlogFromClient />

        {/* ── Right: Sidebar Panels ── */}
        <div className="flex flex-col gap-4">

          {/* Writing Tips */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-amber-500/0 via-amber-400 to-amber-500/0" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-4 w-4 text-amber-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Writing Tips
                </p>
              </div>
              <div className="space-y-3">
                {tips.map((tip) => (
                  <div
                    key={tip.title}
                    className={`flex gap-3 p-3 rounded-xl border ${tip.border} ${tip.bg} hover:brightness-110 transition-all group cursor-default`}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/30">
                      <tip.icon className={`h-4 w-4 ${tip.color}`} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-white">{tip.title}</p>
                      <p className="text-[11px] text-neutral-500 mt-0.5 leading-relaxed">{tip.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Posts */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-cyan-500/0 via-cyan-400 to-cyan-500/0" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-cyan-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Recent Articles
                </p>
              </div>

              {recentPosts.length > 0 ? (
                <div className="space-y-1">
                  {recentPosts.map((item: BlogPost, idx: number) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/[0.04] transition-all group cursor-pointer"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-[11px] font-bold text-neutral-600 group-hover:text-cyan-400 transition-colors">
                        {idx + 1}
                      </span>
                      <p className="text-[12px] text-neutral-400 group-hover:text-white transition-colors truncate flex-1 leading-tight">
                        {item.title}
                      </p>
                      <ArrowRight className="h-3 w-3 text-neutral-700 group-hover:text-cyan-400 shrink-0 transition-all group-hover:translate-x-0.5" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] mb-3">
                    <BookOpen className="h-5 w-5 text-neutral-700" />
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    No articles yet.
                    <br />
                    Your published work will appear here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden">
            <div className="h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-400 to-indigo-500/0" />
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-4 w-4 text-indigo-400" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-400">
                  Your Impact
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  {
                    label: "Published",
                    value: allPosts.length,
                    color: "text-cyan-400",
                    glow: "bg-cyan-500/10",
                  },
                  {
                    label: "Total Views",
                    value: totalViews > 999
                      ? `${(totalViews / 1000).toFixed(1)}k`
                      : totalViews,
                    color: "text-indigo-400",
                    glow: "bg-indigo-500/10",
                  },
                ].map((s) => (
                  <div
                    key={s.label}
                    className={`relative rounded-xl border border-white/[0.06] p-4 text-center overflow-hidden`}
                  >
                    <div className={`absolute inset-0 ${s.glow} blur-xl`} />
                    <p className={`relative text-2xl font-extrabold ${s.color} tabular-nums`}>
                      {s.value}
                    </p>
                    <p className="relative text-[10px] text-neutral-600 mt-1 uppercase tracking-wider">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
