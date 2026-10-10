import React from "react";
import { Users, FileText, TrendingUp, DollarSign, Activity, BarChart3 } from "lucide-react";

const STATS = [
    { icon: Users, label: "Total Users", value: "24,532", trend: "+12.5%", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { icon: FileText, label: "Published Articles", value: "843", trend: "+5.2%", color: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
    { icon: DollarSign, label: "Revenue", value: "$12,450", trend: "+18.2%", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { icon: BarChart3, label: "Active Sessions", value: "1,204", trend: "+2.4%", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                        Admin Dashboard
                    </h1>
                    <p className="text-neutral-400">
                        Overview of platform performance and metrics.
                    </p>
                </div>
                <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium hover:from-cyan-400 hover:to-blue-500 transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] border-0">
                    Generate Report
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map(({ icon: Icon, label, value, trend, color, bg, border }) => (
                    <div
                        key={label}
                        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:shadow-lg"
                    >
                        <div className="flex items-center justify-between mb-4 relative z-10">
                            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${bg} ${border} border ${color}`}>
                                <Icon className="h-6 w-6" />
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1">
                                <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-xs font-semibold text-emerald-400">{trend}</span>
                            </div>
                        </div>
                        <div className="relative z-10">
                            <h3 className="text-3xl font-bold text-white mb-1">{value}</h3>
                            <p className="text-sm font-medium text-neutral-400">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visitors Chart (Placeholder) */}
                <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Traffic Overview</h2>
                        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-neutral-300 outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>This year</option>
                        </select>
                    </div>
                    <div className="h-64 w-full flex items-end justify-between gap-2 px-2">
                        {[40, 70, 45, 90, 65, 85, 100, 60, 75, 45, 80, 55].map((height, i) => (
                            <div key={i} className="w-full bg-white/5 rounded-t-sm relative group hover:bg-white/10 transition-colors" style={{ height: '100%' }}>
                                <div
                                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500/80 to-blue-500/80 rounded-t-md transition-all group-hover:from-cyan-400 group-hover:to-blue-400"
                                    style={{ height: `${height}%` }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Users */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-white">Recent Signups</h2>
                    </div>
                    <div className="space-y-4">
                        {[
                            { name: "Alex Johnson", email: "alex@example.com", role: "User" },
                            { name: "Sarah Williams", email: "sarah@example.com", role: "Author" },
                            { name: "Michael Chen", email: "michael@example.com", role: "User" },
                            { name: "Emily Davis", email: "emily@example.com", role: "User" }
                        ].map((user, i) => (
                            <div key={i} className="flex items-center justify-between rounded-xl p-3 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neutral-700 to-neutral-800 text-white font-bold border border-white/10">
                                        {user.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-white">{user.name}</h4>
                                        <p className="text-xs text-neutral-400">{user.email}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2.5 py-1 rounded-full ${user.role === 'Author' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-white/5 text-neutral-300 border border-white/10'}`}>
                                    {user.role}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}