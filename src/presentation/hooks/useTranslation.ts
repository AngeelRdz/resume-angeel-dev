"use client";

import { useCallback, useMemo } from "react";
import { useTranslation as useReactI18nextTranslation } from "react-i18next";

import { defaultLocale, isLocale, type Locale } from "@/config/i18n.config";
import { STORAGE_KEY } from "@/presentation/i18n/i18n";

export function useI18n() {
	const { t, i18n, ready } = useReactI18nextTranslation();

	const locale = useMemo<Locale>(() => {
		const languageCode = i18n.language?.split("-")[0]?.toLowerCase() ?? "";
		return isLocale(languageCode) ? languageCode : defaultLocale;
	}, [i18n.language]);

	const setLocale = useCallback(
		async (nextLocale: Locale) => {
			if (locale === nextLocale) {
				return;
			}
			await i18n.changeLanguage(nextLocale);
			if (typeof window !== "undefined") {
				window.localStorage.setItem(STORAGE_KEY, nextLocale);
			}
		},
		[i18n, locale]
	);

	return { t, i18n, locale, setLocale, ready };
}
