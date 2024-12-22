import { Metadata } from "next";

// import { Inter } from "next/font/google";
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sacred Shaadi Vendor Dashboard",
  description: "Vendor dashboard for Sacred Shaadi"
};

export default async function VendorLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
