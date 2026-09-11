"use server";
import { BlogData, blogService } from "@/services/blog.service";

export const getBlogs = async () => {
  return await blogService.getBlogPosts();
};

export const createBlogs = async (data: BlogData) => {
  return await blogService.createBlogPost(data);
};
