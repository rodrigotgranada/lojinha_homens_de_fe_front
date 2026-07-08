"use client";

import React from "react";
import { Activity } from "lucide-react";
import { useLogs } from "../context/LogsContext";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHeaderCell,
  TableSortHeaderCell
} from "@/components/ui/Table";

export const LogsTable: React.FC = () => {
  const { filteredLogs, loading, sortField, sortDir, handleSort } = useLogs();

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center py-20">
        <span className="text-zinc-500 font-semibold text-sm">Carregando logs do servidor...</span>
      </div>
    );
  }

  if (filteredLogs.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-3xl p-16 text-center text-zinc-400 dark:text-zinc-500">
        <Activity className="h-14 w-14 stroke-1 mb-2 mx-auto opacity-50" />
        <p className="font-bold text-sm">Nenhum log correspondente encontrado</p>
        <p className="text-xs mt-1">Experimente alterar os filtros de pesquisa acima.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl overflow-hidden shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableSortHeaderCell
              label="Data e Hora"
              field="createdAt"
              currentSortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <TableSortHeaderCell
              label="Operador"
              field="userName"
              currentSortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <TableSortHeaderCell
              label="Ação"
              field="action"
              currentSortField={sortField}
              sortDir={sortDir}
              onSort={handleSort}
            />
            <TableHeaderCell>Descrição</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredLogs.map((log) => {
            const getLogBadge = () => {
              switch (log.action) {
                case "sale_create":
                  return (
                    <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/30">
                      Venda
                    </span>
                  );
                case "stock_update":
                  return (
                    <span className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-900/30">
                      Estoque
                    </span>
                  );
                case "product_create":
                  return (
                    <span className="bg-sky-50 dark:bg-sky-955/30 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-sky-100 dark:border-sky-900/30">
                      Novo Item
                    </span>
                  );
                case "product_update":
                  return (
                    <span className="bg-amber-50 dark:bg-amber-955/30 text-amber-600 dark:text-amber-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-amber-100 dark:border-amber-900/30">
                      Edição
                    </span>
                  );
                case "product_deactivate":
                  return (
                    <span className="bg-red-50 dark:bg-red-955/30 text-red-655 dark:text-red-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-red-100 dark:border-red-900/30">
                      Arquivado
                    </span>
                  );
                case "product_activate":
                  return (
                    <span className="bg-emerald-50 dark:bg-emerald-955/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-900/30">
                      Ativado
                    </span>
                  );
                default:
                  return (
                    <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border border-zinc-200 dark:border-zinc-700">
                      Ação
                    </span>
                  );
              }
            };

            return (
              <TableRow key={log.id}>
                <TableCell className="font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleString("pt-BR")}
                </TableCell>
                <TableCell className="font-bold text-zinc-900 dark:text-white whitespace-nowrap">
                  {log.userName}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {getLogBadge()}
                </TableCell>
                <TableCell className="text-zinc-650 dark:text-zinc-350 leading-relaxed font-semibold">
                  {log.description}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
