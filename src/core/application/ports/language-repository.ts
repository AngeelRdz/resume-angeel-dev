import type { Language } from "@/core/domain/entities/language";

export interface ILanguageRepository {
	getCurrentLanguage(): Promise<string>;
	setCurrentLanguage(languageCode: string): Promise<void>;
	getSupportedLanguages(): Promise<Language[]>;
	getDefaultLanguage(): Promise<Language>;
}
