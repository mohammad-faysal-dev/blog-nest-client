import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constants/roles";

// Paths that admin is allowed to access under /dashboard
const ADMIN_ALLOWED_DASHBOARD_PATHS = [
  "/dashboard/create-blog",
  "/dashboard/history",
];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let isAuthenticated = false;
  let isAdmin = false;
  const { data } = await userService.getSession();
  if (data) {
    isAuthenticated = true;
    isAdmin = data.user.role === Roles.admin;
  }
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (!isAdmin && pathname.startsWith("/admin-dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  // Redirect admin away from /dashboard EXCEPT for shared pages
  const isAllowedForAdmin = ADMIN_ALLOWED_DASHBOARD_PATHS.some((p) =>
    pathname.startsWith(p)
  );
  if (isAdmin && pathname.startsWith("/dashboard") && !isAllowedForAdmin) {
    return NextResponse.redirect(new URL("/admin-dashboard", request.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
  ],
};
