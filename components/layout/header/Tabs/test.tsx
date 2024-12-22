"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { routeMapper } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function TabsDemo() {
  const pathName = usePathname();

  useEffect(() => {
    const tabs = document.querySelectorAll(".tab-trigger");
    tabs.forEach((tab) => {
      tab.setAttribute("data-state", "inactive");
      if (tab.id === pathName) {
        tab.setAttribute("data-state", "active");
      }
    });
  }, [pathName]);

  return (
    <Tabs className="hidden bg-transparent md:block">
      <TabsList className="gap-2 bg-transparent">
        {Object.entries(routeMapper).map(([key, val]) => (
          <Link key={key} href={`${val}`}>
            <TabsTrigger
              value={key}
              key={key}
              id={val}
              className={cn(
                "!focus:bg-red-300 border-2 border-transparent bg-transparent font-semibold transition data-[state=active]:border-primary data-[state=active]:bg-white",
                "tab-trigger"
              )}
            >
              {key}
            </TabsTrigger>
          </Link>
        ))}
      </TabsList>
    </Tabs>
  );
}
