import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Package Details",
  description: "One stop solution for all your wedding needs"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
