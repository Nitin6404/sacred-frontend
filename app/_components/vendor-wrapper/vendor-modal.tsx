"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { VendorType } from "@/types/auth.types";
import { CustomImage } from "@/app/utils/image";

type VendorProps = {
  vendorType: VendorType;
  description: string;
  route: string;
};

const VendorModal = ({ vendorType, description }: VendorProps) => {
  return (
    <motion.section
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      initial={{ opacity: 0, translateY: "5rem" }}
    >
      <Card className="flex w-[85vw] flex-col items-center justify-center overflow-hidden ring-2 ring-primary-foreground ring-offset-4 sm:w-[400px]">
        <CardTitle className="w-full overflow-y-hidden">
          <CustomImage
            width={400}
            height={250}
            alt={vendorType.type}
            className="h-56 w-full object-cover"
            fallbackClassName="object-contain h-48 w-48 mx-auto mt-4 opacity-50"
            src={vendorType.thumbnail || ""}
          />
        </CardTitle>

        <CardHeader className="mt-4 py-1 text-xl font-semibold">{vendorType.type}</CardHeader>
        <CardDescription className="text-md text-ellipsis px-4 text-center">
          {`${vendorType.shortDescription.substring(0, 80)} ${vendorType.shortDescription.length > 80 ? "..." : ""}`}
        </CardDescription>
        <CardContent>{description}</CardContent>

        <CardFooter className="p-0 px-4 pb-4">
          <Link href={`/search/${vendorType.slug}`}>
            <Button className="h-10 px-6 py-3 text-base font-semibold">View and Booking</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.section>
  );
};

export default VendorModal;
