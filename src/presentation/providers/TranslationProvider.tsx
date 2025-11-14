"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import i18n, { i18nInstance } from "@/presentation/i18n/i18n";

type TranslationProviderProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

export function TranslationProvider({
  children,
  fallback = null,
}: TranslationProviderProps) {
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  useEffect(() => {
    let mounted = true;

    if (!isReady) {
      i18nInstance.then(() => {
        if (mounted) {
          setIsReady(true);
        }
      });
    }

    return () => {
      mounted = false;
    };
  }, [isReady]);

  return (
    <I18nextProvider i18n={i18n}>
      {isReady ? children : fallback ?? children}
    </I18nextProvider>
  );
}


