import { VendorType } from "@/types/auth.types";
import { vendorTypeEndpoints, citiesEndpoints } from "@/lib/apiConfig/endpoints";
import { ICity } from "@/types";
import { Metadata } from "next";

export async function getAllVendorTypes(): Promise<VendorType[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${vendorTypeEndpoints.getAllVendorTypes}`);
    const data = await response.json();
    return data.data as VendorType[];
  } catch (err) {
    return [];
  }
}

export async function getAllCities(): Promise<ICity[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${citiesEndpoints.getAllCities}`);
    const data = await response.json();
    return data.data as ICity[];
  } catch (err) {
    return [];
  }
}

export const getRouteFromTitle = (title: string) => {
  return title.toLowerCase().split(" ").join("-");
};

type SeoRes = {
  id: number;
  url: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  createdAt: string;
  updatedAt: string;
};

export const defaultMetadata: Metadata = {
  creator: "Sacred Shadi",
  robots: "index, follow",
  icons: { icon: "/favicon.ico", apple: "/favicon.ico" },
  openGraph: { countryName: "India", images: ["/favicon.png"] }
};
export const fallbackDescription =
  "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button";
export function fallbackDefaultMetadata(fallbackTitle: string, fallbackDescription: string): Metadata {
  return {
    ...defaultMetadata,
    title: fallbackTitle,
    description: fallbackDescription,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: fallbackTitle,
      description: fallbackDescription
    }
  };
}

export async function getUrlMetadataForSeo(props: {
  routeUrl: string;
  fallbackTitle: string;
  fallbackDescription: string;
}): Promise<Metadata> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/seo/url?seoUrl=${props.routeUrl}`);
    if (!res) throw new Error("Not found");
    const data: { status: number; data: SeoRes[]; message: string } = await res.json();
    if (data.data.length === 0) throw new Error("No response");

    const metadata: Metadata = {
      ...defaultMetadata,
      title: data.data[0].metaTitle,
      description: data.data[0].metaDescription,
      keywords: data.data.reduce<string[]>((acc, curr) => [...acc, curr.metaKeywords], []),
      openGraph: {
        ...defaultMetadata.openGraph,
        title: data.data[0].metaTitle,
        description: data.data[0].metaDescription
      }
    };
    return metadata;
  } catch (err: any) {
    return fallbackDefaultMetadata(props.fallbackTitle, props.fallbackDescription);
  }
}

export const formatString = (str: string | undefined): string => {
  try {
    return (str || "")
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  } catch (err: any) {
    return "";
  }
};

export function safeJsonParse(content: string, defaultReturn: any, validations?: (res: any) => boolean) {
  try {
    const res = JSON.parse(content);
    if (validations && !validations(res)) throw new Error("Validations failed");
    return res;
  } catch (err: any) {
    return defaultReturn;
  }
}
