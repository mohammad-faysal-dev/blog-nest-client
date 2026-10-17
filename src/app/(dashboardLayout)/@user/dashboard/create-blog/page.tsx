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
} from "lucide-react";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts();
  const recentPosts = data?.data?.slice(0, 5) || [];

  const tips = [
    {
      icon: Lightbulb,
      color: "text-amber-400",
      bg: "bg-amber-400/10",
      title: "Craft a Hook",
      desc: "Your first sentence should make readers stop scrolling.",
    },
    {
      icon: TrendingUp,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
      title: "Use Subheadings",
      desc: "Break content into scannable sections for better UX.",
    },
    {
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
      title: "Show, Don't Tell",
      desc: "Use examples and stories to bring ideas to life.",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Page Header ── */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-white/10">
              <PenLine className="h-5 w-5 text-cyan-400" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Create New Article
            </h1>
          </div>
          <p className="text-neutral-400 pl-[52px]">
            Draft your thoughts and publish them to the world.
          </p>
        </div>

        {/* Status pill */}
        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-400 backdrop-blur-sm self-start sm:self-auto">
          <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
          Auto-saving draft…
        </div>
      </div>

      {/* ── Main Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xl:gap-8">
        {/* Left — Editor (2/3) */}
        <div className="lg:col-span-2">
          <CreateBlogFromClient />
        </div>

        {/* Right — Sidebar (1/3) */}
        <div className="flex flex-col gap-5">
          {/* Writing Tips */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-amber-500/8 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <Flame className="h-4 w-4 text-amber-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">
                Writing Tips
              </h2>
            </div>
            <div className="space-y-3">
              {tips.map((tip) => (
                <div
                  key={tip.title}
                  className="flex gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors group"
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${tip.bg}`}
                  >
                    <tip.icon className={`h-4 w-4 ${tip.color}`} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-white">
                      {tip.title}
                    </p>
                    <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                      {tip.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-cyan-500/8 blur-3xl rounded-full pointer-events-none" />
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-cyan-400" />
              <h2 className="text-sm font-bold text-white uppercase tracking-widest">
                Recent Articles
              </h2>
            </div>
            <div className="space-y-2">
              {recentPosts.length > 0 ? (
                recentPosts.map((item: BlogPost, idx: number) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-transparent hover:border-white/10 hover:bg-white/[0.06] transition-all cursor-pointer group"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-xs font-bold text-neutral-500 group-hover:text-cyan-400 transition-colors mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-neutral-300 group-hover:text-white transition-colors truncate leading-relaxed">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-0.5">
                        Click to edit
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <BookOpen className="h-8 w-8 text-neutral-700 mb-2" />
                  <p className="text-xs text-neutral-600">
                    No recent articles yet.
                    <br />
                    Your published work appears here.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Card */}
          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/5 to-indigo-500/5 p-5 backdrop-blur-xl">
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-3">
              Your Impact
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Published",
                  value: data?.data?.length ?? 0,
                  color: "text-cyan-400",
                },
                {
                  label: "Total Views",
                  value:
                    data?.data
                      ?.reduce(
                        (acc: number, p: BlogPost) => acc + (p.views || 0),
                        0
                      )
                      .toLocaleString() ?? "0",
                  color: "text-indigo-400",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl bg-white/5 border border-white/5 p-3 text-center"
                >
                  <p className={`text-xl font-extrabold ${s.color}`}>
                    {s.value}
                  </p>
                  <p className="text-[10px] text-neutral-500 mt-0.5 uppercase tracking-wider">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
