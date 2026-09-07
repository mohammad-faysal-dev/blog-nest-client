"use client";
import { getBlogs } from "@/actions/blog.action";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [data, setData] = useState();
  const [error, setError] = useState<{message:string}|null>(null);
  console.log("data", data);
  useEffect(() => {
    (async () => {
      const { data, error } = await getBlogs();
      setData(data);
      setError(error);
    })();
  }, []);
  return (
    <div>
      <Button variant="outline">Button</Button>
    </div>
  );
}
