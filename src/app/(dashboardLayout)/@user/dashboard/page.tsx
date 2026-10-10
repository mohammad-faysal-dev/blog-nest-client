import React from "react";
import { BookOpen, Star, TrendingUp, Clock, Activity, Award } from "lucide-react";

const STATS = [
  { icon: BookOpen, label: "Total Articles Read", value: "128", trend: "+12%" },
  { icon: Star, label: "Saved Articles", value: "34", trend: "+5%" },
  { icon: Clock, label: "Reading Time (hrs)", value: "45.5", trend: "+2.5hrs" },
  { icon: Activity, label: "Daily Streak", value: "14 days", trend: "On fire!" },
];

export default function UserDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Welcome back!
        </h1>
        <p className="text-neutral-400">
          Here is an overview of your reading journey and activity.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map(({ icon: Icon, label, value, trend }) => (
          <div
            key={label}
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all hover:bg-white/10 hover:shadow-[0_8px_32px_rgba(6,182,212,0.15)]"
          >
            <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-cyan-500/10 blur-xl transition-all group-hover:bg-cyan-500/20" />
            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-cyan-400">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-400">{label}</p>
                <h3 className="text-2xl font-bold text-white">{value}</h3>
              </div>
            </div>
            <div className="flex items-center gap-2 relative z-10">
              <TrendingUp className="h-4 w-4 text-emerald-400" />
              <span className="text-sm font-medium text-emerald-400">{trend}</span>
              <span className="text-xs text-neutral-500 ml-1">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Activity</h2>
            <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
              View all
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 rounded-xl p-4 hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/20">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Completed Advanced React Patterns</h4>
                  <p className="text-xs text-neutral-400 mt-1">Read for 45 minutes • 2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-6 backdrop-blur-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full" />
          <h2 className="text-xl font-bold text-white mb-6 relative z-10">Pro Tips</h2>
          <div className="space-y-4 relative z-10">
            <div className="rounded-xl bg-indigo-500/10 border border-indigo-500/20 p-4">
              <h4 className="text-sm font-semibold text-indigo-300 mb-2">Save for later</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Bookmark articles to build your personal knowledge base. They'll be available offline soon!
              </p>
            </div>
            <div className="rounded-xl bg-cyan-500/10 border border-cyan-500/20 p-4">
              <h4 className="text-sm font-semibold text-cyan-300 mb-2">Join the discussion</h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Engage with authors and other readers in the comment section below each article.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
