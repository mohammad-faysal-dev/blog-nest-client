"use client";

import { useState } from "react";
import { ArrowRight, ChevronDown, HelpCircle, Sparkles, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/modules/AnimatedSection";

const faqs = [
    {
        question: "How often are new articles published?",
        answer:
            "We publish high-quality technical articles, tutorials, and insights every week, ensuring you stay up to date with the fast-paced tech world.",
        tag: "Content",
        tagColor: "bg-violet-500/10 text-violet-500",
    },
    {
        question: "Can I contribute to the blog?",
        answer:
            "Absolutely! We're always looking for passionate developers and industry experts to share their knowledge. Submit a proposal and our editorial team will review it.",
        tag: "Community",
        tagColor: "bg-purple-500/10 text-purple-500",
    },
    {
        question: "Who is the content for?",
        answer:
            "Our content caters to all levels, from beginner tutorials to advanced system design and architecture deep dives. There's something for everyone.",
        tag: "Audience",
        tagColor: "bg-fuchsia-500/10 text-fuchsia-500",
    },
    {
        question: "Is the content free to read?",
        answer:
            "Yes! All our articles and tutorials are completely free. We believe great knowledge should be accessible to every developer around the world.",
        tag: "Pricing",
        tagColor: "bg-pink-500/10 text-pink-500",
    },
];

export function FaqSection() {
    const [openIdx, setOpenIdx] = useState<number | null>(0);

    const toggle = (idx: number) => {
        setOpenIdx((prev) => (prev === idx ? null : idx));
    };

    return (
        <section className="py-32 relative overflow-hidden bg-background">

            {/* Background decor */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]
                        bg-gradient-radial from-primary/8 via-primary/3 to-transparent
                        rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px]
                        bg-gradient-to-tl from-violet-500/6 to-transparent rounded-full blur-[90px]" />
                {/* Dot grid */}
                <div className="absolute inset-0
                        [background-image:radial-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px)]
                        [background-size:30px_30px]
                        [mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,#000_40%,transparent_100%)]" />
            </div>

            <div className="container mx-auto px-4 md:px-6">

                {/* ── Heading ── */}
                <AnimatedSection className="text-center mb-20" direction="up">
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full
                          border border-primary/20 bg-primary/8 text-primary
                          text-sm font-bold tracking-widest uppercase mb-7">
                        <Sparkles className="h-3.5 w-3.5 animate-glow-pulse" />
                        Got Questions?
                    </div>

                    <h2 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tighter
                         leading-[1.08] text-foreground mb-5">
                        Frequently{" "}
                        <span className="text-gradient">Asked</span>{" "}
                        Questions
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed font-medium">
                        Everything you need to know about our content, community, and how
                        you can contribute.
                    </p>
                </AnimatedSection>

                {/* ── Two-column layout ── */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">

                    {/* Left: sticky card (desktop only) */}
                    <AnimatedSection className="sticky top-28 hidden lg:flex flex-col gap-5" direction="left">

                        {/* Support card */}
                        <div className="rounded-3xl border border-border/50 bg-card p-9
                            shadow-2xl shadow-black/5 relative overflow-hidden
                            hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1
                            transition-all duration-500 group">
                            {/* Glow blob */}
                            <div className="absolute top-0 right-0 w-48 h-48 bg-primary/8 rounded-full
                              blur-[60px] group-hover:bg-primary/14 transition-colors duration-500" />
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl
                              bg-gradient-to-r from-[#8B5CF6] via-[#C084FC] to-[#EC4899]
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70
                                flex items-center justify-center mb-6 shadow-lg shadow-primary/20
                                group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <HelpCircle className="h-7 w-7 text-primary-foreground" strokeWidth={1.5} />
                                </div>

                                <h3 className="text-2xl font-extrabold text-foreground tracking-tight mb-3">
                                    Still have questions?
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-7 font-medium">
                                    Can&apos;t find the answer you&apos;re looking for? Our friendly
                                    support team is happy to help.
                                </p>

                                <Button
                                    size="lg"
                                    className="rounded-full w-full font-bold shadow-xl shadow-primary/20
                             hover:shadow-primary/35 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Contact Support
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Mini stat cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { val: "15k+", lbl: "Members", sub: "Active devs", color: "from-[#8B5CF6] to-[#A855F7]" },
                                { val: "40+", lbl: "Contributors", sub: "Expert authors", color: "from-[#EC4899] to-[#F472B6]" },
                            ].map((s) => (
                                <div
                                    key={s.lbl}
                                    className="rounded-2xl border border-border/40 bg-card p-5 text-center
                             hover:border-primary/20 hover:shadow-lg hover:-translate-y-1
                             transition-all duration-400 group"
                                >
                                    <p className={`text-3xl font-extrabold tracking-tighter text-transparent
                                 bg-clip-text bg-gradient-to-br ${s.color}`}>
                                        {s.val}
                                    </p>
                                    <p className="text-xs font-bold text-foreground mt-1">{s.lbl}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium">{s.sub}</p>
                                </div>
                            ))}
                        </div>
                    </AnimatedSection>

                    {/* Right: Accordion */}
                    <AnimatedSection className="flex flex-col gap-4" direction="right">
                        {faqs.map((faq, idx) => {
                            const isOpen = openIdx === idx;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => toggle(idx)}
                                    className={`group rounded-2xl border cursor-pointer overflow-hidden
                              transition-all duration-400 relative
                              ${isOpen
                                            ? "border-primary/35 bg-card shadow-2xl shadow-primary/8"
                                            : "border-border/40 bg-card/60 hover:border-border hover:bg-card hover:shadow-lg"
                                        }`}
                                >
                                    {/* Left accent bar */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl
                                   bg-gradient-to-b from-primary to-violet-500
                                   transition-opacity duration-300
                                   ${isOpen ? "opacity-100" : "opacity-0"}`} />

                                    {/* Header */}
                                    <div className="flex items-center justify-between p-6 md:p-7 gap-4 pl-8">
                                        <div className="flex items-center gap-4">
                                            {/* Number */}
                                            <span className={`flex-shrink-0 text-xs font-extrabold w-9 h-9 rounded-xl
                                        flex items-center justify-center border-2 transition-all duration-300
                                        ${isOpen
                                                    ? "bg-primary text-primary-foreground border-primary scale-110"
                                                    : "bg-muted text-muted-foreground border-border group-hover:border-primary/30"
                                                }`}>
                                                {String(idx + 1).padStart(2, "0")}
                                            </span>

                                            <h3 className={`text-base md:text-lg font-extrabold tracking-tight
                                      transition-colors duration-300
                                      ${isOpen ? "text-primary" : "text-foreground"}`}>
                                                {faq.question}
                                            </h3>
                                        </div>

                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span className={`hidden sm:block text-xs font-bold px-3 py-1 rounded-full ${faq.tagColor}`}>
                                                {faq.tag}
                                            </span>
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center
                                       transition-all duration-300
                                       ${isOpen ? "bg-primary/10 rotate-180" : "bg-muted group-hover:bg-primary/5"}`}>
                                                <ChevronDown className={`h-4 w-4 transition-colors duration-300
                          ${isOpen ? "text-primary" : "text-muted-foreground"}`} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Animated body */}
                                    <div className={`grid transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)]
                                   ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                                        <div className="overflow-hidden">
                                            <div className="px-8 pb-8 pl-[4.75rem]">
                                                <div className="w-14 h-0.5 bg-gradient-to-r from-primary/40 to-transparent rounded-full mb-4" />
                                                <p className="text-muted-foreground text-base leading-relaxed font-medium">
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
                                className="rounded-full w-full font-bold border-border/60 hover:bg-muted/60"
                            >
                                <MessageCircle className="mr-2 h-4 w-4" />
                                Contact Support
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </div>
        </section>
    );
}
