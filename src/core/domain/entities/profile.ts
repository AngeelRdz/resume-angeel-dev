import type { ExternalHref } from "@/shared/types/links";

export type SkillCategory =
	| "FRONTEND"
	| "BACKEND"
	| "DESIGN"
	| "DEVOPS"
	| "MOBILE"
	| "DATA"
	| "MANAGEMENT"
	| "OTHER";

export type SkillLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED" | "EXPERT";

export type TechnologyCategory =
	| "FRONTEND"
	| "BACKEND"
	| "MOBILE"
	| "DATABASE"
	| "CLOUD"
	| "TOOLING"
	| "DESIGN"
	| "OTHER";

export interface PersonalInfo {
	firstName: string;
	lastName: string;
	fullName: string;
	headline: string;
	summary: string;
	birthDate?: string | null;
	location: {
		city: string;
		region?: string | null;
		country: string;
	};
	contact: {
		email: string;
		phone?: string | null;
		github?: ExternalHref | null;
		linkedin?: ExternalHref | null;
	};
}

export interface Technology {
	id: string;
	name: string;
	category: TechnologyCategory;
}

export interface Skill {
	id: string;
	name: string;
	category: SkillCategory;
	level?: SkillLevel | null;
	highlight: boolean;
}

export interface ExperienceProject {
	id: string;
	name: string;
	description?: string | null;
	url?: ExternalHref | null;
}

export interface Experience {
	id: string;
	companyName: string;
	companyWebsite?: ExternalHref | null;
	companyLocation?: string | null;
	roleTitle: string;
	description?: string | null;
	startDate: string;
	endDate?: string | null;
	isCurrent: boolean;
	responsibilities: string[];
	projects: ExperienceProject[];
	technologies: Technology[];
}

export interface Profile {
	personalInfo: PersonalInfo;
	experiences: Experience[];
	skills: Skill[];
	technologies: Technology[];
}
