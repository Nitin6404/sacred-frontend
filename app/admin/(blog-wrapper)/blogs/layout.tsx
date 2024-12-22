import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Shaadi Blogs",
  description: "Blogs to surf, for all your wedding needs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
