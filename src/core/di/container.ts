import { GetProfileUseCase } from "@/core/application/use-cases/get-profile";
import { prisma } from "@/core/infrastructure/database/prisma-client";
import { PrismaProfileRepository } from "@/core/infrastructure/repositories/prisma-profile-repository";

class Container {
	private static instance: Container;

	private readonly profileRepository = new PrismaProfileRepository(prisma);
	private readonly getProfileUseCase = new GetProfileUseCase(
		this.profileRepository
	);

	static getInstance() {
		if (!Container.instance) {
			Container.instance = new Container();
		}
		return Container.instance;
	}

	resolveGetProfileUseCase() {
		return this.getProfileUseCase;
	}
}

export const container = Container.getInstance();
