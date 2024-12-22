"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export type SimpleSingleSelectProps = {
  name: string;
  value?: string;
  options: string[];
  required?: boolean;
  className?: string;
  defaultValue?: string;
};

export function SimpleSingleSelect(props: SimpleSingleSelectProps) {
  return (
    <Select name={props.name} defaultValue={props.value || props.defaultValue} required={props.required}>
      <SelectTrigger className={props.className}>
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {props.options.map((option) => (
          <SelectItem value={option} key={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
