"use client";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent
} from "@/components/ui/dropdown-menu";
import { useUserStore } from "@/app/context/user-context";
import { useCallback, useEffect } from "react";
import { Vendor } from "@/types/auth.types";
import { Button } from "@/components/ui/button";
import { PersonIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserAuthType, userAuthTypes } from "@/types";
import { useVendorProfileMutation } from "@/components/api";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

export default function Profile(props: { type: UserAuthType }) {
  const router = useRouter();
  const { setUser, setVendor, setSuperAdmin, ...users } = useUserStore();
  const { mutate: getVendorProfileFn } = useVendorProfileMutation();

  const setCurrentUser = (currentUser: any | null) => {
    if (props.type === userAuthTypes.super_admin) setSuperAdmin(currentUser);
    else if (props.type === userAuthTypes.vendor) setVendor(currentUser);
    else setUser(currentUser);
  };

  useEffect(() => {
    if (!useUserStore.persist?.hasHydrated()) useUserStore.persist.rehydrate();
  }, []);

  const handleLogout = useCallback(() => {
    setCurrentUser(null);
    router.replace(props.type === userAuthTypes.super_admin ? "/admin/login" : "/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.type]);

  if (!props.type) throw new Error("Please specify auth type for ProfileComponent");

  useEffect(() => {
    if (props.type !== userAuthTypes.vendor || !users.vendor) return;
    else if (users?.vendor?.vendorType) return;
    getVendorProfileFn(users.vendor?.tokens?.accessToken || "", {
      onSuccess: (data: any) => {
        const tokens = users.vendor?.tokens;
        setVendor({ ...data.data, tokens } as Vendor);
      },
      onError: (error: any) => {
        const desc = (error as any).error || error.message;
        if (!desc) return;
        toast({ variant: "destructive", description: (error as any).error || error.message });
        setVendor(null);
        router.replace("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users.vendor]);

  if (!useUserStore.persist?.hasHydrated()) {
    return (
      <Button variant="outline" size="icon">
        <Loader2 className="h-4 animate-spin" />
      </Button>
    );
  }

  if (!users[props.type]) {
    return (
      <Button
        variant="outline"
        onClick={() => router.push("/login")}
        className={cn(
          "border-2 font-semibold shadow-lg hover:text-primary",
          props.type !== userAuthTypes.user && "border-primary text-primary"
        )}
      >
        Login
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          title="Profile"
          className={cn(
            "group border-2",
            props.type !== userAuthTypes.user ? "border-primary transition hover:bg-primary" : "border-white"
          )}
        >
          <PersonIcon
            className={cn(
              "h-[1.2rem] w-[1.2rem] rotate-0 scale-100",
              props.type === userAuthTypes.user
                ? "text-white group-hover:text-primary"
                : "text-primary group-hover:text-white"
            )}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="[&>*]:cursor-pointer">
        <DropdownMenuItem onClick={() => router.push("/vendor/profile")}>View Profile</DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
