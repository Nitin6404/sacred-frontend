import { SearchForm } from "./vendor-search-form";
import Title from "./title";
import { VendorSearchGrid } from "./vendor-search-grid";
import { getAllVendorTypes } from "@/app/utils/functions";
import { CustomImage } from "@/app/utils/image";

export default async function Page(props: { params: { slug: string }; searchParams: { city?: string } }) {
  const allVendorTypes = await getAllVendorTypes();
  const vendorType = allVendorTypes.find((vendorType) => vendorType.slug === props.params.slug);

  return (
    <section className="flex flex-col items-start justify-center gap-4">
      <div className="ml-2 space-y-10 p-4 md:p-6 xl:space-y-20 ">
        <Title vendorSlug={props.params.slug} />
      </div>

      <section className="relative grid h-fit w-full grid-cols-1 items-center justify-center gap-4 overflow-hidden p-4 lg:grid-cols-2 lg:p-6">
        <div className=" bg-primary-foreground" />
        <CustomImage
          width={400}
          height={400}
          alt="Hero Image"
          fallbackImage="/slider-hero.jpg"
          src={vendorType?.coverImage as string}
          className="absolute inset-0 m-auto !w-full object-fill"
          fallbackClassName="absolute inset-0 m-auto !w-full object-fill"
          placeholder="data:image/base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        />

        <section className="z-10 my-8 flex flex-col items-start justify-center gap-4 rounded-md bg-white p-4 shadow-2xl sm:my-16">
          <SearchForm vendorTypeSlug={props.params.slug} citySlug={props.searchParams.city} />
        </section>
      </section>

      <VendorSearchGrid vendorTypeSlug={props.params.slug} />
    </section>
  );
}
