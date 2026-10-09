"use client";

import { useEffect, useRef, ReactNode } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number; // ms
    direction?: "up" | "down" | "left" | "right" | "none";
}

export function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const translateMap: Record<string, string> = {
        up: "translateY(40px)",
        down: "translateY(-40px)",
        left: "translateX(40px)",
        right: "translateX(-40px)",
        none: "none",
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Initial state
        el.style.opacity = "0";
        el.style.transform = translateMap[direction] ?? "translateY(40px)";
        el.style.transition = `opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = "none";
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(el);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}
