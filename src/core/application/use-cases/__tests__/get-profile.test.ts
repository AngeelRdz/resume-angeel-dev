import { GetProfileUseCase } from "../get-profile";
import { ProfileNotFoundException } from "@/core/domain/exceptions/profile-not-found.exception";
import type { ProfileRepository } from "@/core/application/ports/profile-repository";
import type { Profile } from "@/core/domain/entities/profile";

describe("GetProfileUseCase", () => {
	let useCase: GetProfileUseCase;
	let mockRepository: jest.Mocked<ProfileRepository>;

	const mockProfile: Profile = {
		personalInfo: {
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Software Engineer",
			summary: "Test summary",
			location: {
				city: "Test City",
				country: "Test Country",
			},
			contact: {
				email: "test@example.com",
			},
		},
		experiences: [],
		skills: [],
		technologies: [],
	};

	beforeEach(() => {
		mockRepository = {
			getProfile: jest.fn(),
		} as jest.Mocked<ProfileRepository>;

		useCase = new GetProfileUseCase(mockRepository);
	});

	it("should return profile when found", async () => {
		mockRepository.getProfile.mockResolvedValue(mockProfile);

		const result = await useCase.execute();

		expect(result).toEqual(mockProfile);
		expect(mockRepository.getProfile).toHaveBeenCalledWith(undefined);
	});

	it("should return profile with userId when provided", async () => {
		const userId = "user-123";
		mockRepository.getProfile.mockResolvedValue(mockProfile);

		const result = await useCase.execute({ userId });

		expect(result).toEqual(mockProfile);
		expect(mockRepository.getProfile).toHaveBeenCalledWith({ userId });
	});

	it("should throw ProfileNotFoundException when profile not found", async () => {
		mockRepository.getProfile.mockResolvedValue(null);

		await expect(useCase.execute()).rejects.toThrow(ProfileNotFoundException);
	});

	it("should throw ProfileNotFoundException with userId when profile not found", async () => {
		const userId = "user-123";
		mockRepository.getProfile.mockResolvedValue(null);

		await expect(useCase.execute({ userId })).rejects.toThrow(
			ProfileNotFoundException
		);

		// Verify error message contains userId
		try {
			await useCase.execute({ userId });
		} catch (error) {
			expect(error).toBeInstanceOf(ProfileNotFoundException);
			if (error instanceof ProfileNotFoundException) {
				expect(error.message).toContain(userId);
			}
		}
	});

	it("should log execution start and success", async () => {
		const consoleSpy = jest.spyOn(console, "log").mockImplementation();
		mockRepository.getProfile.mockResolvedValue(mockProfile);

		await useCase.execute();

		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining("GetProfileUseCase - Iniciando ejecución"),
			""
		);
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining("GetProfileUseCase - Perfil encontrado")
		);
		expect(consoleSpy).toHaveBeenCalledWith(
			expect.stringContaining("Nombre: John Doe")
		);

		consoleSpy.mockRestore();
	});
});
