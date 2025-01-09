"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

const LANGUAGES = {
  en: "English",
  bn: "বাংলা"
};

interface LanguageSelectProps {
  value: "en" | "bn";
  onChange: (value: "en" | "bn") => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(LANGUAGES).map(([key, name]) => (
          <SelectItem key={key} value={key}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
