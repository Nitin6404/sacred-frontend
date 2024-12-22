"use client";

import dayjs from "dayjs";
import TableHOC from "../_components/tableHoc";
import { SuperAdminLayout } from "../_components/adminLayout";
import { CustomImage } from "@/app/utils/image";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function Slider() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Service Offered" />}>
      <SuperAdminLayout title="Service Offered">
        <TableHOC
          searchKey="description"
          usePagination
          pageSize={10}
          addable={false}
          editable={false}
          deleteable={false}
          columns={[
            { accessorKey: "price", header: "Price", cell: (data) => `₹ ${data.getValue()}` },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "details", header: "Details" },
            {
              header: "Image",
              accessorKey: "image",
              cell: (data) => (
                <CustomImage
                  height={80}
                  width={100}
                  alt="slider"
                  enlargeImage
                  src={data.getValue() as string}
                  fallbackStyle="height:20px; width:20px;"
                  fallbackClassName="h-[80px] opacity-50"
                />
              )
            },
            {
              header: "Created At",
              accessorKey: "createdAt",
              accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
            },
            {
              header: "Updated At",
              accessorKey: "updatedAt",
              accessorFn: (data) => dayjs(data.updatedAt).format("DD-MM-YYYY HH:mm A")
            }
          ]}
          paginateDataEndpoint="/api/v1/service-offer/all"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Slider;
