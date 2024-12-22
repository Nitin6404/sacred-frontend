"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../_components/adminLayout";
import TableHOC from "../_components/tableHoc";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import apiClient from "@/lib/apiConfig/apiClient";
import { useUserStore } from "@/app/context/user-context";
import { CellContext } from "@tanstack/react-table";
import { getQueryClient } from "@/lib/apiConfig/apiProvider";
import { cn } from "@/lib/utils";
import { Loading } from "@/app/_components/loading";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../_components/adminArrorPage";

function AdminVendors() {
  const { super_admin } = useUserStore();
  const queryClient = getQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["/api/v1/admin/get-all-users?userType=vendor"],
    mutationFn: (props: { vendorId: number; status: "active" | "inactive" }) => {
      return apiClient("/api/v1/admin/verify-vendor", {
        method: "POST",
        body: JSON.stringify({ vendorUserId: props.vendorId, status: props.status }),
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${super_admin?.tokens.accessToken}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "/api/v1/admin/get-all-users?userType=vendor"
      });
    }
  });

  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Vendors" />}>
      <SuperAdminLayout title="Vendors">
        <TableHOC
          searchKey="name"
          usePagination
          columns={[
            { accessorKey: "name", header: "Name" },
            { accessorKey: "email", header: "Email" },
            {
              header: "Active",
              accessorKey: "isActive",
              cell: ({ row }: CellContext<any, unknown>) => (
                <Button
                  size="sm"
                  disabled={isPending}
                  className={cn(
                    "font-semibold",
                    row.original.isActive ? "bg-red-500 hover:bg-red-400" : "bg-green-500 hover:bg-green-400"
                  )}
                  onClick={() =>
                    mutateAsync({ vendorId: row.original.id, status: row.original.isActive ? "inactive" : "active" })
                  }
                >
                  {isPending ? (
                    <Loading className="absolute h-full w-full" spinnerClassName="h-4 w-4" />
                  ) : row.original.isActive ? (
                    "Deactivate"
                  ) : (
                    "Activate"
                  )}
                </Button>
              )
            },
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
          paginateDataEndpoint="/api/v1/admin/get-all-users?userType=vendor"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default AdminVendors;
