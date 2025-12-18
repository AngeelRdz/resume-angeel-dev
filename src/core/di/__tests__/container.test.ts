import {
	DependencyContainer,
	getContainer,
	createContainer,
} from "../container";
import { GetProfileUseCase } from "@/core/application/use-cases/get-profile";
import { GetCurrentLanguageUseCase } from "@/core/application/use-cases/get-current-language";
import { SetCurrentLanguageUseCase } from "@/core/application/use-cases/set-current-language";

// Mock de dependencias
jest.mock("@/core/infrastructure/database/prisma-client", () => ({
	createPrismaClient: jest.fn(() => ({
		user: {
			findFirst: jest.fn(),
		},
	})),
}));

jest.mock(
	"@/core/infrastructure/repositories/prisma-profile-repository",
	() => ({
		PrismaProfileRepository: jest.fn().mockImplementation(() => ({
			getProfile: jest.fn(),
		})),
	})
);

jest.mock(
	"@/core/infrastructure/repositories/local-storage-language-repository",
	() => ({
		LocalStorageLanguageRepository: jest.fn().mockImplementation(() => ({
			getCurrentLanguage: jest.fn(),
			setCurrentLanguage: jest.fn(),
			getSupportedLanguages: jest.fn(),
			getDefaultLanguage: jest.fn(),
		})),
	})
);

jest.mock("@/core/infrastructure/services/i18n-service", () => ({
	I18nService: jest.fn().mockImplementation(() => ({
		changeLanguage: jest.fn(),
		getCurrentLanguage: jest.fn(),
	})),
}));

describe("DependencyContainer", () => {
	beforeEach(() => {
		// Limpiar la instancia singleton antes de cada test
		const container = DependencyContainer.getInstance();
		container.clear();
	});

	describe("getInstance", () => {
		it("should return singleton instance", () => {
			const instance1 = DependencyContainer.getInstance();
			const instance2 = DependencyContainer.getInstance();
			expect(instance1).toBe(instance2);
		});
	});

	describe("getPrisma", () => {
		it("should return Prisma client instance", () => {
			const container = DependencyContainer.getInstance();
			const prisma = container.getPrisma();
			expect(prisma).toBeDefined();
		});

		it("should return same instance on multiple calls (singleton)", () => {
			const container = DependencyContainer.getInstance();
			const prisma1 = container.getPrisma();
			const prisma2 = container.getPrisma();
			expect(prisma1).toBe(prisma2);
		});
	});

	describe("getProfileRepository", () => {
		it("should return ProfileRepository instance", () => {
			const container = DependencyContainer.getInstance();
			const repository = container.getProfileRepository();
			expect(repository).toBeDefined();
		});

		it("should return same instance on multiple calls (singleton)", () => {
			const container = DependencyContainer.getInstance();
			const repo1 = container.getProfileRepository();
			const repo2 = container.getProfileRepository();
			expect(repo1).toBe(repo2);
		});
	});

	describe("getGetProfileUseCase", () => {
		it("should return GetProfileUseCase instance", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.getGetProfileUseCase();
			expect(useCase).toBeInstanceOf(GetProfileUseCase);
		});

		it("should return new instance on each call", () => {
			const container = DependencyContainer.getInstance();
			const useCase1 = container.getGetProfileUseCase();
			const useCase2 = container.getGetProfileUseCase();
			expect(useCase1).not.toBe(useCase2);
		});
	});

	describe("getLanguageRepository", () => {
		it("should return ILanguageRepository instance", () => {
			const container = DependencyContainer.getInstance();
			const repository = container.getLanguageRepository();
			expect(repository).toBeDefined();
		});

		it("should return new instance on each call", () => {
			const container = DependencyContainer.getInstance();
			const repo1 = container.getLanguageRepository();
			const repo2 = container.getLanguageRepository();
			expect(repo1).not.toBe(repo2);
		});
	});

	describe("getGetCurrentLanguageUseCase", () => {
		it("should return GetCurrentLanguageUseCase instance", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.getGetCurrentLanguageUseCase();
			expect(useCase).toBeInstanceOf(GetCurrentLanguageUseCase);
		});

		it("should return new instance on each call", () => {
			const container = DependencyContainer.getInstance();
			const useCase1 = container.getGetCurrentLanguageUseCase();
			const useCase2 = container.getGetCurrentLanguageUseCase();
			expect(useCase1).not.toBe(useCase2);
		});
	});

	describe("getSetCurrentLanguageUseCase", () => {
		it("should return SetCurrentLanguageUseCase instance", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.getSetCurrentLanguageUseCase();
			expect(useCase).toBeInstanceOf(SetCurrentLanguageUseCase);
		});

		it("should return new instance on each call", () => {
			const container = DependencyContainer.getInstance();
			const useCase1 = container.getSetCurrentLanguageUseCase();
			const useCase2 = container.getSetCurrentLanguageUseCase();
			expect(useCase1).not.toBe(useCase2);
		});
	});

	describe("getI18nService", () => {
		it("should return II18nService instance", () => {
			const container = DependencyContainer.getInstance();
			const service = container.getI18nService();
			expect(service).toBeDefined();
		});

		it("should return same instance on multiple calls (singleton)", () => {
			const container = DependencyContainer.getInstance();
			const service1 = container.getI18nService();
			const service2 = container.getI18nService();
			expect(service1).toBe(service2);
		});
	});

	describe("clear", () => {
		it("should clear profileRepository and i18nService", () => {
			const container = DependencyContainer.getInstance();
			container.getProfileRepository();
			container.getI18nService();
			container.clear();
			// Verificar que se pueden crear nuevas instancias
			const repo = container.getProfileRepository();
			const service = container.getI18nService();
			expect(repo).toBeDefined();
			expect(service).toBeDefined();
		});
	});

	describe("compatibility methods", () => {
		it("should resolveGetProfileUseCase return GetProfileUseCase", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.resolveGetProfileUseCase();
			expect(useCase).toBeInstanceOf(GetProfileUseCase);
		});

		it("should resolveGetCurrentLanguageUseCase return GetCurrentLanguageUseCase", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.resolveGetCurrentLanguageUseCase();
			expect(useCase).toBeInstanceOf(GetCurrentLanguageUseCase);
		});

		it("should resolveSetCurrentLanguageUseCase return SetCurrentLanguageUseCase", () => {
			const container = DependencyContainer.getInstance();
			const useCase = container.resolveSetCurrentLanguageUseCase();
			expect(useCase).toBeInstanceOf(SetCurrentLanguageUseCase);
		});

		it("should resolveI18nService return II18nService", () => {
			const container = DependencyContainer.getInstance();
			const service = container.resolveI18nService();
			expect(service).toBeDefined();
		});
	});
});

describe("getContainer", () => {
	it("should return DependencyContainer instance", () => {
		const container = getContainer();
		expect(container).toBeInstanceOf(DependencyContainer);
	});

	it("should return same instance on multiple calls", () => {
		const container1 = getContainer();
		const container2 = getContainer();
		expect(container1).toBe(container2);
	});
});

describe("createContainer", () => {
	it("should return DependencyContainer instance", () => {
		const container = createContainer();
		expect(container).toBeInstanceOf(DependencyContainer);
	});

	it("should return same instance (singleton)", () => {
		const container1 = createContainer();
		const container2 = createContainer();
		expect(container1).toBe(container2);
	});
});
