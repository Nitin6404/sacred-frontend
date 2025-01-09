"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const BENGALI_FONTS = {
  "noto-sans-bengali": "Noto Sans Bengali",
  "hind-siliguri": "Hind Siliguri",
  kalpurush: "Kalpurush"
};

const ENGLISH_FONTS = {
  inter: "Inter",
  roboto: "Roboto",
  "open-sans": "Open Sans",
  lato: "Lato"
};

interface FontSelectProps {
  value?: string;
  language: "en" | "bn";
  onChange: (value: string) => void;
}

export function FontSelect({ value, language, onChange }: FontSelectProps) {
  const fonts = language === "bn" ? BENGALI_FONTS : ENGLISH_FONTS;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select font" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(fonts).map(([key, name]) => (
          <SelectItem key={key} value={key}>
            <span style={{ fontFamily: name }}>{name}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
