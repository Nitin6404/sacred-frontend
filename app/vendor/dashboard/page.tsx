"use client";

import React from "react";
import LogisticCard from "./logistic-card";
import { DashboardLogisticType } from "@/types";
import { VendorLayout } from "../_components/vendor-layout";
import { useUserStore } from "@/app/context/user-context";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

const Page = () => {
  const { vendor } = useUserStore();

  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Dashboard" />}>
      <VendorLayout title="Dashboard" hideNextBtn>
        <section className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4">
          <LogisticCard
            metricLabel="Total Views"
            metric={vendor?.totalViews || 0}
            description="Total views of your services"
            metricType={DashboardLogisticType.viewed}
          />
          <LogisticCard
            metricLabel="Total Quotations"
            metric={vendor?.totalQuotation || 0}
            description="View quotations from customers"
            metricType={DashboardLogisticType.quotation}
          />
          <LogisticCard
            metricLabel="Total People Reached"
            metric={vendor?.totalPeopleReached || 0}
            description="Total people reached out to you"
            metricType={DashboardLogisticType.contacted}
          />
          <LogisticCard
            metricLabel="Total Bookings"
            metric={vendor?.totalBooking || 0}
            metricType={DashboardLogisticType.booked}
            description="Total bookings made by customers"
          />
        </section>
      </VendorLayout>
    </ErrorBoundary>
  );
};

export default Page;
