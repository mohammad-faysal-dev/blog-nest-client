"use client";

import { getBlogs } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Target,
  Zap,
  Globe,
  ArrowRight,
  BookOpen,
  Sparkles,
  ShieldCheck,
  Lightbulb,
  Code2,
  Heart,
  TrendingUp,
  Award,
  AlertCircle,
  ChevronRight,
  Star,
} from "lucide-react";

const values = [
  {
    icon: Target,
    title: "Clear Mission",
    desc: "Providing high-impact knowledge and tools to simplify web architecture for developers around the world.",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    tc: "text-violet-400",
  },
  {
    icon: Zap,
    title: "Speed & Innovation",
    desc: "Optimized for performance using Next.js App Router, serverless components, and modern edge services.",
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    tc: "text-blue-400",
  },
  {
    icon: Globe,
    title: "Global Community",
    desc: "Fostering an inclusive developer ecosystem through open discussions, code sharing, and tutorials.",
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    tc: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    title: "Trust & Quality",
    desc: "Every article is reviewed by experts. We maintain the highest editorial standards so you can trust what you read.",
    color: "from-rose-500 to-pink-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    tc: "text-rose-400",
  },
  {
    icon: Lightbulb,
    title: "Always Learning",
    desc: "Technology never stops evolving, and neither do we. Our team stays ahead so our readers always get fresh insights.",
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    tc: "text-amber-400",
  },
  {
    icon: Heart,
    title: "Built with Passion",
    desc: "We genuinely love what we do — from crafting articles to building features. That passion shows in every detail.",
    color: "from-pink-500 to-rose-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    tc: "text-pink-400",
  },
];

const milestones = [
  { year: "2022", title: "Founded", desc: "Started as a personal blog sharing web development tips and tricks." },
  { year: "2023", title: "Community Grew", desc: "Expanded to 5k+ monthly readers and launched our newsletter." },
  { year: "2024", title: "Expert Authors", desc: "Onboarded 40+ industry professionals as contributing authors." },
  { year: "2025", title: "85k+ Readers", desc: "Reached 85k monthly views and became a go-to dev resource." },
];

const highlightStats = [
  { value: "150+", label: "Articles Published", icon: BookOpen, color: "from-violet-500 to-purple-600" },
  { value: "85k+", label: "Monthly Readers", icon: Users, color: "from-blue-500 to-cyan-500" },
  { value: "40+", label: "Expert Authors", icon: Award, color: "from-emerald-500 to-teal-500" },
  { value: "99.9%", label: "System Uptime", icon: TrendingUp, color: "from-amber-500 to-orange-500" },
];

export default function AboutPage() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<{ message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getBlogs();
        if (res?.data) setData(res.data);
        else if (Array.isArray(res)) setData(res);
        if (res?.error) setError(res.error);
      } catch (err: any) {
        setError({ message: err.message || "Failed to fetch blogs" });
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden font-sans">

      {/* ══ HERO ══ */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* Background glows */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[500px] bg-[rgba(124,58,237,0.12)] blur-[140px] rounded-full" />
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] bg-blue-500/8 blur-[120px] rounded-full" />
          {/* Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_30%,#000_40%,transparent_100%)]" />
        </div>

        <div className="container mx-auto px-4 md:px-6 text-center max-w-5xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                          border border-primary/20 bg-primary/8 text-primary
                          text-sm font-bold tracking-widest uppercase mb-8 animate-slide-up">
            <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
            About DevNexus
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-bold tracking-tighter leading-[1.03] mb-7 animate-slide-up"
            style={{ animationDelay: "80ms" }}>
            Where Code Meets{" "}
            <span className="text-shimmer">Clarity</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-medium mb-10 animate-slide-up"
            style={{ animationDelay: "160ms" }}>
            DevNexus is a premium platform built by developers, for developers.
            We bridge the gap between complex engineering concepts and crystal-clear,
            actionable knowledge — every single week.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap animate-slide-up"
            style={{ animationDelay: "240ms" }}>
            <Link href="/blogs">
              <Button size="lg" className="group rounded-full px-9 h-13 text-base font-bold
                                           shadow-2xl shadow-primary/25 hover:shadow-primary/40
                                           transition-all duration-300 hover:-translate-y-1 hover:scale-105
                                           bg-gradient-to-r from-primary to-primary/90">
                Explore Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/blogs">
              <Button size="lg" variant="outline"
                className="rounded-full px-9 h-13 text-base font-semibold border-border/60
                           bg-background/60 backdrop-blur-sm hover:bg-muted/60
                           transition-all duration-300 hover:-translate-y-1">
                <Code2 className="mr-2 h-4 w-4 opacity-70" />
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS BANNER ══ */}
      <section className="py-6 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[2rem] border border-border/50 bg-card/80 backdrop-blur-sm overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-blue-500 to-emerald-500" />
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border/30">
              {highlightStats.map((s, i) => (
                <div key={i} className="group relative flex items-center gap-4 px-8 py-8 hover:bg-primary/3 transition-colors duration-300 overflow-hidden">
                  <div className={`absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${s.color} shadow-lg flex items-center justify-center group-hover:scale-110 transition-all duration-400`}>
                    <s.icon className="h-5 w-5 text-white" strokeWidth={1.75} />
                  </div>
                  <div className="relative z-10">
                    <p className="text-3xl font-extrabold tracking-tighter text-foreground leading-none mb-0.5">{s.value}</p>
                    <p className="text-xs font-semibold text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION + TIMELINE ══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left: Mission text */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                              border border-primary/20 bg-primary/8 text-primary
                              text-xs font-bold tracking-widest uppercase mb-6">
                <Star className="h-3 w-3" />
                Our Mission
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-6 leading-tight">
                Built to help developers{" "}
                <span className="text-gradient">level up</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6 font-medium">
                We believe that great engineering knowledge shouldn't be locked behind paywalls
                or buried in poorly-written documentation. DevNexus exists to make world-class
                technical content accessible, engaging, and free for everyone.
              </p>
              <p className="text-muted-foreground leading-relaxed font-medium">
                From junior developers writing their first API to senior architects designing
                distributed systems — there's something here for every stage of the journey.
              </p>

              <div className="mt-8 flex items-center gap-3">
                <Link href="/blogs">
                  <Button className="rounded-full px-7 font-bold shadow-lg shadow-primary/20 group">
                    Start Reading
                    <ChevronRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-violet-500/60 via-blue-500/40 to-transparent" />
              <div className="flex flex-col gap-8">
                {milestones.map((m, i) => (
                  <div key={i} className="group relative flex items-start gap-6 pl-14">
                    {/* Dot */}
                    <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-[10px] font-black text-white">{m.year.slice(2)}</span>
                    </div>
                    <div className="flex-1 pb-2">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-xs font-black text-primary/60 tracking-widest">{m.year}</span>
                        <h3 className="text-base font-extrabold text-foreground">{m.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed font-medium">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ VALUES GRID ══ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[100px] rounded-full" />
        </div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                            border border-primary/20 bg-primary/8 text-primary
                            text-xs font-bold tracking-widest uppercase mb-5">
              <Sparkles className="h-3 w-3 animate-glow-pulse" />
              Core Values
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-foreground mb-4">
              What <span className="text-gradient">drives</span> us forward
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
              The principles that guide our everyday engineering and content creation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {values.map((v, i) => (
              <div key={i} className={`group relative p-7 rounded-2xl border ${v.border} bg-card
                                       hover:shadow-xl hover:-translate-y-1.5
                                       transition-all duration-400 overflow-hidden`}>
                {/* Hover glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-0 group-hover:opacity-5 transition-opacity duration-400 rounded-2xl`} />
                {/* Top accent */}
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${v.color} opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-t-2xl`} />
                {/* Corner watermark */}
                <div className={`absolute -bottom-3 -right-3 w-20 h-20 rounded-full ${v.bg} blur-2xl opacity-40 group-hover:opacity-80 transition-opacity duration-400`} />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${v.color} shadow-lg flex items-center justify-center mb-5
                                   group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                    <v.icon className="h-5.5 w-5.5 text-white" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base font-extrabold text-foreground tracking-tight mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed font-medium">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED ARTICLES ══ */}
      <section className="py-20 relative border-t border-border/30">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/20 to-transparent" />
        <div className="container mx-auto px-4 md:px-6">

          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4">
            <div>
              <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase mb-3">
                <BookOpen className="h-3.5 w-3.5" />
                Featured Articles
              </div>
              <h2 className="text-4xl font-extrabold tracking-tighter text-foreground">
                Recent <span className="text-gradient">Insights</span>
              </h2>
            </div>
            <Link href="/blogs">
              <Button variant="outline" className="rounded-full px-7 h-11 font-bold border-border/60
                                                   bg-background/60 hover:bg-muted/60 group">
                Explore All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border/40 bg-card overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-6 space-y-3">
                    <Skeleton className="h-3 w-1/3" />
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-6 rounded-2xl border border-destructive/30 bg-destructive/10 text-destructive flex items-center gap-3">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p className="text-sm font-medium">{error.message || "Failed to load stories."}</p>
            </div>
          )}

          {/* Cards */}
          {!loading && !error && data && data.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.slice(0, 3).map((blog: any) => (
                <Link key={blog.id || blog._id} href={`/blogs/${blog.id}`} className="block group">
                  <article className="h-full flex flex-col overflow-hidden rounded-[1.75rem] border border-border/50 bg-card
                                      transition-all duration-500 hover:shadow-2xl hover:shadow-primary/8
                                      hover:-translate-y-2 hover:border-primary/10 relative">
                    {/* Top hover line */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[1.75rem] bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Thumbnail */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted rounded-t-[1.75rem]">
                      {blog.thumbnail ? (
                        <Image
                          src={blog.thumbnail}
                          alt={blog.title || "Blog Thumbnail"}
                          fill sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-sm font-medium">
                          <Code2 className="h-8 w-8 opacity-30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1">
                      {blog.tags?.[0] && (
                        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full
                                         bg-primary/10 text-primary border border-primary/20 mb-3 w-fit">
                          {blog.tags[0]}
                        </span>
                      )}
                      <h3 className="text-lg font-extrabold text-foreground tracking-tight leading-tight mb-2
                                     group-hover:text-primary transition-colors duration-300 line-clamp-2">
                        {blog.title || "Untitled Blog Post"}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 font-medium">
                        {blog.content || blog.description || "Read through for insightful details and developer perspectives."}
                      </p>
                      <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                        <span className="text-xs font-bold text-muted-foreground group-hover:text-primary transition-colors duration-300 flex items-center gap-1.5">
                          Read Article
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && (!data || data.length === 0) && (
            <div className="text-center py-20 border border-dashed border-border/50 rounded-3xl bg-card/50">
              <Code2 className="h-10 w-10 mx-auto opacity-20 mb-4" />
              <p className="text-muted-foreground font-medium">No articles available right now. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* ══ CTA BAND ══ */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/6 bg-[#0D0D10] text-white shadow-2xl">
            {/* Blobs */}
            <div className="absolute -top-16 -right-16 w-[350px] h-[350px] rounded-full bg-gradient-to-bl from-violet-600/25 to-indigo-600/15 blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-[300px] h-[300px] rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-500/10 blur-[100px] pointer-events-none" />
            {/* Grid */}
            <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
            {/* Top line */}
            <div className="absolute top-0 left-[15%] right-[15%] h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="relative z-10 px-8 py-14 md:px-20 md:py-16 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase text-white/40 mb-3">Join the Community</p>
                <h2 className="text-3xl md:text-4xl font-extrabold tracking-tighter leading-tight mb-3">
                  Ready to level up your<br className="hidden md:inline" /> engineering skills?
                </h2>
                <p className="text-white/50 text-base font-medium max-w-md">
                  Dive into hundreds of expert articles on web dev, system design, AI, and more — all for free.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link href="/blogs">
                  <Button size="lg" className="rounded-full px-8 h-13 font-bold bg-white text-black hover:bg-white/90 shadow-2xl transition-all duration-300 hover:scale-105">
                    Start Reading
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-13 font-bold border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                    Join Free
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}