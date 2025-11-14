import type { Profile } from "@/core/domain/entities/profile";

export interface ProfileRepository {
	getProfile(params?: { userId?: string }): Promise<Profile | null>;
}
