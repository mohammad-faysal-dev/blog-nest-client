import CreateBlogFromClient from "@/components/modules/user/createBlog/CreateBlogFromClient";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function UserDashboard() {
  const { data } = await blogService.getBlogPosts();

  return (
    <div>
      <CreateBlogFromClient />
      {data.data.map((item: BlogPost) => (
        <p key={item.id}>{item.title}</p>
      ))}
    </div>
  );
}
