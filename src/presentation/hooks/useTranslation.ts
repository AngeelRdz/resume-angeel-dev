"use client";

import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

import { getContainer } from "@/core/di/container";
import { i18nInstance } from "@/presentation/i18n/i18n";

export function useI18n() {
	const { t, i18n } = useTranslation();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const waitForI18n = async () => {
			try {
				await i18nInstance;
				await new Promise((resolve) => setTimeout(resolve, 100));
				setIsReady(true);
			} catch (error) {
				console.error("Error waiting for i18n:", error);
				setIsReady(true);
			}
		};

		waitForI18n();
	}, []);

	const changeLanguage = useCallback(
		async (languageCode: string) => {
			try {
				const container = getContainer();
				const i18nService = container.resolveI18nService();
				await i18nService.changeLanguage(languageCode);
			} catch (error) {
				console.error("Error changing language:", error);
				if (i18n.isInitialized) {
					await i18n.changeLanguage(languageCode);
				}
			}
		},
		[i18n]
	);

	const getCurrentLanguage = useCallback(() => {
		return i18n.language || "es";
	}, [i18n]);

	const exists = useCallback(
		(key: string) => {
			return i18n.exists(key);
		},
		[i18n]
	);

	const safeT = useCallback(
		(key: string, options?: Record<string, unknown>) => {
			if (!i18n.isInitialized || !isReady) {
				return key.split(".").pop() || key;
			}
			const translation = t(key, options);

			return translation === key ? key.split(".").pop() || key : translation;
		},
		[t, i18n.isInitialized, isReady]
	);

	return {
		t: safeT,
		changeLanguage,
		getCurrentLanguage,
		exists,
		currentLanguage: getCurrentLanguage(),
		isReady: i18n.isInitialized && isReady,
		i18n,
		locale: getCurrentLanguage().split("-")[0] as "es" | "en",
		setLocale: changeLanguage,
		ready: isReady,
	};
}
