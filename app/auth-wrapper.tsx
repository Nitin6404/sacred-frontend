"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "./context/user-context";
import { UserAuthType } from "@/types";

interface AuthWrapperProps {
  type: UserAuthType;
  children: React.ReactNode;
}

const AuthWrapper = (props: AuthWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userStore = useUserStore();

  useEffect(() => {
    try {
      const user = userStore[props.type];
      if (!user) throw new Error(`"${props.type}" not found`);
    } catch (err) {
      router.push("/login");
    } finally {
      setLoading(false);
      // router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <div>loading...</div>;
  return <>{props.children}</>;
};

export default AuthWrapper;
