"use client";

import Link from "next/link";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import dayjs from "dayjs";
import { CellContext } from "@tanstack/react-table";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";
import { CustomImage } from "@/app/utils/image";

function VendorTypes() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Vendor types" />}>
      <SuperAdminLayout title="Vendor types">
        <TableHOC
          searchKey="type"
          addable
          editable
          deleteable
          columns={[
            {
              header: "Type",
              accessorKey: "type",
              cell: ({ row }: CellContext<any, unknown>) => (
                <Link className="hover:text-primary" href={`/admin/services/${row.original.id}`}>
                  {row.original.type}
                </Link>
              )
            },
            {
              header: "Cover Image",
              accessorKey: "coverImage",
              cell: (data) => (
                <CustomImage
                  height={80}
                  width={100}
                  alt="slider"
                  enlargeImage
                  className="h-[80px]"
                  src={data.getValue() as string}
                  fallbackStyle="height:80px;width:100px;"
                  fallbackClassName="h-[80px] opacity-50"
                />
              )
            },
            {
              header: "Thubmnail",
              accessorKey: "thumbnail",
              cell: (data) => (
                <CustomImage
                  height={80}
                  width={100}
                  alt="slider"
                  enlargeImage
                  className="h-[80px]"
                  src={data.getValue() as string}
                  fallbackStyle="height:80px;width:100px;"
                  fallbackClassName="h-[80px] opacity-50"
                />
              )
            },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "shortDescription", header: "Short Description" },
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
          addEditFormMeta={[
            { id: "typeLabel", name: "label", props: { text: "Type", htmlFor: "vendorTypeType", required: true } },
            { id: "vendorTypeType", name: "input", props: { name: "type", className: "mb-4", required: true } },

            {
              id: "typeThumbnail",
              name: "label",
              props: { text: "Thumbnail", htmlFor: "vendorTypeThumbnailType", required: true }
            },
            {
              name: "imageInput",
              id: "vendorTypeThumbnailType",
              props: { name: "thumbnail", className: "mb-4", required: true }
            },

            {
              id: "typeCoverImage",
              name: "label",
              props: { text: "Cover Image", htmlFor: "vendorTypeCoverImageType", required: true }
            },
            {
              name: "imageInput",
              id: "vendorTypeCoverImageType",
              props: { name: "coverImage", className: "mb-4", required: true }
            },

            {
              name: "label",
              id: "vendorTypeDescriptionLabel",
              props: { text: "Description", htmlFor: "vendorTypeDescription", required: true }
            },
            {
              name: "textAreaInput",
              id: "vendorTypeDescription",
              props: { name: "description", className: "mb-4", required: true }
            },

            {
              name: "label",
              id: "vendorTypeShortDescriptionLabel",
              props: { text: "Short Description", htmlFor: "vendorTypeShortDescription", required: true }
            },
            {
              name: "textAreaInput",
              id: "vendorTypeShortDescription",
              props: { name: "shortDescription", className: "mb-4", required: true }
            }
          ]}
          addDataEndpoint="/api/v1/vendor-type/create"
          editDataEndpoint="/api/v1/vendor-type/update"
          paginateDataEndpoint="/api/v1/vendor-type/all"
          deleteDataEndpoint="/api/v1/vendor-type/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default VendorTypes;
