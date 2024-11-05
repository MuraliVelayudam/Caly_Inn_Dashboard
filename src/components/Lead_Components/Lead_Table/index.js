// Salesperson Name
// Event Date
// No. Of People(Pax)
// Follow up date

"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { BiSort } from "react-icons/bi";
import LeadsDetails from "../Leads_Details";
import Lead_Delete from "../Leads_Delete";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "hostname",
    header: "Host Name",
    cell: ({ row }) => <div>{row.getValue("hostname")}</div>,
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
    cell: ({ row }) => <div>{row.getValue("mobile")}</div>,
  },
  {
    accessorKey: "salesperson_name",
    header: "Salesperson Name",
    cell: ({ row }) => <div>{row.getValue("salesperson_name")}</div>,
  },
  {
    accessorKey: "event_date",
    header: "Event Date",
    cell: ({ row }) => <div>{row.getValue("event_date")}</div>,
  },
  {
    accessorKey: "pax",
    header: "No. of People (Pax)",
    cell: ({ row }) => <div>{row.getValue("pax")}</div>,
  },
  {
    accessorKey: "followup",
    header: "Follow-up Date",
    cell: ({ row }) => <div>{row.getValue("followup")}</div>,
  },
  {
    accessorKey: "call_status",
    header: "Call Status",
    cell: ({ row }) => <div>{row.getValue("call_status")}</div>,
  },
  {
    accessorKey: "lead_status",
    header: "Lead Status",
    cell: ({ row }) => <div>{row.getValue("lead_status")}</div>,
  },
  {
    accessorKey: "lead_number",
    header: "Lead Number",
    cell: ({ row }) => {
      const leadStatus = row.getValue("lead_status");
      const textColor =
        leadStatus === "untouched"
          ? "bg-red-700 text-center p-1 text-mainBg rounded-full"
          : "text-green-700 text-center p-1 text-mainBg rounded-full";
      return <div className={textColor}>{leadStatus}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    enableHiding: false,
    cell: ({ row }) => {
      const lead = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel className="hidden">Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(lead.lead_number)}
            >
              Copy Lead Number
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <div className="flex items-center justify-center">
              <LeadsDetails lead={lead} />
            </div>
            <div className="flex items-center justify-center">
              <Lead_Delete lead={lead} />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function LeadsTable({ leads, locationId }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterValue, setFilterValue] = useState("");

  const table = useReactTable({
    data: leads,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnFilters, columnVisibility, rowSelection },
    globalFilterFn: (row, columnId, filterValue) => {
      const hostname = row.getValue("hostname")?.toString().toLowerCase() || "";
      const leadNumber = row.getValue("lead_number")?.toString() || "";
      return (
        hostname.includes(filterValue.toLowerCase()) ||
        leadNumber.includes(filterValue)
      );
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter by host name or lead number..."
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value);
            table.setGlobalFilter(event.target.value);
          }}
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-auto">
              <span>
                <BiSort size={20} />
              </span>{" "}
              Filter <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows?.length || 0} of{" "}
          {table.getFilteredRowModel().rows?.length || 0} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
