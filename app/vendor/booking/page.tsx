import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import BookingComponent from "./booking-component";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

export default function Page() {
  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Booking" />}>
      <VendorLayout title="Booking" hideNextBtn>
        <BookingComponent />
      </VendorLayout>
    </ErrorBoundary>
  );
}
