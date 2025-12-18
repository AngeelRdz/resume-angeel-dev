import { render, screen } from "@testing-library/react";
import { ContactSection } from "../ContactSection";
import type { HomeViewModel } from "@/presentation/view-models/homeViewModel";

const mockContactData: HomeViewModel["contact"] = {
	title: "Contact",
	subtitle: "Let's talk",
	email: "test@example.com",
	emailLabel: "Email",
	socialLabel: "Social",
	socials: [
		{ id: "linkedin", label: "LinkedIn", url: "https://linkedin.com/in/test" },
		{ id: "github", label: "GitHub", url: "https://github.com/test" },
	],
};

describe("ContactSection", () => {
	it("should render title and subtitle", () => {
		render(<ContactSection data={mockContactData} />);
		expect(screen.getByText("Contact")).toBeInTheDocument();
		expect(screen.getByText("Let's talk")).toBeInTheDocument();
	});

	it("should render email with mailto link", () => {
		render(<ContactSection data={mockContactData} />);
		const emailLink = screen.getByText("test@example.com");
		expect(emailLink).toBeInTheDocument();
		expect(emailLink.closest("a")).toHaveAttribute("href", "mailto:test@example.com");
	});

	it("should render email label", () => {
		render(<ContactSection data={mockContactData} />);
		expect(screen.getByText("Email")).toBeInTheDocument();
	});

	it("should render social links when provided", () => {
		render(<ContactSection data={mockContactData} />);
		expect(screen.getByText("Social")).toBeInTheDocument();
		expect(screen.getByText("LinkedIn")).toBeInTheDocument();
		expect(screen.getByText("GitHub")).toBeInTheDocument();

		const linkedinLink = screen.getByText("LinkedIn").closest("a");
		expect(linkedinLink).toHaveAttribute("href", "https://linkedin.com/in/test");
		expect(linkedinLink).toHaveAttribute("target", "_blank");
		expect(linkedinLink).toHaveAttribute("rel", "noreferrer");

		const githubLink = screen.getByText("GitHub").closest("a");
		expect(githubLink).toHaveAttribute("href", "https://github.com/test");
		expect(githubLink).toHaveAttribute("target", "_blank");
	});

	it("should not render social section when socials array is empty", () => {
		const dataWithoutSocials = {
			...mockContactData,
			socials: [],
		};
		render(<ContactSection data={dataWithoutSocials} />);
		expect(screen.queryByText("Social")).not.toBeInTheDocument();
	});
});

