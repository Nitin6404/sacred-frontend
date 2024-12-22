"use client";

import dayjs from "dayjs";
import { SuperAdminLayout } from "../../_components/adminLayout";
import TableHOC from "../../_components/tableHoc";
import { ErrorBoundary } from "@/components/errorBoundary";
import { AdminErrorPage } from "../../_components/adminArrorPage";

function ContactSettings() {
  return (
    <ErrorBoundary fallback={<AdminErrorPage title="Contacts" />}>
      <SuperAdminLayout title="Contacts">
        <TableHOC
          searchKey="contactAddress"
          addable
          editable
          deleteable
          columns={[
            { accessorKey: "contactAddress", header: "Address" },
            { accessorKey: "contactPhone", header: "Phone" },
            { accessorKey: "footerText", header: "Footer Text" },
            { accessorKey: "facebookUrl", header: "Facebook" },
            { accessorKey: "instagramUrl", header: "Instagram" },
            { accessorKey: "twitterUrl", header: "Twitter" },
            { accessorKey: "youtubeUrl", header: "Youtube" },
            { accessorKey: "pinterestUrl", header: "Pinterest" },
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
              id: "contactAddressLabel",
              props: { text: "Contact Address", htmlFor: "contactAddressName" }
            },
            {
              name: "input",
              id: "contactAddressName",
              props: { name: "contactAddress", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactPhoneLabel",
              props: { text: "Contact Phone", htmlFor: "contactPhoneName" }
            },
            {
              name: "input",
              id: "contactPhoneName",
              props: { name: "contactPhone", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactFooterTextLabel",
              props: { text: "Contact Footer Text", htmlFor: "contactFooterTextName" }
            },
            {
              name: "input",
              id: "contactFooterTextName",
              props: { name: "footerText", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactFacebookUrlLabel",
              props: { text: "Contact Facebook Url", htmlFor: "contactFacebookUrlName" }
            },
            {
              name: "input",
              id: "contactFacebookUrlName",
              props: { name: "facebookUrl", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactInstagramUrlLabel",
              props: { text: "Contact Instagram Url", htmlFor: "contactInstagramUrlName" }
            },
            {
              name: "input",
              id: "contactInstagramUrlName",
              props: { name: "instagramUrl", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactTwitterUrlLabel",
              props: { text: "Contact Twitter Url", htmlFor: "contactTwitterUrlName" }
            },
            {
              name: "input",
              id: "contactTwitterUrlName",
              props: { name: "twitterUrl", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactYoutubeUrlLabel",
              props: { text: "Contact Youtube Url", htmlFor: "contactYoutubeUrlName" }
            },
            {
              name: "input",
              id: "contactYoutubeUrlName",
              props: { name: "youtubeUrl", className: "mb-4" }
            },

            {
              name: "label",
              id: "contactPinterestUrlLabel",
              props: { text: "Contact Pinterest Url", htmlFor: "contactPinterestUrlName" }
            },
            {
              name: "input",
              id: "contactPinterestUrlName",
              props: { name: "pinterestUrl", className: "mb-4" }
            }
          ]}
          addDataEndpoint="/api/v1/contact/create"
          editDataEndpoint="/api/v1/contact/update"
          paginateDataEndpoint="/api/v1/contact/all"
          deleteDataEndpoint="/api/v1/contact/remove"
        />
      </SuperAdminLayout>
    </ErrorBoundary>
  );
}

export default ContactSettings;
