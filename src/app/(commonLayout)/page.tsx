import { userService } from "@/services/user.service";

const Page = async () => {
  const { data } = await userService.getSession();
  console.log("data", data);
  return <div>this is the common layout page</div>;
};

export default Page;
