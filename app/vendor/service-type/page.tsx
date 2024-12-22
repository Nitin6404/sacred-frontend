import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import CardWrapper from "../_components/vendor-route-wrapper/card-wrapper";
import ServiceModal from "./service-modal";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

const page = () => {
  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Service Type" />}>
      <VendorRouteWrapper
        title="Service Type"
        currentStep={2}
        serviceType="Service Type"
        guidelines={[
          "Please click on Create new and add the services you offer and a short description.",
          "Please choose other if the service you provide are not listed here."
        ]}
        headerNav={<ServiceModal />}
      >
        <CardWrapper type="Service" />
      </VendorRouteWrapper>
    </ErrorBoundary>
  );
};

export default page;
