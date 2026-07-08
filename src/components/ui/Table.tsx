"use client";

import React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  wrapperClassName?: string;
}

export const Table: React.FC<TableProps> = ({
  children,
  className = "",
  wrapperClassName = "",
  ...props
}) => {
  return (
    <div className={`overflow-x-auto ${wrapperClassName}`}>
      <table className={`w-full text-left border-collapse ${className}`} {...props}>
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <thead
      className={`bg-zinc-50 dark:bg-zinc-950/80 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase border-b border-zinc-100 dark:border-zinc-900 ${className}`}
      {...props}
    >
      {children}
    </thead>
  );
};

export const TableBody: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <tbody className={`divide-y divide-zinc-100 dark:divide-zinc-900 text-sm ${className}`} {...props}>
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <tr
      className={`hover:bg-zinc-50/50 dark:hover:bg-zinc-950/10 transition-colors ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export const TableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <td className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </td>
  );
};

export const TableHeaderCell: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <th className={`px-6 py-4 ${className}`} {...props}>
      {children}
    </th>
  );
};

interface TableSortHeaderCellProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  label: string;
  field: string;
  currentSortField: string | null;
  sortDir: "asc" | "desc";
  onSort: (field: any) => void;
}

export const TableSortHeaderCell: React.FC<TableSortHeaderCellProps> = ({
  label,
  field,
  currentSortField,
  sortDir,
  onSort,
  className = "",
  children,
  ...props
}) => {
  const active = currentSortField === field;
  return (
    <th
      className={`px-6 py-4 select-none cursor-pointer group ${className}`}
      onClick={() => onSort(field)}
      {...props}
    >
      <span className="inline-flex items-center gap-1.5">
        {label}
        <span
          className={`transition-colors ${
            active ? "text-indigo-500" : "text-zinc-350 dark:text-zinc-600 group-hover:text-zinc-500"
          }`}
        >
          {active ? (
            sortDir === "asc" ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )
          ) : (
            <ChevronsUpDown className="h-3 w-3" />
          )}
        </span>
      </span>
    </th>
  );
};
