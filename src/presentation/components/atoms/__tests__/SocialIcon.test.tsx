import { render, screen } from "@testing-library/react";
import { SocialIcon } from "../SocialIcon";

describe("SocialIcon", () => {
	it("should render linkedin icon", () => {
		render(<SocialIcon type="linkedin" url="https://linkedin.com" />);
		const link = screen.getByLabelText("LinkedIn");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://linkedin.com");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
	});

	it("should render github icon", () => {
		render(<SocialIcon type="github" url="https://github.com" />);
		const link = screen.getByLabelText("GitHub");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "https://github.com");
	});

	it("should render whatsapp icon", () => {
		render(<SocialIcon type="whatsapp" url="https://wa.me/123" />);
		const link = screen.getByLabelText("WhatsApp");
		expect(link).toBeInTheDocument();
	});

	it("should render phone icon", () => {
		render(<SocialIcon type="phone" url="tel:+1234567890" />);
		const link = screen.getByLabelText("Teléfono");
		expect(link).toBeInTheDocument();
	});

	it("should render email icon", () => {
		render(<SocialIcon type="email" url="mailto:test@example.com" />);
		const link = screen.getByLabelText("Email");
		expect(link).toBeInTheDocument();
	});

	it("should render icon-only variant", () => {
		render(<SocialIcon type="linkedin" variant="icon-only" />);
		const icon = screen.getByLabelText("LinkedIn");
		expect(icon.tagName).toBe("DIV");
		expect(icon).not.toHaveAttribute("href");
	});

	it("should render without url as div", () => {
		render(<SocialIcon type="linkedin" />);
		const icon = screen.getByLabelText("LinkedIn");
		expect(icon.tagName).toBe("DIV");
		expect(icon).not.toHaveAttribute("href");
	});

	it("should handle different sizes", () => {
		const { rerender, container } = render(<SocialIcon type="linkedin" size="sm" />);
		let iconDiv = container.querySelector(".h-4");
		expect(iconDiv).toBeInTheDocument();

		rerender(<SocialIcon type="linkedin" size="md" />);
		iconDiv = container.querySelector(".h-5");
		expect(iconDiv).toBeInTheDocument();

		rerender(<SocialIcon type="linkedin" size="lg" />);
		iconDiv = container.querySelector(".h-6");
		expect(iconDiv).toBeInTheDocument();
	});

	it("should apply custom className", () => {
		render(<SocialIcon type="linkedin" className="custom-class" />);
		const icon = screen.getByLabelText("LinkedIn");
		expect(icon).toHaveClass("custom-class");
	});

	it("should return null for unknown type", () => {
		const { container } = render(<SocialIcon type="unknown" />);
		expect(container.firstChild).toBeNull();
	});

	it("should handle case insensitive type", () => {
		render(<SocialIcon type="LINKEDIN" url="https://linkedin.com" />);
		const link = screen.getByLabelText("LinkedIn");
		expect(link).toBeInTheDocument();
	});
});

