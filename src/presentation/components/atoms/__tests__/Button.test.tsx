import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Route } from "next";
import { Button } from "../Button";

// Mock next/link
jest.mock("next/link", () => {
	const MockLink = ({
		children,
		href,
		className,
		...props
	}: {
		children: React.ReactNode;
		href: string;
		className?: string;
		[key: string]: unknown;
	}) => (
		<a href={href} className={className} {...props}>
			{children}
		</a>
	);
	MockLink.displayName = "MockLink";
	return MockLink;
});

describe("Button", () => {
	it("should render as button element", () => {
		render(<Button>Click me</Button>);
		const button = screen.getByRole("button", { name: "Click me" });
		expect(button).toBeInTheDocument();
	});

	it("should call onClick when clicked", async () => {
		const handleClick = jest.fn();
		const user = userEvent.setup();
		render(<Button onClick={handleClick}>Click me</Button>);

		const button = screen.getByRole("button");
		await user.click(button);

		expect(handleClick).toHaveBeenCalledTimes(1);
	});

	it("should render with primary variant by default", () => {
		const { container } = render(<Button>Primary</Button>);
		const button = container.firstChild as HTMLElement;
		expect(button).toHaveClass("bg-primary", "text-primary-foreground");
	});

	it("should render with secondary variant", () => {
		const { container } = render(<Button variant="secondary">Secondary</Button>);
		const button = container.firstChild as HTMLElement;
		expect(button).toHaveClass(
			"border",
			"border-primary/30",
			"bg-transparent",
			"text-primary"
		);
	});

	it("should render with ghost variant", () => {
		const { container } = render(<Button variant="ghost">Ghost</Button>);
		const button = container.firstChild as HTMLElement;
		expect(button).toHaveClass("text-foreground/70");
	});

	it("should render as link when href is provided", () => {
		render(<Button href="https://example.com">Link</Button>);
		const link = screen.getByRole("link", { name: "Link" });
		expect(link).toHaveAttribute("href", "https://example.com");
	});

	it("should render external link with target blank", () => {
		render(<Button href="https://example.com">External</Button>);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("target", "_blank");
		expect(link).toHaveAttribute("rel", "noreferrer");
	});

	it("should apply custom className", () => {
		const { container } = render(
			<Button className="custom-class">Custom</Button>
		);
		const button = container.firstChild as HTMLElement;
		expect(button).toHaveClass("custom-class");
	});

	it("should render with icon", () => {
		const icon = <span data-testid="icon">Icon</span>;
		render(<Button icon={icon}>With Icon</Button>);
		expect(screen.getByTestId("icon")).toBeInTheDocument();
	});

	it("should render internal link with Next.js Link", () => {
		render(<Button href={"/about" as Route}>About</Button>);
		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/about");
	});

	it("should render mailto link without target blank", () => {
		render(<Button href="mailto:test@example.com">Email</Button>);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "mailto:test@example.com");
		expect(link).not.toHaveAttribute("target");
	});

	it("should render tel link without target blank", () => {
		render(<Button href="tel:+1234567890">Call</Button>);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("href", "tel:+1234567890");
		expect(link).not.toHaveAttribute("target");
	});

	it("should render button with type submit", () => {
		render(<Button type="submit">Submit</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("type", "submit");
	});

	it("should render button with default type button", () => {
		render(<Button>Click</Button>);
		const button = screen.getByRole("button");
		expect(button).toHaveAttribute("type", "button");
	});

	it("should render external link with custom target and rel", () => {
		render(
			<Button href="https://example.com" target="_self" rel="noopener">
				Custom Link
			</Button>
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("target", "_self");
		expect(link).toHaveAttribute("rel", "noopener");
	});

	it("should render external link with download attribute", () => {
		render(
			<Button href="https://example.com/file.pdf" download>
				Download
			</Button>
		);
		const link = screen.getByRole("link");
		expect(link).toHaveAttribute("download");
	});

	it("should render button with disabled attribute", () => {
		render(<Button disabled>Disabled</Button>);
		const button = screen.getByRole("button");
		expect(button).toBeDisabled();
	});

	it("should render button with aria-label", () => {
		render(<Button aria-label="Close dialog">X</Button>);
		const button = screen.getByRole("button", { name: "Close dialog" });
		expect(button).toBeInTheDocument();
	});

	it("should render internal link with all Link props", () => {
		render(
			<Button href={"/about" as Route} prefetch={false}>
				About
			</Button>
		);
		const link = screen.getByRole("link");
		expect(link).toBeInTheDocument();
		expect(link).toHaveAttribute("href", "/about");
	});
});

