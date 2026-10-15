"use client";
import Link from "next/link";
import { Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
    /** Extra CSS classes for the wrapper <Link> */
    className?: string;
    /** Size variant: 'sm' (sidebar/mobile), 'md' (default navbar), 'lg' (footer) */
    size?: "sm" | "md" | "lg";
}

export function Logo({ className, size = "md" }: LogoProps) {
    const iconBox = {
        sm: "w-8 h-8 rounded-lg",
        md: "w-9 h-9 rounded-xl",
        lg: "w-10 h-10 rounded-2xl",
    }[size];

    const icon = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
    }[size];

    const text = {
        sm: "text-xl",
        md: "text-xl",
        lg: "text-2xl",
    }[size];

    return (
        <Link href="/" className={cn("flex items-center gap-2.5 group", className)}>
            <div
                className={cn(
                    "flex items-center justify-center bg-gradient-to-br from-primary to-purple-600 text-white",
                    "shadow-lg shadow-primary/20 group-hover:shadow-primary/40",
                    "transition-all duration-300 group-hover:-translate-y-0.5",
                    iconBox
                )}
            >
                <Code2 className={icon} />
            </div>
            <span
                className={cn(
                    "font-extrabold tracking-tight bg-clip-text text-transparent",
                    "bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary",
                    "transition-all duration-300",
                    text
                )}
            >
                DevNexus
            </span>
        </Link>
    );
}
