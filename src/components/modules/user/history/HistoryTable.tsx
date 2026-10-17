import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import React from "react";
import { Eye, Tag, Star, FileText } from "lucide-react";

const HistoryTable = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent border-b border-white/5">
            <TableHead className="text-neutral-500 font-semibold tracking-widest uppercase text-[10px] py-3 pl-6">
              <div className="flex items-center gap-1.5">
                <FileText className="h-3 w-3" />
                Title
              </div>
            </TableHead>
            <TableHead className="text-neutral-500 font-semibold tracking-widest uppercase text-[10px] py-3">
              <div className="flex items-center gap-1.5">
                <Tag className="h-3 w-3" />
                Tags
              </div>
            </TableHead>
            <TableHead className="text-neutral-500 font-semibold tracking-widest uppercase text-[10px] py-3 text-right">
              <div className="flex items-center justify-end gap-1.5">
                <Eye className="h-3 w-3" />
                Views
              </div>
            </TableHead>
            <TableHead className="text-neutral-500 font-semibold tracking-widest uppercase text-[10px] py-3 text-center pr-6">
              <div className="flex items-center justify-center gap-1.5">
                <Star className="h-3 w-3" />
                Status
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.length > 0 ? (
            posts.map((item, idx) => (
              <TableRow
                key={item.id}
                className="border-b border-white/[0.04] hover:bg-white/[0.04] transition-all group cursor-pointer"
              >
                {/* Title */}
                <TableCell className="py-4 pl-6 max-w-[260px]">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 text-[10px] font-bold text-neutral-600 group-hover:text-cyan-400 transition-colors mt-0.5">
                      {idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-neutral-600 mt-0.5">
                        Click to view details
                      </p>
                    </div>
                  </div>
                </TableCell>

                {/* Tags */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {(item.tags && item.tags.length > 0
                      ? item.tags.slice(0, 2)
                      : ["General"]
                    ).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 rounded-full border border-cyan-500/20 bg-cyan-500/8 px-2.5 py-0.5 text-[10px] font-medium text-cyan-400"
                      >
                        #{tag}
                      </span>
                    ))}
                    {item.tags && item.tags.length > 2 && (
                      <span className="text-[10px] text-neutral-600">
                        +{item.tags.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>

                {/* Views */}
                <TableCell className="py-4 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <div className="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 group-hover:border-cyan-500/20 group-hover:bg-cyan-500/8 transition-all">
                      <Eye className="w-3 h-3 text-neutral-500 group-hover:text-cyan-400 transition-colors" />
                      <span className="text-sm font-bold text-neutral-300 group-hover:text-cyan-300 transition-colors tabular-nums">
                        {(item.views || 0).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell className="py-4 text-center pr-6">
                  {item.isFeatured ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      Featured
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-neutral-500">
                      Standard
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell
                colSpan={4}
                className="h-40 text-center"
              >
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                    <FileText className="h-6 w-6 text-neutral-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-400">
                      No articles found
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      Start writing to see your history here.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
