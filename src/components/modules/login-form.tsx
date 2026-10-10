"use client";

import { useState } from "react";
import { cn } from "cn";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import z from "zod";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Mail,
  Lock,
  Loader2,
  Eye,
  EyeOff,
  ArrowRight,
  BookOpen,
  Sparkles,
  TrendingUp,
  Users,
  Star,
  Quote
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const formSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

const STATS = [
  { icon: Users, label: "Active readers", value: "50K+" },
  { icon: BookOpen, label: "Articles", value: "2,400+" },
  { icon: Star, label: "Daily views", value: "120K+" },
  { icon: TrendingUp, label: "Growth", value: "+38%" },
];

const TESTIMONIAL = {
  quote: "The best tech blog I've ever read. Clear, deep, and always up to date.",
  author: "Sarah K.",
  role: "Senior Engineer @ Stripe",
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
      callbackURL: "http://localhost:3000/",
    });
  };

  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onSubmit: formSchema },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Signing you in...");
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Welcome back!", { id: toastId });
      } catch {
        toast.error("Something went wrong, please try again", { id: toastId });
      }
    },
  });

  const isSubmitting = form.state.isSubmitting;

  return (
    <div
      className={cn(
        "flex min-h-svh w-full items-center justify-center py-24 bg-[#0a0a0a] relative overflow-hidden",
        className
      )}
      {...props}
    >
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-blue-900/20 blur-[120px] mix-blend-screen" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[60%] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen" />
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[50%] rounded-full bg-indigo-900/20 blur-[120px] mix-blend-screen" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 flex w-full max-w-7xl">
        <div className="flex w-full min-h-[800px] overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-black/40 backdrop-blur-2xl">

          {/* ── LEFT BRAND PANEL (NEW DESIGN) ── */}
          <div className="relative hidden w-full lg:flex lg:w-5/12 flex-col justify-between overflow-hidden p-12 bg-white/[0.02] border-r border-white/10">
            {/* Middle Content */}
            <div className="relative z-10 my-auto py-12">
              <h1 className="text-5xl font-extrabold leading-[1.15] text-white tracking-tight mb-6">
                Discover.<br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500">
                  Innovate.
                </span><br />
                Scale.
              </h1>
              <p className="max-w-md text-lg text-neutral-400 leading-relaxed mb-10">
                Join our ecosystem of visionary developers. Elevate your skills and build the future together.
              </p>

              {/* Stats - Redesigned to pills */}
              <div className="flex flex-wrap gap-3">
                {STATS.map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-2 px-4 backdrop-blur-md hover:bg-white/10 transition-colors"
                  >
                    <Icon className="h-4 w-4 text-cyan-400" />
                    <div>
                      <span className="text-sm font-bold text-white mr-1.5">{value}</span>
                      <span className="text-xs text-neutral-400">{label.toLowerCase()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* ── RIGHT FORM PANEL (NEW DESIGN) ── */}
          <div className="relative flex flex-1 flex-col items-center justify-center p-8 sm:p-16 overflow-y-auto">
            <div className="w-full max-w-sm">
              {/* Heading */}
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                  Welcome back
                </h2>
                <p className="text-sm text-neutral-400">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Google Button */}
              <Button
                id="google-login-btn"
                className="w-full h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-all mb-8 shadow-sm hover:shadow-md"
                onClick={() => handleGoogleLogin()}
                variant="ghost"
                type="button"
              >
                <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign in with Google
              </Button>

              {/* Divider */}
              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0a0a0a] px-4 text-neutral-500 font-medium tracking-widest">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Form */}
              <form
                id="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
                className="space-y-6"
              >
                <FieldGroup className="gap-6">
                  {/* Email */}
                  <form.Field
                    name="email"
                    children={(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel
                            htmlFor="login-email"
                            className="text-sm font-medium text-neutral-300 mb-2 block"
                          >
                            Email Address
                          </FieldLabel>
                          <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-cyan-400" />
                            <Input
                              id="login-email"
                              name={field.name}
                              type="email"
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="you@example.com"
                              autoComplete="email"
                              className="h-14 pl-12 pr-4 rounded-xl border-white/10 bg-white/5 text-white text-base transition-all focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 focus-visible:bg-white/10 placeholder:text-neutral-600"
                            />
                          </div>
                          {isInvalid && <FieldError errors={field.state.meta.errors} className="mt-2 text-xs text-red-400 block" />}
                        </Field>
                      );
                    }}
                  />

                  {/* Password */}
                  <form.Field
                    name="password"
                    children={(field) => {
                      const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <div className="flex items-center justify-between mb-2">
                            <FieldLabel
                              htmlFor="login-password"
                              className="text-sm font-medium text-neutral-300"
                            >
                              Password
                            </FieldLabel>
                            <a
                              href="#"
                              className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors hover:underline"
                            >
                              Forgot password?
                            </a>
                          </div>
                          <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500 transition-colors group-focus-within:text-cyan-400" />
                            <Input
                              id="login-password"
                              name={field.name}
                              type={showPassword ? "text" : "password"}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder="••••••••"
                              autoComplete="current-password"
                              className="h-14 pl-12 pr-12 rounded-xl border-white/10 bg-white/5 text-white text-base transition-all focus-visible:ring-1 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 focus-visible:bg-white/10 placeholder:text-neutral-600"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 transition-colors"
                              tabIndex={-1}
                            >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                            </button>
                          </div>
                          {isInvalid && <FieldError errors={field.state.meta.errors} className="mt-2 text-xs text-red-400 block" />}
                        </Field>
                      );
                    }}
                  />
                </FieldGroup>

                {/* Submit */}
                <Button
                  id="login-submit-btn"
                  form="login-form"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-14 rounded-xl font-bold text-base text-white group relative overflow-hidden transition-all shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:-translate-y-0.5 mt-4 border-0"
                  style={{
                    background: "linear-gradient(to right, #06b6d4, #3b82f6)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                  <span className="relative flex items-center justify-center">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                      </>
                    )}
                  </span>
                </Button>
              </form>

              {/* Sign up link */}
              <p className="mt-10 text-center text-sm text-neutral-400">
                New to BlogNest?{" "}
                <Link
                  href="/signup"
                  className="font-medium text-cyan-400 hover:text-cyan-300 transition-colors hover:underline underline-offset-4"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}