"use client";

import dayjs from "dayjs";
import { useState } from "react";
import TableHOC from "../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import { SuperAdminLayout } from "../_components/adminLayout";
import { AdminErrorPage } from "../_components/adminArrorPage";
import { bookingStatus, bookingStatusOptions } from "@/constants/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function Cities() {
  const [status, setStatus] = useState<bookingStatus | "">("");

  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Cities" />}>
      <SuperAdminLayout title="Cities">
        <TableHOC
          searchKey="vendorName"
          usePagination
          addable={false}
          editable={false}
          deleteable={false}
          columns={[
            { accessorKey: "vendorName", header: "Vendor Name" },
            { accessorKey: "vendorPhone", header: "Vendor Phone" },
            { accessorKey: "status", header: "Status" },
            { accessorKey: "vendorEmail", header: "Vendor Email" },

            { accessorKey: "userName", header: "User Name" },
            { accessorKey: "userPhone", header: "User Phone" },
            { accessorKey: "userEmail", header: "User Email" },

            {
              header: "Price",
              accessorKey: "serviceOfferedPrice",
              accessorFn: (data) => "₹ " + data.serviceOfferedPrice
            },
            {
              header: "booking Date",
              accessorKey: "createdAt",
              accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
            }
            // {
            //   header: "Created At",
            //   accessorKey: "createdAt",
            //   accessorFn: (data) => dayjs(data.createdAt).format("DD-MM-YYYY HH:mm A")
            // }
            // {
            //   header: "Updated At",
            //   accessorKey: "updatedAt",
            //   accessorFn: (data) => dayjs(data.updatedAt).format("DD-MM-YYYY HH:mm A")
            // }
          ]}
          paginateDataEndpoint={
            "/api/v1/booking/all" + (status && status !== bookingStatus.NONE ? "?status=" + status : "")
          }
          headingExtra={
            <div className="min-w-44">
              <Select onValueChange={(value) => setStatus(value as bookingStatus)}>
                <SelectTrigger>
                  <SelectValue>{status || "Select Status"}</SelectValue>
                </SelectTrigger>

                <SelectContent>
                  {bookingStatusOptions.map((bookingStatus) => (
                    <SelectItem value={bookingStatus} key={bookingStatus}>
                      {bookingStatus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          }
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default Cities;
