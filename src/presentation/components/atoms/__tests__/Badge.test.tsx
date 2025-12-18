import { render, screen } from "@testing-library/react";
import { Badge } from "../Badge";

describe("Badge", () => {
	it("should render children", () => {
		render(<Badge>Test Badge</Badge>);
		expect(screen.getByText("Test Badge")).toBeInTheDocument();
	});

	it("should apply neutral tone by default", () => {
		const { container } = render(<Badge>Neutral</Badge>);
		const badge = container.firstChild as HTMLElement;
		expect(badge).toHaveClass("bg-foreground/10", "text-foreground");
	});

	it("should apply accent tone", () => {
		const { container } = render(<Badge tone="accent">Accent</Badge>);
		const badge = container.firstChild as HTMLElement;
		expect(badge).toHaveClass("badge-accent");
	});

	it("should apply success tone", () => {
		const { container } = render(<Badge tone="success">Success</Badge>);
		const badge = container.firstChild as HTMLElement;
		expect(badge).toHaveClass("bg-emerald-500/15", "text-emerald-500");
	});

	it("should apply custom className", () => {
		const { container } = render(
			<Badge className="custom-class">Custom</Badge>
		);
		const badge = container.firstChild as HTMLElement;
		expect(badge).toHaveClass("custom-class");
	});

	it("should have correct base classes", () => {
		const { container } = render(<Badge>Base</Badge>);
		const badge = container.firstChild as HTMLElement;
		expect(badge).toHaveClass(
			"inline-flex",
			"items-center",
			"rounded-full",
			"px-3",
			"py-1",
			"text-xs",
			"font-medium",
			"uppercase",
			"tracking-wide"
		);
	});
});

