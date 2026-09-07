import { blogService } from "@/services/blog.service";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Eye,
  MessageCircle,
} from "lucide-react";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;

  const { data } = await blogService.getBlogById(id);

  console.log("data", data);

  const formattedDate = new Date(data.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const commentCount = data._count?.comments ?? 0;

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-muted/30">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/blogs"
            className="mb-8 inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to blogs
          </Link>

          {/* Status */}
          <div className="mb-5 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-950 dark:text-red-400">
              {data.status}
            </span>

            {data.isFeatured && (
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {data.title}
          </h1>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              By {data.authorId}
            </span>

            <span className="hidden sm:block">•</span>

            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formattedDate}
            </span>

            <span className="hidden sm:block">•</span>

            <span className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              {data.views} views
            </span>

            <span className="hidden sm:block">•</span>

            <span className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              {commentCount} comments
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Thumbnail */}
        <div className="relative mx-auto mb-12 aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border bg-muted shadow-lg">
          <Image
            src={data.thumbnail}
            alt={data.title}
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-[1.02]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content + Sidebar */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          {/* Blog Content */}
          <div>
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8 lg:p-10">
              <div className="prose prose-neutral dark:prose-invert max-w-none">
                <p className="whitespace-pre-line text-base leading-8 text-muted-foreground sm:text-lg sm:leading-9">
                  {data.content}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit space-y-6 lg:sticky lg:top-6">
            {/* About Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-bold">
                About this post
              </h2>

              <div className="space-y-5">
                {/* Author */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <span className="text-sm font-bold">
                      A
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">
                      Author
                    </p>

                    <p className="mt-1 truncate text-sm font-semibold">
                      {data.authorId}
                    </p>
                  </div>
                </div>

                {/* Date */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <CalendarDays className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Published
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {/* Views */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Eye className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Views
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {data.views}
                    </p>
                  </div>
                </div>

                {/* Comments */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <MessageCircle className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Comments
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {commentCount}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags Card */}
            <div className="rounded-3xl border bg-card p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-bold">
                Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {data.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full border bg-muted/50 px-3 py-1.5 text-xs font-medium transition hover:bg-primary hover:text-primary-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats Card */}
            <div className="rounded-3xl bg-primary p-6 text-primary-foreground shadow-lg">
              <p className="text-sm opacity-80">
                Blog statistics
              </p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-2xl font-bold">
                    {data.views}
                  </p>

                  <p className="text-xs opacity-80">
                    Views
                  </p>
                </div>

                <div>
                  <p className="text-2xl font-bold">
                    {commentCount}
                  </p>

                  <p className="text-xs opacity-80">
                    Comments
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  );
};

export default Page;