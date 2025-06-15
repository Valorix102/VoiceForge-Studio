// src/components/layout/AppSidebar.tsx
"use client";

import Link from "next/link";
import { Blend } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
// NavLinks import removed as NavLinks.tsx is deleted
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppSidebar() {
  const { state: sidebarState } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="h-16 items-center justify-center border-b border-sidebar-border">
        <Link href="/dashboard" className="flex items-center gap-2 text-primary">
          <Blend className="h-7 w-7" />
          {sidebarState === "expanded" && (
            <span className="text-xl font-semibold text-sidebar-foreground">VoiceForge</span>
          )}
        </Link>
      </SidebarHeader>
      <ScrollArea className="flex-1">
        <SidebarContent>
          <SidebarMenu>
            {/* Navigation links previously mapped here are removed as NavLinks.tsx is deleted. */}
            {/* If you want to re-add navigation links, you'll need to define them directly here */}
            {/* or create a new system for managing them that doesn't rely on a deleted NavLinks.tsx. */}
            {/* Example:
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <Link href="/dashboard">
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            */}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          {/* Bottom navigation links previously mapped here are removed as NavLinks.tsx is deleted. */}
           {/* Example:
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"}>
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            */}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
