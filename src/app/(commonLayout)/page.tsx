import { BlogCard } from "@/components/modules/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types/blog.type";

const Page = async () => {
  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: true,
      search: "",
    },
    {
      revalidate: 10,
    },
  );
  console.log(data);
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.data?.map((post: BlogPost) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Page;
