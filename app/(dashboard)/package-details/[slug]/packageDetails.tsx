"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchByIdMutation } from "@/components/api";
import { BookModal } from "./book-modal";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import UplodedImages from "@/app/vendor/profile/album-wrapper/uploaded-images";
import { CustomImage } from "@/app/utils/image";
import { useUserStore } from "@/app/context/user-context";

const idFromSlug = (slug: string) => {
  return slug.split("-").pop();
};

export default function PackageDetails(props: { params: { slug: string } }) {
  const router = useRouter();
  const { user } = useUserStore();
  const { mutate: searchByIdFn, isPending } = useSearchByIdMutation();
  const [packageDetails, setPackageDetails] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      searchByIdFn(
        { slug: idFromSlug(props.params.slug) || "", token: user?.tokens.accessToken || "" },
        {
          onSuccess: (data) => setPackageDetails(data.data),
          onError: () => router.push("/")
        }
      );
    } catch (error) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="sticky top-0 mb-8 flex items-center justify-between">
        <section className="flex flex-col gap-6">
          {isPending ? (
            <Skeleton className="h-16 w-96 bg-gray-100" />
          ) : (
            <h1 className="text-3xl font-bold drop-shadow-lg ">{packageDetails?.vendor?.vendorType?.type || ""}</h1>
          )}

          {isPending ? (
            <Skeleton className="h-14 w-80 bg-gray-100" />
          ) : (
            <section className="flex items-center gap-2">
              {packageDetails?.vendor?.user?.media?.map((media: any) => {
                if (media?.type !== "cover_image") return null;
                else if (media?.type === "cover_image" && !media?.url) return null;
                return (
                  <CustomImage
                    width={100}
                    height={100}
                    key={media.id}
                    src={media.url}
                    alt="Vendor Image"
                    className="h-24 w-24 rounded-full object-cover"
                  />
                );
              })}

              <section className="flex flex-col items-start gap-2">
                <h2 className="text-3xl font-bold text-muted-foreground">{packageDetails?.vendor?.user?.name || ""}</h2>
                <section className=" flex items-center gap-0 font-semibold text-muted-foreground" title="Total views">
                  <Eye className="mr-1" />
                  {packageDetails?.vendor?.totalViews || 0} views
                </section>
              </section>
            </section>
          )}
        </section>

        {!isPending && (
          <BookModal
            phoneNo={packageDetails?.vendor?.user?.phone || ""}
            email={packageDetails?.vendor?.user?.email || ""}
            vendorId={packageDetails?.vendor?.id || ""}
            packageId={packageDetails?.id || ""}
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
          />
        )}
      </section>

      {/* Package Details */}
      <Card className="mb-8 grid grid-cols-1 overflow-hidden shadow-lg md:grid-cols-2">
        <section className="">
          <CardHeader>
            <CardTitle className="text-xl tracking-tight drop-shadow-lg">Package Details</CardTitle>
            <CardDescription>Everything you need for your perfect day</CardDescription>
          </CardHeader>

          <CardFooter>
            {isPending ? (
              <Skeleton className="h-12 w-24 bg-gray-100"></Skeleton>
            ) : (
              <p className="text-2xl font-bold drop-shadow-lg">₹{packageDetails?.price || ""}</p>
            )}
          </CardFooter>
        </section>

        <CustomImage
          width={400}
          height={150}
          alt="Package Image"
          src={packageDetails?.image || ""}
          className="max-h-[300px] w-full object-cover"
        />
      </Card>

      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl tracking-tight drop-shadow-lg">Vendor Details</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center">
              <Mail className="mr-2" />
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100" />
              ) : (
                packageDetails?.vendor?.user?.email || `${"*".repeat(6)}@${"*".repeat(2)}mail.com`
              )}
            </div>

            <div className="flex items-center">
              <Phone className="mr-2" />
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100" />
              ) : (
                packageDetails?.vendor?.user?.phone || "8****92***"
              )}
            </div>

            <div className="col-span-2 flex items-center">
              <MapPin className="mr-2" />
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100" />
              ) : (
                packageDetails?.vendor?.user?.addresses?.[0]?.city?.name || "*".repeat(15)
              )}
            </div>

            <div className="col-span-2 flex items-center">
              {isPending ? (
                <Skeleton className="h-6 w-48 rounded-lg bg-gray-100" />
              ) : (
                <>
                  <p>{packageDetails?.vendor?.description}</p>
                  <p>{packageDetails?.vendor?.details}</p>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {isPending ? (
        <Skeleton>
          <Card className="mb-8 shadow-lg">
            <CardHeader>
              <CardTitle className="h-12 w-96 rounded-lg bg-gray-100"></CardTitle>
              <CardDescription className="h-6 w-48 rounded-lg bg-gray-100"></CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-48 w-48 rounded-lg bg-gray-100"></div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Skeleton>
      ) : (
        <Card className="flex flex-col gap-4 p-4">
          <CardTitle className="mb-2 text-xl tracking-tight drop-shadow-lg">Sample Photos</CardTitle>
          <CardContent className="p-0">
            <UplodedImages userFacing vendorId={packageDetails?.vendor?.id} />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
