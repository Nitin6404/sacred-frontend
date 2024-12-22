import { Card, CardHeader } from "@/components/ui/card";
import { VendorSubType } from "@/types/auth.types";
import React from "react";

interface SubServiceCardProps {
  vendorSubtype: VendorSubType;
}

const SubServiceCard = ({ vendorSubtype }: SubServiceCardProps) => {
  return (
    <Card className="flex flex-col gap-4 ring-2 ring-rose-300 transition hover:bg-primary-foreground">
      <CardHeader title="Service Type" className="font-semibold">
        {vendorSubtype.subType}
      </CardHeader>
    </Card>
  );
};

export default SubServiceCard;
