import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { BlogPost } from "@/types";
import { Eye, MessageCircle, ArrowUpRight, Sparkles, Tag } from "lucide-react";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blogs/${post.id}`} className="block group h-full">
      <article className="relative h-full rounded-2xl overflow-hidden border border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-500 ease-out group-hover:border-primary/40 group-hover:shadow-2xl group-hover:shadow-primary/10 group-hover:-translate-y-1 flex flex-col">

        {/* ── Thumbnail ── */}
        <div className="relative aspect-[16/9] w-full overflow-hidden flex-shrink-0">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Featured Badge */}
          {post.isFeatured && (
            <div className="absolute top-3 left-3 z-10">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-amber-500/30 tracking-wide uppercase">
                <Sparkles className="h-3 w-3" />
                Featured
              </span>
            </div>
          )}

          {/* Stats overlay at bottom of image */}
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white/90">
              <Eye className="h-3 w-3 text-primary/80" />
              {post.views.toLocaleString()}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-black/50 backdrop-blur-md px-2.5 py-1 text-[11px] font-medium text-white/90">
              <MessageCircle className="h-3 w-3 text-purple-400" />
              {post._count?.comments ?? 0}
            </span>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col flex-1 p-5 gap-3">

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-md bg-primary/8 px-2 py-0.5 text-[11px] font-semibold text-primary/80 border border-primary/15 hover:bg-primary/15 transition-colors"
                >
                  <Tag className="h-2.5 w-2.5" />
                  {tag}
                </span>
              ))}
              {post.tags.length > 3 && (
                <span className="inline-flex items-center rounded-md bg-muted/60 px-2 py-0.5 text-[11px] font-semibold text-muted-foreground border border-border/40">
                  +{post.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-base font-bold leading-snug tracking-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 flex-1">
            {post.content}
          </p>

          {/* ── Footer ── */}
          <div className="flex items-center justify-between pt-3 mt-auto border-t border-border/40">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                {post.views.toLocaleString()} views
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3 text-purple-400" />
                {post._count?.comments ?? 0} comments
              </span>
            </div>

            {/* Read More Arrow */}
            <span className="inline-flex items-center justify-center h-7 w-7 rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-110">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>

        {/* Subtle glow on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ring-1 ring-inset ring-primary/20" />
      </article>
    </Link>
  );
}
