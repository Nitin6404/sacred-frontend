import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import AddServiceNav from "./add-service-nav";
import OffersCardWrapper from "./offers-card-wrapper";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

const ServicesOffered = () => {
  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Services Offered" />}>
      <VendorRouteWrapper title="Services Offered" currentStep={3} headerNav={<AddServiceNav />}>
        <OffersCardWrapper />
      </VendorRouteWrapper>
    </ErrorBoundary>
  );
};

export default ServicesOffered;
