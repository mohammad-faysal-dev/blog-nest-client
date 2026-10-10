import CreateBlogFromClient from "@/components/modules/user/createBlog/CreateBlogFromClient";
import { blogService } from "@/services/blog.service";
import { BlogPost } from "@/types";

export default async function CreateBlogPage() {
  const { data } = await blogService.getBlogPosts();
  const recentPosts = data?.data?.slice(0, 5) || [];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-white">
          Create New Article
        </h1>
        <p className="text-neutral-400">
          Draft your thoughts and share them with the world.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CreateBlogFromClient />
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-2xl rounded-full" />
            <h2 className="text-xl font-bold text-white mb-4 relative z-10">
              Recent Drafts
            </h2>
            <div className="space-y-3 relative z-10">
              {recentPosts.length > 0 ? (
                recentPosts.map((item: BlogPost) => (
                  <div
                    key={item.id}
                    className="flex flex-col rounded-xl p-3 bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/10"
                  >
                    <span className="text-sm font-medium text-white truncate">
                      {item.title}
                    </span>
                    <span className="text-xs text-neutral-500 mt-1">
                      Tap to edit
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-neutral-500">No recent posts found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
