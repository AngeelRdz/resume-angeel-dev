export interface Language {
	code: string;
	name: string;
	flag: string;
	isDefault?: boolean;
}

export const SUPPORTED_LANGUAGES: Language[] = [
	{
		code: "es",
		name: "Español",
		flag: "🇪🇸",
		isDefault: true,
	},
	{
		code: "en",
		name: "Inglés",
		flag: "🇺🇸",
	},
];

export const DEFAULT_LANGUAGE =
	SUPPORTED_LANGUAGES.find((lang) => lang.isDefault) || SUPPORTED_LANGUAGES[0];
