"use client";

import { getBlogs } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Target,
  Lightbulb,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  AlertCircle,
} from "lucide-react";

export default function AboutPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getBlogs();
        if (res?.data) {
          setData(res.data);
        } else if (Array.isArray(res)) {
          setData(res);
        }
        if (res?.error) {
          setError(res.error);
        }
      } catch (err: any) {
        setError({ message: err.message || "Failed to fetch blogs" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      {/* Dynamic Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-tr from-primary/15 via-purple-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-0 w-[400px] h-[400px] bg-blue-500/10 blur-3xl pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 text-xs sm:text-sm font-medium rounded-full border-primary/30 bg-primary/5 backdrop-blur-md inline-flex items-center gap-2"
          >
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span>Empowering Digital Innovation</span>
          </Badge>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.15]">
            Crafting the Next Era of <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Web Experience
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            We bridge the gap between creative code and impactful storytelling. Building modern, scalable, and fast solutions for developers and tech enthusiasts.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20 gap-2">
              Explore Our Work <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8">
              Our Vision
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Highlight Stats Banner */}
      <section className="py-10 border-y border-border/40 bg-card/50 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-border/30">
            <div className="p-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">150+</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Articles Published</p>
            </div>
            <div className="p-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">25K+</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Monthly Readers</p>
            </div>
            <div className="p-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">99.9%</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">System Uptime</p>
            </div>
            <div className="p-2">
              <h3 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">10+</h3>
              <p className="text-xs sm:text-sm text-muted-foreground font-medium mt-1">Open Source Tools</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Values Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-3 px-3 py-1">Core Values</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What Drives Us Forward</h2>
          <p className="text-muted-foreground mt-2">The principles that guide our everyday engineering and content creation.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
            <CardHeader className="pt-8">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 border border-primary/20">
                <Target className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold">Clear Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                Providing high-impact knowledge and tools to simplify web architecture for developers around the world.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2 */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
            <CardHeader className="pt-8">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4 border border-purple-500/20">
                <Zap className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold">Speed & Innovation</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                Optimized for performance using Next.js App Router, serverless components, and modern edge services.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3 */}
          <Card className="group relative overflow-hidden border-border/50 bg-card/60 backdrop-blur-xl hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full pointer-events-none transition-all group-hover:scale-110" />
            <CardHeader className="pt-8">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-4 border border-emerald-500/20">
                <Globe className="h-6 w-6" />
              </div>
              <CardTitle className="text-xl font-bold">Global Community</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-muted-foreground leading-relaxed text-sm">
                Fostering an inclusive developer ecosystem through open discussions, code sharing, and tutorials.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4. Dynamic Blogs Showcase Section */}
      <section className="py-20 bg-muted/30 border-t border-border/40 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-semibold text-sm mb-2">
                <BookOpen className="h-4 w-4" />
                <span>Featured Articles</span>
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Recent Insights & Stories</h2>
            </div>
            <Button variant="outline" className="rounded-full gap-2">
              Explore All Posts <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden rounded-2xl">
                  <Skeleton className="h-52 w-full" />
                  <CardHeader className="space-y-2 p-5">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-6 w-4/5" />
                  </CardHeader>
                  <CardContent className="px-5 pb-5">
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Error Message */}
          {error && !loading && (
            <div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">
                {error.message || "Failed to load stories. Please try again later."}
              </p>
            </div>
          )}

          {/* Data Grid */}
          {!loading && !error && data && data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.slice(0, 3).map((blog: any) => (
                <Card
                  key={blog.id || blog._id}
                  className="group rounded-2xl overflow-hidden border-border/50 bg-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image with Aspect Ratio */}
                    <div className="relative aspect-[16/9] w-full bg-muted overflow-hidden">
                      {blog.thumbnail ? (
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title || "Blog Thumbnail"}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary text-muted-foreground text-sm">
                          No Thumbnail
                        </div>
                      )}
                    </div>

                    <CardHeader className="p-6 pb-3">
                      <CardTitle className="line-clamp-2 text-xl font-bold group-hover:text-primary transition-colors">
                        {blog.title || "Untitled Blog Post"}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-6 pb-6">
                      <p className="line-clamp-2 text-sm text-muted-foreground leading-relaxed">
                        {blog.content || blog.description || "Read through for insightful details and developer perspectives."}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="text-center py-16 text-muted-foreground border border-dashed rounded-2xl bg-card/50">
              No articles available right now. Check back soon!
            </div>
          )}
        </div>
      </section>
    </div>
  );
}