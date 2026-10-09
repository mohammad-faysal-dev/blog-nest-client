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
import { AnimatedSection } from "@/components/modules/AnimatedSection";
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
  Paintbrush,
  BookOpen,
  Rss,
  ChevronRight,
} from "lucide-react";

// Category data
const categories = [
  { name: "Web Dev", icon: MonitorPlay, count: 42, gradient: "from-blue-500 to-cyan-500", shadow: "shadow-blue-500/20", lightBg: "bg-blue-500/10", lightText: "text-blue-600 dark:text-blue-400" },
  { name: "AI & ML", icon: Cpu, count: 28, gradient: "from-violet-500 to-purple-600", shadow: "shadow-violet-500/20", lightBg: "bg-violet-500/10", lightText: "text-violet-600 dark:text-violet-400" },
  { name: "Architecture", icon: Component, count: 19, gradient: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/20", lightBg: "bg-emerald-500/10", lightText: "text-emerald-600 dark:text-emerald-400" },
  { name: "Security", icon: Shield, count: 15, gradient: "from-rose-500 to-pink-600", shadow: "shadow-rose-500/20", lightBg: "bg-rose-500/10", lightText: "text-rose-600 dark:text-rose-400" },
  { name: "Databases", icon: Database, count: 23, gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20", lightBg: "bg-amber-500/10", lightText: "text-amber-600 dark:text-amber-400" },
  { name: "Design", icon: Paintbrush, count: 31, gradient: "from-pink-500 to-fuchsia-600", shadow: "shadow-pink-500/20", lightBg: "bg-pink-500/10", lightText: "text-pink-600 dark:text-pink-400" },
];

const stats = [
  { label: "Community Members", value: "15k+", icon: Users, desc: "Active learners worldwide" },
  { label: "Monthly Views", value: "85k+", icon: Eye, desc: "Articles read each month" },
  { label: "Expert Contributors", value: "40+", icon: Star, desc: "Industry professionals" },
];

// Ticker items
const tickerItems = [
  "Modern Engineering", "AI & Machine Learning", "Web Development",
  "Cloud Architecture", "Open Source", "System Design", "DevOps",
  "TypeScript", "React Ecosystem", "Backend Development",
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
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">

      {/* ====================================================
          HERO SECTION — Full-screen cinematic with particles
      ===================================================== */}
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-20">

        {/* ── Ambient blobs ── */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-primary/20 to-violet-500/20 blur-[120px] animate-blob" />
          <div className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-blue-500/15 to-cyan-500/10 blur-[100px] animate-blob-slow" style={{ animationDelay: "2s" }} />
          <div className="absolute -bottom-20 left-1/4 w-[700px] h-[400px] rounded-full bg-gradient-to-t from-purple-600/15 to-transparent blur-[130px] animate-blob" style={{ animationDelay: "4s" }} />
        </div>

        {/* ── Grid overlay ── */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_20%,transparent_100%)]" />

        {/* ── Floating glowing dots ── */}
        <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-primary/40 animate-float"
              style={{
                top: `${15 + i * 14}%`,
                left: `${5 + i * 16}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}
        </div>

        <div className="container px-4 md:px-6 mx-auto text-center flex flex-col items-center gap-8 py-20">

          {/* Pill badge */}
          <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
            <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md shadow-lg shadow-primary/5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="text-sm font-semibold text-primary tracking-wide">
                New articles every week
              </span>
            </div>
          </div>

          {/* Main heading */}
          <div className="animate-slide-up" style={{ animationDelay: "80ms" }}>
            <h1 className="max-w-5xl text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-extrabold tracking-tighter leading-[1.05]">
              Where Great Code
              <br />
              <span className="text-shimmer">
                Meets Great Writing
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="animate-slide-up" style={{ animationDelay: "160ms" }}>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Elevate your engineering with expert-led tutorials, deep-dives into architecture,
              and the latest trends in software development.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="animate-slide-up flex flex-col sm:flex-row items-center gap-4" style={{ animationDelay: "240ms" }}>
            <Link href="/blogs">
              <Button
                size="lg"
                className="group rounded-full px-9 h-13 text-base font-bold shadow-2xl shadow-primary/25 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
              >
                Start Reading
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="group rounded-full px-9 h-13 text-base font-semibold border-border/60 bg-background/50 backdrop-blur-sm hover:bg-muted/60 transition-all duration-300 hover:-translate-y-1"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                About Us
              </Button>
            </Link>
          </div>

          {/* Social proof mini-stat strip */}
          <div className="animate-slide-up flex flex-wrap justify-center gap-x-8 gap-y-3 mt-2" style={{ animationDelay: "320ms" }}>
            {[
              { val: "15k+", lbl: "Members" },
              { val: "85k+", lbl: "Views/month" },
              { val: "40+", lbl: "Contributors" },
            ].map((s) => (
              <div key={s.lbl} className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
                <span className="w-1 h-1 rounded-full bg-primary/60 inline-block" />
                <strong className="text-foreground">{s.val}</strong> {s.lbl}
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-border/50 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ====================================================
          TICKER TAPE
      ===================================================== */}
      <div className="relative border-y border-border/40 bg-muted/30 py-4 overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap select-none">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-6 text-sm font-semibold text-muted-foreground/70">
              <Sparkles className="h-3 w-3 text-primary/50 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ====================================================
          FEATURED POST — MAGAZINE STYLE
      ===================================================== */}
      {heroPost && (
        <AnimatedSection className="container mx-auto px-4 md:px-6 py-24" direction="up">
          <div className="flex items-center gap-3 mb-10">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Flame className="h-3.5 w-3.5 text-primary" />
              <span className="text-sm font-bold text-primary tracking-wide uppercase">Featured Story</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
          </div>

          <Link href={`/blogs/${heroPost.id}`} className="group block">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border/40 shadow-2xl bg-card transition-all duration-700 hover:shadow-[0_32px_64px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_32px_64px_rgba(0,0,0,0.4)] hover:-translate-y-2 card-glow-hover">
              <div className="grid md:grid-cols-2">

                {/* Image */}
                <div className="relative h-[320px] md:h-[520px] overflow-hidden bg-muted">
                  <Image
                    src={heroPost.thumbnail || banner}
                    alt={heroPost.title}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                  {heroPost.isFeatured && (
                    <div className="absolute top-6 left-6 flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 text-white shadow-xl">
                      <Flame className="h-3.5 w-3.5 animate-pulse" />
                      <span className="text-xs font-bold tracking-widest uppercase">Featured</span>
                    </div>
                  )}

                  {/* Read time badge */}
                  <div className="absolute bottom-6 left-6 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-xl text-white/90 text-xs font-semibold">
                    <BookOpen className="h-3 w-3" />
                    5 min read
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center p-8 md:p-14 bg-card relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-[80px] -z-10" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/5 rounded-full blur-[60px] -z-10" />

                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    {heroPost.tags?.[0] && (
                      <span className="text-xs font-bold tracking-widest text-primary uppercase border border-primary/30 bg-primary/8 px-3 py-1 rounded-full">
                        {heroPost.tags[0]}
                      </span>
                    )}
                    <span className="text-sm font-medium text-muted-foreground flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 opacity-60" />
                      {heroPost.createdAt
                        ? new Date(heroPost.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : "Recently published"}
                    </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tighter text-foreground leading-[1.15] mb-6 group-hover:text-primary transition-colors duration-500">
                    {heroPost.title}
                  </h2>

                  <p className="text-muted-foreground text-base md:text-lg mb-10 line-clamp-3 leading-relaxed">
                    {heroPost.content || heroPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-8 border-t border-border/40">
                    <div className="flex items-center gap-5 text-sm font-semibold text-muted-foreground">
                      <span className="flex items-center gap-2 hover:text-foreground transition-colors">
                        <Eye className="h-4 w-4 opacity-60" />
                        {heroPost.views || 0} views
                      </span>
                      <span className="flex items-center gap-2 hover:text-foreground transition-colors">
                        <MessageSquare className="h-4 w-4 opacity-60" />
                        {heroPost._count?.comments || 0} comments
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      Read Story
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2 duration-300" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      )}

      {/* ====================================================
          CATEGORIES GRID — Gradient Cards
      ===================================================== */}
      <section className="py-28 relative overflow-hidden bg-muted/20">
        {/* BG accent */}
        <div className="absolute inset-0 pointer-events-none -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16" direction="up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wide mb-6">
              <LayoutTemplate className="h-3.5 w-3.5" />
              Browse Topics
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              Explore by Topic
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium">
              Dive into our extensive library of tech content carefully categorized for your learning journey.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 60} direction="up">
                <Link href={`/blogs?category=${encodeURIComponent(cat.name)}`}>
                  <div className="h-full group flex flex-col items-center text-center p-6 rounded-2xl border border-border/50 bg-card hover:border-transparent hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 hover:-translate-y-2 cursor-pointer relative overflow-hidden">
                    {/* Hover gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />

                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 bg-gradient-to-br ${cat.gradient} shadow-lg ${cat.shadow} group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <cat.icon className="h-6 w-6 text-white" strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-sm text-foreground tracking-tight leading-tight mb-1">{cat.name}</h3>
                    <p className={`text-xs font-semibold mt-1 ${cat.lightText}`}>{cat.count} articles</p>
                    <ChevronRight className="h-3 w-3 text-muted-foreground/40 mt-2 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-300" />
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          RECENT ARTICLES — Sleek Card Grid
      ===================================================== */}
      <section className="py-28 relative">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="flex w-full items-end justify-between mb-16" direction="up">
            <div className="flex flex-col space-y-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-bold tracking-wide w-fit">
                <Rss className="h-3.5 w-3.5" />
                Latest Posts
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Latest Insights</h2>
              <p className="text-muted-foreground text-lg font-medium">The freshest content from our expert team.</p>
            </div>
            <Link href="/blogs" className="hidden sm:flex">
              <Button variant="outline" className="rounded-full px-6 group bg-background/50 backdrop-blur-sm font-semibold border-border hover:bg-muted">
                View all <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {gridPosts.length > 0 ? (
              gridPosts.map((post: any, i: number) => (
                <AnimatedSection key={post.id || post._id} delay={i * 80} direction="up">
                  <Link href={`/blogs/${post.id}`} className="block h-full group">
                    <div className="h-full flex flex-col overflow-hidden bg-card border border-border/50 rounded-[2rem] transition-all duration-500 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-2 hover:border-border relative">

                      {/* Hover glow top border */}
                      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/40 transition-all duration-500" />

                      {/* Image */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted">
                        <Image
                          src={post.thumbnail || banner}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Tag chip on image */}
                        {post.tags?.[0] && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 rounded-full bg-background/85 backdrop-blur-xl text-foreground text-xs font-bold tracking-wide shadow-md border border-border/30">
                              {post.tags[0]}
                            </span>
                          </div>
                        )}

                        {/* View count overlay */}
                        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Eye className="h-3 w-3" />
                          {post.views || 0}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 opacity-60" />
                            {post.createdAt
                              ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                              : "Recent"}
                          </span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3 opacity-60" />
                            {post._count?.comments || 0}
                          </span>
                        </div>

                        <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300 leading-[1.35] mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {post.content || post.excerpt}
                        </p>

                        <div className="pt-5 border-t border-border/40 flex items-center justify-between">
                          <span className="text-sm font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300 inline-flex items-center gap-1.5">
                            Read Now
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </span>
                          <span className="text-xs text-muted-foreground/50 font-medium">5 min</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              ))
            ) : (
              <AnimatedSection className="col-span-full">
                <div className="flex flex-col items-center justify-center py-36 text-muted-foreground border border-dashed border-border/60 rounded-3xl bg-card/50">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-5 shadow-inner">
                    <Code2 className="h-9 w-9 opacity-30" />
                  </div>
                  <p className="text-xl font-bold text-foreground mb-1">No articles yet</p>
                  <p className="text-sm">Check back soon for fresh content!</p>
                </div>
              </AnimatedSection>
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

      {/* ====================================================
          STATS SECTION — Glassmorphism cards
      ===================================================== */}
      <section className="py-28 relative overflow-hidden">
        {/* Dark gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/5 via-background to-primary/5" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />

        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection className="text-center mb-16" direction="up">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              Trusted by Developers
              <br />
              <span className="text-shimmer">Worldwide</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, idx) => (
              <AnimatedSection key={idx} delay={idx * 100} direction="up">
                <div className="group relative flex flex-col items-center justify-center p-10 text-center bg-card/80 backdrop-blur-sm rounded-[2rem] border border-border/50 hover:border-primary/30 shadow-lg hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="p-4 bg-primary/10 rounded-2xl mb-6 text-primary group-hover:scale-110 group-hover:bg-primary/15 transition-all duration-500 relative z-10">
                    <stat.icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h4 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-2 relative z-10">
                    {stat.value}
                  </h4>
                  <p className="text-base font-bold text-muted-foreground mb-1 relative z-10">{stat.label}</p>
                  <p className="text-xs text-muted-foreground/60 font-medium relative z-10">{stat.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================
          FAQ SECTION
      ===================================================== */}
      <FaqSection />

      {/* ====================================================
          NEWSLETTER SECTION — Premium dark card
      ===================================================== */}
      <section className="py-20 md:py-28 relative">
        <AnimatedSection className="container mx-auto px-4 relative z-10" direction="up">
          <div className="max-w-5xl mx-auto">
            <div className="rounded-[3rem] overflow-hidden border border-white/8 dark:border-white/5 bg-[#111116] text-white shadow-2xl relative">

              {/* Animated blobs */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/25 rounded-full blur-[120px] pointer-events-none animate-blob-slow" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-600/20 rounded-full blur-[100px] pointer-events-none animate-blob" style={{ animationDelay: "3s" }} />

              {/* Grid lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div className="p-10 md:py-16 md:px-20 text-center flex flex-col items-center relative z-10">
                <div className="inline-flex items-center justify-center p-4 rounded-2xl bg-white/8 border border-white/12 mb-6 backdrop-blur-md shadow-xl group hover:bg-white/12 transition-colors duration-300">
                  <Zap className="h-7 w-7 text-white/90 animate-pulse" strokeWidth={1.5} />
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/80 text-sm font-semibold tracking-wide mb-6">
                  <Rss className="h-3.5 w-3.5" />
                  Weekly Newsletter
                </div>

                <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter mb-5 leading-tight">
                  Never miss a great
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/70 to-primary/70">
                    article again.
                  </span>
                </h2>

                <p className="text-white/55 text-lg mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                  Get the best development tutorials, architecture insights, and industry news
                  delivered to your inbox every week.
                </p>

                <div className="w-full max-w-md mx-auto">
                  <NewsletterForm />
                  <p className="mt-5 text-xs font-semibold text-white/30 flex items-center justify-center gap-2">
                    <Shield className="h-3 w-3" />
                    No spam, ever. Unsubscribe anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
};

export default Page;