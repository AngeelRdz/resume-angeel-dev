import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import esTranslations from "./locales/es.json";
import enTranslations from "./locales/en.json";

const resources = {
	es: {
		translation: esTranslations,
	},
	en: {
		translation: enTranslations,
	},
};

const initializeI18n = async () => {
	if (typeof window !== "undefined" && !i18n.isInitialized) {
		await i18n
			.use(LanguageDetector)
			.use(initReactI18next)
			.init({
				resources,
				fallbackLng: "es",
				debug: process.env.NODE_ENV === "development",
				interpolation: {
					escapeValue: false,
				},
				detection: {
					order: ["localStorage", "navigator", "htmlTag"],
					caches: ["localStorage"],
					lookupLocalStorage: "app_language_resume",
				},
			});
	}
	return i18n;
};

let i18nInstance: Promise<typeof i18n>;

if (typeof window !== "undefined") {
	i18nInstance = initializeI18n();
} else {
	i18nInstance = Promise.resolve(i18n);
}

export { i18nInstance };
export default i18n;
