"use client";

import { useEffect, useRef, ReactNode, CSSProperties } from "react";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    delay?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    style?: CSSProperties;
}

export function AnimatedSection({
    children,
    className = "",
    delay = 0,
    direction = "up",
    style,
}: AnimatedSectionProps) {
    const ref = useRef<HTMLDivElement>(null);

    const initialTransforms: Record<string, string> = {
        up: "translateY(36px)",
        down: "translateY(-36px)",
        left: "translateX(36px)",
        right: "translateX(-36px)",
        none: "translateY(0)",
    };

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        el.style.opacity = "0";
        el.style.transform = initialTransforms[direction] ?? "translateY(36px)";
        el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.style.opacity = "1";
                    el.style.transform = direction === "none" ? "translateY(0)" : "none";
                    observer.disconnect();
                }
            },
            { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div ref={ref} className={className} style={style}>
            {children}
        </div>
    );
}
