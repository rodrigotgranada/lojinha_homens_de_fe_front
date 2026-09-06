import React from "react";
import {
  LayoutDashboard,
  Store,
  Boxes,
  Wrench,
  TrendingUp,
  Tag,
  Calendar,
  FileText,
  User,
  Activity,
  Settings,
} from "lucide-react";

export interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export const adminLinks: NavLinkItem[] = [
  { name: "Painel", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "PDV", href: "/admin/pdv", icon: <Store className="h-4 w-4" /> },
  { name: "Estoque", href: "/admin/produtos", icon: <Boxes className="h-4 w-4" /> },
  { name: "Despesas & Obras", href: "/admin/despesas", icon: <Wrench className="h-4 w-4" /> },
  { name: "Prestação Lojinha", href: "/admin/prestacao-contas", icon: <TrendingUp className="h-4 w-4" /> },
  { name: "Categorias", href: "/admin/categorias", icon: <Tag className="h-4 w-4" /> },
  { name: "Eventos", href: "/admin/eventos", icon: <Calendar className="h-4 w-4" /> },
  { name: "Vendas", href: "/admin/vendas", icon: <FileText className="h-4 w-4" /> },
  { name: "Clientes", href: "/admin/clientes", icon: <User className="h-4 w-4" /> },
  { name: "Logs", href: "/admin/logs", icon: <Activity className="h-4 w-4" /> },
  { name: "Configurações", href: "/admin/configuracoes", icon: <Settings className="h-4 w-4" /> },
];
