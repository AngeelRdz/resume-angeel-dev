"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import i18n, { i18nInstance } from "@/presentation/i18n/i18n";

interface I18nProviderProps {
	children: ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		const initializeI18n = async () => {
			try {
				await i18nInstance;
				setIsReady(true);
			} catch (error) {
				console.error("Error initializing i18n:", error);
				setIsReady(true);
			}
		};

		initializeI18n();
	}, []);

	return (
		<I18nextProvider i18n={i18n}>
			{isReady ? children : null}
		</I18nextProvider>
	);
}

