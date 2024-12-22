"use client";

import dayjs from "dayjs";
import TableHOC from "../_components/tableHoc";
import { SuperAdminLayout } from "../_components/adminLayout";
import { CustomImage } from "@/app/utils/image";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function Slider() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Slider" />}>
      <SuperAdminLayout title="Slider">
        <TableHOC
          searchKey="title"
          addable
          editable
          deleteable
          columns={[
            { accessorKey: "title", header: "Title" },
            { accessorKey: "link", header: "Link" },
            { accessorKey: "description", header: "Description" },
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
                  fallbackStyle="height:80px;width:100px;"
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
          addEditFormMeta={[
            {
              name: "label",
              id: "sliderTitleLabel",
              props: { text: "Title", htmlFor: "sliderTitleName", required: true }
            },
            { id: "sliderTitleName", name: "input", props: { name: "title", className: "mb-4", required: true } },

            {
              name: "label",
              id: "sliderDescriptionLabel",
              props: { text: "Description", htmlFor: "sliderDescriptionName", required: true }
            },
            {
              name: "input",
              id: "sliderDescriptionName",
              props: { name: "description", className: "mb-4", required: true }
            },

            {
              name: "label",
              id: "sliderLinkLabel",
              props: { text: "Link", htmlFor: "sliderLinkName", required: true }
            },
            {
              name: "input",
              id: "sliderLinkName",
              props: { name: "link", className: "mb-4", required: true }
            },

            {
              name: "label",
              id: "sliderImageLabel",
              props: { text: "Slider image", htmlFor: "sliderImageName", required: true }
            },
            {
              name: "imageInput",
              id: "sliderImageName",
              props: { name: "image", className: "mb-4", required: true }
            }
          ]}
          addDataEndpoint="/api/v1/sliders/create"
          editDataEndpoint="/api/v1/sliders/update"
          paginateDataEndpoint="/api/v1/sliders/all"
          deleteDataEndpoint="/api/v1/sliders/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Slider;
