// src/contexts/ThemeProvider.tsx
"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "ui-theme", // Renamed for better context
  ...props
}: ThemeProviderProps) {
  // Initialize with defaultTheme. localStorage will be checked on the client-side in useEffect.
  const [theme, setThemeInternal] = useState<Theme>(defaultTheme);

  // Effect to load theme from localStorage on mount (client-side only)
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem(storageKey) as Theme | null;
      if (storedTheme && ["light", "dark", "system"].includes(storedTheme)) {
        setThemeInternal(storedTheme);
      }
      // If no stored theme or it's invalid, 'theme' remains 'defaultTheme' (or its initial value from useState),
      // which is then correctly handled by the next useEffect for applying classes.
    } catch (e) {
      // This can happen in some environments like private browsing mode where localStorage is restricted.
      console.warn(`Failed to read theme from localStorage ('${storageKey}'):`, e);
    }
  }, [storageKey]);

  // Effect to apply the theme class to the document and handle "system" theme
  useEffect(() => {
    // This effect runs on the client after initial render and whenever 'theme' changes.
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]); // Re-run when 'theme' state changes

  const setTheme = (newTheme: Theme) => {
    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (e) {
      console.warn(`Failed to save theme to localStorage ('${storageKey}'):`, e);
    }
    setThemeInternal(newTheme);
  };

  const value = {
    theme, // This is the user's preference ('system', 'light', or 'dark')
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
