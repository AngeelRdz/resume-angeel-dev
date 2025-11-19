"use client";

import { useTheme } from "@/presentation/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

type ThemeToggleProps = {
  isScrolled?: boolean;
  isDark?: boolean;
};

export function ThemeToggle({ isScrolled = false, isDark = false }: ThemeToggleProps) {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <button
        type="button"
        className="h-10 w-10 rounded-md border border-foreground/20 bg-background"
        aria-label="Toggle theme"
      />
    );
  }

  const buttonClasses = cn(
    "flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-500 ease-in-out",
    isScrolled
      ? isDark
        ? "border-foreground/30 bg-background hover:bg-foreground/10"
        : "border-foreground/20 bg-white hover:bg-foreground/5"
      : "lg:border-white/30 lg:bg-transparent lg:hover:bg-white/10",
    isDark
      ? "border-foreground/30 bg-background hover:bg-foreground/10"
      : "border-foreground/20 bg-background hover:bg-foreground/5",
  );

  const iconClasses = cn(
    "h-5 w-5 transition-colors duration-500 ease-in-out",
    isScrolled
      ? isDark
        ? "text-foreground"
        : "text-foreground"
      : "lg:text-white",
    isDark ? "text-foreground" : "",
  );

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={buttonClasses}
      aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
    >
      {theme === "light" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClasses}
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={iconClasses}
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </button>
  );
}

