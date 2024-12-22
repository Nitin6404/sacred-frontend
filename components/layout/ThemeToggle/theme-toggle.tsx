"use client";
// import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
// import { useTheme } from "next-themes";

import {
  DropdownMenu
  // DropdownMenuItem,
  // DropdownMenuTrigger,
  // DropdownMenuContent
} from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";

type CompProps = {};
export default function ThemeToggle({}: CompProps) {
  // const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      {/* <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent> */}
    </DropdownMenu>
  );
}
