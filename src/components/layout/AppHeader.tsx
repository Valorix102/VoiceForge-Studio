// src/components/layout/AppHeader.tsx
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
// import { UserNav } from "./UserNav"; // UserNav.tsx is reported as deleted

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        {/* <UserNav /> */} {/* UserNav.tsx is reported as deleted */}
      </div>
    </header>
  );
}
