"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { Vendor, VendorType } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerVendorFormSchema } from "./helpers";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { useGetVendorTypesQuery } from "@/app/admin/_components/apis";
import { useGetAllCitiesQuery, useRegisterVendorMutation } from "@/components/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

const RegisterVendor = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setVendor } = useUserStore();
  const { data: citiesRes, isPending: citiesPending } = useGetAllCitiesQuery();
  const [showPassword, setShowPassword] = useState(false);
  const { data: vendorTypesRes, isPending: vendorTypesPending } = useGetVendorTypesQuery();
  const { mutate: registerVendorFn, isPending } = useRegisterVendorMutation();
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const _values = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
    const values = { ..._values, cityId: parseInt(_values.cityId), vendorTypeId: parseInt(_values.vendorTypeId) };
    const { success, data, error } = registerVendorFormSchema.safeParse(values);
    if (!success || (error as any)?.errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Could not create account",
        description: (
          <ul>
            {error?.errors.map((err, idx) => (
              <li key={idx}>
                {err.path}: {err.message}
              </li>
            ))}
          </ul>
        )
      });
      return;
    }

    registerVendorFn(data, {
      onSuccess: (data: { data: Vendor }) => {
        toast({ title: "Success", description: "Created Account Successfully", variant: "default" });
        setVendor(data.data);
        router.replace("/vendor/profile");
      },
      onError: (err: any) => {
        toast({ title: "Could not create account", description: err.error, variant: "destructive" });
      }
    });
  };

  return (
    <form onSubmit={onSubmit} className="w-full space-y-4">
      <div className="space-y-2">
        <label>
          Name <span className="text-red-500">*</span>
        </label>
        <Input name="name" type="text" placeholder="Enter your name..." required />
      </div>

      <div className="space-y-2">
        <label>
          City <span className="text-red-500">*</span>
        </label>
        <Select
          name="cityId"
          required
          onValueChange={(value) => {
            if (citiesPending) return;
            setCity(citiesRes?.data.find((city: any) => String(city.id) === value)?.name || "");
          }}
        >
          <SelectTrigger>
            <SelectValue>{city}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {citiesPending ? (
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((_, idx) => (
                  <Skeleton key={idx} className="h-6 w-full   bg-gray-100" />
                ))}
              </ul>
            ) : (
              citiesRes?.data.map((city: any) => (
                <SelectItem value={city.id as any} key={city.id}>
                  {city.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>
          Service <span className="text-red-500">*</span>
        </label>
        <Select
          name="vendorTypeId"
          required
          onValueChange={(value) => {
            if (vendorTypesPending) return;
            setServiceType(
              vendorTypesRes?.data.find((vendorType: VendorType) => String(vendorType.id) === value)?.type || ""
            );
          }}
        >
          <SelectTrigger>
            <SelectValue>{serviceType}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {vendorTypesPending ? (
              <ul className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((_, idx) => (
                  <Skeleton key={idx} className="h-6 w-full   bg-gray-100" />
                ))}
              </ul>
            ) : (
              vendorTypesRes?.data.map((vendorType: VendorType) => (
                <SelectItem value={vendorType.id as any} key={vendorType.id}>
                  {vendorType.type}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label>
          Email <span className="text-red-500">*</span>
        </label>
        <Input name="email" type="email" placeholder="Enter your email..." required />
      </div>

      <div className="space-y-2">
        <label>
          Phone No. <span className="text-red-500">*</span>
        </label>
        <Input name="phone" type="number" placeholder="Enter your phone no..." required />
      </div>

      <div className="space-y-2">
        <label>
          Password <span className="text-red-500">*</span>
        </label>
        <section className="flex items-center justify-between gap-2">
          <Input name="password" type={showPassword ? "text" : "password"} required />
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
          </Button>
        </section>
      </div>

      <Button disabled={isPending} className="ml-auto w-full font-semibold shadow-lg" type="submit">
        {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Register Vendor
      </Button>
    </form>
  );
};

export default RegisterVendor;
