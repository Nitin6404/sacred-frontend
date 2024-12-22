import { useVendorSearchStore } from "@/app/context/vendor-search-context";
import { useSearchVendorsMutation } from "@/components/api";
import { UseMutationResult } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useVendorSearch(
  useMutation?: () => UseMutationResult<any, Error, any, unknown>,
  setProfile?: any,
  options?: { vendorTypeSlug?: string }
) {
  const vendorSearchStore = useVendorSearchStore();
  const router = useRouter();
  const func = useMutation || useSearchVendorsMutation;
  const { mutateAsync: handleVendorSearch, isPending, isIdle, isError } = func();

  const isNextPageAvailable = vendorSearchStore.page < Math.ceil(vendorSearchStore.count / vendorSearchStore.pageSize);
  const isPrevPageAvailable = vendorSearchStore.page > 1;

  async function notSearchedFetchData(pageNumber?: number) {
    if (!options || !options.vendorTypeSlug) return;
    // console.log("making the call");
    const res = await handleVendorSearch({
      page: pageNumber ?? vendorSearchStore.page,
      pageSize: vendorSearchStore.pageSize,
      vendorType: options.vendorTypeSlug,
      serviceIds: [],
      date: new Date(),
      rating: 0
    });
    // console.log("result from fetch call --> ", res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
  }

  useEffect(() => {
    notSearchedFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function checkUnauthorized(res: any) {
    if (res?.status === 401) {
      setProfile(null);
      router.push("/login");
    }
  }

  async function onFormSubmit(params: any) {
    // console.log("form submitted: ", params);
    vendorSearchStore.setSearchParams(params);
    const res = await handleVendorSearch({ ...params, page: 1, pageSize: vendorSearchStore.pageSize });
    await checkUnauthorized(res);
    vendorSearchStore.setData(res.data.rows, res.data.count);
    vendorSearchStore.setSearched(true);
  }

  async function nextPage() {
    if (isNextPageAvailable) {
      vendorSearchStore.nextPage();
      const res = !vendorSearchStore.searched
        ? await notSearchedFetchData(vendorSearchStore.page + 1)
        : await handleVendorSearch({ page: vendorSearchStore.page + 1, pageSize: vendorSearchStore.pageSize });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function prevPage() {
    if (isPrevPageAvailable) {
      vendorSearchStore.prevPage();
      const res = !vendorSearchStore.searched
        ? await notSearchedFetchData(vendorSearchStore.page - 1)
        : await handleVendorSearch({ page: vendorSearchStore.page - 1, pageSize: vendorSearchStore.pageSize });
      await checkUnauthorized(res);
      vendorSearchStore.setData(res.data.rows, res.data.count);
    }
  }

  async function setPageSize(pageSize: number) {
    vendorSearchStore.setPageSize(pageSize);
    const res = await handleVendorSearch({ page: vendorSearchStore.page, pageSize });
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
}
