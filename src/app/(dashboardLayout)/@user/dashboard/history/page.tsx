import HistoryTable from "@/components/modules/user/history/HistoryTable";
import HistoryPagination from "@/components/modules/user/history/pagination-controls";
import { blogService } from "@/services/blog.service";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const response = await blogService.getBlogPosts({ page });
  const posts = response.data?.data || [];
  const pagination = response.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-6xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">
          Your Publication History
        </h1>
        <p className="text-neutral-400">
          Manage, track, and review all your past articles in one place.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="relative z-10 w-full overflow-x-auto">
          <HistoryTable posts={posts} />
        </div>

        <div className="relative z-10 mt-8 flex justify-end">
          <HistoryPagination meta={pagination} />
        </div>
      </div>
    </div>
  );
};

export default page;
