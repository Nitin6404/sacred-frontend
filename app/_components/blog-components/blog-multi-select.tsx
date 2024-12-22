"use client";

import React from "react";
import MultipleSelectorComp from "../vendor-wrapper/multi-select-comp";
import { Option } from "@/components/ui/multiselect";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  allCategories: Option[];
  categories: Option[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<Option[]>>;
  userFacing?: boolean;
  loading?: boolean;
  error?: boolean;
}

const BlogMultiSelect = (props: Props) => {
  return props.userFacing ? (
    <section className="max-h-6 overflow-y-auto lg:max-h-12 xl:max-h-16 2xl:max-h-20">
      <div className="flex flex-wrap items-center gap-2">
        {props.categories.map((cat, index) => (
          <Badge key={index} variant="default" className="text-sm">
            {cat.label}
          </Badge>
        ))}
      </div>
    </section>
  ) : props.loading ? (
    <Skeleton className="h-8 w-1/2" />
  ) : props.error ? (
    <div className="text-red-500">Error fetching categories</div>
  ) : (
    <MultipleSelectorComp
      arr={props.categories}
      setArr={props.setSelectedCategories}
      defaultOptions={props.allCategories}
    />
  );
};

export default BlogMultiSelect;
