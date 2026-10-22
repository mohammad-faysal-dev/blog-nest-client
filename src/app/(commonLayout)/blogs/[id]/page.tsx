import { blogService } from "@/services/blog.service";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  Eye,
  MessageCircle,
  Clock,
  Star,
  Hash,
  TrendingUp,
  User,
  Bookmark,
} from "lucide-react";
import { BlogPost } from "@/types";

// Allow dynamic rendering for paths not pre-generated at build time
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { data } = await blogService.getBlogPosts();
    return data?.data?.map((blog: BlogPost) => ({ id: blog.id })).slice(0, 3) ?? [];
  } catch {
    // Backend unavailable at build time — no pages pre-rendered, all served dynamically
    return [];
  }
}

function estimateReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i]!;

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="bd-h2">{line.slice(3)}</h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="bd-h3">{line.slice(4)}</h3>
      );
    } else if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="bd-h1">{line.slice(2)}</h1>
      );
    } else if (line.startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith("```")) {
        codeLines.push(lines[i]!);
        i++;
      }
      elements.push(
        <div key={i} className="bd-code-block">
          <div className="bd-code-dots">
            <span style={{ background: "#ff5f57" }} />
            <span style={{ background: "#febc2e" }} />
            <span style={{ background: "#28c840" }} />
          </div>
          <pre className="bd-code-pre"><code>{codeLines.join("\n")}</code></pre>
        </div>
      );
    } else if (line.startsWith("- ") || line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && (lines[i]!.startsWith("- ") || lines[i]!.startsWith("* "))) {
        items.push(lines[i]!.slice(2));
        i++;
      }
      elements.push(
        <ul key={i} className="bd-list">
          {items.map((item, idx) => (
            <li key={idx} className="bd-list-item">
              <span className="bd-bullet" />
              {item}
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      elements.push(<div key={i} className="bd-gap" />);
    } else {
      elements.push(<p key={i} className="bd-p">{line}</p>);
    }
    i++;
  }
  return elements;
}

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const { data } = await blogService.getBlogById(id);

  const formattedDate = new Date(data.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  const commentCount = data._count?.comments ?? 0;
  const readTime = estimateReadTime(data.content ?? "");
  const authorInitial = (data.authorId ?? "A").charAt(0).toUpperCase();

  const statusLabel: Record<string, string> = {
    PUBLISHED: "Published", DRAFT: "Draft", ARCHIVED: "Archived",
  };
  const statusColor: Record<string, string> = {
    PUBLISHED: "bd-status-published",
    DRAFT: "bd-status-draft",
    ARCHIVED: "bd-status-archived",
  };

  return (
    <>
      <style>{`
        /* ───────────────────────────────────────────────
           BLOG DETAIL — matches site violet/pink palette
        ─────────────────────────────────────────────── */

        /* Re-use site gradient */
        .bd-gradient { background: linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899); }
        .bd-gradient-text {
          background: linear-gradient(135deg, #8B5CF6, #C084FC, #EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Page wrapper — uses CSS var from theme */
        .bd-page {
          min-height: 100vh;
          background: var(--background);
          color: var(--foreground);
        }

        /* ── HERO ── */
        .bd-hero {
          position: relative;
          width: 100%;
          height: 72vh;
          min-height: 500px;
          overflow: hidden;
        }

        .bd-hero-img { transition: transform 10s ease; }
        .bd-hero:hover .bd-hero-img { transform: scale(1.04); }

        .bd-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0,0,0,0.35) 0%,
            rgba(0,0,0,0.55) 40%,
            rgba(0,0,0,0.92) 80%,
            var(--background) 100%
          );
        }

        .bd-hero-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 2rem clamp(1.5rem, 4vw, 4rem) 3.5rem;
          max-width: 1600px;
          margin: 0 auto;
          left: 0; right: 0;
        }

        /* ── BACK BUTTON ── */
        .bd-back {
          position: absolute;
          top: 5.5rem;
          left: clamp(1.5rem, 4vw, 4rem);
          z-index: 20;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.1rem;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          background: rgba(139,92,246,0.15);
          border: 1px solid rgba(139,92,246,0.35);
          backdrop-filter: blur(12px);
          text-decoration: none;
          transition: all 0.2s;
          letter-spacing: 0.02em;
        }
        .bd-back:hover {
          background: rgba(139,92,246,0.28);
          border-color: rgba(192,132,252,0.5);
          color: #fff;
          transform: translateX(-2px);
        }

        /* ── BADGES ── */
        .bd-badges { display: flex; flex-wrap: wrap; gap: 0.6rem; margin-bottom: 1.1rem; }

        .bd-status-published {
          padding: 0.28rem 0.85rem; border-radius: 999px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(139,92,246,0.18);
          color: #C084FC;
          border: 1px solid rgba(139,92,246,0.35);
        }
        .bd-status-draft {
          padding: 0.28rem 0.85rem; border-radius: 999px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(236,72,153,0.15);
          color: #f472b6;
          border: 1px solid rgba(236,72,153,0.3);
        }
        .bd-status-archived {
          padding: 0.28rem 0.85rem; border-radius: 999px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.5);
          border: 1px solid rgba(255,255,255,0.15);
        }
        .bd-featured {
          padding: 0.28rem 0.85rem; border-radius: 999px;
          font-size: 0.68rem; font-weight: 700;
          letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(236,72,153,0.15);
          color: #f9a8d4;
          border: 1px solid rgba(236,72,153,0.3);
          display: inline-flex; align-items: center; gap: 0.35rem;
        }

        /* ── HERO TITLE ── */
        .bd-title {
          font-size: clamp(2rem, 5vw, 3.8rem);
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
          color: #fff;
          margin-bottom: 1.4rem;
          max-width: 900px;
          text-shadow: 0 2px 30px rgba(0,0,0,0.6);
        }

        /* ── META ROW ── */
        .bd-meta {
          display: flex; flex-wrap: wrap;
          align-items: center; gap: 1rem;
          font-size: 0.78rem;
          color: rgba(255,255,255,0.5);
        }
        .bd-meta-item { display: flex; align-items: center; gap: 0.4rem; }
        .bd-meta-dot {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
        }
        .bd-avatar-chip { display: flex; align-items: center; gap: 0.6rem; }
        .bd-avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #8B5CF6, #EC4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 800; color: #fff;
        }
        .bd-author-name {
          font-size: 0.82rem; font-weight: 600;
          color: rgba(255,255,255,0.8);
        }

        /* ── BODY ── */
        .bd-body {
          max-width: 1600px;
          margin: 0 auto;
          padding: 3rem 2rem 6rem;
          display: grid;
          grid-template-columns: 1fr 360px;
          gap: 2.5rem;
          align-items: start;
        }

        @media (max-width: 1024px) {
          .bd-body { grid-template-columns: 1fr; }
          .bd-sidebar {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          }
        }

        /* ── ARTICLE CARD ── */
        .bd-article-card {
          border-radius: 20px;
          padding: 2.5rem clamp(1.5rem, 4vw, 3rem);
          background: var(--card);
          border: 1px solid var(--border);
        }

        .bd-read-line {
          display: flex; align-items: center; gap: 0.6rem;
          font-size: 0.7rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #C084FC;
          margin-bottom: 2rem; padding-bottom: 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        /* Article typography */
        .bd-h1 {
          font-size: 1.9rem; font-weight: 800;
          color: var(--foreground);
          margin: 2rem 0 0.75rem;
          letter-spacing: -0.02em; line-height: 1.2;
        }
        .bd-h2 {
          font-size: 1.35rem; font-weight: 700;
          margin: 2.5rem 0 0.75rem;
          padding-bottom: 0.6rem;
          border-bottom: 2px solid transparent;
          border-image: linear-gradient(90deg,#8B5CF6,#EC4899) 1;
          background: linear-gradient(135deg,#8B5CF6,#C084FC,#EC4899);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bd-h3 {
          font-size: 1.05rem; font-weight: 700;
          color: var(--foreground); opacity: 0.85;
          margin: 1.5rem 0 0.5rem;
        }
        .bd-p {
          font-size: 1.02rem; line-height: 1.9;
          color: var(--muted-foreground);
        }
        .bd-gap { height: 0.6rem; }
        .bd-list {
          margin: 0.5rem 0; padding: 0;
          list-style: none; display: flex; flex-direction: column; gap: 0.5rem;
        }
        .bd-list-item {
          display: flex; align-items: flex-start; gap: 0.75rem;
          font-size: 1rem; line-height: 1.75;
          color: var(--muted-foreground);
        }
        .bd-bullet {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg,#8B5CF6,#EC4899);
          flex-shrink: 0; margin-top: 0.55rem;
        }
        .bd-code-block {
          border-radius: 14px; overflow: hidden;
          margin: 1.25rem 0;
          background: #0a0a0f;
          border: 1px solid rgba(139,92,246,0.2);
        }
        .bd-code-dots {
          display: flex; align-items: center; gap: 6px;
          padding: 0.65rem 1rem;
          background: rgba(139,92,246,0.07);
          border-bottom: 1px solid rgba(139,92,246,0.15);
        }
        .bd-code-dots span {
          width: 10px; height: 10px; border-radius: 50%;
        }
        .bd-code-pre {
          margin: 0; padding: 1.1rem 1.4rem;
          overflow-x: auto;
          font-size: 0.83rem; line-height: 1.7;
          color: #e2d9f3;
          font-family: 'Fira Code','JetBrains Mono',monospace;
          white-space: pre;
        }

        /* ── SIDEBAR ── */
        .bd-sidebar {
          position: sticky; top: 6rem;
          display: flex; flex-direction: column; gap: 1.2rem;
        }

        /* Stats — gradient like the rest of site */
        .bd-stats-card {
          border-radius: 18px;
          padding: 1.4rem 1.5rem;
          position: relative; overflow: hidden;
          background: linear-gradient(145deg,rgba(139,92,246,0.15),rgba(236,72,153,0.08));
          border: 1px solid rgba(139,92,246,0.25);
        }
        .bd-stats-card::before {
          content:''; position:absolute;
          top:-40px; right:-40px;
          width:120px; height:120px; border-radius:50%;
          background: rgba(192,132,252,0.3);
          filter: blur(40px); pointer-events:none;
        }
        .bd-stats-label {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: #A78BFA; margin-bottom: 1rem;
        }
        .bd-stats-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem;
        }
        .bd-stat-val {
          font-size: 1.75rem; font-weight: 900; line-height: 1;
          background: linear-gradient(135deg,#fff,#C084FC);
          -webkit-background-clip: text; background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bd-stat-key {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.07em;
          color: rgba(255,255,255,0.35);
          margin-top: 0.25rem; font-weight: 600;
        }

        /* Info card */
        .bd-info-card {
          border-radius: 18px;
          padding: 1.4rem 1.5rem;
          background: var(--card);
          border: 1px solid var(--border);
        }
        .bd-info-avatar {
          width: 48px; height: 48px; border-radius: 14px;
          background: linear-gradient(135deg,#8B5CF6,#EC4899);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.15rem; font-weight: 900; color: #fff;
          margin-bottom: 0.75rem;
        }
        .bd-info-name {
          font-size: 0.92rem; font-weight: 700;
          color: var(--foreground);
        }
        .bd-info-sub {
          font-size: 0.72rem;
          color: var(--muted-foreground);
          margin-top: 0.15rem;
        }
        .bd-divider {
          height: 1px; background: var(--border);
          margin: 1rem 0;
        }
        .bd-row {
          display: flex; align-items: center; gap: 0.75rem;
          margin-bottom: 0.85rem;
        }
        .bd-row:last-child { margin-bottom: 0; }
        .bd-row-icon {
          width: 34px; height: 34px; border-radius: 10px;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.18);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          color: #A78BFA;
        }
        .bd-row-label {
          font-size: 0.65rem; text-transform: uppercase;
          letter-spacing: 0.07em; font-weight: 600;
          color: var(--muted-foreground);
        }
        .bd-row-val {
          font-size: 0.83rem; font-weight: 600;
          color: var(--foreground); margin-top: 0.1rem;
        }

        /* Tags */
        .bd-tags-card {
          border-radius: 18px;
          padding: 1.4rem 1.5rem;
          background: var(--card);
          border: 1px solid var(--border);
        }
        .bd-tags-title {
          font-size: 0.65rem; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--muted-foreground); margin-bottom: 0.9rem;
        }
        .bd-tags-wrap { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .bd-tag {
          display: inline-flex; align-items: center; gap: 0.3rem;
          padding: 0.32rem 0.75rem; border-radius: 999px;
          font-size: 0.7rem; font-weight: 600;
          color: #C084FC;
          background: rgba(139,92,246,0.1);
          border: 1px solid rgba(139,92,246,0.22);
          transition: all 0.2s; cursor: pointer;
        }
        .bd-tag:hover {
          background: rgba(139,92,246,0.2);
          color: #E879F9;
          border-color: rgba(192,132,252,0.4);
          transform: translateY(-1px);
        }
      `}</style>

      <div className="bd-page">

        {/* ── HERO ─────────────────────────────── */}
        <div className="bd-hero">
          {data.thumbnail ? (
            <Image
              src={data.thumbnail}
              alt={data.title}
              fill priority
              className="bd-hero-img"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1e0a3c,#0f0520)" }} />
          )}
          <div className="bd-hero-overlay" />

          {/* Back button */}
          <Link href="/blogs" className="bd-back">
            <ArrowLeft size={13} />
            Back to blogs
          </Link>

          <div className="bd-hero-content">
            <div className="bd-badges">
              <span className={statusColor[data.status] ?? "bd-status-published"}>
                {statusLabel[data.status] ?? data.status}
              </span>
              {data.isFeatured && (
                <span className="bd-featured">
                  <Star size={9} style={{ fill: "#f9a8d4" }} />
                  Featured
                </span>
              )}
            </div>

            <h1 className="bd-title">{data.title}</h1>

            <div className="bd-meta">
              <div className="bd-avatar-chip">
                <div className="bd-avatar">{authorInitial}</div>
                <span className="bd-author-name">{data.authorName ?? "DevNexus"}</span>
              </div>
              <div className="bd-meta-dot" />
              <span className="bd-meta-item"><CalendarDays size={12} />{formattedDate}</span>
              <div className="bd-meta-dot" />
              <span className="bd-meta-item"><Clock size={12} />{readTime} min read</span>
              <div className="bd-meta-dot" />
              <span className="bd-meta-item"><Eye size={12} />{data.views?.toLocaleString()} views</span>
              <div className="bd-meta-dot" />
              <span className="bd-meta-item"><MessageCircle size={12} />{commentCount} comments</span>
            </div>
          </div>
        </div>

        {/* ── BODY ─────────────────────────────── */}
        <div className="bd-body">

          {/* Article */}
          <article>
            <div className="bd-article-card">
              <div className="bd-read-line">
                <Bookmark size={13} />
                {readTime} minute read · {data.tags?.[0] ?? "Article"}
              </div>
              {renderContent(data.content ?? "")}
            </div>
          </article>

          {/* Sidebar */}
          <aside className="bd-sidebar">

            {/* Stats */}
            <div className="bd-stats-card">
              <p className="bd-stats-label">Blog Statistics</p>
              <div className="bd-stats-grid">
                <div>
                  <div className="bd-stat-val">{data.views?.toLocaleString()}</div>
                  <div className="bd-stat-key">Views</div>
                </div>
                <div>
                  <div className="bd-stat-val">{commentCount}</div>
                  <div className="bd-stat-key">Comments</div>
                </div>
                <div>
                  <div className="bd-stat-val">{readTime}m</div>
                  <div className="bd-stat-key">Read Time</div>
                </div>
                <div>
                  <div className="bd-stat-val">{data.tags?.length ?? 0}</div>
                  <div className="bd-stat-key">Tags</div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bd-info-card">
              <div className="bd-info-avatar">{authorInitial}</div>
              <div className="bd-info-name">{data.authorName ?? "DevNexus Author"}</div>
              <div className="bd-info-sub">Content Creator</div>
              <div className="bd-divider" />
              <div className="bd-row">
                <div className="bd-row-icon"><CalendarDays size={14} /></div>
                <div>
                  <div className="bd-row-label">Published</div>
                  <div className="bd-row-val">{formattedDate}</div>
                </div>
              </div>
              <div className="bd-row">
                <div className="bd-row-icon"><TrendingUp size={14} /></div>
                <div>
                  <div className="bd-row-label">Status</div>
                  <div className="bd-row-val">{statusLabel[data.status] ?? data.status}</div>
                </div>
              </div>
              <div className="bd-row">
                <div className="bd-row-icon"><User size={14} /></div>
                <div>
                  <div className="bd-row-label">Featured</div>
                  <div className="bd-row-val">{data.isFeatured ? "⭐ Yes" : "No"}</div>
                </div>
              </div>
            </div>

            {/* Tags */}
            {data.tags?.length > 0 && (
              <div className="bd-tags-card">
                <p className="bd-tags-title">Topics</p>
                <div className="bd-tags-wrap">
                  {data.tags.map((tag: string) => (
                    <span key={tag} className="bd-tag">
                      <Hash size={9} />{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </aside>
        </div>
      </div>
    </>
  );
};

export default Page;
