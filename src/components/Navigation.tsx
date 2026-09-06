"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  Menu,
  ChevronDown,
  LayoutDashboard,
  Settings,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";
import { adminLinks } from "./navigation/navLinks";
import { EventBadgeSelector } from "./navigation/EventBadgeSelector";
import { UserMenuDropdown } from "./navigation/UserMenuDropdown";
import { MobileNavDrawer } from "./navigation/MobileNavDrawer";
import { NetworkConfigModal } from "./navigation/NetworkConfigModal";

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

  // Network contingency configurations
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [useLocalApi, setUseLocalApi] = useState(false);
  const [localApiUrl, setLocalApiUrl] = useState("http://localhost:3001");

  const navDropRef = useRef<HTMLDivElement>(null);
  const userDropRef = useRef<HTMLDivElement>(null);
  const themeDropRef = useRef<HTMLDivElement>(null);

  const applyTheme = (t: "light" | "dark" | "system") => {
    if (typeof window === "undefined") return;
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (t === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(t);
    }
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | "system"
      | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("system");
    }
    if (typeof window !== "undefined") {
      setUseLocalApi(localStorage.getItem("use_local_api") === "true");
      setLocalApiUrl(localStorage.getItem("local_api_url") || "http://localhost:3001");
    }
  }, []);

  const handleThemeChange = (newTheme: "light" | "dark" | "system") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
    setThemeDropOpen(false);
  };

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

  const handleLogout = () => {
    logoutUser();
    router.push("/");
  };

  if (!mounted) {
    return (
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40 h-16 w-full" />
    );
  }

  const isAdmin = currentUser?.role === "ADMIN";
  const activeLink = adminLinks.find((l) => l.href === pathname);

  return (
    <>
      <nav className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-800 sticky top-0 z-40 shadow-xs print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: Logo + Nav Dropdown + Active Event */}
            <div className="flex items-center gap-4 min-w-0">
              <Link
                href="/"
                className="flex items-center gap-2 font-black text-base tracking-tight text-indigo-600 dark:text-indigo-400 shrink-0"
              >
                <img
                  src="/icone.png"
                  alt="Logo"
                  className="h-10 w-auto max-w-[90px] object-contain"
                />
                <span className="hidden sm:block">Lojinha Retiro</span>
              </Link>

              {/* Desktop: Navigation dropdown */}
              {isAdmin && (
                <div className="hidden sm:block relative" ref={navDropRef}>
                  <button
                    onClick={() => {
                      setNavDropOpen(!navDropOpen);
                      setUserDropOpen(false);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-bold rounded-xl border transition-all cursor-pointer ${
                      navDropOpen
                        ? "bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/40 dark:border-indigo-900/30 dark:text-indigo-400"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {activeLink?.icon ?? <LayoutDashboard className="h-4 w-4" />}
                    <span className="max-w-[120px] truncate">
                      {activeLink?.name ?? "Navegar"}
                    </span>
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform shrink-0 ${
                        navDropOpen ? "rotate-180" : ""
                      }`}
                    />
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
                            className={`flex items-center gap-3 px-4 py-2.5 text-sm font-semibold transition-all ${
                              isActive
                                ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400"
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                            }`}
                          >
                            <span className="opacity-60">{link.icon}</span>
                            {link.name}
                            {isActive && (
                              <span className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              <EventBadgeSelector activeEvent={activeEvent} />
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2">
              {/* Settings Toggle */}
              <button
                onClick={() => {
                  setShowConfigModal(true);
                  setThemeDropOpen(false);
                  setUserDropOpen(false);
                }}
                className={`hidden sm:flex p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl border cursor-pointer items-center justify-center transition-all ${
                  useLocalApi
                    ? "text-amber-500 border-amber-200 bg-amber-50/50 dark:border-amber-900/30"
                    : "text-zinc-500 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
                }`}
                title="Configurações de Rede (Contingência)"
              >
                <Settings className="h-4.5 w-4.5" />
              </button>

              {/* Theme Dropdown */}
              <div className="hidden sm:block relative" ref={themeDropRef}>
                <button
                  onClick={() => {
                    setThemeDropOpen(!themeDropOpen);
                    setUserDropOpen(false);
                  }}
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
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Sun className="h-3.5 w-3.5" /> Claro
                    </button>
                    <button
                      onClick={() => handleThemeChange("dark")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Moon className="h-3.5 w-3.5" /> Escuro
                    </button>
                    <button
                      onClick={() => handleThemeChange("system")}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Monitor className="h-3.5 w-3.5" /> Sistema
                    </button>
                  </div>
                )}
              </div>

              {/* User Dropdown */}
              <UserMenuDropdown
                currentUser={currentUser}
                activeEvent={activeEvent}
                isOpen={userDropOpen}
                setIsOpen={setUserDropOpen}
                onLogout={handleLogout}
                dropdownRef={userDropRef}
              />

              {/* Mobile hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="sm:hidden p-2 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Drawer */}
      <MobileNavDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        currentUser={currentUser}
        activeEvent={activeEvent}
        pathname={pathname}
        adminLinks={adminLinks}
        theme={theme}
        onThemeChange={handleThemeChange}
        useLocalApi={useLocalApi}
        onOpenConfigModal={() => setShowConfigModal(true)}
        onLogout={handleLogout}
      />

      {/* Network Contingency Modal */}
      {showConfigModal && (
        <NetworkConfigModal
          isOpen={showConfigModal}
          onClose={() => setShowConfigModal(false)}
          useLocalApi={useLocalApi}
          setUseLocalApi={setUseLocalApi}
          localApiUrl={localApiUrl}
          setLocalApiUrl={setLocalApiUrl}
        />
      )}
    </>
  );
};
