import { blogService } from "@/services/blog.service";
import Image from "next/image";
import Link from "next/link";
import banner from "../../../assets/banner.jpeg";
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
  Users,
  Zap,
  Code2,
  Cpu,
  Shield,
  Database,
  Star,
  Sparkles,
  MonitorPlay,
  Component,
  Paintbrush,
  BookOpen,
  Rss,
  ChevronRight,
  TrendingUp,
  Award,
  Globe,
  ArrowUpRight,
  Play,
} from "lucide-react";

/* ── Categories ── */
const categories = [
  {
    name: "Web Dev", icon: MonitorPlay, count: 42,
    gradient: "from-[#3B82F6] to-[#06B6D4]",
    bg: "bg-blue-500/10", tc: "text-blue-500",
    ring: "ring-blue-500/20",
  },
  {
    name: "AI & ML", icon: Cpu, count: 28,
    gradient: "from-[#8B5CF6] to-[#A855F7]",
    bg: "bg-violet-500/10", tc: "text-violet-500",
    ring: "ring-violet-500/20",
  },
  {
    name: "Architecture", icon: Component, count: 19,
    gradient: "from-[#10B981] to-[#14B8A6]",
    bg: "bg-emerald-500/10", tc: "text-emerald-500",
    ring: "ring-emerald-500/20",
  },
  {
    name: "Security", icon: Shield, count: 15,
    gradient: "from-[#F43F5E] to-[#EC4899]",
    bg: "bg-rose-500/10", tc: "text-rose-500",
    ring: "ring-rose-500/20",
  },
  {
    name: "Databases", icon: Database, count: 23,
    gradient: "from-[#F59E0B] to-[#F97316]",
    bg: "bg-amber-500/10", tc: "text-amber-500",
    ring: "ring-amber-500/20",
  },
  {
    name: "Design", icon: Paintbrush, count: 31,
    gradient: "from-[#EC4899] to-[#A855F7]",
    bg: "bg-pink-500/10", tc: "text-pink-500",
    ring: "ring-pink-500/20",
  },
];

/* ── Stats ── */
const stats = [
  { label: "Community Members", value: "15k+", icon: Users, sub: "Growing every day", color: "from-blue-500 to-cyan-500", glow: "blue" },
  { label: "Monthly Views", value: "85k+", icon: Eye, sub: "Articles read per month", color: "from-violet-500 to-purple-500", glow: "violet" },
  { label: "Expert Authors", value: "40+", icon: Award, sub: "Industry professionals", color: "from-emerald-500 to-teal-500", glow: "emerald" },
];

/* ── Ticker ── */
const ticker = [
  "Modern Engineering", "AI & Machine Learning", "React Ecosystem",
  "Cloud Architecture", "System Design", "Open Source",
  "TypeScript", "Backend Development", "DevOps", "UI/UX Design",
];

/* ── Trust badges ── */
const trustBadges = [
  { icon: Globe, text: "Global Community" },
  { icon: TrendingUp, text: "Weekly Articles" },
  { icon: Star, text: "Expert Curated" },
  { icon: Shield, text: "Always Free" },
];

/* ================================================================= */

const Page = async () => {
  const [featuredRes, recentRes] = await Promise.all([
    blogService.getBlogPosts({ limit: "2", isFeatured: true }, { revalidate: 30 }),
    blogService.getBlogPosts({ limit: "6" }, { revalidate: 10 }),
  ]);

  const featured = featuredRes?.data?.data || [];
  const recent = recentRes?.data?.data || [];
  const heroPost = featured[0] || recent[0];
  const gridPosts = recent.slice(0, 6);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO — Cinematic full-height section
      ══════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden">

        {/* ── Ultra Premium Animated Background ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-background">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_60%,transparent_100%)] opacity-80" />

          {/* Central strong glowing spots (Violet & Indigo) */}
          <div className="absolute left-1/2 top-[30%] h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(124,58,237,0.28)] blur-[120px] animate-pulse-ring" />
          <div className="absolute left-1/2 top-[50%] h-[20rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(99,102,241,0.22)] blur-[100px] animate-blob" />

          {/* Twinkling Stars */}
          {[
            { top: "15%", left: "20%", delay: "0s", dur: "3s" },
            { top: "25%", left: "75%", delay: "1s", dur: "4s" },
            { top: "45%", left: "10%", delay: "2s", dur: "2.5s" },
            { top: "60%", left: "85%", delay: "0.5s", dur: "3.5s" },
            { top: "80%", left: "30%", delay: "1.5s", dur: "4s" },
            { top: "10%", left: "55%", delay: "2.5s", dur: "2s" },
            { top: "35%", left: "40%", delay: "0.2s", dur: "4.5s" },
            { top: "70%", left: "60%", delay: "1.2s", dur: "3.2s" },
            { top: "85%", left: "70%", delay: "2.2s", dur: "2.8s" },
            { top: "50%", left: "95%", delay: "0.8s", dur: "3.8s" },
            { top: "5%", left: "90%", delay: "3s", dur: "2.2s" },
            { top: "95%", left: "15%", delay: "1.8s", dur: "3.1s" },
          ].map((star, i) => (
            <div
              key={`star-${i}`}
              className="absolute rounded-full bg-white opacity-20 animate-twinkle shadow-[0_0_8px_rgba(255,255,255,1)]"
              style={{
                width: `${3 + (i % 3)}px`,
                height: `${3 + (i % 3)}px`,
                top: star.top,
                left: star.left,
                animationDelay: star.delay,
                animationDuration: star.dur
              }}
            />
          ))}

          {/* Floating Neon Orbs (Violet & Purple) */}
          {[
            { top: "15%", left: "15%", delay: "0s" },
            { top: "60%", left: "80%", delay: "1s" },
            { top: "75%", left: "25%", delay: "3s" },
            { top: "20%", left: "85%", delay: "2s" },
            { top: "40%", left: "10%", delay: "4s" },
          ].map((orb, i) => (
            <div
              key={`orb-${i}`}
              className={`absolute rounded-full animate-float ${i % 2 === 0
                ? "shadow-[0_0_25px_rgba(167,139,250,0.9)] bg-[rgba(139,92,246,1)]"
                : "shadow-[0_0_25px_rgba(129,140,248,0.9)] bg-[rgba(99,102,241,1)]"
                }`}
              style={{
                width: `${12 + (i * 4)}px`,
                height: `${12 + (i * 4)}px`,
                top: orb.top,
                left: orb.left,
                animationDelay: orb.delay,
                animationDuration: `${5 + i}s`,
              }}
            />
          ))}

          {/* Shooting Meteors */}
          <div className="absolute left-[15%] top-[-10%] h-[150px] w-[2px] bg-gradient-to-b from-transparent via-white to-white shadow-[0_0_15px_rgba(255,255,255,1)] opacity-0 animate-meteor" style={{ animationDuration: '6s', animationDelay: '1s' }} />
          <div className="absolute left-[40%] top-[-20%] h-[200px] w-[3px] bg-gradient-to-b from-transparent via-[rgba(139,92,246,1)] to-[rgba(139,92,246,1)] shadow-[0_0_20px_rgba(139,92,246,1)] opacity-0 animate-meteor" style={{ animationDuration: '8s', animationDelay: '4s' }} />
          <div className="absolute left-[70%] top-[-15%] h-[120px] w-[2px] bg-gradient-to-b from-transparent via-[rgba(99,102,241,1)] to-[rgba(99,102,241,1)] shadow-[0_0_15px_rgba(99,102,241,1)] opacity-0 animate-meteor" style={{ animationDuration: '5s', animationDelay: '2.5s' }} />
        </div>

        {/* ─── Content ─── */}
        <div className="container relative z-10 px-4 md:px-6 mx-auto flex flex-col items-center text-center gap-8 pt-28 pb-20">

          {/* Status pill */}
          <div className="animate-slide-up" style={{ animationDelay: "0ms" }}>
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full
                            border border-primary/25 bg-gradient-to-r from-primary/8 to-violet-500/8
                            backdrop-blur-md shadow-lg shadow-primary/5 hover:shadow-primary/15
                            transition-shadow duration-300 cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-semibold text-primary tracking-wide">
                New articles published weekly
              </span>
              <Sparkles className="h-3.5 w-3.5 text-primary/70" />
            </div>
          </div>

          {/* H1 */}
          <div className="animate-slide-up" style={{ animationDelay: "80ms" }}>
            <h1 className="max-w-5xl text-5xl sm:text-6xl md:text-7xl xl:text-[5.5rem] font-extrabold tracking-tighter leading-[1.03] text-foreground">
              Where Developers
              <br />
              <span className="text-shimmer">Come to Grow</span>
            </h1>
          </div>

          {/* Sub-headline */}
          <div className="animate-slide-up" style={{ animationDelay: "160ms" }}>
            <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
              Expert-led tutorials, deep-dive architecture guides, and the industry's
              freshest engineering insights — all in one premium destination.
            </p>
          </div>

          {/* CTA row */}
          <div className="animate-slide-up flex flex-col sm:flex-row items-center gap-4 mt-2" style={{ animationDelay: "240ms" }}>
            <Link href="/blogs">
              <Button
                size="lg"
                className="group rounded-full px-10 h-14 text-base font-bold
                           shadow-2xl shadow-primary/25 hover:shadow-primary/40
                           transition-all duration-300 hover:-translate-y-1 hover:scale-105
                           bg-gradient-to-r from-primary to-primary/90"
              >
                Start Reading
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="group rounded-full px-10 h-14 text-base font-semibold
                           border-border/60 bg-background/60 backdrop-blur-sm
                           hover:bg-muted/60 hover:border-border
                           transition-all duration-300 hover:-translate-y-1"
              >
                <Play className="mr-2 h-4 w-4 fill-current opacity-70" />
                Watch Demo
              </Button>
            </Link>
          </div>

          {/* Trust strip */}
          <div className="animate-slide-up flex flex-wrap justify-center gap-4 mt-4" style={{ animationDelay: "320ms" }}>
            {trustBadges.map((b) => (
              <div key={b.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/60 border border-border/40 text-sm text-muted-foreground font-semibold">
                <b.icon className="h-3.5 w-3.5 text-primary/70" />
                {b.text}
              </div>
            ))}
          </div>

          {/* Metrics strip */}
          <div className="animate-slide-up flex flex-wrap justify-center gap-x-10 gap-y-2 mt-2" style={{ animationDelay: "380ms" }}>
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-primary to-violet-500 opacity-60" />
                <span className="font-extrabold text-foreground text-base">{s.value}</span>
                <span className="font-medium">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
          <span className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground font-semibold">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-border/50 flex items-start justify-center pt-1.5">
            <div className="w-1 h-2 rounded-full bg-primary/70 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TICKER TAPE
      ══════════════════════════════════════════════════════════ */}
      <div className="relative border-y border-border/30 bg-gradient-to-r from-muted/40 via-muted/20 to-muted/40 py-4 overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex animate-ticker whitespace-nowrap select-none">
          {[...ticker, ...ticker].map((item, i) => (
            <span key={i} className="inline-flex items-center gap-4 px-8 text-sm font-bold text-muted-foreground/60 tracking-wide uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-violet-500 opacity-60 flex-shrink-0" />
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          FEATURED POST — Magazine Hero Card
      ══════════════════════════════════════════════════════════ */}
      {heroPost && (
        <AnimatedSection className="container mx-auto px-4 md:px-6 py-24" direction="up">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex items-center gap-2.5 px-5 py-2 rounded-full
                            bg-gradient-to-r from-orange-500/15 to-red-500/10
                            border border-orange-500/20">
              <Flame className="h-4 w-4 text-orange-500 animate-glow-pulse" />
              <span className="text-sm font-extrabold text-orange-500 tracking-widest uppercase">
                Editor's Pick
              </span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent" />
          </div>

          <Link href={`/blogs/${heroPost.id}`} className="group block">
            <div className="relative rounded-[2.5rem] overflow-hidden border border-border/40
                            bg-card shadow-2xl transition-all duration-700
                            hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.15)]
                            dark:hover:shadow-[0_40px_80px_-12px_rgba(0,0,0,0.5)]
                            hover:-translate-y-2 shine-hover">

              {/* Top gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet-500 to-blue-500 z-10" />

              <div className="grid md:grid-cols-[1.1fr_1fr]">

                {/* ─── Image ─── */}
                <div className="relative h-[300px] md:h-[540px] overflow-hidden bg-muted">
                  <Image
                    src={heroPost.thumbnail || banner}
                    alt={heroPost.title}
                    fill priority
                    sizes="(max-width: 768px) 100vw, 55vw"
                    className="object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                  />
                  {/* Multi-stop overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Featured badge */}
                  {heroPost.isFeatured && (
                    <div className="absolute top-6 left-6 z-20 flex items-center gap-2
                                    px-4 py-2 rounded-full glass-dark text-white shadow-xl
                                    border border-white/15">
                      <Flame className="h-3.5 w-3.5 text-orange-400 animate-pulse" />
                      <span className="text-xs font-bold tracking-widest uppercase">Featured</span>
                    </div>
                  )}

                  {/* Bottom meta overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 flex items-center justify-between">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full
                                    glass-dark text-white/80 text-xs font-semibold">
                      <BookOpen className="h-3 w-3" />
                      5 min read
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark text-white/80 text-xs font-semibold">
                        <Eye className="h-3 w-3" />
                        {heroPost.views || 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─── Content ─── */}
                <div className="relative flex flex-col justify-center p-8 md:p-14 overflow-hidden">
                  {/* Decorative blobs */}
                  <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-60 h-60 bg-violet-500/5 rounded-full blur-[70px] pointer-events-none" />

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-7 relative z-10">
                    {heroPost.tags?.[0] && (
                      <span className="px-3.5 py-1.5 text-xs font-bold tracking-widest uppercase
                                        border border-primary/30 bg-primary/8 text-primary rounded-full">
                        {heroPost.tags[0]}
                      </span>
                    )}
                    <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 opacity-50" />
                      {heroPost.createdAt
                        ? new Date(heroPost.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                        : "Recently published"}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl md:text-4xl xl:text-[2.6rem] font-extrabold tracking-tighter
                                 text-foreground leading-[1.12] mb-6
                                 group-hover:text-primary transition-colors duration-500 relative z-10">
                    {heroPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-base md:text-lg mb-10 line-clamp-3 leading-relaxed relative z-10">
                    {heroPost.content || heroPost.excerpt}
                  </p>

                  {/* Footer */}
                  <div className="mt-auto pt-8 border-t border-border/40 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-5 text-sm font-semibold text-muted-foreground">
                      <span className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 opacity-50" />
                        {heroPost._count?.comments || 0} comments
                      </span>
                    </div>
                    <span className="group/btn inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full
                                     bg-primary text-primary-foreground text-sm font-bold
                                     shadow-lg shadow-primary/25 hover:shadow-primary/40
                                     transition-all duration-300 hover:scale-105 hover:-translate-y-0.5">
                      Read Story
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </AnimatedSection>
      )}

      {/* ══════════════════════════════════════════════════════════
          CATEGORIES — Stunning gradient cards with hover lift
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        {/* Section background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-muted/30 to-transparent" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[900px] h-[350px]
                        bg-gradient-to-b from-primary/6 to-transparent rounded-full
                        blur-[120px] pointer-events-none -z-10" />

        <div className="container mx-auto px-4 md:px-6">

          {/* Heading */}
          <AnimatedSection className="text-center mb-20" direction="up">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                            border border-primary/20 bg-primary/8 text-primary
                            text-sm font-bold tracking-widest uppercase mb-6">
              <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
              Browse Topics
            </div>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter text-foreground mb-5">
              Explore by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              From beginner tutorials to expert-level deep dives — find exactly
              what you need to level up your skills.
            </p>
          </AnimatedSection>

          {/* Category grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
            {categories.map((cat, i) => (
              <AnimatedSection key={cat.name} delay={i * 70} direction="up">
                <Link href={`/blogs?category=${encodeURIComponent(cat.name)}`}>
                  <div className={`card-gradient-border group h-full flex flex-col items-center
                                   text-center p-7 cursor-pointer overflow-hidden
                                   transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl`}>

                    {/* Icon with gradient bg */}
                    <div className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-5
                                     bg-gradient-to-br ${cat.gradient} shadow-xl
                                     group-hover:scale-115 group-hover:rotate-6
                                     transition-all duration-500`}>
                      <cat.icon className="h-7 w-7 text-white" strokeWidth={1.75} />
                      {/* Shine overlay */}
                      <div className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <h3 className="font-extrabold text-sm text-foreground tracking-tight leading-tight mb-1.5">
                      {cat.name}
                    </h3>
                    <p className={`text-xs font-bold mb-3 ${cat.tc}`}>{cat.count} articles</p>

                    {/* Arrow */}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center
                                    ${cat.bg} ring-1 ${cat.ring}
                                    group-hover:scale-110 transition-all duration-300`}>
                      <ArrowRight className={`h-3.5 w-3.5 ${cat.tc} transition-transform duration-300 group-hover:translate-x-0.5`} />
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          RECENT ARTICLES — Premium card grid
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 relative">
        {/* Subtle diagonal pattern */}
        <div className="absolute inset-0 -z-10 [background-image:repeating-linear-gradient(45deg,hsl(var(--border)/0.25)_0,hsl(var(--border)/0.25)_1px,transparent_0,transparent_50%)] [background-size:14px_14px]" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-transparent to-background" />

        <div className="container mx-auto px-4 md:px-6">

          {/* Header row */}
          <AnimatedSection className="flex w-full items-end justify-between mb-16" direction="up">
            <div>
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                              border border-primary/20 bg-primary/8 text-primary
                              text-sm font-bold tracking-widest uppercase mb-5">
                <Rss className="h-3.5 w-3.5" />
                Fresh Content
              </div>
              <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter text-foreground mb-3">
                Latest <span className="text-gradient">Insights</span>
              </h2>
              <p className="text-muted-foreground text-lg font-medium">
                Hand-picked articles from our expert contributors.
              </p>
            </div>
            <Link href="/blogs" className="hidden sm:block">
              <Button variant="outline"
                className="group rounded-full px-7 h-12 font-bold border-border/60
                           bg-background/60 backdrop-blur-sm hover:bg-muted/60
                           transition-all duration-300 hover:-translate-y-0.5">
                All Articles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
          </AnimatedSection>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridPosts.length > 0 ? (
              gridPosts.map((post: any, i: number) => (
                <AnimatedSection key={post.id || post._id} delay={i * 90} direction="up">
                  <Link href={`/blogs/${post.id}`} className="block h-full group">
                    <article className="h-full flex flex-col overflow-hidden
                                        bg-card border border-border/50 rounded-[2rem]
                                        transition-all duration-500
                                        hover:shadow-2xl hover:shadow-primary/8
                                        hover:-translate-y-2.5 hover:border-primary/10
                                        relative">

                      {/* Animated top-border line on hover */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2rem]
                                      bg-gradient-to-r from-transparent via-primary/60 to-transparent
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                      {/* Thumbnail */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-muted rounded-t-[2rem]">
                        <Image
                          src={post.thumbnail || banner}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Gradient overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent
                                        opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Tag chip */}
                        {post.tags?.[0] && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="px-3 py-1.5 rounded-full
                                             bg-background/90 backdrop-blur-md
                                             text-foreground text-xs font-bold tracking-wide
                                             shadow-md border border-border/30">
                              {post.tags[0]}
                            </span>
                          </div>
                        )}

                        {/* Stats overlay (visible on hover) */}
                        <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between
                                        opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                          <div className="flex items-center gap-3">
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                             glass-dark text-white/90 text-xs font-semibold">
                              <Eye className="h-3 w-3" /> {post.views || 0}
                            </span>
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full
                                             glass-dark text-white/90 text-xs font-semibold">
                              <MessageSquare className="h-3 w-3" /> {post._count?.comments || 0}
                            </span>
                          </div>
                          <span className="px-2.5 py-1 rounded-full glass-dark text-white/90 text-xs font-semibold">
                            5 min
                          </span>
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-7 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-4">
                          <Calendar className="h-3.5 w-3.5 opacity-50" />
                          {post.createdAt
                            ? new Date(post.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                            : "Recent"}
                        </div>

                        <h3 className="text-xl font-extrabold tracking-tight text-foreground
                                       group-hover:text-primary transition-colors duration-300
                                       leading-[1.35] mb-3 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                          {post.content || post.excerpt}
                        </p>

                        <div className="pt-5 border-t border-border/40 flex items-center justify-between">
                          <span className="text-sm font-extrabold text-muted-foreground
                                           group-hover:text-primary transition-colors duration-300
                                           inline-flex items-center gap-2">
                            Read Article
                            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                          </span>
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center
                                          group-hover:bg-primary/10 transition-colors duration-300">
                            <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors duration-300" />
                          </div>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))
            ) : (
              <AnimatedSection className="col-span-full">
                <div className="flex flex-col items-center justify-center py-40
                                border border-dashed border-border/60 rounded-3xl bg-card/50">
                  <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6 shadow-inner">
                    <Code2 className="h-9 w-9 opacity-25" />
                  </div>
                  <p className="text-xl font-bold text-foreground mb-2">No articles yet</p>
                  <p className="text-muted-foreground text-sm">Check back soon for fresh content!</p>
                </div>
              </AnimatedSection>
            )}
          </div>

          {/* Mobile CTA */}
          <div className="mt-12 flex justify-center sm:hidden">
            <Link href="/blogs" className="w-full max-w-sm">
              <Button size="lg" variant="outline" className="rounded-full w-full font-bold border-border/60">
                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          STATS — Immersive gradient section
      ══════════════════════════════════════════════════════════ */}
      <section className="py-32 relative overflow-hidden">
        {/* Dramatic background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-foreground/5 via-background to-primary/5" />
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80
                          bg-blue-500/10 rounded-full blur-[100px] animate-blob-slow" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80
                          bg-violet-500/10 rounded-full blur-[100px] animate-blob"
            style={{ animationDelay: "4s" }} />
        </div>
        <div className="absolute inset-0 -z-10 [background-image:radial-gradient(hsl(var(--border)/0.4)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_30%,transparent_100%)]" />

        <div className="container mx-auto px-4 md:px-6">

          <AnimatedSection className="text-center mb-20" direction="up">
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter text-foreground mb-5">
              Trusted by{" "}
              <span className="text-shimmer">Developers Globally</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto font-medium">
              Join a thriving community of engineers and learners who choose
              quality content every day.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
            {stats.map((s, i) => (
              <AnimatedSection key={i} delay={i * 120} direction="up">
                <div className="group relative flex flex-col items-center text-center
                                p-10 bg-card/80 backdrop-blur-sm rounded-[2.5rem]
                                border border-border/50
                                hover:border-primary/25 shadow-xl
                                hover:shadow-2xl hover:shadow-primary/10
                                transition-all duration-500 hover:-translate-y-3
                                overflow-hidden">

                  {/* Gradient bg on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-violet-500/5
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Top accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.color}
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon ring */}
                  <div className={`relative w-20 h-20 rounded-3xl flex items-center justify-center mb-7
                                   bg-gradient-to-br ${s.color} shadow-2xl
                                   group-hover:scale-110 group-hover:rotate-3
                                   transition-all duration-500`}>
                    <s.icon className="h-9 w-9 text-white" strokeWidth={1.5} />
                    <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Number */}
                  <h4 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground mb-2 relative z-10">
                    {s.value}
                  </h4>
                  <p className="text-base font-bold text-foreground/70 mb-1 relative z-10">{s.label}</p>
                  <p className="text-xs text-muted-foreground font-medium relative z-10">{s.sub}</p>

                  {/* Corner decoration */}
                  <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full
                                  border border-border/30 opacity-0 group-hover:opacity-60
                                  transition-all duration-500 group-hover:scale-110" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          WHY US — Feature highlights strip
      ══════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-muted/20 to-transparent">
        <div className="container mx-auto px-4 md:px-6">
          <AnimatedSection direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: BookOpen, title: "In-Depth Articles", desc: "Every piece is thoroughly researched and expertly written for real value.", color: "from-blue-500 to-cyan-500" },
                { icon: Users, title: "Community Driven", desc: "Built by developers, for developers. We listen and grow together.", color: "from-violet-500 to-purple-500" },
                { icon: TrendingUp, title: "Always Current", desc: "Stay ahead with content that keeps pace with the evolving tech landscape.", color: "from-emerald-500 to-teal-500" },
                { icon: Globe, title: "Globally Accessible", desc: "Free, open content for every developer, regardless of where they are.", color: "from-orange-500 to-rose-500" },
              ].map((f, i) => (
                <AnimatedSection key={f.title} delay={i * 80} direction="up">
                  <div className="group p-8 rounded-3xl border border-border/40 bg-card
                                  hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5
                                  transition-all duration-500 hover:-translate-y-2 h-full">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} shadow-lg
                                     flex items-center justify-center mb-5
                                     group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      <f.icon className="h-5.5 w-5.5 text-white" strokeWidth={1.75} />
                    </div>
                    <h3 className="text-lg font-extrabold text-foreground tracking-tight mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FAQ SECTION
      ══════════════════════════════════════════════════════════ */}
      <FaqSection />

      {/* ══════════════════════════════════════════════════════════
          NEWSLETTER — Premium dark island
      ══════════════════════════════════════════════════════════ */}
      <section className="py-12 md:py-16 relative">
        <AnimatedSection className="container mx-auto px-4 relative z-10" direction="up">
          <div className="max-w-7xl mx-auto">
            <div className="relative rounded-[3rem] overflow-hidden
                            border border-white/6 dark:border-white/4
                            bg-[#0D0D10] text-white shadow-2xl">

              {/* Animated background blobs */}
              <div className="absolute -top-20 -right-20 w-[450px] h-[450px]
                              rounded-full bg-gradient-to-bl from-primary/30 to-violet-600/20
                              blur-[140px] animate-blob-slow pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-[350px] h-[350px]
                              rounded-full bg-gradient-to-tr from-blue-600/20 to-cyan-500/15
                              blur-[120px] animate-blob pointer-events-none"
                style={{ animationDelay: "4s" }} />

              {/* Grid pattern */}
              <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

              {/* Top shimmer line */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px
                              bg-gradient-to-r from-transparent via-white/25 to-transparent" />

              {/* Content */}
              <div className="relative z-10 px-8 py-8 md:px-20 md:py-10 flex flex-col items-center text-center">

                {/* Zap icon */}
                <div className="w-14 h-14 rounded-2xl bg-white/8 border border-white/12
                                flex items-center justify-center mb-4 shadow-2xl
                                hover:bg-white/12 transition-colors duration-300 group cursor-default">
                  <Zap className="h-7 w-7 text-white/90 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>

                {/* Label */}
                <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                                border border-white/15 bg-white/5 text-white/70
                                text-sm font-bold tracking-widest uppercase mb-4">
                  <Rss className="h-3.5 w-3.5" />
                  Weekly Newsletter
                </div>

                {/* Headline */}
                <h2 className="text-3xl md:text-4xl xl:text-5xl font-extrabold tracking-tighter mb-4 leading-tight">
                  Never miss a great{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white/90 via-white/60 to-violet-400/80">
                    article again.
                  </span>
                </h2>

                {/* Body */}
                <p className="text-white/50 text-base mb-6 max-w-xl mx-auto font-medium leading-relaxed">
                  Get curated engineering tutorials, architecture deep-dives, and
                  industry insights straight to your inbox — every single week.
                </p>

                {/* Form */}
                <div className="w-full max-w-lg mx-auto">
                  <NewsletterForm />
                  <div className="mt-6 flex items-center justify-center gap-6 text-xs text-white/30 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Shield className="h-3 w-3" /> No spam, ever
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="flex items-center gap-1.5">
                      <Star className="h-3 w-3" /> Curated weekly
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span>Unsubscribe anytime</span>
                  </div>
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