import { cookies } from "next/headers";

export const userService = {
  getSession: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch("http://localhost:3000/api/auth/get-session", {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const session = await res.json();
      console.log("session", session);
      return { data: session, error: null };
    } catch (err) {
      console.log(err);
      return { data: null, error: { message: "Failed to fetch session" } };
    }
  },
};
