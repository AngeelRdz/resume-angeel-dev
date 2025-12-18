import { render, screen } from "@testing-library/react";
import { ExperienceCard } from "../ExperienceCard";
import type { ExperienceViewModel } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock TechnologyIcon
jest.mock("@/presentation/components/atoms/TechnologyIcon", () => ({
	TechnologyIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe("ExperienceCard", () => {
	const mockExperience: ExperienceViewModel = {
		id: "exp-1",
		role: "Frontend Engineer",
		company: "Test Company",
		location: "Mexico City",
		website: "https://test.com" as ExternalHref,
		period: "2020 - Present",
		description: "Test description",
		highlights: ["Highlight 1", "Highlight 2"],
		techStack: [
			{ name: "React", iconName: "react" },
			{ name: "TypeScript", iconName: "typescript" },
		],
	};

	it("should render experience information", () => {
		render(<ExperienceCard experience={mockExperience} />);
		expect(screen.getByText("Frontend Engineer")).toBeInTheDocument();
		expect(screen.getByText("Test Company")).toBeInTheDocument();
		expect(screen.getByText(/Mexico City/)).toBeInTheDocument();
		expect(screen.getByText("2020 - Present")).toBeInTheDocument();
	});

	it("should render description when provided", () => {
		render(<ExperienceCard experience={mockExperience} />);
		expect(screen.getByText("Test description")).toBeInTheDocument();
	});

	it("should not render description when not provided", () => {
		const experienceWithoutDescription = {
			...mockExperience,
			description: null,
		};
		render(<ExperienceCard experience={experienceWithoutDescription} />);
		expect(screen.queryByText("Test description")).not.toBeInTheDocument();
	});

	it("should render highlights", () => {
		render(<ExperienceCard experience={mockExperience} />);
		expect(screen.getByText("Highlight 1")).toBeInTheDocument();
		expect(screen.getByText("Highlight 2")).toBeInTheDocument();
	});

	it("should not render highlights section when empty", () => {
		const experienceWithoutHighlights = {
			...mockExperience,
			highlights: [],
		};
		render(<ExperienceCard experience={experienceWithoutHighlights} />);
		expect(screen.queryByText("Highlight 1")).not.toBeInTheDocument();
	});

	it("should render tech stack", () => {
		render(<ExperienceCard experience={mockExperience} />);
		expect(screen.getAllByText("React").length).toBeGreaterThan(0);
		expect(screen.getAllByText("TypeScript").length).toBeGreaterThan(0);
	});

	it("should not render tech stack section when empty", () => {
		const experienceWithoutTech = {
			...mockExperience,
			techStack: [],
		};
		render(<ExperienceCard experience={experienceWithoutTech} />);
		expect(screen.queryByText("React")).not.toBeInTheDocument();
	});

	it("should render website link when provided", () => {
		render(<ExperienceCard experience={mockExperience} />);
		const link = screen.getByText("Sitio");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://test.com");
	});

	it("should not render website link when not provided", () => {
		const experienceWithoutWebsite = {
			...mockExperience,
			website: null,
		};
		render(<ExperienceCard experience={experienceWithoutWebsite} />);
		expect(screen.queryByText("Sitio")).not.toBeInTheDocument();
	});

	it("should not render location when not provided", () => {
		const experienceWithoutLocation = {
			...mockExperience,
			location: null,
		};
		render(<ExperienceCard experience={experienceWithoutLocation} />);
		expect(screen.queryByText(/Mexico City/)).not.toBeInTheDocument();
	});
});

