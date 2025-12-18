import { GetCurrentLanguageUseCase } from "../get-current-language";
import type { ILanguageRepository } from "@/core/application/ports/language-repository";

describe("GetCurrentLanguageUseCase", () => {
	let useCase: GetCurrentLanguageUseCase;
	let mockRepository: jest.Mocked<ILanguageRepository>;

	beforeEach(() => {
		mockRepository = {
			getCurrentLanguage: jest.fn(),
			setCurrentLanguage: jest.fn(),
			getSupportedLanguages: jest.fn(),
			getDefaultLanguage: jest.fn(),
		} as jest.Mocked<ILanguageRepository>;

		useCase = new GetCurrentLanguageUseCase(mockRepository);
	});

	it("should return current language from repository", async () => {
		const expectedLanguage = "es";
		mockRepository.getCurrentLanguage.mockResolvedValue(expectedLanguage);

		const result = await useCase.execute();

		expect(result).toBe(expectedLanguage);
		expect(mockRepository.getCurrentLanguage).toHaveBeenCalledTimes(1);
	});

	it("should return different language when repository returns it", async () => {
		const expectedLanguage = "en";
		mockRepository.getCurrentLanguage.mockResolvedValue(expectedLanguage);

		const result = await useCase.execute();

		expect(result).toBe(expectedLanguage);
		expect(mockRepository.getCurrentLanguage).toHaveBeenCalledTimes(1);
	});

	it("should handle repository errors", async () => {
		const error = new Error("Repository error");
		mockRepository.getCurrentLanguage.mockRejectedValue(error);

		await expect(useCase.execute()).rejects.toThrow("Repository error");
		expect(mockRepository.getCurrentLanguage).toHaveBeenCalledTimes(1);
	});
});
