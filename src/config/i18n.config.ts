export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export const i18n = {
	locales,
	defaultLocale,
} as const;

export const isLocale = (value: string): value is Locale =>
	locales.includes(value as Locale);

export const getLocaleOrDefault = (value?: string): Locale =>
	value && isLocale(value) ? (value as Locale) : defaultLocale;

export const getLocaleOrNull = (value?: string): Locale | null =>
	value && isLocale(value) ? (value as Locale) : null;
