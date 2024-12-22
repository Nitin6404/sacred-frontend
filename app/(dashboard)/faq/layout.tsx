import { Metadata } from "next";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Sacred Shaadi FAQ Section",
  description: "Find answers to all your questions about Sacred Shaadi"
};

function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="flex-1 overflow-auto">{children}</main>
    </>
  );
}

export default DashboardLayout;
