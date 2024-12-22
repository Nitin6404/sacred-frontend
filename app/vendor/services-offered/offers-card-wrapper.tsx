"use client";

import React from "react";
import ServicesOfferedGrid from "./services-offered-grid";

interface CardWrapperProps {}

const OffersCardWrapper = (props: CardWrapperProps) => {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="mb-2 mt-4 text-lg font-bold sm:text-xl lg:text-3xl">Service package(s) offered</h1>
      <ServicesOfferedGrid />
    </section>
  );
};

export default OffersCardWrapper;
