import { SetCurrentLanguageUseCase } from "../set-current-language";
import type { ILanguageRepository } from "@/core/application/ports/language-repository";

describe("SetCurrentLanguageUseCase", () => {
	let useCase: SetCurrentLanguageUseCase;
	let mockRepository: jest.Mocked<ILanguageRepository>;

	beforeEach(() => {
		mockRepository = {
			getCurrentLanguage: jest.fn(),
			setCurrentLanguage: jest.fn(),
			getSupportedLanguages: jest.fn(),
			getDefaultLanguage: jest.fn(),
		} as jest.Mocked<ILanguageRepository>;

		useCase = new SetCurrentLanguageUseCase(mockRepository);
	});

	it("should set language in repository", async () => {
		const languageCode = "es";
		mockRepository.setCurrentLanguage.mockResolvedValue(undefined);

		await useCase.execute(languageCode);

		expect(mockRepository.setCurrentLanguage).toHaveBeenCalledWith(
			languageCode
		);
		expect(mockRepository.setCurrentLanguage).toHaveBeenCalledTimes(1);
	});

	it("should set different language when provided", async () => {
		const languageCode = "en";
		mockRepository.setCurrentLanguage.mockResolvedValue(undefined);

		await useCase.execute(languageCode);

		expect(mockRepository.setCurrentLanguage).toHaveBeenCalledWith(
			languageCode
		);
		expect(mockRepository.setCurrentLanguage).toHaveBeenCalledTimes(1);
	});

	it("should handle repository errors", async () => {
		const languageCode = "es";
		const error = new Error("Repository error");
		mockRepository.setCurrentLanguage.mockRejectedValue(error);

		await expect(useCase.execute(languageCode)).rejects.toThrow(
			"Repository error"
		);
		expect(mockRepository.setCurrentLanguage).toHaveBeenCalledWith(
			languageCode
		);
	});
});
