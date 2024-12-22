"use client";

import AdminHeader from "./header";
import { useRouter } from "next/navigation";
import { SuperAdminSidebar } from "./sidebar";
import { useUserStore } from "@/app/context/user-context";
import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import { Loading } from "@/app/_components/loading";

export function SuperAdminLayout(props: PropsWithChildren<{ title: string; className?: string; extras?: ReactNode }>) {
  const router = useRouter();
  const { super_admin } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  useUserStore.persist?.onFinishHydration((data) => {
    if (!data.super_admin) router.replace("/admin/login");
    else setLoading(false);
  });

  useEffect(() => {
    if (!useUserStore.persist?.hasHydrated()) useUserStore.persist.rehydrate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timeout: any;
    if (useUserStore.persist?.hasHydrated()) {
      timeout = setTimeout(() => {
        setLoading(false);
        if (!super_admin) router.replace("/admin/login");
      }, 0);
    }
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [super_admin]);

  if (loading) return <Loading className="h-96" />;
  return (
    <div className="h-screen bg-background">
      <AdminHeader
        {...{
          collapsed,
          setCollapsed,
          extras: (
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold">{props.title}</h1>
              {props.extras}
            </div>
          )
        }}
      />

      <div className="flex h-[calc(100vh-68px)]">
        <section className="hidden lg:flex">
          <SuperAdminSidebar {...{ collapsed }} />
        </section>

        <div className="flex-grow overflow-y-auto p-2 sm:p-4 sm:pb-0 ">
          <section className="w-full">{props.children}</section>
        </div>
      </div>
    </div>
  );
}
