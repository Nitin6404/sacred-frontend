"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";
import { CustomImage } from "@/app/utils/image";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../../_components/adminArrorPage";

function OurTeamSettings() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Our Team" />}>
      <SuperAdminLayout title="Our Team">
        <TableHOC
          searchKey="name"
          addable
          editable
          deleteable
          columns={[
            { accessorKey: "name", header: "Name" },
            { accessorKey: "description", header: "Description" },
            { accessorKey: "role", header: "Role" },
            {
              header: "Image",
              accessorKey: "image",
              cell: (data) => (
                <CustomImage
                  height={80}
                  width={100}
                  enlargeImage
                  alt="slider"
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
          addEditFormMeta={[
            {
              name: "label",
              id: "teamMemberNameLabel",
              props: { text: "Name", htmlFor: "teamMemberName", required: true }
            },
            { id: "teamMemberName", name: "input", props: { name: "name", className: "mb-4", required: true } },
            {
              name: "label",
              id: "teamMemberDescriptionLabel",
              props: { text: "Description", htmlFor: "teamMemberDescription", required: true }
            },
            {
              name: "input",
              id: "teamMemberDescription",
              props: { name: "description", className: "mb-4", required: true }
            },
            {
              name: "label",
              id: "teamMemberRoleLabel",
              props: { text: "Role", htmlFor: "teamMemberRole", required: true }
            },
            { id: "teamMemberRole", name: "input", props: { name: "role", className: "mb-4", required: true } },
            {
              name: "label",
              id: "teamMemberImageLabel",
              props: { text: "Image", htmlFor: "teamMemberImage", required: true }
            },
            {
              name: "imageInput",
              id: "teamMemberImage",
              props: { name: "image", className: "mb-4", required: true }
            }
          ]}
          addDataEndpoint="/api/v1/team/create"
          editDataEndpoint="/api/v1/team/update"
          paginateDataEndpoint="/api/v1/team/all"
          deleteDataEndpoint="/api/v1/team/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default OurTeamSettings;
