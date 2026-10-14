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
  PieChart,
  ClipboardList,
  Compass,
  ShoppingBag,
} from "lucide-react";

export interface NavLinkItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  category?: "EVENT" | "GLOBAL";
}

export const eventScopeLinks: NavLinkItem[] = [
  { name: "Diretoria & Resumo", href: "/admin/diretoria", icon: <PieChart className="h-4 w-4" />, category: "EVENT" },
  { name: "Inscrições & Equipe", href: "/admin/inscricoes", icon: <ClipboardList className="h-4 w-4" />, category: "EVENT" },
  { name: "PDV Caixa", href: "/admin/pdv", icon: <Store className="h-4 w-4" />, category: "EVENT" },
  { name: "Vendas do Retiro", href: "/admin/vendas", icon: <FileText className="h-4 w-4" />, category: "EVENT" },
  { name: "Custos da Lojinha", href: "/admin/custos-loja", icon: <ShoppingBag className="h-4 w-4" />, category: "EVENT" },
  { name: "Custos de Obras & Retiro", href: "/admin/despesas", icon: <Wrench className="h-4 w-4" />, category: "EVENT" },
  { name: "Prestação de Contas A4", href: "/admin/prestacao-contas", icon: <TrendingUp className="h-4 w-4" />, category: "EVENT" },
];

export const globalScopeLinks: NavLinkItem[] = [
  { name: "Meus Retiros", href: "/admin", icon: <Compass className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Base Geral de Membros", href: "/admin/clientes", icon: <User className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Estoque Matriz", href: "/admin/produtos", icon: <Boxes className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Gestão de Edições", href: "/admin/eventos", icon: <Calendar className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Categorias", href: "/admin/categorias", icon: <Tag className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Configurações & Pix", href: "/admin/configuracoes", icon: <Settings className="h-4 w-4" />, category: "GLOBAL" },
  { name: "Auditoria & Logs", href: "/admin/logs", icon: <Activity className="h-4 w-4" />, category: "GLOBAL" },
];

export const adminLinks: NavLinkItem[] = [
  ...globalScopeLinks.slice(0, 1), // "Meus Retiros" first
  ...eventScopeLinks,
  ...globalScopeLinks.slice(1),
];
