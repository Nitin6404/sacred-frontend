"use client";

import { UseMutationResult } from "@tanstack/react-query";
import { motion } from "framer-motion";
import React from "react";
import BlogNode from "../(dashboard)/(blog-wrapper)/blogs/components/blog-node";
import { usePaginatedFetch } from "@/hooks/usePaginatedFetch";
import { useVendorSearchStore } from "../context/vendor-search-context";
import GenericNodesRenderer from "./generic-nodes-renderer";

interface Props {
  mutation: () => UseMutationResult<any, Error, any, unknown>;
  setReloadKey: React.Dispatch<React.SetStateAction<number>>;
  noPagination?: boolean;
  userSide?: boolean;
  [key: string]: any;
}

export function GenericGridNodesTemplates({
  mutation,
  setReloadKey,
  nodeComp,
  userSide,
  previewFormat,
  ...nodeProps
}: Props) {
  const { pageSize: defaultPageSize } = useVendorSearchStore();
  const { data, isPending, isIdle, isError, total, nextPage, prevPage, isPrevPageAvailable, isNextPageAvailable } =
    usePaginatedFetch(mutation, { page: 1, pageSize: previewFormat ? 6 : defaultPageSize }, { fetchOnRender: true });

  return (
    <GenericNodesRenderer
      errorMsg={isError ? "An error occurred while fetching blogs" : ""}
      isPending={isPending || isIdle}
      navigationProps={{
        currLength: data.length,
        displayNavigationBtns: !previewFormat,
        isNextPageAvailable,
        isPrevPageAvailable,
        nextPage,
        prevPage,
        totalLength: total
      }}
    >
      {data.map((item, idx) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, translateY: "2rem" },
            show: { opacity: 1, translateY: 0 }
          }}
          key={idx}
          transition={{ duration: 0.2 }}
        >
          <BlogNode post={item as any} userSide={userSide} setReloadKey={setReloadKey} />
        </motion.div>
      ))}
    </GenericNodesRenderer>
  );
}
