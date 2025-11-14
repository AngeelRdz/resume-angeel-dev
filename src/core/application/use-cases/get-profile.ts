import type { Profile } from "@/core/domain/entities/profile";
import type { ProfileRepository } from "@/core/application/ports/profile-repository";

export class GetProfileUseCase {
	constructor(private readonly repository: ProfileRepository) {}

	async execute(params?: { userId?: string }): Promise<Profile> {
		const profile = await this.repository.getProfile(params);

		if (!profile) {
			throw new Error("Perfil no encontrado");
		}

		return profile;
	}
}
