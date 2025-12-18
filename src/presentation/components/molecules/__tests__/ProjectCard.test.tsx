import { render, screen } from "@testing-library/react";
import { ProjectCard } from "../ProjectCard";
import type { ProjectViewModel } from "@/presentation/view-models/homeViewModel";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock TechnologyIcon
jest.mock("@/presentation/components/atoms/TechnologyIcon", () => ({
	TechnologyIcon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

describe("ProjectCard", () => {
	const mockProject: ProjectViewModel = {
		id: "proj-1",
		name: "Test Project",
		description: "Test project description",
		url: "https://test-project.com" as `https://${string}`,
		company: "Test Company",
		techStack: [
			{ name: "Next.js", iconName: "nextjs" },
			{ name: "React", iconName: "react" },
		],
	};

	it("should render project information", () => {
		render(<ProjectCard project={mockProject} />);
		expect(screen.getByText("Test Project")).toBeInTheDocument();
		expect(screen.getByText("Test Company")).toBeInTheDocument();
		expect(screen.getByText("Test project description")).toBeInTheDocument();
	});

	it("should render description when provided", () => {
		render(<ProjectCard project={mockProject} />);
		expect(screen.getByText("Test project description")).toBeInTheDocument();
	});

	it("should not render description when not provided", () => {
		const projectWithoutDescription = {
			...mockProject,
			description: null,
		};
		render(<ProjectCard project={projectWithoutDescription} />);
		expect(screen.queryByText("Test project description")).not.toBeInTheDocument();
	});

	it("should render tech stack", () => {
		render(<ProjectCard project={mockProject} />);
		expect(screen.getAllByText("Next.js").length).toBeGreaterThan(0);
		expect(screen.getAllByText("React").length).toBeGreaterThan(0);
	});

	it("should not render tech stack section when empty", () => {
		const projectWithoutTech = {
			...mockProject,
			techStack: [],
		};
		render(<ProjectCard project={projectWithoutTech} />);
		expect(screen.queryByText("Next.js")).not.toBeInTheDocument();
	});

	it("should render URL link when provided", () => {
		render(<ProjectCard project={mockProject} />);
		const link = screen.getByText("test-project.com");
		expect(link).toBeInTheDocument();
		expect(link.closest("a")).toHaveAttribute("href", "https://test-project.com");
	});

	it("should not render URL link when not provided", () => {
		const projectWithoutUrl = {
			...mockProject,
			url: null,
		};
		render(<ProjectCard project={projectWithoutUrl} />);
		expect(screen.queryByText("test-project.com")).not.toBeInTheDocument();
	});

	it("should strip protocol from URL in display", () => {
		render(<ProjectCard project={mockProject} />);
		expect(screen.getByText("test-project.com")).toBeInTheDocument();
		expect(screen.queryByText("https://test-project.com")).not.toBeInTheDocument();
	});

	it("should handle http URLs", () => {
		const projectWithHttp = {
			...mockProject,
			url: "http://example.com" as `http://${string}`,
		};
		render(<ProjectCard project={projectWithHttp} />);
		expect(screen.getByText("example.com")).toBeInTheDocument();
	});
});

