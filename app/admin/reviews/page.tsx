"use client";

import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { AdminErrorPage } from "../_components/adminArrorPage";

function Reviews() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Reviews" />}>
      <SuperAdminLayout title="Reviews">
        <TableHOC
          searchKey="vendorName"
          usePagination
          addable={false}
          editable={false}
          deleteable={false}
          columns={[
            { accessorKey: "vendorName", header: "Vendor Name" },
            { accessorKey: "rating", header: "Rating" },
            { accessorKey: "userName", header: "User" },
            { accessorKey: "feedback", header: "Feedback" }
          ]}
          paginateDataEndpoint="/api/v1/feedback/all"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Reviews;
