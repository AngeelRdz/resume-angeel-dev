import { render, screen } from "@testing-library/react";
import { AboutSection } from "../AboutSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";
import type { ExternalHref } from "@/shared/types/links";

// framer-motion está mockeado globalmente en jest.setup.js

// Mock next/image
jest.mock("next/image", () => ({
	__esModule: true,
	default: ({
		src,
		alt,
		fill,
		className,
		sizes,
	}: {
		src: string;
		alt: string;
		fill?: boolean;
		className?: string;
		sizes?: string;
	}) => (
		// eslint-disable-next-line @next/next/no-img-element
		<img 
			src={src} 
			alt={alt} 
			className={className}
			data-fill={fill}
			data-sizes={sizes}
		/>
	),
}));

// Mock SocialIcon
jest.mock("@/presentation/components/atoms/SocialIcon", () => ({
	SocialIcon: ({ type, url }: { type: string; url: string }) => (
		<a href={url} data-testid={`social-${type}`}>
			{type}
		</a>
	),
}));

const mockAboutData: HomeViewModel["about"] = {
	title: "About Me",
	summary: "I'm a developer with passion for coding",
	profileImageUrl: "https://example.com/profile.jpg",
	highlights: [
		{ id: "highlight1", label: "Experience", value: "10+ years" },
		{ id: "highlight2", label: "Location", value: "San Francisco" },
	],
	socialLinks: [
		{ id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/test" as ExternalHref },
		{ id: "github", label: "GitHub", url: "https://github.com/test" as ExternalHref },
	],
};

describe("AboutSection", () => {
	it("should render title", () => {
		render(<AboutSection data={mockAboutData} />);
		expect(screen.getByText("About Me")).toBeInTheDocument();
	});

	it("should render summary", () => {
		render(<AboutSection data={mockAboutData} />);
		expect(screen.getByText("I'm a developer with passion for coding")).toBeInTheDocument();
	});

	it("should render profile image when provided", () => {
		render(<AboutSection data={mockAboutData} />);
		const image = screen.getByAltText("Profile");
		expect(image).toBeInTheDocument();
		expect(image).toHaveAttribute("src", "https://example.com/profile.jpg");
	});

	it("should render placeholder when no profile image", () => {
		const dataWithoutImage = {
			...mockAboutData,
			profileImageUrl: null,
		};
		render(<AboutSection data={dataWithoutImage} />);
		// Should still render the section, just without image
		expect(screen.getByText("About Me")).toBeInTheDocument();
	});

	it("should render highlights", () => {
		render(<AboutSection data={mockAboutData} />);
		expect(screen.getByText("Experience")).toBeInTheDocument();
		expect(screen.getByText("10+ years")).toBeInTheDocument();
		expect(screen.getByText("Location")).toBeInTheDocument();
		expect(screen.getByText("San Francisco")).toBeInTheDocument();
	});

	it("should render social links when provided", () => {
		render(<AboutSection data={mockAboutData} />);
		expect(screen.getByTestId("social-linkedin")).toBeInTheDocument();
		expect(screen.getByTestId("social-github")).toBeInTheDocument();
		expect(screen.getByTestId("social-linkedin")).toHaveAttribute("href", "https://linkedin.com/in/test");
		expect(screen.getByTestId("social-github")).toHaveAttribute("href", "https://github.com/test");
	});

	it("should not render social links section when socialLinks array is empty", () => {
		const dataWithoutSocials = {
			...mockAboutData,
			socialLinks: [],
		};
		render(<AboutSection data={dataWithoutSocials} />);
		expect(screen.queryByTestId(/social-/)).not.toBeInTheDocument();
	});
});

