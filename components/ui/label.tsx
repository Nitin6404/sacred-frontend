"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export type FormLabelProps = { text?: string; htmlFor?: string; required?: boolean; className?: string };
export const FormLabel = (props: FormLabelProps) => {
  return (
    <label htmlFor={props.htmlFor} className={props.className}>
      {props.text}
      {props.required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
};
FormLabel.displayName = "formLabel";

export { Label };
