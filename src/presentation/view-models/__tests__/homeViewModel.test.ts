import { createHomeViewModel } from "../homeViewModel";
import type { Profile } from "@/core/domain/entities/profile";
import type { TFunction } from "i18next";
import type { ExternalHref } from "@/shared/types/links";

describe("createHomeViewModel", () => {
	const mockProfile: Profile = {
		personalInfo: {
			firstName: "John",
			lastName: "Doe",
			fullName: "John Doe",
			headline: "Software Engineer",
			summary: "Test summary",
			profileImageUrl: "https://example.com/image.jpg",
			location: {
				city: "Test City",
				country: "Test Country",
			},
			contact: {
				email: "test@example.com",
				phone: "+1234567890",
				github: "https://github.com/test" as ExternalHref,
				linkedin: "https://linkedin.com/in/test" as ExternalHref,
			},
		},
		experiences: [
			{
				id: "exp-1",
				companyName: "Test Company",
				companyWebsite: "https://test.com" as ExternalHref,
				companyLocation: "Test Location",
				roleTitle: "Senior Developer",
				description: "Test description",
				startDate: "2020-01-01T00:00:00.000Z",
				endDate: "2022-01-01T00:00:00.000Z",
				isCurrent: false,
				responsibilities: ["Responsibility 1", "Responsibility 2"],
				projects: [
					{
						id: "proj-1",
						name: "Test Project",
						description: "Project description",
						url: "https://project.com" as ExternalHref,
					},
				],
				technologies: [
					{
						id: "tech-1",
						name: "React",
						category: "FRONTEND",
						iconName: "react",
					},
				],
			},
		],
		skills: [
			{
				id: "skill-1",
				name: "JavaScript",
				category: "FRONTEND",
				highlight: true,
			},
			{
				id: "skill-2",
				name: "CSS",
				category: "FRONTEND",
				highlight: false,
			},
		],
		technologies: [
			{
				id: "tech-1",
				name: "React",
				category: "FRONTEND",
				iconName: "react",
			},
		],
	};

	const mockT: TFunction = ((
		key: string,
		options?: { returnObjects?: boolean }
	) => {
		const translations: Record<
			string,
			string | Record<string, { label: string; value: string }> | string[]
		> = {
			"hero.greeting": "Hi, I'm",
			"hero.role": "Software Engineer",
			"hero.headline": "Test headline",
			"hero.availability": "Available",
			"hero.primaryCta": "Contact",
			"hero.secondaryCtaLinkedin": "View LinkedIn",
			"about.title": "About",
			"experience.title": "Experience",
			"experience.currentLabel": "Present",
			"skills.title": "Skills",
			"skills.primaryTitle": "Primary",
			"skills.primaryDescription": "Primary description",
			"skills.complementaryTitle": "Complementary",
			"skills.complementaryDescription": "Complementary description",
			"skills.valuesTitle": "Values",
			"skills.values": ["Value 1", "Value 2"],
			"projects.title": "Projects",
			"contact.title": "Contact",
			"contact.subtitle": "Let's talk",
			"contact.emailLabel": "Email",
			"contact.socialLabel": "Social",
			"about.highlights": {
				experience: { label: "Experience", value: "5 years" },
				location: { label: "Location", value: "Test City" },
			},
		};

		if (options?.returnObjects) {
			return translations[key] || {};
		}

		return translations[key] || key;
	}) as TFunction;

	it("should create view model with correct structure", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel).toHaveProperty("locale");
		expect(viewModel).toHaveProperty("hero");
		expect(viewModel).toHaveProperty("about");
		expect(viewModel).toHaveProperty("experience");
		expect(viewModel).toHaveProperty("skills");
		expect(viewModel).toHaveProperty("projects");
		expect(viewModel).toHaveProperty("contact");
	});

	it("should map hero data correctly", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel.hero.name).toBe("John Doe");
		expect(viewModel.hero.greeting).toBe("Hi, I'm");
		expect(viewModel.hero.role).toBe("Software Engineer");
		expect(viewModel.hero.location).toBe("Test City, Test Country");
		expect(viewModel.hero.actions).toHaveLength(2);
		expect(viewModel.hero.actions[0].variant).toBe("primary");
		expect(viewModel.hero.actions[0].href).toContain("mailto:");
	});

	it("should map experiences correctly", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel.experience.items).toHaveLength(1);
		expect(viewModel.experience.items[0].company).toBe("Test Company");
		expect(viewModel.experience.items[0].role).toBe("Senior Developer");
		expect(viewModel.experience.items[0].techStack).toHaveLength(1);
		expect(viewModel.experience.items[0].techStack[0].name).toBe("React");
	});

	it("should split skills into primary and complementary", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel.skills.primarySkills).toContain("JavaScript");
		expect(viewModel.skills.complementarySkills).toContain("CSS");
	});

	it("should map projects from experiences", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel.projects.items).toHaveLength(1);
		expect(viewModel.projects.items[0].name).toBe("Test Project");
		expect(viewModel.projects.items[0].company).toBe("Test Company");
	});

	it("should map contact information correctly", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		expect(viewModel.contact.email).toBe("test@example.com");
		expect(viewModel.contact.socials).toHaveLength(3); // linkedin, github, phone
		expect(viewModel.contact.socials[0].id).toBe("linkedin");
	});

	it("should use default locale when language is not recognized", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "fr",
		});

		expect(viewModel.locale).toBe("es"); // default locale
	});

	it("should use LinkedIn action when available", () => {
		const viewModel = createHomeViewModel({
			profile: mockProfile,
			t: mockT,
			language: "en",
		});

		const linkedInAction = viewModel.hero.actions.find(
			(action) => action.label === "View LinkedIn"
		);
		expect(linkedInAction).toBeDefined();
		expect(linkedInAction?.href).toBe("https://linkedin.com/in/test");
	});
});
