"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Link } from "react-router-dom";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Proposal = {
  id: string;
  proposals: string;
  slugs: string;
  status: "pending" | "processing" | "success" | "failed";
  title: string;
};

export const columns: ColumnDef<Proposal>[] = [
  {
    accessorKey: "proposal",
    header: () => <div className="">Proposals</div>,
    cell: ({ row }) => {
      const proposalName = row.getValue("proposals");

      return (
        <Link to={row.original.slugs} className="">
          {proposalName as React.ReactNode}
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: () => <div>Title</div>,
    cell: ({ row }) => {
      const proposalTitle = row.getValue("title");
      return (
        <Link to={row.original.slugs}>{proposalTitle as React.ReactNode}</Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="">Status</div>,
    cell: ({ row }) => {
      const status: "pending" | "processing" | "success" | "failed" =
        row.getValue("status");

      const color = {
        pending: "text-yellow-500",
        processing: "text-blue-500",
        success: "text-green-500",
        failed: "text-red-500",
      }[status];

      return (
        <div className={` ${color}`}>
          <span className="rounded-full bg-current inline-block h-3 w-3 mr-1"></span>
          {status}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
