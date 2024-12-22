"use client";

import { Plus } from "lucide-react";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { FormEvent, ReactNode, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import CellAction from "./actions";
import useTableHocQuery from "./query";
import { UserAuthType, userAuthTypes } from "@/types";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast";
// import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import { FormElementInstance, FormRenderer } from "../forms";
import { WithLoading } from "@/app/_components/loading";

export type TableHocProps<T> = {
  pageSize?: number;
  authType?: UserAuthType;
  columns: ColumnDef<T>[];
  searchKey: string;
  usePagination?: boolean;
  paginateDataEndpoint: string;
  headingExtra?: ReactNode;
} & (
  | {
      editable: true;
      editDataEndpoint: string;
      addEditFormMeta: FormElementInstance[];
      updateModalTitle?: string;
      editDataTransformer?: (data: any) => any;
    }
  | { editable: false }
) &
  (
    | {
        addable: true;
        addDataEndpoint: string;
        addEditFormMeta: FormElementInstance[];
        addModalTitle?: string;
        createDataTransformer?: (data: any) => any;
      }
    | { addable: false }
  ) &
  ({ deleteable: true; deleteDataEndpoint: string } | { deleteable: false });

function TableHOC<T = Record<string, any> & { id: number }>(props: TableHocProps<T>) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState<T | null>(null);

  const {
    data,
    handleAddData,
    handleEditData,
    refetchData,
    isFetchingData,
    handleDeleteData,
    isEditPending,
    isDeletePending,
    isAddDataPending,
    currentPage,
    nextPage,
    previousPage
  } = useTableHocQuery({
    pageSize: props.pageSize || 15,
    usePagination: !!props.usePagination,
    paginateDataEndpoint: props.paginateDataEndpoint,
    type: props.authType || userAuthTypes.super_admin,
    addDataEndpoint: props.addable ? props.addDataEndpoint : "",
    deleteDataEndpoint: props.deleteable ? props.deleteDataEndpoint : "",
    editDataEndpoint: props.editable ? props.editDataEndpoint : ""
  });

  const columns: ColumnDef<T>[] = useMemo(
    () => [
      // {
      //   id: "select",
      //   header: ({ table }) => (
      //     <Checkbox
      //       checked={table.getIsAllPageRowsSelected()}
      //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      //       aria-label="Select all"
      //     />
      //   ),
      //   cell: ({ row }) => (
      //     <Checkbox
      //       checked={row.getIsSelected()}
      //       onCheckedChange={(value) => row.toggleSelected(!!value)}
      //       aria-label="Select row"
      //     />
      //   ),
      //   enableSorting: false,
      //   enableHiding: false
      // },
      ...props.columns,
      ...(props.editable || props.deleteable
        ? [
            {
              id: "actions",
              header: "Actions",
              cell: ({ row }: CellContext<T, unknown>) => (
                <CellAction
                  {...(props.editable
                    ? {
                        editable: true,
                        onEditClick: () => {
                          setEditData(row.original);
                          setOpen(true);
                        }
                      }
                    : { editable: false })}
                  data={row.original}
                  {...(props.deleteable
                    ? { deleteable: true, handleDelete: () => handleDeleteData((row.original as any).id) }
                    : { deleteable: false })}
                />
              )
            }
          ]
        : [])
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const formData = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries()) as any;
      // console.log({ formData });

      if (!!editData) {
        if (!props.editable) return;
        const data = { ...editData, ...((formData as any) || {}) };

        props.addEditFormMeta.forEach((field) => {
          if (field.name !== "toggleInput") return;
          if (field.props.name && field.props.name in data && data[field.props.name] === "on") {
            data[field.props.name] = true;
          } else if (field.props.name && field.props.name in data && data[field.props.name] === "off") {
            data[field.props.name] = false;
          }
        });

        const transformedData = props.editDataTransformer ? props.editDataTransformer(data) : data;
        handleEditData(transformedData, {
          onSuccess: () => {
            toast({ title: "Updated Successfully", description: "" });
            setOpen(false);
            setEditData(null);
          },
          onError: (err: any) => {
            toast({ title: "Error", description: err.error });
          }
        });
      } else {
        if (!props.addable) return;
        const data = { ...((formData as any) || {}) };
        props.addEditFormMeta.forEach((field) => {
          if (field.name !== "toggleInput") return;
          if (field.props.name && field.props.name in data && data[field.props.name] === "on") {
            data[field.props.name] = true;
          } else if (field.props.name && field.props.name in data && data[field.props.name] === "off") {
            data[field.props.name] = false;
          }
        });

        const transformedData = props.createDataTransformer ? props.createDataTransformer(data) : data;
        handleAddData(transformedData, {
          onSuccess: () => {
            toast({ title: "Created Successfully", description: "" });
            setOpen(false);
            setEditData(null);
          },
          onError: (err: any) => {
            toast({ title: "Error", description: err.error });
          }
        });
      }
    } catch (err: any) {}
  };

  return (
    <>
      {props.editable || props.addable ? (
        <Modal
          isOpen={open}
          onClose={() => setOpen(false)}
          title={
            !!editData && props.editable
              ? props.updateModalTitle || `Update`
              : props.addable
              ? props.addModalTitle || `Add`
              : ""
          }
        >
          <WithLoading loading={isEditPending || isDeletePending || isAddDataPending} spinnerClassName="h-16 w-16">
            <form onSubmit={handleSubmit}>
              <fieldset
                className="mb-4 flex flex-col gap-1"
                disabled={isEditPending || isDeletePending || isAddDataPending}
              >
                <FormRenderer meta={props.addEditFormMeta} {...(!!editData ? { defaults: editData } : {})} />
              </fieldset>

              <div className="flex items-center justify-between">
                <Button type="reset" variant="outline" disabled={isEditPending || isDeletePending || isAddDataPending}>
                  Reset
                </Button>
                <Button type="submit" disabled={isEditPending || isDeletePending || isAddDataPending}>
                  Submit
                </Button>
              </div>
            </form>
          </WithLoading>
        </Modal>
      ) : null}

      <DataTable
        columns={columns}
        loading={isFetchingData}
        searchKey={props.searchKey}
        {...(props.usePagination
          ? {
              nextPage,
              currentPage,
              previousPage,
              usePagination: true,
              pageSize: props.pageSize || 15,
              dataCount: data ? data.data.count : 0
            }
          : { usePagination: false })}
        data={data ? (props.usePagination ? data.data.rows : data.data) : []}
        headingExtra={
          <div className="flex items-center gap-2">
            {props.headingExtra}

            <Button variant="outline" onClick={() => refetchData()} disabled={isFetchingData}>
              <ReloadIcon className={cn(isFetchingData ? "animate-spin" : "")} />
            </Button>

            {props.addable ? (
              <Button
                className="text-xs md:text-sm"
                onClick={() => {
                  setOpen(true);
                  setEditData(null);
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add New
              </Button>
            ) : null}
          </div>
        }
      />
    </>
  );
}

export default TableHOC;
