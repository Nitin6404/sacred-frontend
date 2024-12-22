"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function UsersList() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Users" />}>
      <SuperAdminLayout title="Users">
        <TableHOC
          usePagination
          searchKey="name"
          columns={[
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            { accessorKey: "isActive", header: "Active", accessorFn: (data) => (data.isActive ? "Yes" : "No") },
            { accessorKey: "phone", header: "Phone", accessorFn: (data) => data.phone || "" },
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
          addable={false}
          editable={false}
          deleteable={false}
          paginateDataEndpoint="/api/v1/admin/get-all-users?userType=user"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default UsersList;
