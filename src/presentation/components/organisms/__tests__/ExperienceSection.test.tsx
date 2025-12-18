import { render, screen } from "@testing-library/react";
import { ExperienceSection } from "../ExperienceSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock ExperienceCard
jest.mock("@/presentation/components/molecules/ExperienceCard", () => ({
	ExperienceCard: ({
		experience,
	}: {
		experience: { id: string; role: string; company: string };
	}) => (
		<div data-testid={`experience-${experience.id}`}>
			{experience.role} - {experience.company}
		</div>
	),
}));

const mockExperienceData: HomeViewModel["experience"] = {
	title: "Experience",
	items: [
		{
			id: "exp1",
			role: "Senior Developer",
			company: "Tech Corp",
			location: "Remote",
			period: "2020 - Present",
			description: "Leading development team",
			highlights: ["Highlight 1", "Highlight 2"],
			techStack: [
				{ name: "React", iconName: null },
				{ name: "TypeScript", iconName: null },
			],
			website: "https://techcorp.com" as ExternalHref,
		},
		{
			id: "exp2",
			role: "Developer",
			company: "Startup Inc",
			location: "San Francisco",
			period: "2018 - 2020",
			description: "Full stack development",
			highlights: ["Highlight 3"],
			techStack: [{ name: "Node.js", iconName: null }],
			website: null,
		},
	],
};

describe("ExperienceSection", () => {
	it("should render title", () => {
		render(<ExperienceSection data={mockExperienceData} />);
		expect(screen.getByText("Experience")).toBeInTheDocument();
	});

	it("should render all experience items", () => {
		render(<ExperienceSection data={mockExperienceData} />);
		expect(screen.getByTestId("experience-exp1")).toBeInTheDocument();
		expect(screen.getByTestId("experience-exp2")).toBeInTheDocument();
	});

	it("should render experience card with correct data", () => {
		render(<ExperienceSection data={mockExperienceData} />);
		expect(screen.getByText(/Senior Developer - Tech Corp/)).toBeInTheDocument();
		expect(screen.getByText(/Developer - Startup Inc/)).toBeInTheDocument();
	});

	it("should render empty state when no items", () => {
		const emptyData = {
			...mockExperienceData,
			items: [],
		};
		render(<ExperienceSection data={emptyData} />);
		expect(screen.getByText("Experience")).toBeInTheDocument();
		expect(screen.queryByTestId(/experience-/)).not.toBeInTheDocument();
	});
});

