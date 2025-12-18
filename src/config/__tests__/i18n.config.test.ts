import {
	locales,
	defaultLocale,
	isLocale,
	getLocaleOrDefault,
	getLocaleOrNull,
} from "../i18n.config";

describe("i18n.config", () => {
	describe("locales", () => {
		it("should export locales array", () => {
			expect(locales).toEqual(["es", "en"]);
		});
	});

	describe("defaultLocale", () => {
		it("should export default locale", () => {
			expect(defaultLocale).toBe("es");
		});
	});

	describe("isLocale", () => {
		it("should return true for valid locales", () => {
			expect(isLocale("es")).toBe(true);
			expect(isLocale("en")).toBe(true);
		});

		it("should return false for invalid locales", () => {
			expect(isLocale("fr")).toBe(false);
			expect(isLocale("de")).toBe(false);
			expect(isLocale("")).toBe(false);
		});
	});

	describe("getLocaleOrDefault", () => {
		it("should return locale when valid", () => {
			expect(getLocaleOrDefault("es")).toBe("es");
			expect(getLocaleOrDefault("en")).toBe("en");
		});

		it("should return default locale when invalid", () => {
			expect(getLocaleOrDefault("fr")).toBe("es");
			expect(getLocaleOrDefault("de")).toBe("es");
		});

		it("should return default locale when undefined", () => {
			expect(getLocaleOrDefault(undefined)).toBe("es");
		});

		it("should return default locale when empty string", () => {
			expect(getLocaleOrDefault("")).toBe("es");
		});
	});

	describe("getLocaleOrNull", () => {
		it("should return locale when valid", () => {
			expect(getLocaleOrNull("es")).toBe("es");
			expect(getLocaleOrNull("en")).toBe("en");
		});

		it("should return null when invalid", () => {
			expect(getLocaleOrNull("fr")).toBeNull();
			expect(getLocaleOrNull("de")).toBeNull();
		});

		it("should return null when undefined", () => {
			expect(getLocaleOrNull(undefined)).toBeNull();
		});

		it("should return null when empty string", () => {
			expect(getLocaleOrNull("")).toBeNull();
		});
	});
});

