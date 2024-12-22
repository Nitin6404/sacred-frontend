import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Shaadi Login",
  description: "Login to Sacred Shaadi"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col overflow-hidden">
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
