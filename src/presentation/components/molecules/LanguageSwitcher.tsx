"use client";

import { i18n } from "@/config/i18n.config";
import { useI18n } from "@/presentation/hooks/useTranslation";
import { cn } from "@/shared/utils/cn";

const localeLabels: Record<(typeof i18n.locales)[number], string> = {
  es: "ES",
  en: "EN",
};

export function LanguageSwitcher() {
  const { locale, setLocale, t, ready } = useI18n();

  if (!ready) {
    return null;
  }

  return (
    <nav
      aria-label={t("nav.language")}
      className="flex gap-2 rounded-full bg-background/60 p-1 shadow-sm backdrop-blur"
    >
      {i18n.locales.map((targetLocale) => {
        const isActive = targetLocale === locale;

        return (
          <button
            key={targetLocale}
            type="button"
            onClick={() => setLocale(targetLocale)}
            className={cn(
              "inline-flex h-8 min-w-12 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase transition-colors",
              isActive
                ? "bg-foreground text-background"
                : "text-foreground/80 hover:bg-foreground/10",
            )}
            aria-pressed={isActive}
          >
            {localeLabels[targetLocale]}
          </button>
        );
      })}
    </nav>
  );
}


