// src/components/layout/AppSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Blend } from "lucide-react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import { navLinks, bottomNavLinks, type NavLink } from "./NavLinks";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();

  const renderLink = (link: NavLink, isSubLink = false) => {
    const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
    
    const ButtonComponent = isSubLink ? SidebarMenuSubButton : SidebarMenuButton;
    
    return (
      <ButtonComponent
        asChild
        isActive={isActive}
        tooltip={link.tooltip}
        className={cn(isSubLink && "pl-4")}
      >
        <Link href={link.href}>
          <link.icon />
          <span>{link.label}</span>
        </Link>
      </ButtonComponent>
    );
  };

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
            {navLinks.map((link) => (
              <SidebarMenuItem key={link.href}>
                {renderLink(link)}
                {link.subLinks && (
                  <SidebarMenuSub>
                    {link.subLinks.map((subLink) => (
                      <SidebarMenuSubItem key={subLink.href}>
                        {renderLink(subLink, true)}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </ScrollArea>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          {bottomNavLinks.map((link) => (
            <SidebarMenuItem key={link.href}>
              {renderLink(link)}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
