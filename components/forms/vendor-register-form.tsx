"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRegisterVendorMutation } from "../api";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const formSchema = z.object({
  name: z.string().min(1, { message: "Enter your name" }),
  phone: z.string().min(0, { message: "Enter a valid phone number" }).length(10, {
    message: "Enter a valid 10 digit phone number"
  }),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
  cityId: z.number().min(1, { message: "Please select a city" }),
  vendorTypeId: z.number().min(1, { message: "Please select a service" })
});

type VendorFormValue = z.infer<typeof formSchema>;

interface VendorAuthFormProps {
  citiesPending: boolean;
  citiesError: any;
  vendorTypesPending: boolean;
  vendorTypesError: any;
  cities: { id: number; name: string }[];
  vendorTypes: { id: number; name: string }[];
}

export default function VendorRegisterForm({
  citiesPending,
  citiesError,
  vendorTypesPending,
  vendorTypesError,
  cities,
  vendorTypes
}: VendorAuthFormProps) {
  const { toast } = useToast();
  const router = useRouter();

  const { mutate: registerVendorFn, isPending: isVendorPending } = useRegisterVendorMutation();

  const [showPassword, setShowPassword] = useState(false);

  const baseDefaultValues = { email: "demo@gmail.com", name: "Demo User", city: "", phone: "1234567890" };

  const defaultValues = { ...baseDefaultValues, service: 0, city: 0 };

  const form = useForm<VendorFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: VendorFormValue) => {
    try {
      registerVendorFn(data, {
        onSuccess: (data) => {
          toast({
            title: "Success",
            description: "User registered successfully",
            variant: "default"
          });
          localStorage.setItem("user", JSON.stringify(data));
          router.push("/vendor/dashboard");
        },
        onError: (error: any) => {
          toast({ title: "Error", description: error.error || error.message || "", variant: "destructive" });
        }
      });
    } catch (err: any) {
      toast({ title: "Redirect error", description: err.message, variant: "destructive" });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Enter your name..." disabled={isVendorPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cityId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(value) =>
                      form.setValue("cityId", cities?.filter((city) => city.name === value)[0].id)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities ? (
                        cities.map((city) => (
                          <SelectItem value={city.name} key={city.id}>
                            {city.name}
                          </SelectItem>
                        ))
                      ) : (
                        <div>loading...</div>
                      )}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="vendorTypeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={""}
                    onValueChange={(value) =>
                      form.setValue("vendorTypeId", vendorTypes.filter((vendorType) => vendorType.name === value)[0].id)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {vendorTypes.map((vendorType) => (
                        <SelectItem value={vendorType.name} key={vendorType.id}>
                          {vendorType.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Enter your email..." disabled={isVendorPending} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone No.</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your phone no..."
                    disabled={isVendorPending}
                    {...field}
                    min={0}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <section className="flex items-center justify-between gap-2">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      disabled={isVendorPending}
                      {...field}
                    />
                    <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
                      {showPassword ? (
                        <EyeIcon className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                      )}
                    </Button>
                  </section>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isVendorPending} className="ml-auto w-full" type="submit">
            {isVendorPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Register User
          </Button>
        </form>
      </Form>
    </>
  );
}
