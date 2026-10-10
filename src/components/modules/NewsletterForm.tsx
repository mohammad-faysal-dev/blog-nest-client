"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);

        setTimeout(() => {
            toast.success("🎉 You're subscribed! Welcome aboard.", {
                description: "Expect weekly dev insights straight to your inbox.",
                duration: 5000,
            });
            setDone(true);
            setLoading(false);

            // Reset after 4s
            setTimeout(() => {
                setDone(false);
                setEmail("");
            }, 4000);
        }, 900);
    };

    if (done) {
        return (
            <div className="w-full flex flex-col items-center gap-3 py-4 animate-slide-up">
                <div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30
                        flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-green-400" />
                </div>
                <p className="text-white font-bold text-lg">You&apos;re subscribed!</p>
                <p className="text-white/50 text-sm">Check your inbox for a welcome email.</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col sm:flex-row gap-3"
        >
            <div className="relative flex-1 group">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="h-14 w-full rounded-2xl
                     bg-white/8 border border-white/12
                     backdrop-blur-sm px-5 pr-4 text-sm text-white
                     placeholder:text-white/35 font-medium
                     focus:outline-none focus:ring-2 focus:ring-white/20
                     focus:bg-white/12 focus:border-white/20
                     transition-all duration-300"
                />
                {/* Subtle glow on focus */}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0
                        group-focus-within:opacity-100 pointer-events-none
                        transition-opacity duration-300
                        shadow-[0_0_20px_rgba(255,255,255,0.05)]" />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="group h-14 px-7 rounded-2xl bg-white text-[#0D0D10]
                   font-extrabold text-sm tracking-tight shrink-0
                   hover:bg-white/90 hover:scale-105 active:scale-95
                   disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                   transition-all duration-300 shadow-2xl shadow-black/30
                   flex items-center justify-center gap-2.5 min-w-[140px]"
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Joining...
                    </>
                ) : (
                    <>
                        Subscribe
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                )}
            </button>
        </form>
    );
}
