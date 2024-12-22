import { ShowBookings } from "@/app/_components/bookings";
import { fallbackDescription, getUrlMetadataForSeo } from "@/app/utils/functions";
import { Metadata } from "next";
import React from "react";

export default function Page() {
  return <ShowBookings />;
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: "/booking",
    fallbackTitle: "Sacred Shadi",
    fallbackDescription: fallbackDescription
  });
  return data;
}

export const revalidate = 60;
