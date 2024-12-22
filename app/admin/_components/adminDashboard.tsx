"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/apiConfig/apiClient";
import { adminEndpoints } from "@/lib/apiConfig/endpoints";
import { useUserStore } from "@/app/context/user-context";
import { Loading } from "@/app/_components/loading";
import LogisticCard from "@/app/vendor/dashboard/logistic-card";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

type DashboardData = {
  totalBookings: number;
  activeBookings: number;
  registeredUsers: number;
  registeredVendors: number;
};

const AdminDashboardCards = () => {
  const router = useRouter();
  const userStore = useUserStore();

  const logoutIfUnauthorized = useCallback((error: { message: string }) => {
    const msg = error.message;
    if (msg.includes("token expired") || msg.includes("invalid token") || msg.includes("No access token found")) {
      userStore.setSuperAdmin(null);
      router.replace("/admin/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: res, isLoading } = useQuery<{ data: DashboardData }>({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      try {
        const res = await apiClient(adminEndpoints.getDashboardData, {
          method: "GET",
          headers: { Authorization: `Bearer ${userStore.super_admin?.tokens.accessToken}` }
        });
        return res;
      } catch (err: any) {
        logoutIfUnauthorized(err);
        throw err;
      }
    }
  });

  if (isLoading || !res) return <Loading className="h-96" />;
  return (
    <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
      <LogisticCard
        metricType="bookings"
        metricLabel="Total Bookings"
        metric={res.data.totalBookings || 0}
        description="Total bookings on the platform"
      />
      <LogisticCard
        metricType="viewed"
        metricLabel="Active Bookings"
        metric={res.data.activeBookings || 0}
        description="Total active bookings on the platform"
      />
      <LogisticCard
        metricType="users"
        metricLabel="Registered Users"
        metric={res.data.registeredUsers || 0}
        description="Total registered users on the platform"
      />
      <LogisticCard
        metricType="vendors"
        metricLabel="Registered Vendors"
        metric={res.data.registeredVendors || 0}
        description="Total registered vendors on the platform"
      />
    </section>
  );
};

export default AdminDashboardCards;
