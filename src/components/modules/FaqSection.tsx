"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const faqs = [
    {
        question: "How often are new articles published?",
        answer:
            "We publish high-quality technical articles, tutorials, and insights every week, ensuring you stay up to date with the fast-paced tech world.",
        tag: "Content",
    },
    {
        question: "Can I contribute to the blog?",
        answer:
            "Absolutely! We're always looking for passionate developers and industry experts to share their knowledge. Submit a proposal and our editorial team will review it.",
        tag: "Community",
    },
    {
        question: "Who is the content for?",
        answer:
            "Our content caters to all levels, from beginner tutorials to advanced system design and architecture deep dives. There's something for everyone.",
        tag: "Audience",
    },
    {
        question: "Is the content free to read?",
        answer:
            "Yes! All our articles and tutorials are completely free. We believe great knowledge should be accessible to every developer around the world.",
        tag: "Pricing",
    },
];

export function FaqSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIdx((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="py-28 relative overflow-hidden bg-background">
            {/* Background decorations */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-primary/6 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px]" />
                {/* Dot grid */}
                <div className="absolute inset-0 [background-image:radial-gradient(circle,hsl(var(--foreground)/0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 md:px-6">
                {/* Top Label */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-semibold tracking-wide">
                        <Sparkles className="h-3.5 w-3.5" />
                        Got Questions?
                    </div>
                </div>

                {/* Heading */}
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-foreground mb-4">
                        Frequently{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">
                            Asked
                        </span>{" "}
                        Questions
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        Everything you need to know about our content, community, and how
                        you can contribute.
                    </p>
                </div>

                {/* Two-column layout */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16 items-start">
                    {/* Left: Static card */}
                    <div className="sticky top-28 hidden lg:flex flex-col gap-6">
                        <div className="rounded-3xl border border-border/50 bg-card p-8 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />
                            <div className="p-3 rounded-2xl bg-primary/10 w-fit mb-5">
                                <HelpCircle className="h-6 w-6 text-primary" strokeWidth={1.5} />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                                Still have questions?
                            </h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                                Can&apos;t find the answer you&apos;re looking for? Reach out to
                                our friendly support team.
                            </p>
                            <Button
                                size="lg"
                                className="rounded-full w-full font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5"
                            >
                                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>

                        {/* Stats strip */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { value: "15k+", label: "Members" },
                                { value: "40+", label: "Contributors" },
                            ].map((s) => (
                                <div
                                    key={s.label}
                                    className="rounded-2xl border border-border/40 bg-card p-5 text-center"
                                >
                                    <p className="text-3xl font-extrabold tracking-tighter text-foreground">
                                        {s.value}
                                    </p>
                                    <p className="text-xs font-medium text-muted-foreground mt-1">
                                        {s.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Accordion */}
                    <div className="flex flex-col gap-4">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    className={`group rounded-2xl border transition-all duration-300 overflow-hidden cursor-pointer
                    ${isOpen
                                            ? "border-primary/40 bg-card shadow-xl shadow-primary/5"
                                            : "border-border/40 bg-card/60 hover:border-border hover:bg-card"
                                        }`}
                                    onClick={() => toggle(idx)}
                                >
                                    {/* Header */}
                                    <div className="flex items-center justify-between p-6 md:p-7 gap-4">
                                        <div className="flex items-center gap-4">
                                            {/* Number badge */}
                                            <span
                                                className={`flex-shrink-0 text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300
                          ${isOpen
                                                        ? "bg-primary text-primary-foreground border-primary"
                                                        : "bg-muted text-muted-foreground border-border"
                                                    }`}
                                            >
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>
                                            <h3
                                                className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-300
                        ${isOpen ? "text-primary" : "text-foreground"}`}
                                            >
                                                {faq.question}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            {/* Tag — visible only on desktop */}
                                            <span className="hidden sm:block text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
                                                {faq.tag}
                                            </span>
                                            <ChevronDown
                                                className={`h-5 w-5 text-muted-foreground transition-transform duration-300
                          ${isOpen ? "rotate-180 text-primary" : ""}`}
                                            />
                                        </div>
                                    </div>

                                    {/* Body — animated */}
                                    <div
                                        className={`grid transition-all duration-300 ease-in-out
                      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 md:px-7 pb-7 pl-[4.5rem]">
                                                {/* Progress line */}
                                                <div className="w-12 h-0.5 bg-primary/30 rounded-full mb-4" />
                                                <p className="text-muted-foreground text-base leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Mobile CTA */}
                        <div className="lg:hidden mt-2">
                            <Button
                                size="lg"
                                variant="outline"
                                className="rounded-full w-full font-semibold border-border"
                            >
                                Contact Support <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
