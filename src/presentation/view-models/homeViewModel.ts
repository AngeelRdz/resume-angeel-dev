import type { TFunction } from "i18next";

import { defaultLocale, isLocale, type Locale } from "@/config/i18n.config";
import type {
	Experience,
	Profile,
	Skill,
	Technology,
} from "@/core/domain/entities/profile";
import type { ExternalHref } from "@/shared/types/links";

type ActionVariant = "primary" | "secondary";

export interface Highlight {
	id: string;
	label: string;
	value: string;
}

export interface HeroAction {
	label: string;
	href: ExternalHref;
	variant: ActionVariant;
	download?: boolean;
}

export interface TechnologyItem {
	name: string;
	iconName?: string | null;
}

export interface ExperienceViewModel {
	id: Experience["id"];
	company: string;
	location?: string | null;
	website?: ExternalHref | null;
	role: string;
	period: string;
	description?: string | null;
	highlights: string[];
	techStack: TechnologyItem[];
}

export interface ProjectViewModel {
	id: string;
	name: string;
	description?: string | null;
	url?: ExternalHref | null;
	company: string;
	techStack: TechnologyItem[];
}

export interface ContactSocialLink {
	id: string;
	label: string;
	url: ExternalHref;
}

export interface HomeViewModel {
	locale: Locale;
	hero: {
		greeting: string;
		name: string;
		role: string;
		headline: string;
		availability: string;
		location: string;
		actions: HeroAction[];
		highlights: Highlight[];
	};
	about: {
		title: string;
		summary: string;
		highlights: Highlight[];
		profileImageUrl?: string | null;
		socialLinks: ContactSocialLink[];
	};
	experience: {
		title: string;
		items: ExperienceViewModel[];
	};
	skills: {
		title: string;
		primaryTitle: string;
		primaryDescription: string;
		primarySkills: string[];
		complementaryTitle: string;
		complementaryDescription: string;
		complementarySkills: string[];
		valuesTitle: string;
		values: string[];
	};
	projects: {
		title: string;
		items: ProjectViewModel[];
	};
	contact: {
		title: string;
		subtitle: string;
		emailLabel: string;
		email: string;
		socialLabel: string;
		socials: ContactSocialLink[];
	};
}

type CreateHomeViewModelParams = {
	profile: Profile;
	t: TFunction;
	language: string;
};

function getLocaleFromLanguage(language: string): Locale {
	const normalized = language?.split("-")[0]?.toLowerCase() ?? "";
	return isLocale(normalized) ? normalized : defaultLocale;
}

function formatDate(value: string, locale: Locale) {
	return new Intl.DateTimeFormat(locale, {
		month: "short",
		year: "numeric",
	}).format(new Date(value));
}

function formatExperiencePeriod(
	experience: Experience,
	locale: Locale,
	currentLabel: string
) {
	const start = formatDate(experience.startDate, locale);
	const end = experience.endDate
		? formatDate(experience.endDate, locale)
		: currentLabel;

	return `${start} – ${end}`;
}

function mapExperienceTechStack(technologies: Technology[]): TechnologyItem[] {
	return technologies.map((technology) => ({
		name: technology.name,
		iconName: technology.iconName,
	}));
}

function mapProjectsFromExperiences(
	experiences: Experience[]
): ProjectViewModel[] {
	return experiences.flatMap((experience) =>
		experience.projects.map((project) => ({
			id: project.id,
			name: project.name,
			description: project.description ?? experience.description ?? null,
			url: project.url ?? null,
			company: experience.companyName,
			techStack: mapExperienceTechStack(experience.technologies),
		}))
	);
}

function splitSkills(skills: Skill[]) {
	const primary = skills
		.filter((skill) => skill.highlight)
		.map((skill) => skill.name);

	const complementary = skills
		.filter((skill) => !skill.highlight)
		.map((skill) => skill.name);

	return { primary, complementary };
}

function buildHighlights(t: TFunction): Highlight[] {
	const highlightsRecord = t("about.highlights", {
		returnObjects: true,
	}) as Record<string, { label: string; value: string }>;

	return Object.entries(highlightsRecord).map(([id, value]) => ({
		id,
		label: value.label,
		value: value.value,
	}));
}

function buildContactSocials(profile: Profile): ContactSocialLink[] {
	const socials: ContactSocialLink[] = [];
	const { contact } = profile.personalInfo;

	if (contact.linkedin) {
		socials.push({
			id: "linkedin",
			label: "LinkedIn",
			url: contact.linkedin,
		});
	}

	if (contact.github) {
		socials.push({
			id: "github",
			label: "GitHub",
			url: contact.github,
		});
	}

	if (contact.phone) {
		socials.push({
			id: "phone",
			label: contact.phone,
			url: `tel:${contact.phone}` as ExternalHref,
		});
	}

	return socials;
}

export function createHomeViewModel({
	profile,
	t,
	language,
}: CreateHomeViewModelParams): HomeViewModel {
	const locale = getLocaleFromLanguage(language);
	const highlights = buildHighlights(t);

	const experienceItems: ExperienceViewModel[] = profile.experiences.map(
		(experience) => ({
			id: experience.id,
			company: experience.companyName,
			location: experience.companyLocation ?? null,
			website: experience.companyWebsite ?? null,
			role: experience.roleTitle,
			period: formatExperiencePeriod(
				experience,
				locale,
				t("experience.currentLabel", "Actualidad")
			),
			description: experience.description ?? null,
			highlights: experience.responsibilities,
			techStack: mapExperienceTechStack(experience.technologies),
		})
	);

	const projects = mapProjectsFromExperiences(profile.experiences);
	const { primary, complementary } = splitSkills(profile.skills);
	const contactSocials = buildContactSocials(profile);

	const heroHeadline = t("hero.headline") || profile.personalInfo.summary;

	return {
		locale,
		hero: {
			greeting: t("hero.greeting"),
			name: profile.personalInfo.fullName,
			role: t("hero.role", { defaultValue: profile.personalInfo.headline }),
			headline: heroHeadline,
			availability: t("hero.availability"),
			location: `${profile.personalInfo.location.city}, ${profile.personalInfo.location.country}`,
			actions: [
				{
					label: t("hero.primaryCta"),
					href: `mailto:${profile.personalInfo.contact.email}`,
					variant: "primary",
				},
				profile.personalInfo.contact.linkedin
					? {
							label: t("hero.secondaryCtaLinkedin", "Ver LinkedIn"),
							href: profile.personalInfo.contact.linkedin,
							variant: "secondary",
					  }
					: {
							label: t("hero.secondaryCtaGithub", "Ver GitHub"),
							href:
								profile.personalInfo.contact.github ??
								`mailto:${profile.personalInfo.contact.email}`,
							variant: "secondary",
					  },
			],
			highlights,
		},
		about: {
			title: t("about.title"),
			summary: profile.personalInfo.summary,
			highlights,
			profileImageUrl: profile.personalInfo.profileImageUrl,
			socialLinks: contactSocials,
		},
		experience: {
			title: t("experience.title"),
			items: experienceItems,
		},
		skills: {
			title: t("skills.title"),
			primaryTitle: t("skills.primaryTitle"),
			primaryDescription: t("skills.primaryDescription"),
			primarySkills: primary,
			complementaryTitle: t("skills.complementaryTitle"),
			complementaryDescription: t("skills.complementaryDescription"),
			complementarySkills: complementary,
			valuesTitle: t("skills.valuesTitle"),
			values: (() => {
				const values = t("skills.values", { returnObjects: true });
				return Array.isArray(values) ? values : [];
			})(),
		},
		projects: {
			title: t("projects.title"),
			items: projects,
		},
		contact: {
			title: t("contact.title"),
			subtitle: t("contact.subtitle"),
			emailLabel: t("contact.emailLabel"),
			email: profile.personalInfo.contact.email,
			socialLabel: t("contact.socialLabel"),
			socials: contactSocials,
		},
	};
}
