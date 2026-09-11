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
  console.log(response);
  const posts = response.data?.data || [];
  const pagination = response.data?.pagination || {
    limit: 10,
    page: 1,
    total: 0,
    totalPages: 1,
  };
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog Post History</h1>
      <div className="mb-6">
        <HistoryTable posts={posts}></HistoryTable>
      </div>
      <HistoryPagination meta={pagination}></HistoryPagination>
    </div>
  );
};

export default page;
