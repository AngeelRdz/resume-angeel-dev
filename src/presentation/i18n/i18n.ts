import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import enTranslations from "./locales/en.json";
import esTranslations from "./locales/es.json";

const STORAGE_KEY = "app_language_resume";

const resources = {
	es: {
		translation: esTranslations,
	},
	en: {
		translation: enTranslations,
	},
} as const;

const isClient = typeof window !== "undefined";

async function initializeI18n() {
	if (i18n.isInitialized) {
		return i18n;
	}

	if (isClient) {
		i18n.use(LanguageDetector);
	}

	await i18n.use(initReactI18next).init({
		resources,
		fallbackLng: "es",
		lng: "es",
		supportedLngs: ["es", "en"],
		load: "languageOnly",
		debug: process.env.NODE_ENV === "development",
		interpolation: {
			escapeValue: false,
		},
		detection: isClient
			? {
					order: ["localStorage", "navigator", "htmlTag"],
					caches: ["localStorage"],
					lookupLocalStorage: STORAGE_KEY,
			  }
			: undefined,
		react: {
			useSuspense: false,
		},
	});

	return i18n;
}

const i18nInstance = initializeI18n();

export { i18nInstance, STORAGE_KEY };
export default i18n;
