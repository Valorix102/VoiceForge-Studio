// src/app/dashboard/layout.tsx
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppHeader } from "@/components/layout/AppHeader";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider defaultOpen>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <AppSidebar />
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 group-data-[collapsible=icon]:sm:pl-[calc(var(--sidebar-width-icon)_+_1rem)] data-[state=expanded]:sm:pl-[calc(var(--sidebar-width)_+_1rem)] transition-[padding-left] duration-200 ease-linear">
          <AppHeader />
          <main className="flex-1 p-4 sm:px-6 sm:py-0">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
