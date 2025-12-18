export interface II18nService {
	changeLanguage(languageCode: string): Promise<void>;
	getCurrentLanguage(): Promise<string>;
}
