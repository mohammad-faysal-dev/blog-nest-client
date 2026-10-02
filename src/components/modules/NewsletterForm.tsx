"use client";

import { useState } from "react";
import { toast } from "sonner";

export function NewsletterForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            toast.success("🎉 Subscribed successfully! Welcome aboard.", {
                description: "You'll receive weekly dev insights in your inbox.",
            });
            setEmail("");
            setLoading(false);
        }, 800);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3 shrink-0"
        >
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="h-12 w-full sm:w-64 rounded-xl bg-white/15 border border-white/20 backdrop-blur-sm px-4 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
            />
            <button
                type="submit"
                disabled={loading}
                className="h-12 px-6 rounded-xl bg-white text-purple-700 font-bold text-sm hover:bg-white/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-black/20 shrink-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
                {loading ? "Subscribing..." : "Subscribe"}
            </button>
        </form>
    );
}
