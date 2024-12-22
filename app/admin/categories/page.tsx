"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function Categories() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Categories" />}>
      <SuperAdminLayout title="Categories">
        <TableHOC
          searchKey="name"
          addable
          editable
          deleteable
          // usePagination
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
            { id: "categoryLabel", name: "label", props: { text: "Name", htmlFor: "categoryName", required: true } },
            { id: "categoryName", name: "input", props: { name: "name", className: "mb-4", required: true } }
          ]}
          addDataEndpoint="/api/v1/category/create"
          editDataEndpoint="/api/v1/category/update"
          paginateDataEndpoint="/api/v1/category/all"
          deleteDataEndpoint="/api/v1/category/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Categories;
