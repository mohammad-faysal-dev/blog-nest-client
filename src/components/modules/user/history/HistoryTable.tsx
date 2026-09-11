import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BlogPost } from "@/types";
import React from "react";

const HistoryPage = ({ posts }: { posts: BlogPost[] }) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>view</TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.content}</TableCell>
              <TableCell>{item.views}</TableCell>
              <TableCell>{item.isFeatured}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HistoryPage;
