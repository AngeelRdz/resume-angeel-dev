import type { ILanguageRepository } from "@/core/application/ports/language-repository";

export class SetCurrentLanguageUseCase {
	constructor(private readonly languageRepository: ILanguageRepository) {}

	async execute(languageCode: string): Promise<void> {
		return await this.languageRepository.setCurrentLanguage(languageCode);
	}
}
