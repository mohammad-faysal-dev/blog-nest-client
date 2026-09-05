import { cookies } from "next/headers";
import React from "react";

const Page = async () => {
  const cookieStore = await cookies();

  console.log("cookieStore:", cookieStore);

  const res = await fetch("http://localhost:3000/api/auth/get-session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
    cache: "no-store",
  });

  console.log(res.json());
  return <div>this is the common layout page</div>;
};

export default Page;
