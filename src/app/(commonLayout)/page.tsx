import { blogService } from "@/services/blog.service";

const Page = async () => {
  const { data } = await blogService.getBlogPosts();
  console.log(data);
  return <div>this is the common layout page</div>;
};

export default Page;
