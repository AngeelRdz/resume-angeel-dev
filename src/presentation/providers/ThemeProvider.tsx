"use client";

import { useEffect } from "react";

const THEME_STORAGE_KEY = "app_theme_resume";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    const theme = stored || "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  return <>{children}</>;
}

