"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function Cities() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Cities" />}>
      <SuperAdminLayout title="Cities">
        <TableHOC
          searchKey="name"
          addable
          editable
          deleteable
          columns={[
            { accessorKey: "name", header: "Name" },
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
            { id: "cityLabel", name: "label", props: { text: "Name", htmlFor: "cityName", required: true } },
            { id: "cityName", name: "input", props: { name: "name", className: "mb-4", required: true } }
          ]}
          addDataEndpoint="/api/v1/city/create"
          editDataEndpoint="/api/v1/city/update"
          paginateDataEndpoint="/api/v1/city/all"
          deleteDataEndpoint="/api/v1/city/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Cities;
