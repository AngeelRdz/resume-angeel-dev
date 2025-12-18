import { render, screen } from "@testing-library/react";
import { HeroSection } from "../HeroSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock ActionBar
jest.mock("@/presentation/components/molecules/ActionBar", () => ({
	ActionBar: ({
		actions,
	}: {
		actions: Array<{ id?: string; label: string }>;
	}) => (
		<div data-testid="action-bar">
			{actions.map((action) => (
				<span key={action.id || action.label}>{action.label}</span>
			))}
		</div>
	),
}));

// Mock WaveDivider
jest.mock("@/presentation/components/atoms/WaveDivider", () => ({
	WaveDivider: () => <div data-testid="wave-divider" />,
}));

const mockHeroData: HomeViewModel["hero"] = {
	name: "John Doe",
	role: "Senior Developer",
	headline: "Building amazing things",
	greeting: "Hello",
	availability: "Available for work",
	location: "San Francisco, CA",
	highlights: [
		{ id: "highlight1", label: "Experience", value: "10+ years experience" },
		{ id: "highlight2", label: "Stack", value: "Full Stack" },
	],
	actions: [
		{ label: "Contact Me", href: "mailto:test@example.com" as ExternalHref, variant: "primary" as const },
		{ label: "View LinkedIn", href: "https://linkedin.com" as ExternalHref, variant: "secondary" as const },
	],
};

describe("HeroSection", () => {
	it("should render name", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("John Doe")).toBeInTheDocument();
	});

	it("should render role", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("Senior Developer")).toBeInTheDocument();
	});

	it("should render headline", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("Building amazing things")).toBeInTheDocument();
	});

	it("should render greeting", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("Hello")).toBeInTheDocument();
	});

	it("should render availability", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("Available for work")).toBeInTheDocument();
	});

	it("should render location", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("San Francisco, CA")).toBeInTheDocument();
	});

	it("should render highlights", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByText("10+ years experience")).toBeInTheDocument();
		expect(screen.getByText("Full Stack")).toBeInTheDocument();
	});

	it("should render action bar", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByTestId("action-bar")).toBeInTheDocument();
		expect(screen.getByText("Contact Me")).toBeInTheDocument();
		expect(screen.getByText("View LinkedIn")).toBeInTheDocument();
	});

	it("should render wave divider", () => {
		render(<HeroSection data={mockHeroData} />);
		expect(screen.getByTestId("wave-divider")).toBeInTheDocument();
	});

	it("should have correct section id", () => {
		const { container } = render(<HeroSection data={mockHeroData} />);
		const section = container.querySelector("section#home");
		expect(section).toBeInTheDocument();
	});
});

