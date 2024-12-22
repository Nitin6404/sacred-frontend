"use client";

import { useUserStore } from "@/app/context/user-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const ContactDetails = (props: ContactDetailsProps) => {
  const { vendor, setVendor } = useUserStore();

  return (
    <div className="grid gap-4">
      <h2 className="text-lg font-semibold">Contact Details</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            disabled
            id="email"
            type="email"
            value={vendor?.email}
            onChange={(e) => vendor && setVendor({ ...vendor, email: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={vendor?.phone} disabled />
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
