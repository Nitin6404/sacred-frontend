"use client";

import { Button } from "@/components/ui/button";
import { VendorLayout } from "./vendor-layout";

export function VendorErrorPage(props: { title: string }) {
  return (
    <VendorLayout title={props.title} hideNextBtn>
      <div className="flex h-[calc(100vh-120px)] flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-6xl font-bold text-gray-800">500</h1>
          <p className="text-2xl font-semibold text-gray-600">Internal Server Error</p>
        </div>

        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </div>
    </VendorLayout>
  );
}
