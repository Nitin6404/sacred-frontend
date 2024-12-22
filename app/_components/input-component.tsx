"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { VendorType } from "@/types/auth.types";
import { ICity } from "@/types";
import { useVendorContext } from "../context/vendor-context";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Props = {
  list: { value: string; label: string }[];
  placeholder?: string;
  setState: Dispatch<SetStateAction<string>>;
};

function DropDownInput({ list, placeholder, setState }: Props) {
  return (
    <Select onValueChange={(value) => setState(() => value)}>
      <SelectTrigger className="">
        <SelectValue placeholder={placeholder || "Enter value"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {list.map((item) => (
            <SelectItem key={item.value} value={item.value}>
              {item.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export const VendorSelectWrapper = (props: { vendors: VendorType[]; cities: ICity[] }) => {
  const { setCities, setVendorTypes } = useVendorContext();
  const [vendor, setVendor] = useState("");
  const [city, setCity] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setVendorTypes(props.vendors || []);
    setCities(props.cities || []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.vendors]);

  return (
    <>
      <DropDownInput
        setState={setVendor}
        placeholder="Select Vendor Types"
        list={(props.vendors || []).map((vendor) => ({ value: vendor.slug, label: vendor.type }))}
      />

      <DropDownInput
        setState={setCity}
        placeholder="Select Cities"
        list={(props.cities || []).map((city) => ({ value: city.slug, label: city.name }))}
      />

      <Button
        className="font-bold shadow-xl lg:absolute lg:right-[-10rem] lg:my-auto"
        size={"lg"}
        onClick={() => {
          if (!vendor || !city) {
            toast({ title: "Please select both vendor and city", description: "", variant: "destructive" });
            return;
          }
          router.push(`/search/${vendor}?city=${city}`);
        }}
      >
        Get started
      </Button>
    </>
  );
};
