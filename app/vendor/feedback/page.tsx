import React from "react";
import { VendorLayout } from "../_components/vendor-layout";
import FeedbackComp from "./feedback-comp";
import { ErrorBoundary } from "@/components/errorBoundary";
import { VendorErrorPage } from "../_components/vendorErrorPage";

const page = () => {
  return (
    <ErrorBoundary fallback={<VendorErrorPage title="Feedback" />}>
      <VendorLayout title="Feedback" hideNextBtn>
        <FeedbackComp />
      </VendorLayout>
    </ErrorBoundary>
  );
};

export default page;
