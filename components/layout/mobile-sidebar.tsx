"use client";
import { DashboardNav } from "@/components/dashboard-nav";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { routeMapper } from "@/types";
import { MenuIcon } from "lucide-react";
import { useState } from "react";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function MobileSidebar({ className }: SidebarProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="cursor-pointer">
        <MenuIcon />
      </SheetTrigger>
      <SheetContent side="right" className="!px-0">
        <div className="space-y-4 px-3 py-4">
          <DashboardNav items={routeMapper as any} isMobileNav={true} setOpen={setOpen} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
