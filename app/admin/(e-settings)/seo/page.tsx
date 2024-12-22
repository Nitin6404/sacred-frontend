"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";
import { AdminErrorPage } from "../../_components/adminArrorPage";
import { ErrorBoundary } from "@/components/errorBoundary";

function SeoSettings() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="SEO Settings" />}>
      <SuperAdminLayout title="SEO Settings">
        <TableHOC
          searchKey="metaTitle"
          usePagination
          addable
          editable
          deleteable
          columns={[
            { accessorKey: "url", header: "URL" },
            { accessorKey: "metaTitle", header: "Meta Title" },
            { accessorKey: "metaDescription", header: "Meta Description" },
            { accessorKey: "metaKeywords", header: "Meta Keywords" },
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
            {
              name: "label",
              id: "seoUrlLabel",
              props: { text: "URL", htmlFor: "seoUrlName", required: true }
            },
            { id: "seoUrlName", name: "input", props: { name: "seoUrl", className: "mb-4", required: true } },
            {
              name: "label",
              id: "seoMetaTitleLabel",
              props: { text: "Meta Title", htmlFor: "seoMetaTitleName", required: true }
            },
            {
              name: "textAreaInput",
              id: "seoMetaTitleName",
              props: { name: "metaTitle", className: "mb-4", required: true }
            },
            {
              name: "label",
              id: "seoMetaDescriptionLabel",
              props: { text: "Meta Description", htmlFor: "seoMetaDescriptionName", required: true }
            },
            {
              name: "textAreaInput",
              id: "seoMetaDescriptionName",
              props: { name: "metaDescription", className: "mb-4", required: true }
            },
            {
              name: "label",
              id: "seoMetaKeywordsLabel",
              props: { text: "Meta Keywords", htmlFor: "seoMetaKeywordsName", required: true }
            },
            {
              name: "textAreaInput",
              id: "seoMetaKeywordsName",
              props: { name: "metaKeywords", className: "mb-4", required: true }
            }
          ]}
          addDataEndpoint="/api/v1/seo/create"
          editDataEndpoint="/api/v1/seo/update"
          paginateDataEndpoint="/api/v1/seo/all"
          deleteDataEndpoint="/api/v1/seo/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default SeoSettings;
