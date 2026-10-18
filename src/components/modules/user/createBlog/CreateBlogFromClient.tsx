"use client";

import { createBlogPost } from "@/actions/blog.action";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z from "zod";
import {
  Type,
  FileText,
  Tag,
  Send,
  Loader2,
  X,
  Sparkles,
  Hash,
  AlignLeft,
  Zap,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(5000, "Content must be less than 5000 characters"),
  tags: z.string(),
});

const MAX_CONTENT = 5000;

const SUGGESTED_TAGS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "CSS",
  "Python",
  "DevOps",
  "AI",
  "Web3",
];

const CreateBlogFromClient = () => {
  const [tagInput, setTagInput] = useState("");
  const [tagChips, setTagChips] = useState<string[]>([]);
  const [published, setPublished] = useState(false);

  const addTag = (raw: string) => {
    raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tagChips.includes(t) && tagChips.length < 10)
      .forEach((t) => setTagChips((prev) => [...prev, t]));
    setTagInput("");
  };

  const removeTag = (tag: string) =>
    setTagChips((prev) => prev.filter((t) => t !== tag));

  const form = useForm({
    defaultValues: { title: "", content: "", tags: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Publishing your article…");
      const blogData = {
        title: value.title,
        content: value.content,
        tags: tagChips.length
          ? tagChips
          : value.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
      };
      try {
        const res = await createBlogPost(blogData);
        if (res.error) {
          toast.error(res.error.message, { id: toastId });
          return;
        }
        toast.success("🎉 Article published!", { id: toastId });
        setTagChips([]);
        setPublished(true);
        setTimeout(() => setPublished(false), 3000);
      } catch {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <div className="relative w-full space-y-4">

      {/* ── Main Editor Card ── */}
      <div className="relative rounded-2xl border border-white/[0.08] bg-[#0c0c0e] overflow-hidden shadow-2xl">

        {/* Top gradient bar */}
        <div className="h-[2px] w-full bg-gradient-to-r from-violet-500 via-cyan-400 to-indigo-500" />

        {/* Card Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 border border-white/10">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white">Article Editor</p>
              <p className="text-[11px] text-neutral-500">Craft your story</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Autosave pill */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-[11px] font-medium text-emerald-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              Auto-saving
            </span>
            {/* Draft label */}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/8 px-3 py-1 text-[11px] font-medium text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
              Draft
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          id="blog-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="divide-y divide-white/[0.05]"
        >
          {/* ─── Title Field ─── */}
          <form.Field name="title">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="px-6 py-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Type className="h-3.5 w-3.5 text-cyan-400" />
                    <label htmlFor="blog-title" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                      Title <span className="text-red-400 normal-case tracking-normal">*</span>
                    </label>
                  </div>
                  <input
                    id="blog-title"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Write a compelling headline that grabs attention…"
                    autoComplete="off"
                    className={`
                      w-full bg-transparent text-xl font-bold text-white
                      placeholder:text-neutral-700 outline-none border-0
                      border-b-2 pb-2 transition-all duration-300
                      ${isInvalid
                        ? "border-red-500/50"
                        : "border-white/10 focus:border-cyan-500/60"
                      }
                    `}
                  />
                  {isInvalid &&
                    field.state.meta.errors.map((err) => (
                      <p key={String(err)} className="mt-2 flex items-center gap-1 text-xs text-red-400">
                        <X className="h-3 w-3" /> {String(err)}
                      </p>
                    ))}
                </div>
              );
            }}
          </form.Field>

          {/* ─── Content Field ─── */}
          <form.Field name="content">
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              const charCount = field.state.value.length;
              const pct = Math.min((charCount / MAX_CONTENT) * 100, 100);
              const barColor = pct > 90 ? "bg-red-500" : pct > 70 ? "bg-amber-400" : "bg-cyan-500";

              return (
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <AlignLeft className="h-3.5 w-3.5 text-indigo-400" />
                      <label htmlFor="blog-content" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        Content <span className="text-red-400 normal-case tracking-normal">*</span>
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 w-24 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className={`text-[11px] font-mono tabular-nums ${pct > 90 ? "text-red-400" : "text-neutral-600"}`}>
                        {charCount.toLocaleString()} / {MAX_CONTENT.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <textarea
                    id="blog-content"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Start writing your article here…

Share your insights, code snippets, tutorials, or ideas with the world. Make it engaging and informative!"
                    rows={14}
                    className={`
                      w-full resize-none bg-transparent text-sm text-neutral-200
                      leading-[1.9] placeholder:text-neutral-700 outline-none
                      transition-all duration-200
                      ${isInvalid ? "text-red-200" : ""}
                    `}
                  />
                  {isInvalid &&
                    field.state.meta.errors.map((err) => (
                      <p key={String(err)} className="mt-1 flex items-center gap-1 text-xs text-red-400">
                        <X className="h-3 w-3" /> {String(err)}
                      </p>
                    ))}
                </div>
              );
            }}
          </form.Field>

          {/* ─── Tags Field ─── */}
          <form.Field name="tags">
            {(field) => (
              <div className="px-6 py-5">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="h-3.5 w-3.5 text-purple-400" />
                  <label htmlFor="blog-tags" className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                    Tags
                    <span className="ml-2 normal-case tracking-normal text-neutral-600 font-normal">(max 10)</span>
                  </label>
                </div>

                {/* Tag chips display */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {tagChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-300"
                    >
                      #{chip}
                      <button
                        type="button"
                        onClick={() => removeTag(chip)}
                        className="hover:text-red-400 transition-colors"
                      >
                        <X className="h-2.5 w-2.5" />
                      </button>
                    </span>
                  ))}
                  {tagChips.length < 10 && (
                    <div className="flex items-center">
                      <input
                        id="blog-tags"
                        name={field.name}
                        value={tagInput}
                        onChange={(e) => {
                          setTagInput(e.target.value);
                          field.handleChange(e.target.value);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === ",") {
                            e.preventDefault();
                            addTag(tagInput);
                          }
                          if (e.key === "Backspace" && !tagInput && tagChips.length > 0) {
                            removeTag(tagChips[tagChips.length - 1]);
                          }
                        }}
                        onBlur={() => {
                          if (tagInput.trim()) addTag(tagInput);
                          field.handleBlur();
                        }}
                        placeholder={tagChips.length === 0 ? "Add tags…" : ""}
                        className="h-7 min-w-[120px] bg-transparent text-sm text-white placeholder:text-neutral-700 outline-none"
                      />
                    </div>
                  )}
                </div>

                {/* Suggested tags */}
                <div>
                  <p className="text-[11px] text-neutral-600 mb-2">Suggested:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_TAGS.filter((t) => !tagChips.includes(t)).slice(0, 8).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-1 text-[11px] text-neutral-500 hover:border-violet-500/30 hover:bg-violet-500/10 hover:text-violet-300 transition-all duration-150"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form.Field>
        </form>

        {/* ── Footer / Publish Bar ── */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-white/[0.06] bg-white/[0.02]">
          <div className="flex items-center gap-2 text-xs text-neutral-600">
            <FileText className="h-3.5 w-3.5" />
            <span>
              {form.state.values.title
                ? `"${form.state.values.title.slice(0, 30)}${form.state.values.title.length > 30 ? "…" : ""}" · `
                : ""}
              {tagChips.length > 0 ? `${tagChips.length} tags · ` : ""}
              {form.state.values.content.split(/\s+/).filter(Boolean).length} words
            </span>
          </div>

          <button
            form="blog-form"
            type="submit"
            disabled={isSubmitting}
            className="
              relative flex items-center gap-2 px-7 py-2.5 rounded-xl
              font-semibold text-sm text-white overflow-hidden
              bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-600
              hover:from-violet-500 hover:via-indigo-500 hover:to-cyan-500
              shadow-[0_0_20px_rgba(139,92,246,0.3)]
              hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]
              hover:-translate-y-0.5 active:translate-y-0
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
              transition-all duration-200 group
            "
          >
            {/* Shimmer */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin relative" />
                <span className="relative">Publishing…</span>
              </>
            ) : published ? (
              <>
                <CheckCircle2 className="h-4 w-4 relative text-emerald-300" />
                <span className="relative text-emerald-300">Published!</span>
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 relative" />
                <span className="relative">Publish Article</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogFromClient;
