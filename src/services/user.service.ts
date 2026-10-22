import { env } from "@/env";
import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${env.BACKEND_URL}/api/auth/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Session request failed with status ${res.status}`);
      }

      const session = await res.json();
      if (session === null) {
        return { data: null, error: { message: "No session found" } };
      }
      return { data: session, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
};
