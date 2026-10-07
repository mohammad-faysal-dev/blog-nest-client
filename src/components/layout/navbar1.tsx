"use client";
import React, { useState, useEffect } from "react";
import { Menu, Code2 } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./ModeToggle";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  menu = [
    { title: "Home", url: "/" },
    { title: "Blogs", url: "/blogs" },
    { title: "About", url: "/about" },
    { title: "Dashboard", url: "/dashboard" },
  ],
  auth = {
    login: { title: "Log In", url: "/login" },
    signup: { title: "Sign Up", url: "/signup" },
  },
  className,
}: Navbar1Props) => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-white/10 shadow-sm"
          : "bg-transparent py-2",
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300 group-hover:-translate-y-0.5">
              <Code2 className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 group-hover:to-primary transition-all duration-300">
              DevNexus
            </span>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6 bg-background/40 backdrop-blur-md px-6 py-2 rounded-full border border-border/50 shadow-sm">
              {menu.map((item) => (
                <Link
                  key={item.title}
                  href={item.url}
                  className="relative group px-2 py-1"
                >
                  <span
                    className={cn(
                      "text-sm font-semibold transition-colors duration-200",
                      pathname === item.url
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  >
                    {item.title}
                  </span>
                  <span
                    className={cn(
                      "absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full origin-left transition-transform duration-300",
                      pathname === item.url
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* User Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <ModeToggle />
            <div className="h-6 w-px bg-border/50 mx-1" />
            <Link href={auth.login.url}>
              <Button
                variant="ghost"
                className="font-semibold text-sm hover:bg-primary/10 hover:text-primary rounded-full transition-all"
              >
                {auth.login.title}
              </Button>
            </Link>
            <Link href={auth.signup.url}>
              <Button className="font-semibold text-sm rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-md shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5">
                {auth.signup.title}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 lg:hidden">
            <ModeToggle />
            <Sheet>
              <SheetTrigger render={<Button variant="outline" size="icon" className="rounded-full border-border/50 bg-background/50 backdrop-blur-md" />}>
                <Menu className="h-5 w-5" />
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-border/50 bg-background/95 backdrop-blur-xl">
                <SheetHeader className="mb-8 text-left">
                  <SheetTitle>
                    <Link href="/" className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary to-purple-600 text-white shadow-lg">
                        <Code2 className="h-4 w-4" />
                      </div>
                      <span className="text-xl font-extrabold tracking-tight">
                        DevNexus
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {menu.map((item) => (
                      <Link
                        key={item.title}
                        href={item.url}
                        className={cn(
                          "px-4 py-3 rounded-2xl text-base font-semibold transition-all",
                          pathname === item.url
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </div>

                  <div className="h-px bg-border/50 w-full my-2" />

                  <div className="flex flex-col gap-3">
                    <Link href={auth.login.url} className="w-full">
                      <Button
                        variant="outline"
                        className="w-full rounded-2xl h-12 font-semibold border-border/50"
                      >
                        {auth.login.title}
                      </Button>
                    </Link>
                    <Link href={auth.signup.url} className="w-full">
                      <Button className="w-full rounded-2xl h-12 font-semibold bg-gradient-to-r from-primary to-purple-600">
                        {auth.signup.title}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export { Navbar1 };

