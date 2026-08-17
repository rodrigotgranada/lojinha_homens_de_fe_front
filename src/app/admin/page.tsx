"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin/dashboard");
  }, [router]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 gap-3">
      <div className="animate-spin h-8 w-8 border-4 border-indigo-600 border-t-transparent rounded-full" />
      <span className="text-zinc-500 font-semibold text-sm">Redirecionando para o painel...</span>
    </div>
  );
}
