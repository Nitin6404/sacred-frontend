"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";

import { User } from "@/types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { registerUserFormSchema } from "./helpers";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/app/context/user-context";
import { useRegisterUserMutation } from "@/components/api";

const RegisterUser = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { setUser } = useUserStore();
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: registerUserFn, isPending: registerPending } = useRegisterUserMutation();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const values = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
    const { success, data, error } = registerUserFormSchema.safeParse(values);
    if (!success || (error as any)?.errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Could not create account",
        description: <ul>{error?.errors.map((err, idx) => <li key={idx}>{err.message}</li>)}</ul>
      });
      return;
    }
    registerUserFn(data, {
      onSuccess: (data: { data: User }) => {
        toast({ title: "Success", description: "Created Account Successfully", variant: "default" });
        setUser(data.data);
        router.replace("/");
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
        <Input required name="name" type="text" placeholder="Enter your name..." />
      </div>

      {/* <div className="space-y-2">
        <label>Email</label>
        <Input required name="email" type="email" placeholder="user@sacredshadi.com" />
      </div> */}

      <div className="space-y-2">
        <label>
          Phone No. <span className="text-red-500">*</span>
        </label>
        <Input required name="phone" type="number" placeholder="Enter your phone no..." />
      </div>

      <div className="space-y-2">
        <label>
          Password <span className="text-red-500">*</span>
        </label>
        <section className="flex items-center justify-between gap-2">
          <Input required name="password" type={showPassword ? "text" : "password"} />
          <Button type="button" variant="ghost" size="sm" onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <EyeIcon className="h-4 w-4" /> : <EyeOffIcon className="h-4 w-4" />}
          </Button>
        </section>
      </div>

      <Button className="ml-auto w-full font-semibold shadow-lg " type="submit" disabled={registerPending}>
        {registerPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Create Account
      </Button>
    </form>
  );
};

export default RegisterUser;
