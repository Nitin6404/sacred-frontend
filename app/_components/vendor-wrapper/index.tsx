import React from "react";
import VendorModal from "./vendor-modal";
import { VendorType } from "@/types/auth.types";

interface VendorWrapperProps {
  vendorTypes: VendorType[];
}

const VendorWrapper = ({ vendorTypes }: VendorWrapperProps) => {
  return (
    <section className="flex flex-col items-center justify-center gap-12 p-4">
      <header className="flex w-full flex-col items-center justify-center gap-4 md:gap-8 lg:w-4/5 xl:w-3/5 xl:gap-12">
        <h1
          aria-label="Vendors"
          className="text-center text-3xl font-semibold tracking-tight text-primary drop-shadow-lg md:-mb-4 lg:text-4xl"
        >
          Services Available
        </h1>

        <span className="container prose text-center text-lg text-muted-foreground">
          From the most skillful Makeup Artists to the mighty impressive Candid Photographers, we cover the wedding
          service providers for all your basic needs! And for your own discernment, you can find the necessary details,
          photos of their work and first hand reviews of all of the wedding service providers!
        </span>
      </header>

      <section className="grid grid-cols-1 gap-6 overflow-hidden p-2 lg:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4">
        {(vendorTypes || []).map((vendorType) => (
          <VendorModal key={vendorType.id} description="" route="" vendorType={vendorType} />
        ))}
      </section>
    </section>
  );
};

export default VendorWrapper;
