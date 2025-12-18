import { render, screen } from "@testing-library/react";
import { ProjectsSection } from "../ProjectsSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock ProjectCard
jest.mock("@/presentation/components/molecules/ProjectCard", () => ({
	ProjectCard: ({
		project,
	}: {
		project: { id: string; name: string; description?: string | null };
	}) => (
		<div data-testid={`project-${project.id}`}>
			{project.name} - {project.description}
		</div>
	),
}));

const mockProjectsData: HomeViewModel["projects"] = {
	title: "Featured Projects",
	items: [
		{
			id: "proj1",
			name: "Project 1",
			description: "Description 1",
			techStack: [
				{ name: "React", iconName: null },
				{ name: "TypeScript", iconName: null },
			],
			url: "https://project1.com" as ExternalHref,
			company: "Test Company",
		},
		{
			id: "proj2",
			name: "Project 2",
			description: "Description 2",
			techStack: [
				{ name: "Vue", iconName: null },
				{ name: "Node.js", iconName: null },
			],
			url: null,
			company: "Test Company",
		},
	],
};

describe("ProjectsSection", () => {
	it("should render title", () => {
		render(<ProjectsSection data={mockProjectsData} />);
		expect(screen.getByText("Featured Projects")).toBeInTheDocument();
	});

	it("should render all project items", () => {
		render(<ProjectsSection data={mockProjectsData} />);
		expect(screen.getByTestId("project-proj1")).toBeInTheDocument();
		expect(screen.getByTestId("project-proj2")).toBeInTheDocument();
	});

	it("should render project card with correct data", () => {
		render(<ProjectsSection data={mockProjectsData} />);
		expect(screen.getByText(/Project 1 - Description 1/)).toBeInTheDocument();
		expect(screen.getByText(/Project 2 - Description 2/)).toBeInTheDocument();
	});

	it("should render empty state when no items", () => {
		const emptyData = {
			...mockProjectsData,
			items: [],
		};
		render(<ProjectsSection data={emptyData} />);
		expect(screen.getByText("Featured Projects")).toBeInTheDocument();
		expect(screen.queryByTestId(/project-/)).not.toBeInTheDocument();
	});
});

