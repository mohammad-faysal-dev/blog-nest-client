import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "Content",
    items: [
      {
        title: "Create Article",
        url: "/dashboard/create-blog",
      },
      {
        title: "All Articles",
        url: "/dashboard/history",
      },
    ],
  },
];