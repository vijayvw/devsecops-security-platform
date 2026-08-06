import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({
  children,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar />

      <div className="ml-[420px] flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 overflow-x-hidden pt-24">
          <div className="w-full px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}