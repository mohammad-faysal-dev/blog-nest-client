import HistoryTable from "@/components/modules/user/history/HistoryTable";
import { blogService } from "@/services/blog.service";
import React from "react";

const page = async () => {
  const response = await blogService.getBlogPosts();
  const posts = response.data?.data || [];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Blog Post History</h1>
      <HistoryTable posts={posts}></HistoryTable>
    </div>
  );
};

export default page;
