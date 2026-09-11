import { Navbar1 } from "@/components/layout/navbar1";
import { Footer } from "@/components/layout/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar1 />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
