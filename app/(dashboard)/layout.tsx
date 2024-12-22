import type { Metadata } from "next";
import Footer from "@/app/_components/footer";
import Header from "@/components/layout/header/header";

export const metadata: Metadata = {
  title: "Sacred Shaadi Dashboard",
  description: "One stop solution for all your wedding needs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-full">
      <Header />
      <div className="flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
      <Footer />
    </section>
  );
}
