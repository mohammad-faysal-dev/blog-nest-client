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
import { Eye, MessageSquare, Tag } from "lucide-react";

const HistoryTable = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="[&_tr]:border-b [&_tr]:border-white/10">
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-neutral-400 font-semibold tracking-wider uppercase text-xs">Title</TableHead>
            <TableHead className="text-neutral-400 font-semibold tracking-wider uppercase text-xs">Tags</TableHead>
            <TableHead className="text-neutral-400 font-semibold tracking-wider uppercase text-xs text-right">Views</TableHead>
            <TableHead className="text-neutral-400 font-semibold tracking-wider uppercase text-xs text-center">Featured</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-0">
          {posts.length > 0 ? (
            posts.map((item) => (
              <TableRow
                key={item.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors group cursor-pointer"
              >
                <TableCell className="font-medium text-white max-w-[200px] truncate">
                  {item.title}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Tag className="w-3 h-3 text-cyan-500" />
                    <span className="text-xs text-neutral-300">
                      General
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1.5 text-neutral-300 group-hover:text-cyan-400 transition-colors">
                    <Eye className="w-4 h-4" />
                    <span className="font-medium">{item.views || 0}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${item.isFeatured ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' : 'bg-white/5 text-neutral-400 border border-white/10'}`}>
                    {item.isFeatured ? "Featured" : "Standard"}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="h-24 text-center text-neutral-500">
                No history available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryTable;
