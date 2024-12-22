import React from "react";
import VendorRouteWrapper from "../_components/vendor-route-wrapper";
import { PortfolioList } from "../_components/portfolio-list";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

const page = () => {
  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Portfolio List" />}>
      <VendorRouteWrapper title="Portfolio List" currentStep={4}>
        <PortfolioList />
      </VendorRouteWrapper>
    </ErrorBoundary>
  );
};

export default page;
