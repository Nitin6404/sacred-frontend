"use client";

import { Loading } from "@/app/_components/loading";
import { Button } from "@/components/ui/button";
import { useVendorSearch } from "@/hooks/useVendorSearch";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PackageModal from "./search-components/package-modal";
import { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";

interface Props {
  mutation?: () => UseMutationResult<any, Error, any, unknown>;
  vendorTypeSlug?: string;
}

export function VendorSearchGrid(props: Props) {
  const { data, isPending, total, nextPage, prevPage, isPrevPageAvailable, isNextPageAvailable } = useVendorSearch(
    props.mutation,
    undefined,
    { vendorTypeSlug: props.vendorTypeSlug }
  );

  const container = {
    hidden: {},
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVar = {
    hidden: { opacity: 0, translateY: "2rem" },
    show: { opacity: 1, translateY: 0 }
  };

  return (
    <section className="container my-6 w-full p-2">
      {isPending ? (
        <Loading className="h-80 w-full" />
      ) : (
        <motion.section
          animate="show"
          initial="hidden"
          variants={container}
          className="grid grid-cols-1 gap-2 pb-8 md:grid-cols-2 md:gap-4 xl:grid-cols-3 3xl:grid-cols-4"
        >
          {data.map((item, idx) => (
            <motion.div variants={itemVar} key={idx} transition={{ duration: 0.2 }}>
              <PackageModal
                key={item.id}
                price={item.price}
                packageId={item.id}
                packageName={item.details}
                imageUrl={item?.image || ""}
                description={item.description}
                userFacing={props.mutation === undefined}
                vendorName={item.vendor?.user?.name || ""}
              />
            </motion.div>
          ))}
        </motion.section>
      )}

      <div className="my-4 flex w-full items-center justify-between sm:justify-around">
        <Button onClick={prevPage} disabled={!isPrevPageAvailable} className="flex-center shadow-lg">
          <ArrowLeft className="h-6 w-6 text-white" />
        </Button>

        {data.length === 0 ? (
          <div className="font-semibold text-muted-foreground ">Nothing matched with your search query</div>
        ) : (
          <div className="font-semibold text-muted-foreground drop-shadow-md ">{`${
            total && !isNaN(total) ? total : data.length
          } results found`}</div>
        )}

        <Button onClick={nextPage} disabled={!isNextPageAvailable} className="flex-center shadow-lg">
          <ArrowRight className="h-6 w-6 text-white" />
        </Button>
      </div>
    </section>
  );
}
