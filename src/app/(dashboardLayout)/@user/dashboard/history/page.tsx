import HistoryTable from "@/components/modules/user/history/HistoryTable";
import HistoryPageClient from "@/components/modules/user/history/HistoryPageClient";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";
import { History, BarChart2, Eye, Star, FileText } from "lucide-react";

const HistoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string; filter?: string }>;
}) => {
  const { page, filter } = await searchParams;
  const response = await blogService.getBlogPosts({ page });
  const posts: BlogPost[] = response.data?.data || [];
  const pagination = response.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);
  const featuredCount = posts.filter((p) => p.isFeatured).length;

  const stats = [
    {
      icon: FileText,
      label: "Total Articles",
      value: pagination.total,
      color: "text-cyan-400",
      bg: "from-cyan-500/10 to-cyan-500/5",
      border: "border-cyan-500/20",
      glow: "bg-cyan-500/10",
    },
    {
      icon: Eye,
      label: "Total Views",
      value: totalViews.toLocaleString(),
      color: "text-indigo-400",
      bg: "from-indigo-500/10 to-indigo-500/5",
      border: "border-indigo-500/20",
      glow: "bg-indigo-500/10",
    },
    {
      icon: Star,
      label: "Featured",
      value: featuredCount,
      color: "text-amber-400",
      bg: "from-amber-500/10 to-amber-500/5",
      border: "border-amber-500/20",
      glow: "bg-amber-500/10",
    },
    {
      icon: BarChart2,
      label: "This Page",
      value: posts.length,
      color: "text-emerald-400",
      bg: "from-emerald-500/10 to-emerald-500/5",
      border: "border-emerald-500/20",
      glow: "bg-emerald-500/10",
    },
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* ── Page Header ── */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/10">
                <History className="h-5 w-5 text-indigo-400" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white">
                Publication History
              </h1>
            </div>
            <p className="text-neutral-400 pl-[52px]">
              Manage, track, and review all your past articles in one place.
            </p>
          </div>

          {/* Page badge */}
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-400 backdrop-blur-sm self-start sm:self-auto">
            <span className="text-white font-semibold">
              Page {pagination.page}
            </span>
            <span>of {pagination.totalPages}</span>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`relative rounded-2xl border ${stat.border} bg-gradient-to-br ${stat.bg} p-5 overflow-hidden backdrop-blur-xl`}
          >
            <div
              className={`absolute -top-6 -right-6 w-20 h-20 ${stat.glow} blur-2xl rounded-full pointer-events-none`}
            />
            <div className="relative z-10">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 mb-3`}
              >
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
              <p className="text-xs text-neutral-500 mt-0.5 uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Table Card ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {/* Ambient glows */}
        <div className="absolute -top-32 -right-32 w-72 h-72 bg-cyan-500/8 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-72 h-72 bg-indigo-500/8 blur-[100px] rounded-full pointer-events-none" />

        {/* Gradient top bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-cyan-500/0 via-indigo-500 to-cyan-500/0" />

        {/* Table Header */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-4 border-b border-white/5">
          <div>
            <p className="text-sm font-semibold text-white">All Articles</p>
            <p className="text-xs text-neutral-500">
              {pagination.total} total entries
            </p>
          </div>
          {/* Filter tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {["All", "Featured", "Standard"].map((f) => (
              <span
                key={f}
                className={`cursor-pointer px-3 py-1 rounded-full text-xs font-medium transition-all border ${(!filter && f === "All") || filter === f
                    ? "bg-indigo-500/20 border-indigo-500/40 text-indigo-300"
                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
              >
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Table content */}
        <div className="relative z-10 w-full overflow-x-auto">
          <HistoryTable posts={posts} />
        </div>

        {/* Pagination */}
        <div className="relative z-10 border-t border-white/5 px-6 py-4">
          <HistoryPageClient meta={pagination} />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
