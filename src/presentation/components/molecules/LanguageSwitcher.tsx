"use client";

import { i18n } from "@/config/i18n.config";
import { useI18n } from "@/presentation/hooks/useTranslation";
import { cn } from "@/shared/utils/cn";

const localeLabels: Record<(typeof i18n.locales)[number], string> = {
  es: "ES",
  en: "EN",
};

type LanguageSwitcherProps = {
  isScrolled?: boolean;
  isDark?: boolean;
};

export function LanguageSwitcher({ isScrolled = false, isDark = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t, ready } = useI18n();

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
              ? isDark
                ? "bg-primary text-primary-foreground"
                : "bg-foreground text-background"
              : isDark
                ? "text-foreground hover:bg-foreground/10"
                : "text-foreground/80 hover:bg-foreground/10"
            : isActive
              ? isDark
                ? "lg:bg-white lg:text-primary bg-primary text-primary-foreground"
                : "lg:bg-white lg:text-primary bg-foreground text-background"
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


