"use client";

import React, { useEffect, useState } from "react";
import { useGetAllVendorFeedbacksMutation } from "@/components/api";
import { useUserStore } from "@/app/context/user-context";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { useVendorContext } from "@/app/context/vendor-context";
import { Feedback } from "@/types/user-facing";
import FeedbackNodes from "./feedback-nodes";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const pageSize = 12;
const FeedbackComp = () => {
  const { vendor, setVendor } = useUserStore();
  const { setFeedbacks, feedbacks } = useVendorContext();
  const { mutateAsync: getAsync, isPending, isError, isIdle } = useGetAllVendorFeedbacksMutation();
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const getAllVendorFeedbackFn = async () => {
    try {
      if (!vendor?.vendorId) {
        setVendor(null);
        router.push("/login");
        return;
      }
      const data = await getAsync({ vendorId: vendor.vendorId, page, pageSize });
      setTotalRows(data.data.count);
      setFeedbacks(data.data.rows as Feedback[]);
    } catch (err: any) {
      const desc: string = err.message || err.error;
      if (!desc) return;
      toast({ variant: "destructive", description: desc });
      if (desc.includes("token expired")) {
        setVendor(null);
        router.push("/login");
      }
      throw err;
    }
  };

  useEffect(() => {
    getAllVendorFeedbackFn();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vendor?.vendorId, page]);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {isIdle && isPending && (
          <Skeleton>
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-bold"></h1>
              <p className="text-gray-500"></p>
            </div>
          </Skeleton>
        )}

        {isError && <h1 className="text-3xl font-bold">Failed to fetch feedbacks</h1>}
      </div>

      {!isPending && !isError && !isIdle && (
        <div className="flex flex-wrap items-center justify-start gap-4">
          <FeedbackNodes />
        </div>
      )}

      {totalRows !== 0 ? (
        <div className="mt-4 flex items-center justify-end gap-8">
          <Button
            disabled={page === 1}
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="flex-center"
          >
            <ArrowLeft className="h-6 w-6 text-white" />
          </Button>

          <div>
            Showing&nbsp;
            <span className="font-semibold">{feedbacks.length}</span>
            &nbsp;of&nbsp;
            <span className="font-semibold">{totalRows}</span>
            &nbsp;feedbacks
          </div>

          <Button
            disabled={page === Math.ceil(totalRows / pageSize)}
            onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(totalRows / pageSize)))}
            className="flex-center"
          >
            <ArrowRight className="h-6 w-6 text-white" />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default FeedbackComp;
