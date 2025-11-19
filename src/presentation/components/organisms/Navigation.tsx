"use client";

import { useState } from "react";
import type React from "react";

import { LanguageSwitcher } from "@/presentation/components/molecules/LanguageSwitcher";
import { ThemeToggle } from "@/presentation/components/atoms/ThemeToggle";
import { useI18n } from "@/presentation/hooks/useTranslation";
import { useScroll } from "@/presentation/hooks/useScroll";
import { useTheme } from "@/presentation/hooks/useTheme";
import { cn } from "@/shared/utils/cn";

const navItems = [
  { id: "home", key: "nav.home", href: "#home" },
  { id: "about", key: "nav.about", href: "#about" },
  { id: "experience", key: "nav.experience", href: "#experience" },
  { id: "skills", key: "nav.skills", href: "#skills" },
  { id: "projects", key: "nav.projects", href: "#projects" },
  { id: "contact", key: "nav.contact", href: "#contact" },
] as const;

export function Navigation() {
  const { t, ready } = useI18n();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolled = useScroll(50);
  const { theme } = useTheme();

  if (!ready) {
    return null;
  }

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isDark = theme === "dark";
  const hasBackground = isScrolled;
  
  // Sin scroll: transparente en ambos modos
  // Con scroll: usa var(--background) que cambia según el tema
  const navStyle: React.CSSProperties = hasBackground
    ? { backgroundColor: "var(--background)" }
    : {};

  const navClasses = cn(
    "fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out",
    // Desktop: transparente inicialmente, luego fondo según scroll
    "lg:border-b lg:backdrop-blur-md",
    hasBackground
      ? isDark
        ? "lg:border-foreground/20"
        : "lg:border-foreground/10"
      : "lg:bg-transparent lg:border-transparent",
    // Mobile: siempre con fondo según tema
    "border-b backdrop-blur-md",
    isDark
      ? "bg-background border-foreground/20"
      : "bg-background/95 border-foreground/10",
  );

  const textClasses = cn(
    "text-sm font-medium transition-colors duration-500 ease-in-out px-4 py-2",
    // Desktop: texto blanco inicialmente, luego según tema
    hasBackground
      ? isDark
        ? "lg:text-foreground lg:hover:text-primary"
        : "lg:text-foreground lg:hover:text-primary"
      : "lg:text-white lg:hover:text-white/80",
    // Mobile: siempre según tema
    isDark
      ? "text-foreground hover:text-primary"
      : "text-foreground/80 hover:text-foreground",
  );

  const buttonClasses = cn(
    "flex h-10 w-10 items-center justify-center rounded-md border transition-colors duration-500 ease-in-out",
    hasBackground
      ? isDark
        ? "lg:border-foreground/30 lg:bg-background lg:text-foreground lg:hover:bg-foreground/10"
        : "lg:border-foreground/20 lg:bg-white lg:text-foreground lg:hover:bg-foreground/5"
      : "lg:border-white/30 lg:bg-transparent lg:text-white lg:hover:bg-white/10",
    // Mobile: siempre según tema
    isDark
      ? "border-foreground/30 bg-background text-foreground hover:bg-foreground/10 lg:hidden"
      : "border-foreground/20 bg-background text-foreground hover:bg-foreground/5 lg:hidden",
  );

  return (
    <nav 
      className={navClasses}
      style={navStyle}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-12">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={buttonClasses}
            aria-label={t("nav.menu")}
            aria-expanded={isMenuOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              {isMenuOpen ? (
                <>
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </>
              )}
            </svg>
          </button>

          <ul
            className={cn(
              "absolute left-0 right-0 top-full flex flex-col gap-2 border-b p-6 backdrop-blur-md transition-all duration-500 ease-in-out lg:static lg:flex-row lg:border-0 lg:bg-transparent lg:gap-6 lg:p-0",
              isDark
                ? "border-foreground/20 bg-background"
                : "border-foreground/10 bg-background/95",
              isMenuOpen ? "block" : "hidden lg:flex",
            )}
          >
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleNavClick(item.href)}
                  className={textClasses}
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle isScrolled={hasBackground} isDark={isDark} />
          <LanguageSwitcher isScrolled={hasBackground} isDark={isDark} />
        </div>
      </div>
    </nav>
  );
}

