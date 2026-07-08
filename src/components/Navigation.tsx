"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Menu,
  X,
  LogOut,
  LogIn,
  User,
  Shield,
  LayoutDashboard,
  Store,
  Boxes,
  Calendar,
  FileText,
  ChevronDown,
  Activity,
  Zap,
  Sun,
  Moon,
  Monitor,
  Tag
} from "lucide-react";

const adminLinks = [
  { name: "Painel", href: "/admin", icon: <LayoutDashboard className="h-4 w-4" /> },
  { name: "PDV", href: "/admin/pdv", icon: <Store className="h-4 w-4" /> },
  { name: "Estoque", href: "/admin/produtos", icon: <Boxes className="h-4 w-4" /> },
  { name: "Categorias", href: "/admin/categorias", icon: <Tag className="h-4 w-4" /> },
  { name: "Eventos", href: "/admin/eventos", icon: <Calendar className="h-4 w-4" /> },
  { name: "Vendas", href: "/admin/vendas", icon: <FileText className="h-4 w-4" /> },
  { name: "Clientes", href: "/admin/clientes", icon: <User className="h-4 w-4" /> },
  { name: "Logs", href: "/admin/logs", icon: <Activity className="h-4 w-4" /> },
];

export const Navigation: React.FC = () => {
  const { currentUser, logoutUser, activeEvent } = useApp();
  const pathname = usePathname();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [navDropOpen, setNavDropOpen] = useState(false);
  const [userDropOpen, setUserDropOpen] = useState(false);
  const [themeDropOpen, setThemeDropOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");
  const [mounted, setMounted] = useState(false);

  const navDropRef = useRef<HTMLDivElement>(null);
  const userDropRef = useRef<HTMLDivElement>(null);
  const themeDropRef = useRef<HTMLDivElement>(null);

  const applyTheme = (t: "light" | "dark" | "system") => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    
    if (t === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | "system" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (theme === "system") {
        applyTheme("system");
      }
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setThemeDropOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navDropRef.current && !navDropRef.current.contains(e.target as Node)) {
        setNavDropOpen(false);
      }
      if (userDropRef.current && !userDropRef.current.contains(e.target as Node)) {
        setUserDropOpen(false);
      }
      if (themeDropRef.current && !themeDropRef.current.contains(e.target as Node)) {
        setThemeDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  if (!mounted) {
    return <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40 h-16 w-full" />;
  }

  const isAdmin = currentUser?.role === "ADMIN";
  const activeLink = adminLinks.find((l) => l.href === pathname);

  return (
    <>
      <nav className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Left: Logo + Nav Dropdown (desktop) */}
            <div className="flex items-center gap-4 min-w-0">
              {/* Logo */}
              <Link
                href="/"
                className="flex items-center gap-2 font-black text-base tracking-tight text-indigo-600 dark:text-indigo-400 shrink-0"
              >
                <img src="/icone.png" alt="Logo" className="h-10 w-auto max-w-[90px] object-contain" />
                <span className="hidden sm:block">Lojinha Retiro</span>
              </Link>

              {/* Desktop: Nav dropdown */}
              {isAdmin && (
                <div className="hidden sm:block relative" ref={navDropRef}>
                  <button
                    onClick={() => { setNavDropOpen(!navDropOpen); setUserDropOpen(false); }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${navDropOpen
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-900/30 dark:text-indigo-400"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                  >
                    {activeLink?.icon ?? <LayoutDashboard className="h-4 w-4" />}
                    <span className="max-w-[120px] truncate">{activeLink?.name ?? "Navegar"}</span>
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform shrink-0 ${navDropOpen ? "rotate-180" : ""}`} />
                  </button>

                  {navDropOpen && (
                    <div className="absolute left-0 top-full mt-2 w-52 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 py-1.5">
                      {adminLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setNavDropOpen(false)}
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all ${isActive
                                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                              }`}
                          >
                            <span className="opacity-60">{link.icon}</span>
                            {link.name}
                            {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Active event pill — desktop */}
              {activeEvent && (
                <div className="hidden md:flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 px-3 py-1.5 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 max-w-[180px] truncate">
                  <Zap className="h-3 w-3 shrink-0" />
                  <span className="truncate">{activeEvent.name}</span>
                </div>
              )}
            </div>

            {/* Right: User dropdown (desktop) + Mobile hamburger */}
            <div className="flex items-center gap-2">
              
              {/* Desktop Theme Switcher */}
              <div className="hidden sm:block relative" ref={themeDropRef}>
                <button
                  onClick={() => { setThemeDropOpen(!themeDropOpen); setUserDropOpen(false); setNavDropOpen(false); }}
                  className="p-2 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer flex items-center justify-center transition-all"
                  title="Alterar Tema"
                >
                  {theme === "light" && <Sun className="h-4.5 w-4.5" />}
                  {theme === "dark" && <Moon className="h-4.5 w-4.5" />}
                  {theme === "system" && <Monitor className="h-4.5 w-4.5" />}
                </button>

                {themeDropOpen && (
                  <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50 p-1">
                    <button
                      onClick={() => handleThemeChange("light")}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        theme === "light"
                          ? "bg-indigo-50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400"
                          : "text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Sun className="h-3.5 w-3.5" />
                      Claro
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        theme === "dark"
                          ? "bg-indigo-50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400"
                          : "text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Moon className="h-3.5 w-3.5" />
                      Escuro
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                        theme === "system"
                          ? "bg-indigo-50 dark:bg-indigo-955/20 text-indigo-650 dark:text-indigo-400"
                          : "text-zinc-700 dark:text-zinc-350 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                      }`}
                    >
                      <Monitor className="h-3.5 w-3.5" />
                      Sistema
                    </button>
                  </div>
                )}
              </div>
              {/* Desktop user area */}
              {currentUser ? (
                <div className="hidden sm:block relative" ref={userDropRef}>
                  <button
                    onClick={() => { setUserDropOpen(!userDropOpen); setNavDropOpen(false); }}
                    className="flex items-center gap-2.5 px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 rounded-xl transition-all cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                      <Shield className="h-3.5 w-3.5" />
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-xs font-bold text-zinc-800 dark:text-zinc-200 leading-tight">
                        {currentUser.firstName}
                      </div>
                      <div className="text-[10px] uppercase font-extrabold text-indigo-500 leading-tight tracking-wider">
                        {currentUser.role}
                      </div>
                    </div>
                    <ChevronDown className={`h-3.5 w-3.5 text-zinc-400 transition-transform ${userDropOpen ? "rotate-180" : ""}`} />
                  </button>

                  {userDropOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden z-50">
                      {/* User info header */}
                      <div className="px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 space-y-0.5">
                        <div className="text-xs text-zinc-400 font-medium">Conectado como</div>
                        <div className="font-bold text-sm text-zinc-900 dark:text-white">
                          {currentUser.firstName} {currentUser.lastName}
                        </div>
                        <div className="text-[10px] uppercase font-extrabold tracking-wider text-indigo-500">
                          {currentUser.role}
                        </div>
                        {activeEvent && (
                          <div className="mt-1.5 flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/20 px-2 py-1 rounded-lg text-[10px] font-bold text-amber-600 dark:text-amber-400">
                            <Zap className="h-2.5 w-2.5" />
                            {activeEvent.name}
                          </div>
                        )}
                      </div>
                      {/* Logout */}
                      <div className="p-2">
                        <button
                          onClick={() => { setUserDropOpen(false); handleLogout(); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" />
                          Sair da conta
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  Acessar
                </Link>
              )}

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="sm:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 bg-black/40 backdrop-blur-xs z-40"
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="sm:hidden fixed top-0 left-0 h-full w-72 max-w-[85vw] bg-white dark:bg-zinc-900 z-50 flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-zinc-100 dark:border-zinc-800">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 font-black text-base text-indigo-600 dark:text-indigo-400"
              >
                <img src="/icone.png" alt="Logo" className="h-8.5 w-auto max-w-[75px] object-contain" /> Lojinha Retiro
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg text-zinc-400 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Active event */}
            {activeEvent && (
              <div className="mx-4 mt-3 flex items-center gap-2 bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/30 px-3 py-2.5 rounded-xl">
                <Zap className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                <div>
                  <div className="text-[9px] font-extrabold uppercase tracking-wider text-amber-500">Evento Ativo</div>
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-300 truncate">{activeEvent.name}</div>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
              {isAdmin && adminLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-850"
                      }`}
                  >
                    <span className={isActive ? "text-indigo-500" : "text-zinc-400"}>{link.icon}</span>
                    {link.name}
                    {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />}
                  </Link>
                );
              })}

              {!currentUser && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-md mt-2"
                >
                  <LogIn className="h-4 w-4" />
                  Acessar Painel
                </Link>
              )}
            </div>

            {/* Theme switcher at bottom of drawer */}
            <div className="px-5 py-4 border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center bg-zinc-50/50 dark:bg-zinc-950/20">
              <span className="text-xs font-bold text-zinc-550 dark:text-zinc-400">Tema do Sistema</span>
              <div className="flex gap-1 p-0.5 bg-zinc-100 dark:bg-zinc-850 border border-zinc-200/50 dark:border-zinc-800/80 rounded-xl">
                <button
                  onClick={() => handleThemeChange("light")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === "light" ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("dark")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === "dark" ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  <Moon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleThemeChange("system")}
                  className={`p-1.5 rounded-lg transition-all cursor-pointer ${theme === "system" ? "bg-white dark:bg-zinc-800 text-indigo-650 dark:text-indigo-400 shadow-xs" : "text-zinc-400 hover:text-zinc-600"}`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* User section at bottom */}
            {currentUser && (
              <div className="px-3 pb-5 pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                <div className="flex items-center gap-3 px-4 py-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <Shield className="h-4 w-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-zinc-900 dark:text-white truncate">
                      {currentUser.firstName} {currentUser.lastName}
                    </div>
                    <div className="text-[10px] uppercase font-extrabold text-indigo-500 tracking-wider">
                      {currentUser.role}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-red-500 bg-red-50 dark:bg-red-950/20 rounded-xl cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sair da conta
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};
