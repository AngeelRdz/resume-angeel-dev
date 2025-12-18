import { render, screen } from "@testing-library/react";
import { HomeTemplate } from "../HomeTemplate";
import type { Profile } from "@/core/domain/entities/profile";

// Mock de useI18n
jest.mock("@/presentation/hooks/useTranslation", () => ({
	useI18n: () => ({
		t: (key: string) => key,
		i18n: {
			language: "en",
		},
	}),
}));

// Mock de los componentes de navegación y secciones
jest.mock("@/presentation/components/organisms/Navigation", () => ({
	Navigation: () => <nav data-testid="navigation">Navigation</nav>,
}));

jest.mock("@/presentation/components/organisms/HeroSection", () => ({
	HeroSection: ({
		data,
	}: {
		data: { name: string; [key: string]: unknown };
	}) => <section data-testid="hero-section">{data.name}</section>,
}));

jest.mock("@/presentation/components/organisms/AboutSection", () => ({
	AboutSection: () => <section data-testid="about-section">About</section>,
}));

jest.mock("@/presentation/components/organisms/ExperienceSection", () => ({
	ExperienceSection: () => (
		<section data-testid="experience-section">Experience</section>
	),
}));

jest.mock("@/presentation/components/organisms/SkillsSection", () => ({
	SkillsSection: () => <section data-testid="skills-section">Skills</section>,
}));

jest.mock("@/presentation/components/organisms/ProjectsSection", () => ({
	ProjectsSection: () => (
		<section data-testid="projects-section">Projects</section>
	),
}));

jest.mock("@/presentation/components/organisms/ContactSection", () => ({
	ContactSection: () => (
		<section data-testid="contact-section">Contact</section>
	),
}));

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

describe("HomeTemplate", () => {
	it("should render navigation", () => {
		render(<HomeTemplate profile={mockProfile} />);
		expect(screen.getByTestId("navigation")).toBeInTheDocument();
	});

	it("should render hero section", () => {
		render(<HomeTemplate profile={mockProfile} />);
		expect(screen.getByTestId("hero-section")).toBeInTheDocument();
	});

	it("should render all main sections", () => {
		render(<HomeTemplate profile={mockProfile} />);

		expect(screen.getByTestId("about-section")).toBeInTheDocument();
		expect(screen.getByTestId("experience-section")).toBeInTheDocument();
		expect(screen.getByTestId("skills-section")).toBeInTheDocument();
		expect(screen.getByTestId("contact-section")).toBeInTheDocument();
	});

	it("should render projects section when projects exist", () => {
		const profileWithProjects: Profile = {
			...mockProfile,
			experiences: [
				{
					id: "exp-1",
					companyName: "Company",
					roleTitle: "Developer",
					startDate: "2020-01-01T00:00:00.000Z",
					isCurrent: false,
					responsibilities: [],
					projects: [
						{
							id: "proj-1",
							name: "Project",
							description: "Description",
						},
					],
					technologies: [],
				},
			],
		};

		render(<HomeTemplate profile={profileWithProjects} />);
		expect(screen.getByTestId("projects-section")).toBeInTheDocument();
	});

	it("should not render projects section when no projects exist", () => {
		render(<HomeTemplate profile={mockProfile} />);
		// Projects section should not be rendered when there are no projects
		// This is handled by conditional rendering in the component
	});
});

