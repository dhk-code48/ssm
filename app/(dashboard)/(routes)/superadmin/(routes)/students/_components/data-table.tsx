"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { ChevronDown, ChevronsUpDown, Filter, PlusCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Grade, Section } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  grades: (Grade & { sections: Section[] })[];
  data: TData[];
}

export function DataTable<TData, TValue>({ columns, data, grades }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  React.useEffect(() => {
    table.getColumn("dob")?.toggleVisibility();
    table.getColumn("actions")?.toggleVisibility();
    table.getColumn("email")?.toggleVisibility();
    table.getColumn("country")?.toggleVisibility();
    table.getColumn("regesteredAt")?.toggleVisibility();
    table.getColumn("gradeId")?.toggleVisibility();
    table.getColumn("sectionId")?.toggleVisibility();
  }, [table]);

  return (
    <div>
      <Collapsible className="w-full mt-10 space-y-2 bg-gray-100 px-5 py-3 rounded-md">
        <CollapsibleTrigger asChild>
          <div className="prose w-full flex items-center space-x-4">
            <h3 className="mb-0">Filter Students</h3>
            <Filter className="h-5 w-5" />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 border-t pt-2 grid grid-cols-3">
          <Input
            placeholder="Fliter By First Name..."
            value={(table.getColumn("firstName")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("firstName")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Fliter By Last Name..."
            value={(table.getColumn("lastName")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("lastName")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Fliter By country..."
            value={(table.getColumn("country")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("country")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Fliter By regestration date"
            type="date"
            value={(table.getColumn("regesteredAt")?.getFilterValue() as string) ?? ""}
            onChange={(event) => {
              console.log("event.target.value => ", event.target.value);
              table.getColumn("regesteredAt")?.setFilterValue(event.target.value);
            }}
            className="max-w-sm"
          />
          <Input
            placeholder="Fliter By Date of Birth.."
            value={(table.getColumn("dob")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("dob")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Input
            placeholder="Fliter By email address..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn("gradeId")?.getFilterValue() as string) ?? ""}
            onValueChange={(event) => table.getColumn("gradeId")?.setFilterValue(event)}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter By Grade" />
            </SelectTrigger>
            <SelectContent>
              {grades.map((grade) => (
                <SelectItem value={grade.id} key={"student-table " + grade.id}>
                  {grade.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn("sectionId")?.getFilterValue() as string) ?? ""}
            onValueChange={(event) => table.getColumn("sectionId")?.setFilterValue(event)}
          >
            <SelectTrigger className="max-w-sm">
              <SelectValue placeholder="Filter By Section" />
            </SelectTrigger>
            <SelectContent>
              {(table.getColumn("gradeId")?.getFilterValue() as string) &&
                grades
                  .filter(
                    (grade) => grade.id === (table.getColumn("gradeId")?.getFilterValue() as string)
                  )[0]
                  .sections.map((section) => (
                    <SelectItem value={section.id} key={"student-table " + section.id}>
                      {section.name}
                    </SelectItem>
                  ))}
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>
      <div className="flex items-center py-4 justify-between">
        <Input
          placeholder="Fliter By Regestration Number..."
          value={(table.getColumn("registrationNumber")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("registrationNumber")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="space-x-10">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) => column.toggleVisibility(!!value)}
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="/superadmin/students/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              New Student
            </Button>
          </Link>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
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
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
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
  );
}
