import { GetProfileUseCase } from "@/core/application/use-cases/get-profile";
import type { ProfileRepository } from "@/core/application/ports/profile-repository";
import { GetCurrentLanguageUseCase } from "@/core/application/use-cases/get-current-language";
import { SetCurrentLanguageUseCase } from "@/core/application/use-cases/set-current-language";
import type { II18nService } from "@/core/application/services/i18n-service";
import type { ILanguageRepository } from "@/core/application/ports/language-repository";
import { createPrismaClient } from "@/core/infrastructure/database/prisma-client";
import { PrismaProfileRepository } from "@/core/infrastructure/repositories/prisma-profile-repository";
import { LocalStorageLanguageRepository } from "@/core/infrastructure/repositories/local-storage-language-repository";
import { I18nService } from "@/core/infrastructure/services/i18n-service";
import type { PrismaClient } from "@prisma/client";

/**
 * Contenedor de dependencias
 * Centraliza la creación y configuración de dependencias
 * Siguiendo el patrón de Inyección de Dependencias
 */
export class DependencyContainer {
	private static instance: DependencyContainer;

	// Repositorios con estado o costosos (singleton)
	private profileRepository: ProfileRepository | null = null;
	private prisma: PrismaClient | null = null;

	// Servicios (singleton)
	private i18nService: II18nService | null = null;

	private constructor() {}

	/**
	 * Obtener instancia singleton del contenedor
	 */
	static getInstance(): DependencyContainer {
		if (!DependencyContainer.instance) {
			DependencyContainer.instance = new DependencyContainer();
		}
		return DependencyContainer.instance;
	}

	/**
	 * Obtener cliente de Prisma (singleton)
	 */
	getPrisma(): PrismaClient {
		if (!this.prisma) {
			this.prisma = createPrismaClient();
		}
		return this.prisma;
	}

	/**
	 * Obtener repositorio de perfil (singleton - usa conexión DB)
	 */
	getProfileRepository(): ProfileRepository {
		if (!this.profileRepository) {
			this.profileRepository = new PrismaProfileRepository(this.getPrisma());
		}
		return this.profileRepository;
	}

	/**
	 * Obtener caso de uso para obtener perfil
	 */
	getGetProfileUseCase(): GetProfileUseCase {
		return new GetProfileUseCase(this.getProfileRepository());
	}

	/**
	 * Obtener repositorio de idioma (stateless - se crea cada vez)
	 */
	getLanguageRepository(): ILanguageRepository {
		return new LocalStorageLanguageRepository();
	}

	/**
	 * Obtener caso de uso para obtener idioma actual
	 */
	getGetCurrentLanguageUseCase(): GetCurrentLanguageUseCase {
		return new GetCurrentLanguageUseCase(this.getLanguageRepository());
	}

	/**
	 * Obtener caso de uso para establecer idioma actual
	 */
	getSetCurrentLanguageUseCase(): SetCurrentLanguageUseCase {
		return new SetCurrentLanguageUseCase(this.getLanguageRepository());
	}

	/**
	 * Obtener servicio de i18n (singleton - se usa frecuentemente)
	 */
	getI18nService(): II18nService {
		if (!this.i18nService) {
			this.i18nService = new I18nService(
				this.getGetCurrentLanguageUseCase(),
				this.getSetCurrentLanguageUseCase()
			);
		}
		return this.i18nService;
	}

	/**
	 * Limpiar todas las dependencias (útil para testing)
	 */
	clear(): void {
		this.profileRepository = null;
		this.i18nService = null;
		// Prisma se mantiene para evitar múltiples conexiones
	}

	// Métodos de compatibilidad con código existente
	resolveGetProfileUseCase(): GetProfileUseCase {
		return this.getGetProfileUseCase();
	}

	resolveGetCurrentLanguageUseCase(): GetCurrentLanguageUseCase {
		return this.getGetCurrentLanguageUseCase();
	}

	resolveSetCurrentLanguageUseCase(): SetCurrentLanguageUseCase {
		return this.getSetCurrentLanguageUseCase();
	}

	resolveI18nService(): II18nService {
		return this.getI18nService();
	}
}

// Exportar singleton para uso en producción
export const container = DependencyContainer.getInstance();

// Mantener compatibilidad con código existente
export function getContainer(): DependencyContainer {
	return DependencyContainer.getInstance();
}

// Para testing - permite crear instancias con dependencias mockeadas
// Nota: En tests, se recomienda mockear los métodos del container directamente
// o usar jest.spyOn para mockear los métodos específicos
export function createContainer(): DependencyContainer {
	return DependencyContainer.getInstance();
}
