import { blogService } from "@/services/blog.service";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../assets/banner.jpeg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, MessageSquare, Calendar, ArrowRight } from "lucide-react";

const Page = async () => {
  const postPromise = blogService.getBlogPosts(
    { limit: "3" },
    { revalidate: 10 }
  );

  const [posts] = await Promise.all([postPromise]);
  const blogPosts = posts?.data?.data || [];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero Banner Section */}
      <div className="relative mb-10 md:mb-14 w-full h-[240px] sm:h-[320px] md:h-[380px] overflow-hidden rounded-2xl shadow-xl">
        <Image
          src={banner}
          alt="Blog banner"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-center justify-center">
          <div className="text-center text-white px-4">
            <Badge variant="outline" className="mb-3 text-white border-white/40 backdrop-blur-md">
              Insights & Stories
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Our Latest Articles
            </h1>
            <p className="mt-2 text-sm sm:text-base md:text-lg text-white/80 max-w-lg mx-auto">
              Explore deep dives, news, and perspectives from our expert team.
            </p>
          </div>
        </div>
      </div>

      {/* Grid Header */}
      <div className="mb-6 md:mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Recent Posts</h2>
          <p className="text-sm text-muted-foreground">Handpicked articles for you</p>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post: any) => (
          <Card
            key={post.id || post._id}
            className="group overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/20 flex flex-col justify-between"
          >
            <div>
              {/* Responsive Aspect Ratio Image Container */}
              <div className="relative w-full aspect-[16/9] overflow-hidden bg-muted">
                <Image
                  src={post.thumbnail || banner}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Category/Tag Overlay */}
                {post.tags?.[0] && (
                  <div className="absolute top-3 left-3 z-10">
                    <Badge className="bg-background/80 backdrop-blur-md text-foreground hover:bg-background shadow-sm">
                      {post.tags[0]}
                    </Badge>
                  </div>
                )}
              </div>

              {/* Card Header & Content */}
              <CardHeader className="p-5 pb-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Recently added"}
                  </span>
                </div>

                <Link href={`/blog/${post.slug || post.id}`}>
                  <CardTitle className="line-clamp-2 text-lg md:text-xl font-bold transition-colors group-hover:text-primary">
                    {post.title}
                  </CardTitle>
                </Link>
              </CardHeader>

              <CardContent className="px-5 py-0">
                <CardDescription className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                  {post.content || post.excerpt}
                </CardDescription>
              </CardContent>
            </div>

            {/* Footer */}
            <CardFooter className="p-5 pt-4 border-t border-border/40 mt-6 flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {post.views || 0}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {post._count?.comments || 0}
                </span>
              </div>

              <Link
                href={`/blog/${post.slug || post.id}`}
                className="flex items-center gap-1 font-medium text-primary hover:underline"
              >
                Read More
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Page;