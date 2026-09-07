import { BlogCard } from "@/components/modules/BlogCard";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

const page = async () => {
  const { data } = await blogService.getBlogPosts(
    {
      isFeatured: false,
      search: "",
    },
    {
      revalidate: 10,
    },
  );
 
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data?.map((post: BlogPost) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default page;
