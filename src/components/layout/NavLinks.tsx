// src/components/layout/NavLinks.tsx
import {
  LayoutDashboard,
  Voicemail,
  ListOrdered,
  KeyRound,
  SlidersHorizontal,
  Blend,
  Settings,
  UploadCloud,
  History,
  PlayCircle,
  Mic2
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
  icon: LucideIcon;
  tooltip?: string;
  subLinks?: NavLink[];
}

export const navLinks: NavLink[] = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    tooltip: "Dashboard Overview",
  },
  {
    href: "/dashboard/voice-upload",
    label: "Upload Voice",
    icon: UploadCloud,
    tooltip: "Upload New Voice Sample",
  },
  {
    href: "/dashboard/voices",
    label: "Manage Voices",
    icon: Mic2, // Using Mic2 as Voicemail is not ideal
    tooltip: "View and Edit Cloned Voices",
  },
  {
    href: "/dashboard/generate-speech",
    label: "Generate Speech",
    icon: PlayCircle,
    tooltip: "Create Speech from Text",
  },
  {
    href: "/dashboard/generations",
    label: "History",
    icon: History,
    tooltip: "View Past Generations",
  },
  {
    href: "/dashboard/api-keys",
    label: "API Keys",
    icon: KeyRound,
    tooltip: "Manage Your API Keys",
  },
];

export const bottomNavLinks: NavLink[] = [
    {
        href: "/dashboard/settings",
        label: "Settings",
        icon: Settings,
        tooltip: "Application Settings",
    }
]
