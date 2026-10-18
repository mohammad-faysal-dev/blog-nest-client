import { Route } from "@/types";

export const adminRoutes: Route[] = [
  {
    title: "User Management",
    items: [
      {
        title: "Analytics",
        url: "/admin-dashboard",
      },
      {
        title: "Create Blog",
        url: "/dashboard/create-blog",
      },
      {
        title: "History",
        url: "/dashboard/history",
      },
    ],
  },
];