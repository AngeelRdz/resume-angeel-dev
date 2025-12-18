import { I18nService } from "../i18n-service";
import type { GetCurrentLanguageUseCase } from "@/core/application/use-cases/get-current-language";
import type { SetCurrentLanguageUseCase } from "@/core/application/use-cases/set-current-language";

// Mock i18n
jest.mock("@/presentation/i18n/i18n", () => ({
	i18nInstance: Promise.resolve({
		isInitialized: true,
		changeLanguage: jest.fn().mockResolvedValue(undefined),
	}),
}));

describe("I18nService", () => {
	let service: I18nService;
	let mockGetCurrentLanguageUseCase: jest.Mocked<GetCurrentLanguageUseCase>;
	let mockSetCurrentLanguageUseCase: jest.Mocked<SetCurrentLanguageUseCase>;

	beforeEach(() => {
		mockGetCurrentLanguageUseCase = {
			execute: jest.fn(),
		} as unknown as jest.Mocked<GetCurrentLanguageUseCase>;

		mockSetCurrentLanguageUseCase = {
			execute: jest.fn(),
		} as unknown as jest.Mocked<SetCurrentLanguageUseCase>;

		service = new I18nService(
			mockGetCurrentLanguageUseCase,
			mockSetCurrentLanguageUseCase
		);
	});

	describe("getCurrentLanguage", () => {
		it("should return current language from use case", async () => {
			const expectedLanguage = "es";
			mockGetCurrentLanguageUseCase.execute.mockResolvedValue(expectedLanguage);

			const result = await service.getCurrentLanguage();

			expect(result).toBe(expectedLanguage);
			expect(mockGetCurrentLanguageUseCase.execute).toHaveBeenCalledTimes(1);
		});

		it("should return different language when use case returns it", async () => {
			const expectedLanguage = "en";
			mockGetCurrentLanguageUseCase.execute.mockResolvedValue(expectedLanguage);

			const result = await service.getCurrentLanguage();

			expect(result).toBe(expectedLanguage);
		});
	});

	describe("changeLanguage", () => {
		it("should set language using use case", async () => {
			const languageCode = "es";
			mockSetCurrentLanguageUseCase.execute.mockResolvedValue(undefined);

			await service.changeLanguage(languageCode);

			expect(mockSetCurrentLanguageUseCase.execute).toHaveBeenCalledWith(languageCode);
			expect(mockSetCurrentLanguageUseCase.execute).toHaveBeenCalledTimes(1);
		});

		it("should change i18n language when window is defined", async () => {
			const languageCode = "en";
			mockSetCurrentLanguageUseCase.execute.mockResolvedValue(undefined);

			// Mock window
			Object.defineProperty(global, "window", {
				value: {},
				writable: true,
			});

			await service.changeLanguage(languageCode);

			expect(mockSetCurrentLanguageUseCase.execute).toHaveBeenCalledWith(languageCode);
		});

		it("should not change i18n language when window is undefined", async () => {
			const languageCode = "es";
			mockSetCurrentLanguageUseCase.execute.mockResolvedValue(undefined);

			// Remove window
			const originalWindow = global.window;
			// @ts-expect-error - Simulating server-side
			delete global.window;

			await service.changeLanguage(languageCode);

			expect(mockSetCurrentLanguageUseCase.execute).toHaveBeenCalledWith(languageCode);

			global.window = originalWindow;
		});

		it("should handle errors from setCurrentLanguageUseCase", async () => {
			const languageCode = "es";
			const error = new Error("Use case error");
			mockSetCurrentLanguageUseCase.execute.mockRejectedValue(error);

			await expect(service.changeLanguage(languageCode)).rejects.toThrow("Use case error");
		});
	});
});

