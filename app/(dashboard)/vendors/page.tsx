import VendorWrapper from "@/app/_components/vendor-wrapper";
import { getAllVendorTypes, getUrlMetadataForSeo } from "@/app/utils/functions";
import { Metadata } from "next";
import React from "react";

const Vendor = async () => {
  const vendorTypes = await getAllVendorTypes();
  return <VendorWrapper vendorTypes={vendorTypes || []} />;
};

export default Vendor;

export async function generateMetadata(props: { params: { slug: string }; searchParams: any }): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: `/vendors`,
    fallbackTitle: "Vebdors | Sacred Shadi",
    fallbackDescription:
      "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button"
  });
  return data;
}

export const revalidate = 60;
