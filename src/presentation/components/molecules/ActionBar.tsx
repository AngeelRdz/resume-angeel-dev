"use client";

import { Button } from "@/presentation/components/atoms/Button";
import { useTheme } from "@/presentation/hooks/useTheme";
import { cn } from "@/shared/utils/cn";
import type { HeroAction } from "@/presentation/view-models/homeViewModel";
import { useEffect, useState } from "react";

type ActionBarProps = {
  actions: HeroAction[];
  className?: string;
};

export function ActionBar({ actions, className }: ActionBarProps) {
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }
    return theme === "dark";
  });

  useEffect(() => {
    // Escuchar cambios en el DOM cuando el tema cambia
    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setIsDark(currentTheme === "dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  if (!actions.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row sm:items-center", className)}>
      {actions.map((action) => (
        <Button
          key={action.label}
          href={action.href}
          variant={action.variant}
          download={action.download}
          className={
            action.variant === "primary"
              ? isDark
                ? "bg-white hover:bg-white/90 border-2 border-white/20"
                : "bg-white hover:bg-white/90 border-2 border-transparent"
              : action.variant === "secondary"
                ? "border-white/30 bg-transparent hover:bg-white/20"
                : undefined
          }
          style={
            action.variant === "primary"
              ? { color: "var(--primary)" }
              : action.variant === "secondary"
              ? { color: "#ffffff" }
              : undefined
          }
        >
          {action.label}
        </Button>
      ))}
    </div>
  );
}


