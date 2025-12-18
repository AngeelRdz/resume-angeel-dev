import type { ILanguageRepository } from "@/core/application/ports/language-repository";

export class GetCurrentLanguageUseCase {
	constructor(private readonly languageRepository: ILanguageRepository) {}

	async execute(): Promise<string> {
		return await this.languageRepository.getCurrentLanguage();
	}
}
