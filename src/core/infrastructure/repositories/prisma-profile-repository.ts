import type { ProfileRepository } from "@/core/application/ports/profile-repository";
import type {
	Experience,
	ExperienceProject,
	PersonalInfo,
	Profile,
	Skill,
	SkillCategory,
	SkillLevel,
	Technology,
	TechnologyCategory,
} from "@/core/domain/entities/profile";
import type { ExternalHref } from "@/shared/types/links";
import type { Prisma, PrismaClient } from "@prisma/client";

type UserWithRelations = Prisma.UserGetPayload<{
	include: {
		experiences: {
			include: {
				responsibilities: true;
				projects: true;
				technologies: {
					include: {
						technology: true;
					};
				};
			};
			orderBy: {
				startDate: "desc";
			};
		};
		skills: {
			include: {
				skill: true;
			};
		};
		technologies: {
			include: {
				technology: true;
			};
		};
	};
}>;

function toExternalHref(value?: string | null): ExternalHref | null {
	if (!value) {
		return null;
	}
	return value as ExternalHref;
}

function mapPersonalInfo(user: UserWithRelations): PersonalInfo {
	return {
		firstName: user.firstName,
		lastName: user.lastName,
		fullName: user.fullName,
		headline: user.headline,
		summary: user.summary,
		birthDate: user.birthDate ? user.birthDate.toISOString() : null,
		location: {
			city: user.locationCity,
			region: user.locationRegion,
			country: user.country,
		},
		contact: {
			email: user.email,
			phone: user.phone,
			github: toExternalHref(user.githubUrl),
			linkedin: toExternalHref(user.linkedinUrl),
		},
	};
}

function mapTechnology(
	technology: Prisma.TechnologyGetPayload<Prisma.TechnologyDefaultArgs>
): Technology {
	return {
		id: technology.id,
		name: technology.name,
		category: technology.category as TechnologyCategory,
	};
}

function mapSkill(
	userSkill: Prisma.UserSkillGetPayload<{
		include: { skill: true };
	}>
): Skill {
	return {
		id: userSkill.skill.id,
		name: userSkill.skill.name,
		category: userSkill.skill.category as SkillCategory,
		level: (userSkill.level ?? null) as SkillLevel | null,
		highlight: userSkill.highlight,
	};
}

function mapExperienceProject(
	project: Prisma.ExperienceProjectGetPayload<Prisma.ExperienceProjectDefaultArgs>
): ExperienceProject {
	return {
		id: project.id,
		name: project.name,
		description: project.description,
		url: toExternalHref(project.url),
	};
}

function mapExperience(
	experience: Prisma.ExperienceGetPayload<{
		include: {
			responsibilities: true;
			projects: true;
			technologies: {
				include: {
					technology: true;
				};
			};
		};
	}>
): Experience {
	return {
		id: experience.id,
		companyName: experience.companyName,
		companyWebsite: toExternalHref(experience.companyWebsite),
		companyLocation: experience.companyLocation,
		roleTitle: experience.roleTitle,
		description: experience.description,
		startDate: experience.startDate.toISOString(),
		endDate: experience.endDate ? experience.endDate.toISOString() : null,
		isCurrent: experience.isCurrent,
		responsibilities: experience.responsibilities
			.sort((a, b) => a.order - b.order)
			.map((item) => item.description),
		projects: experience.projects
			.sort((a, b) => a.order - b.order)
			.map(mapExperienceProject),
		technologies: experience.technologies
			.map((item) => mapTechnology(item.technology))
			.sort((a, b) => a.name.localeCompare(b.name)),
	};
}

function mapProfile(user: UserWithRelations): Profile {
	return {
		personalInfo: mapPersonalInfo(user),
		experiences: user.experiences
			.map(mapExperience)
			.sort((a, b) => b.startDate.localeCompare(a.startDate)),
		skills: user.skills.map(mapSkill).sort((a, b) => {
			if (a.highlight !== b.highlight) {
				return a.highlight ? -1 : 1;
			}
			return a.name.localeCompare(b.name);
		}),
		technologies: user.technologies
			.map((item) => mapTechnology(item.technology))
			.sort((a, b) => a.name.localeCompare(b.name)),
	};
}

export class PrismaProfileRepository implements ProfileRepository {
	constructor(private readonly client: PrismaClient) {}

	async getProfile(params?: { userId?: string }): Promise<Profile | null> {
		const user = await this.client.user.findFirst({
			where: params?.userId ? { id: params.userId } : undefined,
			include: {
				experiences: {
					include: {
						responsibilities: true,
						projects: true,
						technologies: {
							include: {
								technology: true,
							},
						},
					},
					orderBy: {
						startDate: "desc",
					},
				},
				skills: {
					include: {
						skill: true,
					},
				},
				technologies: {
					include: {
						technology: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		if (!user) {
			return null;
		}

		return mapProfile(user);
	}
}
