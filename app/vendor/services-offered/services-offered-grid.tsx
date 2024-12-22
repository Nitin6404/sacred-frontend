"use client";

import PackageModal from "@/app/search/[slug]/search-components/package-modal";
import { motion } from "framer-motion";
import { useGetAllOffersForVendorMutation } from "@/components/api";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import React from "react";
import GenericNodesRenderer from "@/app/_components/generic-nodes-renderer";
import { useUserStore } from "@/app/context/user-context";
import { useRouter } from "next/navigation";

const ServicesOfferedGrid = () => {
  const router = useRouter();
  const { vendor, setVendor } = useUserStore();
  const {
    data,
    isPending,
    total,
    nextPage,
    prevPage,
    isPrevPageAvailable,
    isNextPageAvailable,
    // searched,
    isIdle,
    isError
  } = usePaginatedFetch(
    useGetAllOffersForVendorMutation,
    { accessToken: vendor?.tokens.accessToken },
    {
      fetchOnRender: true,
      onUnauthorizedError: () => {
        // console.log("Unauthorized error, callback issued");
        setVendor(null);
        router.push("/login");
      }
    }
  );

  return (
    <GenericNodesRenderer
      isPending={isPending || isIdle}
      errorMsg={isError ? "An error occurred" : ""}
      navigationProps={{
        currLength: data.length,
        displayNavigationBtns: data.length > 0,
        isNextPageAvailable: isNextPageAvailable,
        isPrevPageAvailable: isPrevPageAvailable,
        nextPage: nextPage,
        prevPage: prevPage,
        totalLength: total
      }}
    >
      {data.map((item, idx) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, translateY: "2rem" },
            show: { opacity: 1, translateY: 0 }
          }}
          key={idx}
          transition={{ duration: 0.2 }}
        >
          <PackageModal
            key={item.id}
            price={item.price}
            packageId={item.id}
            packageName={item.details}
            imageUrl={item?.image || ""}
            description={item.description}
            userFacing={false}
            vendorName={item.vendor?.user?.name || ""}
          />
        </motion.div>
      ))}
    </GenericNodesRenderer>
  );
};

export default ServicesOfferedGrid;
