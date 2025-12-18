import type { Profile } from "@/core/domain/entities/profile";
import type { ProfileRepository } from "@/core/application/ports/profile-repository";
import { ProfileNotFoundException } from "@/core/domain/exceptions/profile-not-found.exception";

export class GetProfileUseCase {
	constructor(private readonly repository: ProfileRepository) {}

	async execute(params?: { userId?: string }): Promise<Profile> {
		console.log(
			"📦 [UseCase] GetProfileUseCase - Iniciando ejecución",
			params ? { userId: params.userId } : ""
		);
		const startTime = performance.now();

		const profile = await this.repository.getProfile(params);
		const duration = Math.round(performance.now() - startTime);

		if (!profile) {
			console.log("⚠️  [UseCase] GetProfileUseCase - Perfil no encontrado");
			throw new ProfileNotFoundException(params?.userId);
		}

		console.log(
			`✅ [UseCase] GetProfileUseCase - Perfil encontrado (${duration}ms)`
		);
		console.log(`   - Nombre: ${profile.personalInfo.fullName}`);
		console.log(`   - Experiencias: ${profile.experiences.length}`);
		console.log(`   - Skills: ${profile.skills.length}`);

		return profile;
	}
}
