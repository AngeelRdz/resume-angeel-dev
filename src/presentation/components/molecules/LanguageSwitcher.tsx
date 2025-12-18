"use client";

import { i18n } from "@/config/i18n.config";
import { useI18n } from "@/presentation/hooks/useTranslation";
import { useTheme } from "@/presentation/hooks/useTheme";
import { cn } from "@/shared/utils/cn";
import { useEffect, useState } from "react";

const localeLabels: Record<(typeof i18n.locales)[number], string> = {
  es: "ES",
  en: "EN",
};

type LanguageSwitcherProps = {
  isScrolled?: boolean;
  isDark?: boolean;
};

export function LanguageSwitcher({ isScrolled = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t, ready } = useI18n();
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
  }, [theme]);

  if (!ready) {
    return null;
  }

  const navClasses = cn(
    "flex gap-2 rounded-full p-1 shadow-sm backdrop-blur transition-all duration-500 ease-in-out",
    isScrolled
      ? isDark
        ? "bg-background border border-foreground/20"
        : "bg-white/60"
      : "lg:bg-white/20",
    isDark ? "bg-background border border-foreground/20" : "bg-background/60",
  );

  return (
    <nav
      aria-label={t("nav.language")}
      className={navClasses}
    >
      {i18n.locales.map((targetLocale) => {
        const isActive = targetLocale === locale;

        const buttonClasses = cn(
          "inline-flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase transition-colors duration-500 ease-in-out",
          isScrolled
            ? isActive
              ? "bg-primary text-primary-foreground"
              : isDark
                ? "text-foreground hover:bg-foreground/10"
                : "text-foreground/80 hover:bg-foreground/10"
            : isActive
              ? "lg:bg-white lg:text-primary bg-primary text-primary-foreground"
              : isDark
                ? "lg:text-white lg:hover:bg-white/20 text-foreground hover:bg-foreground/10"
                : "lg:text-white lg:hover:bg-white/20 text-foreground/80 hover:bg-foreground/10",
        );

        return (
          <button
            key={targetLocale}
            type="button"
            onClick={() => setLocale(targetLocale)}
            className={buttonClasses}
            aria-pressed={isActive}
          >
            {localeLabels[targetLocale]}
          </button>
        );
      })}
    </nav>
  );
}


