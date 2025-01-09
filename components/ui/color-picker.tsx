"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { RGBColor } from "react-color";

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal">
          <div className="mr-2 h-4 w-4 rounded" style={{ backgroundColor: value }} />
          {value}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[240px] p-3">
        <RGBColor color={value} onChange={onChange} />
      </PopoverContent>
    </Popover>
  );
}
