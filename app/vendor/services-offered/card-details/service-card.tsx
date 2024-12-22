"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ServiceOffered } from "@/types/auth.types";
import React from "react";
import ServiceTypeUpdateModal from "./update-modal";
import ServiceTypeRemoveModal from "./remove-modal";
import { ErrorBoundary } from "@/components/errorBoundary";
import { CustomImage } from "@/app/utils/image";

interface ServiceCardProps {
  offerObj: ServiceOffered;
  vendorSubType: string;
}

const ServiceCard = (props: ServiceCardProps) => {
  const [updateOpen, setUpdateOpen] = React.useState(false);
  const [removeOpen, setRemoveOpen] = React.useState(false);

  return (
    <motion.section
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileInView={{ opacity: 1, translateY: 0 }}
      initial={{ opacity: 0, translateY: "5rem" }}
    >
      <Card className="relative flex flex-col items-center justify-center overflow-hidden ring-2 ring-primary-foreground ring-offset-4">
        <section className="absolute right-4 top-4 z-50 grid grid-cols-1 items-center gap-1 bg-transparent sm:grid-cols-2 sm:gap-2">
          <ServiceTypeUpdateModal
            open={updateOpen}
            id={props.offerObj.id}
            setOpen={setUpdateOpen}
            offerObj={props.offerObj}
          />
          <ServiceTypeRemoveModal id={props.offerObj.id} open={removeOpen} setOpen={setRemoveOpen} />
        </section>

        <CardTitle className="w-full overflow-hidden">
          {props.offerObj.image ? (
            <ErrorBoundary fallback={null}>
              <CustomImage
                width={400}
                height={256}
                alt={props.offerObj.details}
                className="max-h-64 object-cover"
                src={props.offerObj.image || ""}
              />
            </ErrorBoundary>
          ) : null}
        </CardTitle>
        <CardHeader>
          <CardTitle>{props.vendorSubType}</CardTitle>
          <CardDescription>{props.offerObj.description}</CardDescription>
        </CardHeader>
        <CardContent>{props.offerObj.details}</CardContent>
        <CardFooter>
          <span className="text-sm font-bold">Price: {props.offerObj.price}</span>
        </CardFooter>
      </Card>
    </motion.section>
  );
};

export default ServiceCard;
