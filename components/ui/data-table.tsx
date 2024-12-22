"use client";

import { Input } from "./input";
import { ReactNode } from "react";
import { Button } from "./button";
import { ScrollArea, ScrollBar } from "./scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, useReactTable } from "@tanstack/react-table";
import { Loading } from "@/app/_components/loading";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey: string;
  loading?: boolean;
  headingExtra?: ReactNode;
} & (
  | {
      usePagination: true;
      dataCount: number;
      currentPage: number;
      pageSize: number;
      nextPage: () => void;
      previousPage: () => void;
    }
  | { usePagination: false }
);

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });

  return (
    <div className="bg-background p-2 shadow-md sm:p-4">
      <div className="mb-2 flex items-center justify-between">
        <Input
          placeholder={`Search ${props.searchKey}...`}
          value={(table.getColumn(props.searchKey)?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn(props.searchKey)?.setFilterValue(event.target.value)}
          className="w-full md:max-w-sm"
        />

        {props.headingExtra}
      </div>

      <ScrollArea className="max-h-[75vh] min-h-[calc(100vh-520px)] overflow-y-auto rounded-md border">
        <Table className="relative">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={props.columns.length} className="h-24 text-center">
                  {props.loading ? <Loading className="h-96" spinnerClassName="h-16 w-16" /> : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={props.usePagination ? props.previousPage : table.previousPage}
            disabled={props.usePagination ? props.currentPage <= 1 : !table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={props.usePagination ? props.nextPage : table.nextPage}
            disabled={
              props.usePagination ? props.currentPage * props.pageSize >= props.dataCount : !table.getCanNextPage()
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
