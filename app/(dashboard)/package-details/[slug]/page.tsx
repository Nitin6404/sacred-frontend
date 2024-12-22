import { Metadata } from "next";
import { getUrlMetadataForSeo } from "@/app/utils/functions";
import PackageDetails from "./packageDetails";

export default function Page(props: any) {
  return <PackageDetails {...props} />;
}

export async function generateMetadata(props: { params: { slug: string }; searchParams: any }): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: `/package-details/${props.params.slug}`,
    fallbackTitle: "Sacred Shadi",
    fallbackDescription:
      "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button"
  });
  return data;
}

export const revalidate = 60;
