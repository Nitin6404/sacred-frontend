import type { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Sacred Shaadi Blogs",
  description: "Read our blogs to get the latest wedding trends and tips"
};

export default async function RootLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}
