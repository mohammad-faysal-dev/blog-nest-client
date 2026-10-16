"use client";

import React, { useState, useTransition } from "react";
import {
    User,
    Shield,
    LogOut,
    Camera,
    Check,
    Eye,
    EyeOff,
    ChevronRight,
    Loader2,
    Trash2,
    KeyRound,
    Globe,
    Mail,
    Lock,
    AlertTriangle,
    PenSquare,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// ── Tab definitions — only real functionality ────────────────────
const TABS = [
    { id: "account", label: "Account", icon: User },
    { id: "security", label: "Security", icon: Shield },
] as const;

type TabId = (typeof TABS)[number]["id"];

// ── Reusable UI helpers ──────────────────────────────────────────

function SettingCard({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                "rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl p-6",
                className
            )}
        >
            {children}
        </div>
    );
}

function SectionHeading({
    icon: Icon,
    label,
    accent = "cyan",
}: {
    icon: React.ElementType;
    label: string;
    accent?: "cyan" | "violet" | "amber" | "red";
}) {
    const colors = {
        cyan: "bg-cyan-500/10 text-cyan-400",
        violet: "bg-violet-500/10 text-violet-400",
        amber: "bg-amber-500/10 text-amber-400",
        red: "bg-red-500/10 text-red-400",
    }[accent];

    return (
        <div className="flex items-center gap-3 mb-5">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg", colors)}>
                <Icon className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">{label}</h2>
        </div>
    );
}

function Divider() {
    return <div className="h-px bg-white/[0.07] my-5" />;
}

function InputField({
    label,
    id,
    type = "text",
    defaultValue,
    placeholder,
    disabled,
    suffix,
}: {
    label: string;
    id: string;
    type?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    suffix?: React.ReactNode;
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-xs font-medium text-neutral-400 mb-1.5"
            >
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    type={type}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={cn(
                        "w-full rounded-xl border bg-white/5 px-4 py-2.5 text-sm text-white",
                        "placeholder:text-neutral-600 outline-none transition-all",
                        disabled
                            ? "border-white/[0.05] bg-white/[0.02] text-neutral-500 cursor-not-allowed"
                            : "border-white/10 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20",
                        suffix && "pr-10"
                    )}
                />
                {suffix && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">{suffix}</div>
                )}
            </div>
        </div>
    );
}

// ── Account Tab ──────────────────────────────────────────────────

function AccountTab({
    user,
}: {
    user: { name?: string; email?: string; image?: string };
}) {
    const [name, setName] = useState(user.name ?? "");
    const [saved, setSaved] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleSave = () => {
        startTransition(async () => {
            try {
                await authClient.updateUser({ name });
                setSaved(true);
                toast.success("Profile updated!");
                setTimeout(() => setSaved(false), 2500);
            } catch {
                toast.error("Failed to update profile.");
            }
        });
    };

    const avatarInitial = (user.name ?? user.email ?? "U").charAt(0).toUpperCase();

    return (
        <div className="space-y-5">
            {/* Profile info */}
            <SettingCard>
                <SectionHeading icon={User} label="Profile Information" accent="cyan" />

                {/* Avatar */}
                <div className="flex items-center gap-5 mb-6">
                    <div className="relative group shrink-0">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-blue-500 to-indigo-600 p-[2px]">
                            <div className="h-full w-full rounded-2xl bg-[#0e0e18] flex items-center justify-center">
                                <span className="text-xl font-extrabold text-white">
                                    {avatarInitial}
                                </span>
                            </div>
                        </div>
                        {/* Avatar upload is not wired to backend — visually present */}
                        <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity cursor-not-allowed" title="Coming soon">
                            <Camera className="h-4 w-4 text-white/50" />
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-white mb-0.5">
                            {user.name ?? "User"}
                        </p>
                        <p className="text-xs text-neutral-500">{user.email}</p>
                        <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                            Member
                        </span>
                    </div>
                </div>

                <Divider />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Display name — editable via authClient.updateUser */}
                    <div>
                        <label
                            htmlFor="settings-name"
                            className="block text-xs font-medium text-neutral-400 mb-1.5"
                        >
                            Display Name
                        </label>
                        <input
                            id="settings-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                        />
                    </div>

                    {/* Email — read-only (managed by better-auth) */}
                    <InputField
                        id="settings-email"
                        label="Email Address"
                        defaultValue={user.email}
                        disabled
                        suffix={
                            <Mail className="h-3.5 w-3.5 text-neutral-600" />
                        }
                    />
                </div>

                <div className="mt-5 flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isPending || saved}
                        className={cn(
                            "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
                            saved
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_4px_20px_rgba(6,182,212,0.25)] disabled:opacity-50"
                        )}
                    >
                        {isPending ? (
                            <><Loader2 className="h-4 w-4 animate-spin" /> Saving…</>
                        ) : saved ? (
                            <><Check className="h-4 w-4" /> Saved!</>
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </div>
            </SettingCard>

            {/* Quick links to real features */}
            <SettingCard>
                <SectionHeading icon={PenSquare} label="Your Content" accent="violet" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <a
                        href="/dashboard/create-blog"
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-violet-500/30 hover:bg-violet-500/[0.04] transition-all"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-400">
                            <PenSquare className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">Create Blog</p>
                            <p className="text-xs text-neutral-500">Write and publish a new article</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-violet-400 transition-colors" />
                    </a>

                    <a
                        href="/dashboard/history"
                        className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-amber-500/30 hover:bg-amber-500/[0.04] transition-all"
                    >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                            <Clock className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">Article History</p>
                            <p className="text-xs text-neutral-500">View all your published posts</p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-neutral-600 group-hover:text-amber-400 transition-colors" />
                    </a>
                </div>
            </SettingCard>
        </div>
    );
}

// ── Security Tab ─────────────────────────────────────────────────

function SecurityTab() {
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [currentPw, setCurrentPw] = useState("");
    const [newPw, setNewPw] = useState("");
    const [isPending, startTransition] = useTransition();
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const router = useRouter();

    const handlePasswordChange = () => {
        if (!currentPw || !newPw) {
            toast.error("Please fill in both password fields.");
            return;
        }
        startTransition(async () => {
            try {
                const { error } = await authClient.changePassword({
                    currentPassword: currentPw,
                    newPassword: newPw,
                    revokeOtherSessions: true,
                });
                if (error) {
                    toast.error(error.message ?? "Failed to change password.");
                    return;
                }
                toast.success("Password updated successfully!");
                setCurrentPw("");
                setNewPw("");
            } catch {
                toast.error("Something went wrong. Please try again.");
            }
        });
    };

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: { onSuccess: () => router.push("/") },
        });
    };

    return (
        <div className="space-y-5">
            {/* Sign-in methods */}
            <SettingCard>
                <SectionHeading icon={KeyRound} label="Sign-In Methods" accent="violet" />
                <div className="space-y-3">
                    {/* Email/password */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-neutral-300">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">Email & Password</p>
                            <p className="text-xs text-neutral-500 mt-0.5">Sign in with your email address</p>
                        </div>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                            Active
                        </span>
                    </div>

                    {/* Google OAuth */}
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5">
                            <Globe className="h-5 w-5 text-neutral-300" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white">Google</p>
                            <p className="text-xs text-neutral-500 mt-0.5">Sign in with your Google account</p>
                        </div>
                        <button
                            onClick={() =>
                                authClient.signIn.social({
                                    provider: "google",
                                    callbackURL: "http://localhost:3000/",
                                })
                            }
                            className="text-xs font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            Connect
                        </button>
                    </div>
                </div>
            </SettingCard>

            {/* Change password */}
            <SettingCard>
                <SectionHeading icon={Lock} label="Change Password" accent="cyan" />
                <div className="space-y-4">
                    {/* Current password */}
                    <div>
                        <label
                            htmlFor="current-pw"
                            className="block text-xs font-medium text-neutral-400 mb-1.5"
                        >
                            Current Password
                        </label>
                        <div className="relative">
                            <input
                                id="current-pw"
                                type={showCurrent ? "text" : "password"}
                                value={currentPw}
                                onChange={(e) => setCurrentPw(e.target.value)}
                                placeholder="••••••••••"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowCurrent((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                            >
                                {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                    </div>

                    {/* New password */}
                    <div>
                        <label
                            htmlFor="new-pw"
                            className="block text-xs font-medium text-neutral-400 mb-1.5"
                        >
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="new-pw"
                                type={showNew ? "text" : "password"}
                                value={newPw}
                                onChange={(e) => setNewPw(e.target.value)}
                                placeholder="Min. 8 characters"
                                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 pr-10 text-sm text-white placeholder:text-neutral-600 focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all"
                            />
                            <button
                                type="button"
                                onClick={() => setShowNew((v) => !v)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                            >
                                {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                        </div>
                        {newPw.length > 0 && newPw.length < 8 && (
                            <p className="mt-1 text-xs text-amber-400">Password must be at least 8 characters.</p>
                        )}
                    </div>

                    <div className="flex justify-end pt-1">
                        <button
                            onClick={handlePasswordChange}
                            disabled={isPending || newPw.length < 8}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500 shadow-[0_4px_20px_rgba(6,182,212,0.2)] transition-all disabled:opacity-40"
                        >
                            {isPending ? (
                                <><Loader2 className="h-4 w-4 animate-spin" /> Updating…</>
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </div>
                </div>
            </SettingCard>

            {/* Sign out */}
            <SettingCard>
                <SectionHeading icon={LogOut} label="Session" accent="amber" />
                <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div>
                        <p className="text-sm font-semibold text-white">Sign out of DevNexus</p>
                        <p className="text-xs text-neutral-500 mt-0.5">You will be redirected to the homepage.</p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        Sign Out
                    </button>
                </div>
            </SettingCard>

            {/* Danger zone */}
            <SettingCard>
                <SectionHeading icon={AlertTriangle} label="Danger Zone" accent="red" />

                {!deleteConfirm ? (
                    <div className="flex items-center justify-between p-4 rounded-xl border border-red-500/20 bg-red-500/[0.04]">
                        <div>
                            <p className="text-sm font-semibold text-red-400">Delete Account</p>
                            <p className="text-xs text-neutral-500 mt-0.5">
                                Permanently delete your account and all published articles.
                            </p>
                        </div>
                        <button
                            onClick={() => setDeleteConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                        >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                        </button>
                    </div>
                ) : (
                    <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/[0.06] space-y-3">
                        <p className="text-sm font-semibold text-red-400">Are you sure?</p>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                            This action is <strong className="text-white">irreversible</strong>. Your account, profile,
                            and all articles will be permanently deleted.
                        </p>
                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={() => setDeleteConfirm(false)}
                                className="px-4 py-2 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 text-neutral-300 hover:bg-white/10 transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    try {
                                        await authClient.deleteUser();
                                        router.push("/");
                                    } catch {
                                        toast.error("Failed to delete account. Please try again.");
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-red-500 text-white hover:bg-red-600 transition-all"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                Yes, delete my account
                            </button>
                        </div>
                    </div>
                )}
            </SettingCard>
        </div>
    );
}

// ── Main page ────────────────────────────────────────────────────

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<TabId>("account");

    // Pull user from authClient session on the client side
    const { data: session } = authClient.useSession();
    const user = session?.user ?? {};

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Page header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-extrabold tracking-tight text-white">Settings</h1>
                <p className="text-sm text-neutral-400">
                    Manage your account profile and security.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* ── Sidebar nav ── */}
                <aside className="lg:w-48 shrink-0">
                    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-hide">
                        {TABS.map(({ id, label, icon: Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={cn(
                                    "relative flex items-center gap-3 w-full shrink-0 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left group",
                                    activeTab === id
                                        ? "bg-white/[0.07] text-white border border-white/[0.1]"
                                        : "text-neutral-500 hover:text-white hover:bg-white/[0.04]"
                                )}
                            >
                                {activeTab === id && (
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
                                )}
                                <Icon
                                    className={cn(
                                        "h-4 w-4 shrink-0 transition-colors",
                                        activeTab === id ? "text-cyan-400" : "group-hover:text-white"
                                    )}
                                />
                                <span className="whitespace-nowrap">{label}</span>
                                {activeTab === id && (
                                    <ChevronRight className="ml-auto h-3.5 w-3.5 text-cyan-400/70" />
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* ── Content ── */}
                <div className="min-w-0 flex-1">
                    {activeTab === "account" && <AccountTab user={user} />}
                    {activeTab === "security" && <SecurityTab />}
                </div>
            </div>
        </div>
    );
}
