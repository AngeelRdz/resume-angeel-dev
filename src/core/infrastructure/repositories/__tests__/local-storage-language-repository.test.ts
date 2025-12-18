import { LocalStorageLanguageRepository } from "../local-storage-language-repository";
import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from "@/core/domain/entities/language";

describe("LocalStorageLanguageRepository", () => {
	let repository: LocalStorageLanguageRepository;
	let originalLocalStorage: Storage;

	beforeEach(() => {
		repository = new LocalStorageLanguageRepository();
		originalLocalStorage = global.localStorage;
		
		// Mock localStorage
		const localStorageMock = {
			getItem: jest.fn(),
			setItem: jest.fn(),
			removeItem: jest.fn(),
			clear: jest.fn(),
		};
		
		Object.defineProperty(window, "localStorage", {
			value: localStorageMock,
			writable: true,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
		Object.defineProperty(window, "localStorage", {
			value: originalLocalStorage,
			writable: true,
		});
	});

	describe("getCurrentLanguage", () => {
		it("should return default language when localStorage is empty", async () => {
			(window.localStorage.getItem as jest.Mock).mockReturnValue(null);

			const result = await repository.getCurrentLanguage();

			expect(result).toBe(DEFAULT_LANGUAGE.code);
			expect(window.localStorage.getItem).toHaveBeenCalledWith("app_language_resume");
		});

		it("should return stored language when valid", async () => {
			const storedLanguage = "es";
			(window.localStorage.getItem as jest.Mock).mockReturnValue(storedLanguage);

			const result = await repository.getCurrentLanguage();

			expect(result).toBe(storedLanguage);
			expect(window.localStorage.getItem).toHaveBeenCalledWith("app_language_resume");
		});

		it("should return default language when stored language is invalid", async () => {
			(window.localStorage.getItem as jest.Mock).mockReturnValue("invalid");

			const result = await repository.getCurrentLanguage();

			expect(result).toBe(DEFAULT_LANGUAGE.code);
		});

		it("should return default language when window is undefined (server-side)", async () => {
			const originalWindow = global.window;
			// @ts-expect-error - Simulating server-side
			delete global.window;

			const result = await repository.getCurrentLanguage();

			expect(result).toBe(DEFAULT_LANGUAGE.code);

			global.window = originalWindow;
		});

		it("should return supported language when stored", async () => {
			for (const lang of SUPPORTED_LANGUAGES) {
				(window.localStorage.getItem as jest.Mock).mockReturnValue(lang.code);

				const result = await repository.getCurrentLanguage();

				expect(result).toBe(lang.code);
			}
		});
	});

	describe("setCurrentLanguage", () => {
		it("should set language in localStorage when valid", async () => {
			const languageCode = "es";

			await repository.setCurrentLanguage(languageCode);

			expect(window.localStorage.setItem).toHaveBeenCalledWith(
				"app_language_resume",
				languageCode
			);
		});

		it("should not set language when invalid", async () => {
			const invalidLanguage = "invalid";

			await repository.setCurrentLanguage(invalidLanguage);

			expect(window.localStorage.setItem).not.toHaveBeenCalled();
		});

		it("should set all supported languages", async () => {
			for (const lang of SUPPORTED_LANGUAGES) {
				await repository.setCurrentLanguage(lang.code);

				expect(window.localStorage.setItem).toHaveBeenCalledWith(
					"app_language_resume",
					lang.code
				);
			}
		});

		it("should not throw when window is undefined (server-side)", async () => {
			const originalWindow = global.window;
			// @ts-expect-error - Simulating server-side
			delete global.window;

			await expect(repository.setCurrentLanguage("es")).resolves.not.toThrow();

			global.window = originalWindow;
		});
	});

	describe("getSupportedLanguages", () => {
		it("should return all supported languages", async () => {
			const result = await repository.getSupportedLanguages();

			expect(result).toEqual(SUPPORTED_LANGUAGES);
			expect(result.length).toBeGreaterThan(0);
		});
	});

	describe("getDefaultLanguage", () => {
		it("should return default language", async () => {
			const result = await repository.getDefaultLanguage();

			expect(result).toEqual(DEFAULT_LANGUAGE);
		});
	});
});

