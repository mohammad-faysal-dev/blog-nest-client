import { blogService } from "@/services/blog.service";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../assets/banner.jpeg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { NewsletterForm } from "@/components/modules/NewsletterForm";
import { FaqSection } from "@/components/modules/FaqSection";
import {
  Eye,
  MessageSquare,
  Calendar,
  ArrowRight,
  Flame,
  TrendingUp,
  Users,
  Zap,
  Code2,
  Cpu,
  Shield,
  Globe,
  Database,
  Star,
  Sparkles,
  LayoutTemplate,
  MonitorPlay,
  Component,
  Paintbrush
} from "lucide-react";

// Category data with enhanced aesthetic themes
const categories = [
  { name: "Web Dev", icon: MonitorPlay, count: 42, iconBg: "bg-blue-500/10", iconColor: "text-blue-500", dot: "bg-blue-500" },
  { name: "AI & ML", icon: Cpu, count: 28, iconBg: "bg-violet-500/10", iconColor: "text-violet-500", dot: "bg-violet-500" },
  { name: "Architecture", icon: Component, count: 19, iconBg: "bg-emerald-500/10", iconColor: "text-emerald-500", dot: "bg-emerald-500" },
  { name: "Security", icon: Shield, count: 15, iconBg: "bg-rose-500/10", iconColor: "text-rose-500", dot: "bg-rose-500" },
  { name: "Databases", icon: Database, count: 23, iconBg: "bg-amber-500/10", iconColor: "text-amber-500", dot: "bg-amber-500" },
  { name: "Design", icon: Paintbrush, count: 31, iconBg: "bg-pink-500/10", iconColor: "text-pink-500", dot: "bg-pink-500" },
];

const stats = [
  { label: "Community Members", value: "15k+", icon: Users },
  { label: "Monthly Views", value: "85k+", icon: Eye },
  { label: "Expert Contributors", value: "40+", icon: Star },
];

const faqs = [
  {
    question: "How often are new articles published?",
    answer: "We publish high-quality technical articles, tutorials, and insights every week, ensuring you stay up to date with the fast-paced tech world."
  },
  {
    question: "Can I contribute to the blog?",
    answer: "Absolutely! We're always looking for passionate developers and industry experts to share their knowledge."
  },
  {
    question: "Who is the content for?",
    answer: "Our content caters to all levels, from beginner tutorials to advanced system design and architecture deep dives."
  }
];

const Page = async () => {
  const [featuredPostsRes, recentPostsRes] = await Promise.all([
    blogService.getBlogPosts({ limit: "2", isFeatured: true }, { revalidate: 30 }),
    blogService.getBlogPosts({ limit: "6" }, { revalidate: 10 }),
  ]);

  const featuredPosts = featuredPostsRes?.data?.data || [];
  const recentPosts = recentPostsRes?.data?.data || [];
  const heroPost = featuredPosts[0] || recentPosts[0];
  const gridPosts = recentPosts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* PREMIUM HERO SECTION */}
      <section className="relative overflow-visible pt-44 pb-36 md:pt-64 md:pb-52 isolate">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden -z-10 bg-background/50 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[100px] animate-blob mix-blend-screen opacity-70 dark:opacity-40" />
          <div className="absolute top-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-500/20 blur-[120px] animate-blob-slow mix-blend-screen opacity-60 dark:opacity-30" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[-20%] left-[20%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[150px] animate-blob mix-blend-screen opacity-50 dark:opacity-20" style={{ animationDelay: '4s' }} />
          {/* Subtle Grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)]" />
        </div>

        <div className="container px-4 md:px-6 mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-background/50 backdrop-blur-md mb-8 shadow-sm animate-float">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-3 w-3 text-primary animate-pulse" />
            </span>
            <span className="text-sm font-medium tracking-tight text-foreground/80">
              Discover the new standard for dev blogs
            </span>
          </div>

          <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
            Build Better With <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary/80 to-purple-500">
              Modern Engineering
            </span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 font-medium">
            Elevate your coding skills with expert-led tutorials, best practices, and the latest trends
            in software architecture.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link href="/blogs">
              <Button size="lg" className="rounded-full px-8 h-12 text-base font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5">
                Start Reading <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base font-semibold border-border bg-background/50 backdrop-blur-sm hover:bg-muted/80 transition-all hover:-translate-y-0.5">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED POST (MAGAZINE STYLE) */}
      {heroPost && (
        <section className="container mx-auto px-4 md:px-6 mb-32 -mt-4">
          <Link href={`/blogs/${heroPost.id}`} className="group block">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl bg-card transition-all duration-700 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.03)] hover:-translate-y-1">
              <div className="grid md:grid-cols-2">
                {/* Image Section */}
                <div className="relative h-[350px] md:h-[550px] w-full overflow-hidden bg-muted">
                  <Image
                    src={heroPost.thumbnail || banner}
                    alt={heroPost.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
                  {heroPost.isFeatured && (
                    <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-xl border border-white/20 text-white shadow-xl">
                      <Flame className="h-3.5 w-3.5" />
                      <span className="text-xs font-bold tracking-wider uppercase">Featured</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center p-8 md:p-14 bg-card relative">
                  {/* Subtle background element */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {heroPost.tags?.[0] && (
                      <span className="text-xs font-bold tracking-widest text-primary uppercase">
                        {heroPost.tags[0]}
                      </span>
                    )}
                    <span className="w-1.5 h-1.5 rounded-full bg-border" />
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      {heroPost.createdAt
                        ? new Date(heroPost.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                        : "Recently published"}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15] mb-6 group-hover:text-primary transition-colors duration-300">
                    {heroPost.title}
                  </h2>

                  <p className="text-muted-foreground text-lg mb-10 line-clamp-3 leading-relaxed">
                    {heroPost.content || heroPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-border/50">
                    <div className="flex items-center gap-6 text-sm font-semibold text-muted-foreground">
                      <span className="flex items-center gap-2"><Eye className="h-4 w-4 text-foreground/40" /> {heroPost.views || 0}</span>
                      <span className="flex items-center gap-2"><MessageSquare className="h-4 w-4 text-foreground/40" /> {heroPost._count?.comments || 0}</span>
                    </div>
                    <span className="flex items-center text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                      Read Story <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* CATEGORIES GRID - CLEAN MODERN DESIGN */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold tracking-tight">Explore by Topic</h2>
            <p className="text-muted-foreground text-lg max-w-2xl font-medium">
              Dive into our extensive library of tech content carefully categorized for your learning journey.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href={`/blogs?category=${encodeURIComponent(cat.name)}`}>
                <div className="h-full group flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card hover:bg-muted/50 hover:border-border hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${cat.iconBg} ${cat.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                    <cat.icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <h3 className="font-semibold text-sm text-foreground tracking-tight leading-tight">{cat.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1.5 font-medium">{cat.count} articles</p>
                  <div className={`w-1.5 h-1.5 rounded-full mt-3 ${cat.dot} opacity-60 group-hover:opacity-100 transition-opacity`} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ARTICLES - SLEEK CARDS */}
      <section className="py-28 bg-muted/20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex w-full items-end justify-between mb-16">
            <div className="flex flex-col space-y-3">
              <h2 className="text-4xl font-bold tracking-tight">Latest Insights</h2>
              <p className="text-muted-foreground text-lg font-medium">The freshest content from our team.</p>
            </div>
            <Link href="/blogs" className="hidden sm:flex">
              <Button variant="outline" className="rounded-full px-6 group bg-background/50 backdrop-blur-sm font-semibold border-border hover:bg-muted">
                View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.length > 0 ? (
              gridPosts.map((post: any) => (
                <Link key={post.id || post._id} href={`/blogs/${post.id}`} className="block h-full group">
                  <div className="h-full flex flex-col overflow-hidden bg-card border border-border/60 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 relative">
                    <div className="relative w-full aspect-[1.5] overflow-hidden bg-muted">
                      <Image
                        src={post.thumbnail || banner}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      {post.tags?.[0] && (
                        <div className="absolute top-5 left-5 z-10">
                          <span className="px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-xl text-foreground text-xs font-bold tracking-wide shadow-sm">
                            {post.tags[0]}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-8 flex flex-col flex-1 relative z-20 bg-card">
                      <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Eye className="h-3.5 w-3.5" />{post.views || 0}
                        </span>
                      </div>

                      <h3 className="text-2xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors leading-[1.3] mb-4 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                        {post.content || post.excerpt}
                      </p>

                      <div className="mt-auto pt-6 border-t border-border/40 flex items-center justify-between">
                        <span className="text-sm font-bold text-foreground inline-flex items-center group-hover:text-primary transition-colors">
                          Read Now <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 text-muted-foreground border border-dashed rounded-3xl bg-card">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Code2 className="h-8 w-8 opacity-40" />
                </div>
                <p className="text-xl font-semibold text-foreground">No articles yet</p>
                <p className="text-sm mt-1">Check back soon for fresh content!</p>
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-center sm:hidden">
            <Link href="/blogs">
              <Button size="lg" variant="outline" className="rounded-full w-full font-semibold border-border">
                View all articles
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/3 -z-10" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center p-8 text-center bg-card rounded-[2rem] border border-border/50 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="p-4 bg-primary/10 rounded-2xl mb-6 text-primary group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <h4 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-2">{stat.value}</h4>
                <p className="text-base font-medium text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREMIUM FAQ SECTION */}
      <FaqSection />

      {/* NEWSLETTER SECTION (ULTRA PREMIUM) */}
      <section className="py-20 md:py-24 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="rounded-[3rem] overflow-hidden border border-white/10 dark:border-white/5 bg-[#1B1B1F] dark:bg-[#09090B] text-white shadow-2xl relative">
              {/* Decorative Effects */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

              <div className="p-8 md:py-14 md:px-16 text-center flex flex-col items-center relative z-20">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 mb-6 backdrop-blur-md">
                  <Zap className="h-7 w-7 text-white/90" strokeWidth={1.5} />
                </div>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-tight">
                  Join the developer newsletter.
                </h2>

                <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto font-medium">
                  Get the best development articles, tutorials, and insights
                  delivered straight to your inbox.
                </p>

                <div className="w-full max-w-md mx-auto">
                  <NewsletterForm />
                  <p className="mt-4 text-xs font-medium text-white/40">
                    No spam. Unsubscribe at any time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;