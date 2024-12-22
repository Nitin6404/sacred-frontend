"use client";
// import { useUserStore } from "@/app/context/user-context";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface ContactDetailsProps {
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
}

const SocialDetails = (props: ContactDetailsProps) => {
  // const { vendor, setVendor } = useUserStore();

  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">
        Social Profiles <span className="text-muted-foreground">(optional)</span>
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="facebookUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Facebook</FormLabel>
                <FormControl>
                  <Input {...field} type="url" defaultValue="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="instagramUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Instagram</FormLabel>
                <FormControl>
                  <Input {...field} type="url" defaultValue="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="twitterUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Twitter</FormLabel>
                <FormControl>
                  <Input {...field} type="url" defaultValue="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="pinterestUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Pinterest</FormLabel>
                <FormControl>
                  <Input {...field} type="url" defaultValue="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid gap-2">
          <FormField
            control={props.form.control}
            name="youtubeUrl"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel>Youtube</FormLabel>
                <FormControl>
                  <Input {...field} type="url" defaultValue="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default SocialDetails;
