import { authClient } from "@/lib/auth-client";
import React from "react";

const page = async () => {
  const session = await authClient.getSession();
  console.log(session);
  return <div>this is the common layout page</div>;
};

export default page;
