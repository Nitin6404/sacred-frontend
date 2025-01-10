"use client";

import { useEditorStore } from "@/lib/store/editor";
import { Button } from "./button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./dropdown-menu";
import { Languages } from "lucide-react";
import type { Language } from "@/lib/store/editor";

const LANGUAGES: Record<Language, { label: string; nativeLabel: string }> = {
  en: {
    label: "English",
    nativeLabel: "English"
  },
  bn: {
    label: "Bengali",
    nativeLabel: "বাংলা"
  }
};

export function LanguageSwitcher() {
  const { currentLanguage, setLanguage } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Switch language</span>
          <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-medium text-white">
            {currentLanguage.toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {Object.entries(LANGUAGES).map(([key, { label, nativeLabel }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => setLanguage(key as Language)}
            className="flex items-center justify-between"
          >
            <span>{label}</span>
            <span className="ml-2 text-sm text-gray-500">{nativeLabel}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
