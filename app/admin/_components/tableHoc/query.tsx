import { useUserStore } from "@/app/context/user-context";
import apiClient from "@/lib/apiConfig/apiClient";
import { UserAuthType } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export type useTableHocQueryProps = {
  type: UserAuthType;
  pageSize: number;
  usePagination: boolean;
  addDataEndpoint: string;
  editDataEndpoint: string;
  deleteDataEndpoint: string;
  paginateDataEndpoint: string;
};

function useTableHocQuery<T>(props: useTableHocQueryProps) {
  const [page, setPage] = useState(1);
  const userStore = useUserStore();
  const router = useRouter();

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + userStore[props.type]?.tokens.accessToken || ""
  };

  const logoutIfUnauthorized = useCallback((error: { message: string }) => {
    const msg = error.message;
    if (msg.includes("token expired") || msg.includes("invalid token") || msg.includes("No access token found")) {
      userStore.setSuperAdmin(null);
      router.replace("/admin/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    data,
    refetch: refetchData,
    isFetching: isFetchingData
  } = useQuery({
    queryKey: [props.paginateDataEndpoint, ...(props.usePagination ? [page, props.pageSize] : [])],
    queryFn: async () => {
      try {
        const res = await apiClient(
          props.paginateDataEndpoint +
            (props.usePagination
              ? (props.paginateDataEndpoint.includes("?") ? "&" : "?") + `page=${page}&pageSize=${props.pageSize}`
              : ""),
          { method: "GET", headers }
        );
        return res;
      } catch (error: any) {
        logoutIfUnauthorized(error);
        throw error;
      }
    }
  });

  const { mutate: handleEditData, isPending: isEditPending } = useMutation({
    mutationKey: [props.editDataEndpoint],
    mutationFn: (data: Partial<T>) =>
      apiClient(props.editDataEndpoint, { method: "PUT", body: JSON.stringify(data), headers }),
    onSuccess: () => refetchData(),
    onError: (error) => logoutIfUnauthorized(error)
  });

  const { mutate: handleDeleteData, isPending: isDeletePending } = useMutation({
    mutationKey: [props.deleteDataEndpoint],
    mutationFn: (id: number | string) =>
      apiClient(props.deleteDataEndpoint, { method: "DELETE", body: JSON.stringify({ id }), headers }),
    onSuccess: () => refetchData(),
    onError: (error) => logoutIfUnauthorized(error)
  });

  const { mutate: handleAddData, isPending: isAddDataPending } = useMutation({
    mutationKey: [props.addDataEndpoint],
    mutationFn: (data: Partial<T>) =>
      apiClient(props.addDataEndpoint, { method: "POST", body: JSON.stringify(data), headers }),
    onSuccess: () => refetchData(),
    onError: (error) => logoutIfUnauthorized(error)
  });

  return {
    data,
    refetchData,
    isFetchingData,

    isEditPending,
    handleEditData,

    isDeletePending,
    handleDeleteData,

    handleAddData,
    isAddDataPending,

    currentPage: page,
    nextPage: () => setPage((prev) => prev + 1),
    previousPage: () => setPage((prev) => prev - 1)
  };
}

export default useTableHocQuery;
