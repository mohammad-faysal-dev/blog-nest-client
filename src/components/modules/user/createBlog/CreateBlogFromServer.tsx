import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { env } from "@/env";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const API_URL = env.API_URL;

const CreateBlogFromServer = () => {
  const createBlog = async (formData: FormData) => {
    "use server";
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const tags = formData.get("tags") as string;
    const blogData = {
      title,
      content,
      tags: tags
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item !== ""),
    };
    const cookieStore = await cookies();
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(blogData),
    });
    if (res.ok) {
      revalidateTag("blogPost", "max");
    }
  };

  return (
    <Card className="mx-auto w-full max-w-2xl shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Create Blog</CardTitle>

        <CardDescription>
          Share your thoughts and create a new blog post.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="blog-form" action={createBlog}>
          <FieldGroup className="space-y-5">
            {/* Title */}
            <Field>
              <FieldLabel htmlFor="title">Blog Title</FieldLabel>

              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Enter your blog title"
                required
              />
            </Field>

            {/* Content */}
            <Field>
              <FieldLabel htmlFor="content">Content</FieldLabel>

              <textarea
                id="content"
                name="content"
                placeholder="Write your blog content here..."
                required
                rows={8}
                className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-40 w-full resize-y rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1"
              />
            </Field>

            {/* Tags */}
            <Field>
              <FieldLabel htmlFor="tags">Tags</FieldLabel>

              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="e.g. Next.js, React, JavaScript"
              />

              <p className="text-muted-foreground text-xs">
                Separate multiple tags with commas.
              </p>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button form="blog-form" type="submit" className="w-full">
          Create Blog
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateBlogFromServer;
