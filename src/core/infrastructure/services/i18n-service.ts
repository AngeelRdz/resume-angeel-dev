import type { II18nService } from "@/core/application/services/i18n-service";
import type { GetCurrentLanguageUseCase } from "@/core/application/use-cases/get-current-language";
import type { SetCurrentLanguageUseCase } from "@/core/application/use-cases/set-current-language";

export class I18nService implements II18nService {
	constructor(
		private readonly getCurrentLanguageUseCase: GetCurrentLanguageUseCase,
		private readonly setCurrentLanguageUseCase: SetCurrentLanguageUseCase
	) {}

	async changeLanguage(languageCode: string): Promise<void> {
		await this.setCurrentLanguageUseCase.execute(languageCode);

		// Lazy import para evitar problemas en el servidor
		if (typeof window !== "undefined") {
			const { i18nInstance } = await import("@/presentation/i18n/i18n");
			const i18n = await i18nInstance;
			if (i18n.isInitialized) {
				await i18n.changeLanguage(languageCode);
			}
		}
	}

	async getCurrentLanguage(): Promise<string> {
		return await this.getCurrentLanguageUseCase.execute();
	}
}
