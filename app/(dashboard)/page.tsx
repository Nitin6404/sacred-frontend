import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { sliderEndpoints } from "@/lib/apiConfig/endpoints";
import VendorWrapper from "@/app/_components/vendor-wrapper";
import CarouselComp from "@/app/_components/dashboard/carousel";
import { getAllVendorTypes, getAllCities, getUrlMetadataForSeo, fallbackDescription } from "@/app/utils/functions";
import { VendorSelectWrapper } from "@/app/_components/input-component";
import { Metadata } from "next";
import BlogGrid from "./(blog-wrapper)/blogs/components/blog-grid";

async function getSliderNodes() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${sliderEndpoints.getAllCarousels}`, { method: "GET" });
    const data = await res.json();
    return data.data;
  } catch (err) {
    toast({ variant: "destructive", description: "Failed to fetch slider images" });
  }
}

export default async function page() {
  const [cities, slider, vendorTypes] = await Promise.all([getAllCities(), getSliderNodes(), getAllVendorTypes()]);

  return (
    <ScrollArea className="h-full">
      <div className="flex flex-1 flex-col items-center space-y-4">
        <CarouselComp sliderArr={slider || []} />
        <section className=" relative flex w-full flex-col items-center justify-center gap-8 overflow-visible p-4 sm:w-4/5 lg:w-3/5 lg:flex-row">
          <VendorSelectWrapper vendors={vendorTypes} cities={cities} />
        </section>

        <VendorWrapper vendorTypes={vendorTypes || []} />
      </div>

      <div className="flex flex-1 flex-col items-center space-y-4">
        <section className="container my-4 flex flex-col items-center justify-center gap-12 p-4">
          <header className="flex w-full flex-col items-center justify-center gap-4 md:gap-8 lg:w-4/5 xl:w-3/5 xl:gap-12">
            <h2 className="my-4 mb-12 text-center text-3xl font-semibold tracking-tight text-primary drop-shadow-lg md:mb-4 lg:text-4xl">
              Blogs
            </h2>
            <p className="prose -mt-12 text-center text-lg text-muted-foreground">
              In this section we cover various sections ranging from the latest makeup ideas to the most fashionable
              outfits, which is surely going to WOW you.
            </p>
          </header>

          <BlogGrid userSide previewFormat />
        </section>
      </div>
    </ScrollArea>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: "/",
    fallbackTitle: "Sacred Shadi",
    fallbackDescription: fallbackDescription
  });
  return data;
}

export const revalidate = 60;
