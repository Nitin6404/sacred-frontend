"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { UseMutationResult } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { UserAuthType, userAuthTypes } from "@/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { loginConfig, loginFormDefaultValues, loginFormSchema } from "./helpers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";

const LoginForm = (props: { type: UserAuthType; useMutation: () => UseMutationResult<any, Error, any, unknown> }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: loginFn, isPending, isError } = props.useMutation();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const defaults = { schema: loginFormSchema, defaultValues: loginFormDefaultValues };

  const form = useForm<z.infer<typeof defaults.schema>>({
    resolver: zodResolver(defaults.schema),
    defaultValues: defaults.defaultValues
  });

  useEffect(() => {
    if (!useUserStore.persist.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  const cleanUp = useCallback(
    (data: any) => {
      if (props.type === userAuthTypes.super_admin) {
        setSuperAdmin(data);
        router.push("/admin/dashboard");
      } else if (props.type === userAuthTypes.vendor) {
        setVendor(data);
        router.push("/vendor/dashboard");
      } else {
        setUser(data);
        router.push("/");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [form]
  );

  const onSubmit = (data: any) => {
    try {
      loginFn(data, {
        onSuccess: (data: { data: any }) => {
          toast({ title: "Success", description: "Logged in successfully", variant: "default" });
          cleanUp(data.data);
        },
        onError: (err: any) => toast({ title: "Could not log in", description: err.error, variant: "destructive" })
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Could not log in",
        description: err.error || err.msg || "An error occurred while logging in, please try again later"
      });
    }
  };

  const navigateToUserScreen = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(loginConfig[props.type].defaultRedirect); // TODO: also check for redirects
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          name="phone"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Phone No <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="number" min={0} placeholder="Enter your phone No..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <section className="flex items-center justify-between gap-2">
                  <Input type={showPassword ? "text" : "password"} {...field} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="h-fit w-fit p-3 text-muted-foreground hover:bg-primary-foreground"
                  >
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

        <Button disabled={isPending} className="ml-auto w-full font-semibold shadow-lg" type="submit">
          {isPending && !isError && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          <span>{isPending ? "Logging in.." : "Login"}</span>
        </Button>

        {users[props.type] ? (
          <Button className="ml-auto mt-2 w-full" variant="outline" type="reset" onClick={navigateToUserScreen}>
            <span>{props.type} is already logged in, take me there</span>
          </Button>
        ) : null}
      </form>
    </Form>
  );
};

export default LoginForm;
