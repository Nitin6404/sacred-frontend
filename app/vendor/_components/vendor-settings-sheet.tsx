"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Settings } from "lucide-react";
import React from "react";

const VendorSettings = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex items-center justify-center rounded-full border-2 border-primary p-2 text-primary transition hover:bg-primary hover:text-white"
          title="Settings"
          variant={"outline"}
        >
          <Settings className="h-4 w-4 cursor-pointer font-light" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="!px-0">
        <div className="space-y-4 p-4">This is the vendor side settings</div>
      </SheetContent>
    </Sheet>
  );
};

export default VendorSettings;
