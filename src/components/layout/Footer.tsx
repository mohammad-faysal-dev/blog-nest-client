"use client"
import Link from 'next/link';
import {
    Globe,
    MessageCircle,
    Share2,
    Mail,
    MapPin,
    Phone,
    ArrowUpRight,
    Flame,
    Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    return (
        <footer className="relative border-t border-border/50 bg-background/80 backdrop-blur-2xl overflow-hidden pt-20 pb-12">
            {/* Background Radial Glow Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-primary/15 via-purple-500/10 to-transparent blur-[120px] pointer-events-none -z-10" />
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-border/40">

                    {/* 1. Brand & Description Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link href="/" className="inline-flex items-center gap-2.5 group">
                            <div className="bg-gradient-to-br from-primary to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-primary/25 group-hover:scale-105 transition-transform duration-300">
                                <Flame className="h-6 w-6 text-primary-foreground" />
                            </div>
                            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-transparent">
                                DevLogs
                            </span>
                        </Link>

                        <p className="text-muted-foreground text-sm leading-relaxed max-w-sm font-normal">
                            Empowering developers with cutting-edge tutorials, expert insights, and open-source contributions. Build the future with us.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5 pt-2">
                            {[
                                { icon: MessageCircle, href: "#", label: "Community" },
                                { icon: Globe, href: "#", label: "Website" },
                                { icon: Share2, href: "#", label: "Share" }
                            ].map((social, idx) => (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    size="icon"
                                    className="h-10 w-10 rounded-xl bg-card/50 border-border/60 hover:bg-primary/10 hover:border-primary/40 hover:text-primary transition-all duration-300 shadow-sm"
                                    aria-label={social.label}

                                >
                                    <Link href={social.href}>
                                        <social.icon className="h-4 w-4" />
                                    </Link>
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* 2. Resources Navigation (2 cols) */}
                    <div className="lg:col-span-2 space-y-5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Resources</h3>
                        <ul className="space-y-3">
                            {['Documentation', 'Tutorials', 'API Reference', 'Blog', 'Community'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{item}</span>
                                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. Company Navigation (2 cols) */}
                    <div className="lg:col-span-2 space-y-5">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Company</h3>
                        <ul className="space-y-3">
                            {['About Us', 'Careers', 'Brand Assets', 'Contact', 'Partners'].map((item) => (
                                <li key={item}>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                                    >
                                        <span>{item}</span>
                                        <ArrowUpRight className="h-3 w-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-primary" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 4. Contact & Newsletter (4 cols) */}
                    <div className="lg:col-span-4 space-y-6">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-foreground/80">Stay Connected</h3>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                                <MapPin className="h-4 w-4 text-primary shrink-0" />
                                <span>123 Tech Avenue, Innovation City, CA 94016</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                                <Mail className="h-4 w-4 text-primary shrink-0" />
                                <span>hello@devlogs.io</span>
                            </div>
                        </div>

                        {/* Newsletter Input Form */}
                        <div className="space-y-2 pt-2">
                            <p className="text-xs font-medium text-muted-foreground">
                                Subscribe for weekly tech updates and tutorials.
                            </p>
                            <form onSubmit={(e) => e.preventDefault()} className="relative flex items-center">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-card/40 border-border/60 focus-visible:ring-primary/30 h-12 rounded-xl pl-4 pr-12 text-sm backdrop-blur-md shadow-inner"
                                />
                                <Button
                                    type="submit"
                                    size="icon"
                                    className="absolute right-1 h-10 w-10 rounded-lg shadow-md hover:scale-105 active:scale-95 transition-all bg-primary text-primary-foreground"
                                >
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar: Copyright & Legal */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-medium text-muted-foreground">
                    <p>© {new Date().getFullYear()} DevLogs Inc. All rights reserved.</p>

                    <div className="flex items-center gap-6">
                        <Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-foreground transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}