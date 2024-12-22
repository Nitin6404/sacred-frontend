"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type IntroductionProps = {
  form: UseFormReturn<
    {
      details: string;
      description: string;
      facebookUrl?: string | undefined;
      instagramUrl?: string | undefined;
      twitterUrl?: string | undefined;
      youtubeUrl?: string | undefined;
      pinterestUrl?: string | undefined;
      coverImage?: string | undefined;
    },
    any,
    undefined
  >;
};

const Introduction = (props: IntroductionProps) => {
  return (
    <div className="grid gap-2">
      <FormField
        control={props.form.control}
        name="details"
        render={({ field }) => (
          <FormItem className="">
            <FormLabel className="text-lg font-semibold !text-black">Introduction</FormLabel>
            <FormControl>
              <Textarea {...field} rows={2} placeholder="Write a detailed introduction about yourself" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <h2 className="text-lg font-semibold"></h2>
    </div>
  );
};

export default Introduction;
