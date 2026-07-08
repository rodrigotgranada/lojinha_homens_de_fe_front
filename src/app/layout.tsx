import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Link from "next/link";
import { Navigation } from "@/components/Navigation"; // We'll create this helper client component for clean navigation

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lojinha Virtual - Retiros Religiosos",
  description: "Sistema simplificado de PDV e E-commerce para retiros.",
  icons: {
    icon: "/ChromeIcon.png",
    shortcut: "/ChromeIcon.png",
  },
};

export default function RootLayout({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <AppProvider>
          <Navigation />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
            {children}
          </main>
          <footer className="border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950/50 py-6 text-center text-xs text-zinc-400 dark:text-zinc-500 print:hidden">
            &copy; {new Date().getFullYear()} Lojinha Virtual Retiros. Todos os direitos reservados.
          </footer>
        </AppProvider>
      </body>
    </html>
  );
}
