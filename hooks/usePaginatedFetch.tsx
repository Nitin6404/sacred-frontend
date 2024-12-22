"use client";

import { useVendorSearchStore } from "@/app/context/vendor-search-context";
import { toast } from "@/components/ui/use-toast";
import { UseMutationResult } from "@tanstack/react-query";
import { useEffect } from "react";

export const usePaginatedFetch = (
  useMutation: () => UseMutationResult<any, Error, any, unknown>,
  reqPayload?: any,
  options?: { fetchOnRender?: boolean; onUnauthorizedError?: any; previewFormat?: boolean }
) => {
  const vendorSearchStore = useVendorSearchStore();
  const { mutateAsync: handleAsyncPaginatedSearch, isPending, isIdle, isError } = useMutation();

  const isNextPageAvailable = vendorSearchStore.page < Math.ceil(vendorSearchStore.count / vendorSearchStore.pageSize);
  const isPrevPageAvailable = vendorSearchStore.page > 1;

  async function fetchData() {
    try {
      if (!options || !options.fetchOnRender) return;
      const res = await handleAsyncPaginatedSearch({
        page: vendorSearchStore.page,
        pageSize: vendorSearchStore.pageSize,
        serviceIds: [],
        date: new Date(),
        rating: 0,
        ...reqPayload
      });
      vendorSearchStore.setData(res.data.rows, res.data.count);
    } catch (err: any) {
      const msg: string = err.error || err.message || "An error occurred";
      toast({ title: "Error", description: err.message, variant: "destructive" });
      if (msg.includes("No access token found") || msg.includes("token expired") || msg.includes("invalid token"))
        options?.onUnauthorizedError();
    }
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUnauthorized(res: any) {
    if (res.status === 401) {
    }
  }

  async function onFormSubmit(params: any) {
    vendorSearchStore.setSearchParams(params);
    const res = await handleAsyncPaginatedSearch({ ...params, page: 1, pageSize: vendorSearchStore.pageSize });
    await checkUnauthorized(res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
    vendorSearchStore.setSearched(true);
  }

  async function nextPage() {
    if (isNextPageAvailable) {
      vendorSearchStore.nextPage();
      const res = await handleAsyncPaginatedSearch({
        page: vendorSearchStore.page + 1,
        pageSize: vendorSearchStore.pageSize
      });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function prevPage() {
    if (isPrevPageAvailable) {
      vendorSearchStore.prevPage();
      const res = await handleAsyncPaginatedSearch({
        page: vendorSearchStore.page - 1,
        pageSize: vendorSearchStore.pageSize
      });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function setPageSize(pageSize: number) {
    vendorSearchStore.setPageSize(pageSize);
    const res = await handleAsyncPaginatedSearch({ page: vendorSearchStore.page, pageSize });
    await checkUnauthorized(res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
  }

  return {
    isPending,
    isIdle,
    isError,
    onFormSubmit,
    nextPage,
    prevPage,
    setPageSize,
    isNextPageAvailable,
    isPrevPageAvailable,
    data: vendorSearchStore.data,
    page: vendorSearchStore.page,
    pageSize: vendorSearchStore.pageSize,
    total: vendorSearchStore.count,
    searched: vendorSearchStore.searched,
    setSearched: vendorSearchStore.setSearched
  };
};
