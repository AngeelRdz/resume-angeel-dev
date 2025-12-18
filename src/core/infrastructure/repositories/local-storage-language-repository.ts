import type { ILanguageRepository } from "@/core/application/ports/language-repository";
import {
	DEFAULT_LANGUAGE,
	SUPPORTED_LANGUAGES,
	type Language,
} from "@/core/domain/entities/language";

export class LocalStorageLanguageRepository implements ILanguageRepository {
	private readonly LANGUAGE_KEY = "app_language_resume";

	async getCurrentLanguage(): Promise<string> {
		if (typeof window === "undefined") {
			return DEFAULT_LANGUAGE.code;
		}

		const storedLanguage = localStorage.getItem(this.LANGUAGE_KEY);
		if (
			storedLanguage &&
			SUPPORTED_LANGUAGES.some((lang) => lang.code === storedLanguage)
		) {
			return storedLanguage;
		}

		return DEFAULT_LANGUAGE.code;
	}

	async setCurrentLanguage(languageCode: string): Promise<void> {
		if (typeof window === "undefined") {
			return;
		}

		if (SUPPORTED_LANGUAGES.some((lang) => lang.code === languageCode)) {
			localStorage.setItem(this.LANGUAGE_KEY, languageCode);
		}
	}

	async getSupportedLanguages(): Promise<Language[]> {
		return SUPPORTED_LANGUAGES;
	}

	async getDefaultLanguage(): Promise<Language> {
		return DEFAULT_LANGUAGE;
	}
}
