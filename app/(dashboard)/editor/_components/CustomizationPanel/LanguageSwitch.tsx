"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Language } from "@/types/editor";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function LanguageSwitch() {
  const { currentLanguage, setLanguage } = useEditorStore();

  return (
    <div className="flex space-x-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("en")}
        className={cn("px-2 py-1 text-sm", currentLanguage === "en" && "bg-primary text-primary-foreground")}
      >
        EN
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setLanguage("bn")}
        className={cn(
          "font-bengali px-2 py-1 text-sm",
          currentLanguage === "bn" && "bg-primary text-primary-foreground"
        )}
      >
        বাং
      </Button>
    </div>
  );
}
