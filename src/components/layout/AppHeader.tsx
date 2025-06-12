// src/components/layout/AppHeader.tsx
"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { UserNav } from "./UserNav";
// import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"; // If using breadcrumbs
// import { usePathname } from "next/navigation";
// import Link from "next/link";

export function AppHeader() {
  // const pathname = usePathname();
  // const pathSegments = pathname.split('/').filter(segment => segment);
  
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-md sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <SidebarTrigger className="sm:hidden" />
      
      {/* Placeholder for Breadcrumbs if needed
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathSegments.map((segment, index) => (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild={index === pathSegments.length -1}>
                  {index === pathSegments.length -1 ? (
                     <span className="capitalize">{segment.replace('-', ' ')}</span>
                  ) : (
                    <Link href={`/${pathSegments.slice(0, index + 1).join('/')}`} className="capitalize">
                      {segment.replace('-', ' ')}
                    </Link>
                  )}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      */}
      
      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  );
}
