import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Card className="relative mx-auto w-full max-w-sm overflow-hidden pt-0">
      {/* Image */}
      <div className="relative aspect-video w-full">
        <div className="absolute inset-0 z-10 bg-black/35" />

        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover brightness-75 grayscale dark:brightness-50"
        />
      </div>

      <CardHeader>
        {post.isFeatured && (
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
        )}

        <CardTitle className="line-clamp-2">
          {post.title}
        </CardTitle>

        <CardDescription className="line-clamp-2">
          {post.content}
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex flex-col items-stretch gap-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{post.views} views</span>
          <span>{post._count?.comments ?? 0} comments</span>
        </div>

        <Button className="w-full">View Post</Button>
      </CardFooter>
    </Card>
  );
}