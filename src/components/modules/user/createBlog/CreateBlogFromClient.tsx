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
  Sparkles,
  X,
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

const CreateBlogFromClient = () => {
  const [tagInput, setTagInput] = useState("");
  const [tagChips, setTagChips] = useState<string[]>([]);

  const addTag = (raw: string) => {
    raw
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !tagChips.includes(t))
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
      } catch {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <div className="relative w-full">
      {/* Ambient glows behind the card */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]" />

      <div className="relative rounded-3xl border border-white/10 bg-[#0d0d0d]/80 backdrop-blur-2xl shadow-[0_8px_60px_rgba(0,0,0,0.6)] overflow-hidden">

        {/* ── Gradient top bar ── */}
        <div className="h-[3px] w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />

        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-cyan-400" />
              <h2 className="text-2xl font-extrabold tracking-tight text-white">
                Article Editor
              </h2>
            </div>
            <p className="text-sm text-neutral-500">
              Craft your ideas and share them with the world.
            </p>
          </div>
          {/* Draft badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
            Draft
          </span>
        </div>

        {/* ── Divider ── */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Form ── */}
        <form
          id="blog-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="px-6 py-5 space-y-5"
        >
          {/* ─── Title ─── */}
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <div className="space-y-2">
                  <label
                    htmlFor="blog-title"
                    className="flex items-center gap-2 text-sm font-semibold text-neutral-300"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-cyan-500/15 text-cyan-400">
                      <Type className="h-3.5 w-3.5" />
                    </span>
                    Blog Title
                    <span className="text-red-400">*</span>
                  </label>
                  <div className="relative group">
                    <input
                      id="blog-title"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Write a headline that grabs attention…"
                      autoComplete="off"
                      className={`
                        w-full h-14 rounded-2xl border bg-white/[0.04] px-5 text-base text-white
                        placeholder:text-neutral-600 outline-none transition-all duration-200
                        hover:bg-white/[0.07]
                        focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)]
                        ${isInvalid
                          ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                          : "border-white/10 focus:border-cyan-500/60"
                        }
                      `}
                    />
                  </div>
                  {isInvalid &&
                    field.state.meta.errors.map((err) => (
                      <p key={String(err)} className="flex items-center gap-1 text-xs text-red-400">
                        <X className="h-3 w-3" /> {String(err)}
                      </p>
                    ))}
                </div>
              );
            }}
          </form.Field>

          {/* ─── Content ─── */}
          <form.Field name="content">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              const charCount = field.state.value.length;
              const pct = Math.min((charCount / MAX_CONTENT) * 100, 100);
              const barColor =
                pct > 90
                  ? "bg-red-500"
                  : pct > 70
                    ? "bg-amber-400"
                    : "bg-cyan-400";

              return (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="blog-content"
                      className="flex items-center gap-2 text-sm font-semibold text-neutral-300"
                    >
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-400">
                        <FileText className="h-3.5 w-3.5" />
                      </span>
                      Content
                      <span className="text-red-400">*</span>
                    </label>
                    <span className={`text-xs font-mono ${pct > 90 ? "text-red-400" : "text-neutral-500"}`}>
                      {charCount.toLocaleString()} / {MAX_CONTENT.toLocaleString()}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <textarea
                    id="blog-content"
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Start writing your article here… Share your insights, code snippets, and ideas."
                    rows={7}
                    className={`
                      w-full resize-y rounded-2xl border bg-white/[0.04] px-5 py-4
                      text-sm text-white leading-relaxed
                      placeholder:text-neutral-600 outline-none transition-all duration-200
                      hover:bg-white/[0.07]
                      focus:bg-white/[0.08] focus:shadow-[0_0_0_3px_rgba(6,182,212,0.15)]
                      ${isInvalid
                        ? "border-red-500/50 focus:border-red-500 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
                        : "border-white/10 focus:border-cyan-500/60"
                      }
                    `}
                  />
                  {isInvalid &&
                    field.state.meta.errors.map((err) => (
                      <p key={String(err)} className="flex items-center gap-1 text-xs text-red-400">
                        <X className="h-3 w-3" /> {String(err)}
                      </p>
                    ))}
                </div>
              );
            }}
          </form.Field>

          {/* ─── Tags ─── */}
          <form.Field name="tags">
            {(field) => (
              <div className="space-y-2">
                <label
                  htmlFor="blog-tags"
                  className="flex items-center gap-2 text-sm font-semibold text-neutral-300"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/15 text-purple-400">
                    <Tag className="h-3.5 w-3.5" />
                  </span>
                  Tags
                </label>

                {/* Tag chips */}
                {tagChips.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {tagChips.map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300"
                      >
                        #{chip}
                        <button
                          type="button"
                          onClick={() => removeTag(chip)}
                          className="hover:text-red-400 transition-colors"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3">
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
                    }}
                    onBlur={() => {
                      if (tagInput.trim()) addTag(tagInput);
                      field.handleBlur();
                    }}
                    placeholder="Type a tag and press Enter or comma…"
                    className="
                      flex-1 h-12 rounded-2xl border border-white/10 bg-white/[0.04] px-5
                      text-sm text-white placeholder:text-neutral-600 outline-none
                      transition-all duration-200 hover:bg-white/[0.07]
                      focus:border-purple-500/60 focus:bg-white/[0.08]
                      focus:shadow-[0_0_0_3px_rgba(168,85,247,0.15)]
                    "
                  />
                  <button
                    type="button"
                    onClick={() => addTag(tagInput)}
                    className="h-12 px-5 rounded-2xl border border-white/10 bg-white/5 text-sm font-medium text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                  >
                    Add
                  </button>
                </div>
                <p className="text-neutral-600 text-xs">
                  Press <kbd className="rounded px-1 py-0.5 bg-white/10 font-mono text-neutral-400">Enter</kbd> or{" "}
                  <kbd className="rounded px-1 py-0.5 bg-white/10 font-mono text-neutral-400">,</kbd> to add a tag.
                </p>
              </div>
            )}
          </form.Field>
        </form>

        {/* ── Divider ── */}
        <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Footer / Publish ── */}
        <div className="px-6 py-4 flex items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            Your article will be reviewed before publishing.
          </p>

          <button
            form="blog-form"
            type="submit"
            disabled={isSubmitting}
            className="
              relative flex items-center gap-2 px-8 py-3.5 rounded-2xl
              font-bold text-sm text-white overflow-hidden
              bg-gradient-to-r from-cyan-500 to-blue-600
              shadow-[0_0_24px_rgba(6,182,212,0.35)]
              hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] hover:-translate-y-0.5
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0
              transition-all duration-200 group
            "
          >
            {/* Shimmer overlay */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="relative">Publishing…</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4 relative" />
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
