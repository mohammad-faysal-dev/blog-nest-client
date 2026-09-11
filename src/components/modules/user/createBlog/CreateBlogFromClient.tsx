"use client";
import { createBlogPost, createBlogs } from "@/actions/blog.action";
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
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  title: z.string().min(1, "title is required"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  tags: z.string(),
});

const CreateBlogFromClient = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = await toast.loading("Creating......");
      const blogData = {
        title: value.title,
        content: value.content,
        tags: value.tags
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== ""),
      };
      try {
        const res = await createBlogPost(blogData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
        }
        toast.success("Post Created", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <Card className="mx-auto w-full max-w-2xl shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-semibold">Create Blog</CardTitle>

        <CardDescription>
          Share your thoughts and create a new blog post.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="blog-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup className="space-y-5">
            <form.Field
              name="title"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Blog Title</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your blog title"
                  />

                  {field.state.meta.errors.map((error) => (
                    <p key={error?.toString()} className="text-sm text-red-500">
                      {error?.toString()}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="content"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Content</FieldLabel>

                  <textarea
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write your blog content here..."
                    rows={8}
                    className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring min-h-40 w-full resize-y rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus-visible:ring-1"
                  />

                  {field.state.meta.errors.map((error) => (
                    <p key={error?.toString()} className="text-sm text-red-500">
                      {error?.toString()}
                    </p>
                  ))}
                </Field>
              )}
            />

            <form.Field
              name="tags"
              children={(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Tags</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. Next.js, React, JavaScript"
                  />

                  <p className="text-muted-foreground text-xs">
                    Separate multiple tags with commas.
                  </p>
                </Field>
              )}
            />
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
export default CreateBlogFromClient;
