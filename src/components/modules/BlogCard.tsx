import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/types";
import { Eye, MessageCircle, ArrowUpRight, Tag, Sparkles, Clock } from "lucide-react";

/** Estimate reading time from content word count (200 wpm) */
function calcReadTime(content: string): string {
  const words = content?.trim().split(/\s+/).length || 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min`;
}

/** Strip markdown syntax for plain-text excerpts */
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/^\|.*\|$/gm, "")
    .replace(/^[-| :]+$/gm, "")
    .replace(/^>\s+/gm, "")
    .replace(/^[-*_]{3,}$/gm, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\n{2,}/g, " ")
    .replace(/\n/g, " ")
    .trim();
}

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.id}`} className="block group h-full">
      <article className="relative h-full flex flex-col bg-card border border-border/50 rounded-[2rem] overflow-hidden transition-all duration-500 hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/8 hover:-translate-y-2">

        {/* Animated top border line on hover */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{ background: "linear-gradient(to right, transparent, #8B5CF6, #C084FC, #EC4899, transparent)" }}
        />

        {/* ── Thumbnail ── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden flex-shrink-0 rounded-t-[2rem]">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured Badge */}
          {post.isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest uppercase text-white"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #EC4899)", boxShadow: "0 0 12px rgba(139,92,246,0.4)" }}
              >
                <Sparkles className="h-2.5 w-2.5" />
                Featured
              </span>
            </div>
          )}

          {/* Stats overlay */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-1 group-hover:translate-y-0">
            <span className="inline-flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-white/90">
              <Eye className="h-3 w-3" style={{ color: "#A78BFA" }} />
              {post.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 rounded-lg bg-black/50 backdrop-blur-md px-2 py-1 text-[10px] font-semibold text-white/90">
              <MessageCircle className="h-3 w-3" style={{ color: "#F472B6" }} />
              {post._count?.comments ?? 0}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-6 gap-3">

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wide"
                  style={{ background: "#8B5CF615", border: "1px solid #8B5CF635", color: "#C084FC" }}
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="inline-flex items-center rounded-md bg-muted/60 border border-border/40 px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
                  +{post.tags.length - 2}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-extrabold leading-snug tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1 font-medium">
            {stripMarkdown(post.content)}
          </p>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between pt-4 mt-auto border-t border-border/40">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-semibold">
              <span className="flex items-center gap-1.5">
                <Eye className="h-3 w-3 opacity-60" />
                {post.views.toLocaleString()}
              </span>
              <span className="w-px h-3 bg-border/60" />
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3 opacity-60" />
                {post._count?.comments ?? 0}
              </span>
              <span className="w-px h-3 bg-border/60" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3 w-3 opacity-60" />
                {calcReadTime(post.content)}
              </span>
            </div>

            {/* Read More Arrow */}
            <span
              className="inline-flex items-center justify-center h-7 w-7 rounded-full text-white border-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #8B5CF690, #EC489970)",
              }}
            >
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-primary/15" />
      </article>
    </Link>
  );
}
